import type { BeaconPoint } from '../config/beaconPoints';
import beaconPoints from '../config/beaconPoints';

export interface BeaconRoute {
  id: string;
  path: BeaconPoint[];
  totalDistance: number;
  steps: string[];
}

export interface BeaconRouteSegment {
  from: BeaconPoint;
  to: BeaconPoint;
  distance: number;
}

class BeaconRouteService {
  private beacons: BeaconPoint[] = beaconPoints;

  // Найти ближайший маяк к комнате
  findNearestBeaconToRoom(roomX: number, roomY: number, roomWidth: number, roomHeight: number): BeaconPoint | null {
    if (this.beacons.length === 0) return null;

    // Находим центр комнаты
    const roomCenterX = roomX + roomWidth / 2;
    const roomCenterY = roomY + roomHeight / 2;

    let nearestBeacon: BeaconPoint | null = null;
    let minDistance = Infinity;

    for (const beacon of this.beacons) {
      const distance = Math.sqrt(
        Math.pow(beacon.x - roomCenterX, 2) + Math.pow(beacon.y - roomCenterY, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestBeacon = beacon;
      }
    }

    console.log('BeaconRouteService: Найден ближайший маяк к комнате:', {
      roomCenter: { x: roomCenterX, y: roomCenterY },
      nearestBeacon,
      distance: minDistance
    });

    return nearestBeacon;
  }

  // Найти маяк по ID
  findBeaconById(beaconId: string): BeaconPoint | null {
    return this.beacons.find(beacon => beacon.id === beaconId) || null;
  }

  // Вычислить расстояние между двумя точками
  calculateDistance(point1: BeaconPoint, point2: BeaconPoint): number {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
  }

  // Алгоритм поиска кратчайшего пути (Dijkstra)
  findShortestPath(startBeaconId: string, endBeaconId: string): BeaconRoute | null {
    const startBeacon = this.findBeaconById(startBeaconId);
    const endBeacon = this.findBeaconById(endBeaconId);

    if (!startBeacon || !endBeacon) {
      console.warn('BeaconRouteService: Маяк не найден:', { startBeaconId, endBeaconId });
      return null;
    }

    console.log('BeaconRouteService: Поиск маршрута между маяками:', {
      start: startBeacon.name,
      end: endBeacon.name
    });

    // Инициализация
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const unvisited = new Set<string>();

    // Устанавливаем начальные значения
    for (const beacon of this.beacons) {
      distances[beacon.id] = beacon.id === startBeaconId ? 0 : Infinity;
      previous[beacon.id] = null;
      unvisited.add(beacon.id);
    }

    // Основной цикл алгоритма
    while (unvisited.size > 0) {
      // Находим маяк с минимальным расстоянием
      let currentBeaconId = '';
      let minDistance = Infinity;

      for (const beaconId of unvisited) {
        if (distances[beaconId] < minDistance) {
          minDistance = distances[beaconId];
          currentBeaconId = beaconId;
        }
      }

      if (currentBeaconId === '') break;

      // Убираем текущий маяк из непосещенных
      unvisited.delete(currentBeaconId);

      // Если достигли конечного маяка, выходим
      if (currentBeaconId === endBeaconId) break;

      const currentBeacon = this.findBeaconById(currentBeaconId);
      if (!currentBeacon) continue;

      // Обновляем расстояния до соседних маяков
      for (const neighborId of currentBeacon.connections) {
        if (!unvisited.has(neighborId)) continue;

        const neighborBeacon = this.findBeaconById(neighborId);
        if (!neighborBeacon) continue;

        const distance = this.calculateDistance(currentBeacon, neighborBeacon);
        const newDistance = distances[currentBeaconId] + distance;

        if (newDistance < distances[neighborId]) {
          distances[neighborId] = newDistance;
          previous[neighborId] = currentBeaconId;
        }
      }
    }

    // Восстанавливаем путь
    const path: BeaconPoint[] = [];
    const steps: string[] = [];
    let currentId = endBeaconId;

    while (currentId) {
      const beacon = this.findBeaconById(currentId);
      if (beacon) {
        path.unshift(beacon);
        steps.unshift(beacon.name || beacon.id);
      }
      currentId = previous[currentId] || '';
    }

    if (path.length === 0) {
      console.warn('BeaconRouteService: Путь не найден');
      return null;
    }

    const route: BeaconRoute = {
      id: `beacon_route_${startBeaconId}_${endBeaconId}`,
      path,
      totalDistance: distances[endBeaconId],
      steps
    };

    console.log('BeaconRouteService: Маршрут найден:', route);
    return route;
  }

  // Построить маршрут между двумя комнатами через маяки
  buildRouteBetweenRooms(
    fromRoom: { x: number; y: number; width: number; height: number },
    toRoom: { x: number; y: number; width: number; height: number }
  ): BeaconRoute | null {
    console.log('BeaconRouteService: Построение маршрута между комнатами');

    // Находим ближайшие маяки к комнатам
    const fromBeacon = this.findNearestBeaconToRoom(fromRoom.x, fromRoom.y, fromRoom.width, fromRoom.height);
    const toBeacon = this.findNearestBeaconToRoom(toRoom.x, toRoom.y, toRoom.width, toRoom.height);

    if (!fromBeacon || !toBeacon) {
      console.warn('BeaconRouteService: Не удалось найти маяки для комнат');
      return null;
    }

    // Ищем кратчайший путь между маяками
    return this.findShortestPath(fromBeacon.id, toBeacon.id);
  }

  // Получить все маяки
  getAllBeacons(): BeaconPoint[] {
    return [...this.beacons];
  }

  // Получить маяки определенного типа
  getBeaconsByType(type: BeaconPoint['type']): BeaconPoint[] {
    return this.beacons.filter(beacon => beacon.type === type);
  }

  // Добавить новый маяк
  addBeacon(beacon: BeaconPoint): void {
    this.beacons.push(beacon);
    console.log('BeaconRouteService: Добавлен новый маяк:', beacon);
  }

  // Удалить маяк
  removeBeacon(beaconId: string): void {
    const index = this.beacons.findIndex(beacon => beacon.id === beaconId);
    if (index > -1) {
      this.beacons.splice(index, 1);
      console.log('BeaconRouteService: Удален маяк:', beaconId);
    }
  }
}

// Синглтон
export const beaconRouteService = new BeaconRouteService();
export default beaconRouteService;
