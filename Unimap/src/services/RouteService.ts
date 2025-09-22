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
  beaconRoute?: BeaconRoute; // Маршрут через маяки
}

class RouteService {
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
      const minY = Math.min(...centers.map(center => center.y));
      const maxY = Math.max(...centers.map(center => center.y));
      return (minY + maxY) / 2;
    }

    const minX = Math.min(...centers.map(center => center.x));
    const maxX = Math.max(...centers.map(center => center.x));
    return (minX + maxX) / 2;
  }

  private getCorridorEntryPoint(
    room: PositionedElementConfig,
    orientation: 'horizontal' | 'vertical',
    corridorLine: number,
  ): RoutePoint {
    if (orientation === 'horizontal') {
      const roomCenter = this.getRoomCenter(room);
      const isRoomAboveCorridor = roomCenter.y < corridorLine;
      return {
        x: room.x + (room.width || 0) / 2,
        y: isRoomAboveCorridor ? room.y + (room.height || 0) : room.y,
      };
    }

    const roomCenter = this.getRoomCenter(room);
    const isRoomLeftOfCorridor = roomCenter.x < corridorLine;
    return {
      x: isRoomLeftOfCorridor ? room.x + (room.width || 0) : room.x,
      y: room.y + (room.height || 0) / 2,
    };
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

    const via: RoutePoint[] = [];
    const pushViaPoint = (point: RoutePoint) => {
      const previous = via.length > 0 ? via[via.length - 1] : fromEntry;
      if (previous.x !== point.x || previous.y !== point.y) {
        via.push(point);
      }
    };

    if (orientation === 'horizontal') {
      pushViaPoint({ x: fromEntry.x, y: corridorLine });
      pushViaPoint({ x: toEntry.x, y: corridorLine });
    } else {
      pushViaPoint({ x: corridorLine, y: fromEntry.y });
      pushViaPoint({ x: corridorLine, y: toEntry.y });
    }

    if (via.length > 0) {
      const lastPoint = via[via.length - 1];
      if (lastPoint.x === toEntry.x && lastPoint.y === toEntry.y) {
        via.pop();
      }
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

  // Строим маршрут по коридору (если возможно)
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
  }

    // Создаем маршрут
    const route: Route = {
      id: `route_${fromRoomId}_${toRoomId}`,
      fromRoom: fromRoomId,
      toRoom: toRoomId,
      line: {
        from: fromPoint,
        to: toPoint,
        type: 'dashed',
        via: viaPoints, // По умолчанию пунктирная линия
      },
      visible: true,
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
