import type { PositionedElementConfig } from './PositionedElementsService';
import type { BeaconRoute } from './BeaconRouteService';
import beaconRouteService from './BeaconRouteService';

export interface RoutePoint {
  x: number;
  y: number;
}

export interface RouteLine {
  from: RoutePoint;
  to: RoutePoint;
  type: 'solid' | 'dashed';
  via?: RoutePoint[];
}

export interface Route {
  id: string;
  fromRoom: string;
  toRoom: string;
  line: RouteLine;
  visible: boolean;
  corridor?: number;
  flipArrow?: boolean;
  beaconRoute?: BeaconRoute; // Маршрут через маяки
}

class RouteService {
  private static readonly MIN_CORRIDOR_OFFSET = 40;
  private routes: Route[] = [];
  private listeners: ((routes: Route[]) => void)[] = [];

  private getRoomCenter(room: PositionedElementConfig): RoutePoint {
    return {
      x: room.x + (room.width || 0) / 2,
      y: room.y + (room.height || 0) / 2,
    };
  }

  private getCorridorRooms(
    corridor: number | undefined,
    rooms: PositionedElementConfig[],
  ): PositionedElementConfig[] {
    if (typeof corridor !== 'number') {
      return [];
    }

    return rooms.filter(room => room.corridor === corridor);
  }

  private determineCorridorOrientation(
    corridorRooms: PositionedElementConfig[],
  ): 'horizontal' | 'vertical' | null {
    if (corridorRooms.length === 0) {
      return null;
    }

    const centers = corridorRooms.map(room => this.getRoomCenter(room));
    const minX = Math.min(...centers.map(center => center.x));
    const maxX = Math.max(...centers.map(center => center.x));
    const minY = Math.min(...centers.map(center => center.y));
    const maxY = Math.max(...centers.map(center => center.y));

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    if (rangeX === 0 && rangeY === 0) {
      return null;
    }

    return rangeX >= rangeY ? 'horizontal' : 'vertical';
  }

  private getCorridorLine(
    corridorRooms: PositionedElementConfig[],
    orientation: 'horizontal' | 'vertical',
  ): number {
    const centers = corridorRooms.map(room => this.getRoomCenter(room));

    if (orientation === 'horizontal') {
      const minCenterY = Math.min(...centers.map(center => center.y));
      const maxCenterY = Math.max(...centers.map(center => center.y));
      const centerReference = (minCenterY + maxCenterY) / 2;

      const entryYPositions = corridorRooms.map(room => {
        if (room.corridorEntrySide === 'top') {
          return room.y;
        }

        if (room.corridorEntrySide === 'bottom') {
          return room.y + (room.height || 0);
        }

        const roomCenterY = this.getRoomCenter(room).y;
        return roomCenterY < centerReference
          ? room.y + (room.height || 0)
          : room.y;
      });

      const minEntryY = Math.min(...entryYPositions);
      const maxEntryY = Math.max(...entryYPositions);

      if (minEntryY === maxEntryY) {
        return centerReference;
      }

      return (minEntryY + maxEntryY) / 2;
    }
    const minCenterX = Math.min(...centers.map(center => center.x));
    const maxCenterX = Math.max(...centers.map(center => center.x));
    const centerReference = (minCenterX + maxCenterX) / 2;

    const entryXPositions = corridorRooms.map(room => {
      if (room.corridorEntrySide === 'left') {
        return room.x;
      }

      if (room.corridorEntrySide === 'right') {
        return room.x + (room.width || 0);
      }

      const roomCenterX = this.getRoomCenter(room).x;
      return roomCenterX < centerReference
        ? room.x + (room.width || 0)
        : room.x;
    });

    const minEntryX = Math.min(...entryXPositions);
    const maxEntryX = Math.max(...entryXPositions);

    if (minEntryX === maxEntryX) {
      return centerReference;
    }

    return (minEntryX + maxEntryX) / 2;
  }
  private getCorridorEntryPoint(
    room: PositionedElementConfig,
    orientation: 'horizontal' | 'vertical',
    corridorLine: number,
  ): RoutePoint {
    if (orientation === 'horizontal') {
      if (room.corridorEntrySide === 'top' || room.corridorEntrySide === 'bottom') {
        return {
          x: room.x + (room.width || 0) / 2,
          y:
            room.corridorEntrySide === 'top'
              ? room.y
              : room.y + (room.height || 0),
        };
      }

      const roomCenter = this.getRoomCenter(room);
      const isRoomAboveCorridor = roomCenter.y < corridorLine;
      return {
        x: room.x + (room.width || 0) / 2,
        y: isRoomAboveCorridor ? room.y + (room.height || 0) : room.y,
      };
    }

    if (room.corridorEntrySide === 'left' || room.corridorEntrySide === 'right') {
      return {
        x: room.corridorEntrySide === 'left' ? room.x : room.x + (room.width || 0),
        y: room.y + (room.height || 0) / 2,
      };
    }

    const roomCenter = this.getRoomCenter(room);
    const isRoomLeftOfCorridor = roomCenter.x < corridorLine;
    return {
      x: isRoomLeftOfCorridor ? room.x + (room.width || 0) : room.x,
      y: room.y + (room.height || 0) / 2,
    };
  }
  private getCorridorCenterPoint(
    entry: RoutePoint,
    corridorLine: number,
    orientation: 'horizontal' | 'vertical',
  ): RoutePoint {
    if (orientation === 'horizontal') {
      return {
        x: entry.x,
        y: corridorLine,
      };
    }

    return {
      x: corridorLine,
      y: entry.y,
    };
  }
  private getEffectiveCorridorLine(
    fromEntry: RoutePoint,
    toEntry: RoutePoint,
    baseCorridorLine: number,
    orientation: 'horizontal' | 'vertical',
  ): number {
    if (orientation === 'horizontal') {
      if (Math.abs(fromEntry.y - toEntry.y) < 0.5) {
        return fromEntry.y;
      }

      const pairLine = (fromEntry.y + toEntry.y) / 2;
      return Math.abs(pairLine - baseCorridorLine) < 0.5 ? baseCorridorLine : pairLine;
    }

    if (Math.abs(fromEntry.x - toEntry.x) < 0.5) {
      return fromEntry.x;
    }

    const pairLine = (fromEntry.x + toEntry.x) / 2;
    return Math.abs(pairLine - baseCorridorLine) < 0.5 ? baseCorridorLine : pairLine;
  }
  private buildCorridorPath(
    fromRoom: PositionedElementConfig,
    toRoom: PositionedElementConfig,
    rooms: PositionedElementConfig[],
  ):
    | { from: RoutePoint; to: RoutePoint; via: RoutePoint[] }
    | null {
    if (fromRoom.corridor !== toRoom.corridor) {
      return null;
    }

    const corridorRooms = this.getCorridorRooms(fromRoom.corridor, rooms);
    if (corridorRooms.length === 0) {
      return null;
    }

    const orientation = this.determineCorridorOrientation(corridorRooms);
    if (!orientation) {
      return null;
    }

    const corridorLine = this.getCorridorLine(corridorRooms, orientation);
    const fromEntry = this.getCorridorEntryPoint(fromRoom, orientation, corridorLine);
    const toEntry = this.getCorridorEntryPoint(toRoom, orientation, corridorLine);
    const effectiveCorridorLine = this.getEffectiveCorridorLine(
      fromEntry,
      toEntry,
      corridorLine,
      orientation,
    );

    const fromCorridorPoint = this.getCorridorCenterPoint(
      fromEntry,
      effectiveCorridorLine,
      orientation,
    );
    const toCorridorPoint = this.getCorridorCenterPoint(
      toEntry,
      effectiveCorridorLine,
      orientation,
    );

    const via: RoutePoint[] = [];
    const pushViaPoint = (point: RoutePoint) => {
      const previous = via.length > 0 ? via[via.length - 1] : fromEntry;
      if (previous.x !== point.x || previous.y !== point.y) {
        via.push(point);
      }
    };

    if (orientation === 'horizontal') {
      pushViaPoint(fromCorridorPoint);

      const midpointX = (fromCorridorPoint.x + toCorridorPoint.x) / 2;
      pushViaPoint({ x: midpointX, y: effectiveCorridorLine });

      pushViaPoint(toCorridorPoint);
    } else {
      pushViaPoint(fromCorridorPoint);

      const midpointY = (fromCorridorPoint.y + toCorridorPoint.y) / 2;
      pushViaPoint({ x: effectiveCorridorLine, y: midpointY }); 

      pushViaPoint(toCorridorPoint);
    }

    return {
      from: fromEntry,
      to: toEntry,
      via,
    };
  }
  // Подписка на изменения маршрутов
  onRoutesChange(callback: (routes: Route[]) => void) {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Уведомление слушателей об изменениях
  private emit() {
    this.listeners.forEach(callback => callback([...this.routes]));
  }

  // Найти середину стороны комнаты (верхней или нижней)
  private findRoomSideCenter(room: PositionedElementConfig, side: 'top' | 'bottom'): RoutePoint {
    const centerX = room.x + (room.width || 0) / 2;
    let centerY: number;

    if (side === 'top') {
      centerY = room.y;
    } else {
      centerY = room.y + (room.height || 0);
    }

    console.log(`RouteService: Найдена точка ${side} стороны комнаты ${room.id}:`, { x: centerX, y: centerY });
    return { x: centerX, y: centerY };
  }

  // Определить, какую сторону комнаты использовать для соединения
  private determineOptimalSide(fromRoom: PositionedElementConfig, toRoom: PositionedElementConfig): {
    fromSide: 'top' | 'bottom';
    toSide: 'top' | 'bottom';
  } {
    // Если комнаты на одном уровне (примерно), используем верхнюю сторону
    const yDifference = Math.abs(fromRoom.y - toRoom.y);
    const avgHeight = ((fromRoom.height || 0) + (toRoom.height || 0)) / 2;
    
    let fromSide: 'top' | 'bottom';
    let toSide: 'top' | 'bottom';
    
    if (yDifference < avgHeight * 0.5) {
      // Комнаты примерно на одном уровне - используем верхнюю сторону
      fromSide = 'top';
      toSide = 'top';
    } else {
      // Комнаты на разных уровнях - используем ближайшие стороны
      if (fromRoom.y < toRoom.y) {
        fromSide = 'bottom';
        toSide = 'top';
      } else {
        fromSide = 'top';
        toSide = 'bottom';
      }
    }

    console.log(`RouteService: Определены оптимальные стороны: from=${fromSide}, to=${toSide}`);
    return { fromSide, toSide };
  }

  // Построить маршрут между двумя комнатами
  buildRoute(fromRoomId: string, toRoomId: string, rooms: PositionedElementConfig[]): Route | null {
    console.log('RouteService: Попытка построить маршрут:', { fromRoomId, toRoomId });
    console.log('RouteService: Доступные комнаты:', rooms.map(r => ({ id: r.id, number: r.number })));
    
    const fromRoom = rooms.find(room => room.id === fromRoomId);
    const toRoom = rooms.find(room => room.id === toRoomId);

    if (!fromRoom || !toRoom) {
      console.warn('RouteService: Комната не найдена:', { fromRoomId, toRoomId });
      return null;
    }

    console.log('RouteService: Найдены комнаты:', { 
      from: { id: fromRoom.id, x: fromRoom.x, y: fromRoom.y, width: fromRoom.width, height: fromRoom.height },
      to: { id: toRoom.id, x: toRoom.x, y: toRoom.y, width: toRoom.width, height: toRoom.height }
    });

    // Пытаемся построить маршрут через маяки
    let beaconRoute: BeaconRoute | null = null;
    try {
      beaconRoute = beaconRouteService.buildRouteBetweenRooms(
        { x: fromRoom.x, y: fromRoom.y, width: fromRoom.width || 0, height: fromRoom.height || 0 },
        { x: toRoom.x, y: toRoom.y, width: toRoom.width || 0, height: toRoom.height || 0 }
      );
    } catch (error) {
      console.warn('RouteService: Ошибка при построении маршрута через маяки:', error);
    }

    if (beaconRoute && (beaconRoute.path.length < 2 || !Number.isFinite(beaconRoute.totalDistance))) {
      console.warn('RouteService: Маршрут через маяки некорректный, будет использован маршрут по коридору', beaconRoute);
      beaconRoute = null;
    }

    // Строим маршрут по коридору (если возможно)
    const sharedCorridor =
      typeof fromRoom.corridor === 'number' && fromRoom.corridor === toRoom.corridor
        ? fromRoom.corridor
        : undefined;

    const corridorPath = this.buildCorridorPath(fromRoom, toRoom, rooms);

    let fromPoint: RoutePoint;
    let toPoint: RoutePoint;
    let viaPoints: RoutePoint[] | undefined;

    if (corridorPath) {
      fromPoint = corridorPath.from;
      toPoint = corridorPath.to;
      viaPoints = corridorPath.via;
    } else {
      // Определяем оптимальные стороны для соединения (fallback)
      const { fromSide, toSide } = this.determineOptimalSide(fromRoom, toRoom);

      // Находим точки соединения
      fromPoint = this.findRoomSideCenter(fromRoom, fromSide);
      toPoint = this.findRoomSideCenter(toRoom, toSide);

      // Формируем маршрут с прямыми углами, чтобы избежать диагональных линий
      const fallbackViaPoints: RoutePoint[] = [];
      const pushViaPoint = (point: RoutePoint) => {
        const previous = fallbackViaPoints.length > 0 ? fallbackViaPoints[fallbackViaPoints.length - 1] : fromPoint;
        const isDuplicateOfPrevious = previous.x === point.x && previous.y === point.y;
        const isDuplicateOfDestination = point.x === toPoint.x && point.y === toPoint.y;

        if (!isDuplicateOfPrevious && !isDuplicateOfDestination) {
          fallbackViaPoints.push(point);
        }
      };

      // Добавляем промежуточную точку, если необходимо повернуть маршрут
      if (fromPoint.x !== toPoint.x && fromPoint.y !== toPoint.y) {
        pushViaPoint({ x: fromPoint.x, y: toPoint.y });
      }

      viaPoints = fallbackViaPoints.length > 0 ? fallbackViaPoints : undefined;
    }

    // Создаем маршрут
    const routeId = `route_${fromRoomId}_${toRoomId}`;
// Remove existing routes so only the latest route remains visible
if (this.routes.length > 0) {
  this.clearRoutes();
}
    // Создаем маршрут
    const route: Route = {
      id: routeId,
      fromRoom: fromRoomId,
      toRoom: toRoomId,
      line: {
        from: fromPoint,
        to: toPoint,
        type: 'dashed',
        via: viaPoints, // По умолчанию пунктирная линия
      },
      visible: true,
      corridor: sharedCorridor,
      flipArrow: sharedCorridor === 3,
      beaconRoute: beaconRoute || undefined
    };

    console.log('RouteService: Создан маршрут:', route);

    // Добавляем маршрут в список
    this.routes.push(route);
    console.log('RouteService: Маршрут добавлен, всего маршрутов:', this.routes.length);
    
    this.emit();

    return route;
  }

  // Очистить все маршруты
  clearRoutes() {
    console.log('RouteService: Очищаю все маршруты');
    this.routes = [];
    this.emit();
  }

  // Получить все маршруты
  getRoutes(): Route[] {
    console.log('RouteService: Запрос на получение маршрутов, всего:', this.routes.length);
    return [...this.routes];
  }
}

// Синглтон
export const routeService = new RouteService();
export default routeService;
