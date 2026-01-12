import type { PositionedElementConfig } from '../services/PositionedElementsService';
import type { FloorCorridorGroups } from './positionedElementsCommon';
import { corridorGroupsFloor1 } from './positionedElementsFloor1';
import { corridorGroupsFloor2 } from './positionedElementsFloor2';
import { corridorGroupsFloor3 } from './positionedElementsFloor3';

export const corridorGroupsByFloor: Record<number, FloorCorridorGroups> = {
  1: corridorGroupsFloor1,
  2: corridorGroupsFloor2,
  3: corridorGroupsFloor3,
};

// Keep existing export for backward compatibility with single-floor usage
export const corridorGroups = corridorGroupsByFloor[1];

const buildSquaresForFloor = (corridors: FloorCorridorGroups, floor: number) =>
  Object.values(corridors)
    .flatMap(corridor => corridor.rooms || [])
    .filter(Boolean)
    .map(room => ({
      ...room,
      floor,
      category: room.category ?? 'regular',
      number: typeof room.number === 'number' ? room.number : undefined,
    }));

export const squaresConfigByFloor: Record<number, PositionedElementConfig[]> = Object.entries(corridorGroupsByFloor)
  .reduce<Record<number, PositionedElementConfig[]>>((acc, [floor, corridors]) => {
    acc[Number(floor)] = buildSquaresForFloor(corridors, Number(floor));
    return acc;
  }, {});

export const squaresConfigFloor1 = squaresConfigByFloor[1] ?? [];
export const squaresConfigFloor2 = squaresConfigByFloor[2] ?? [];
export const squaresConfigFloor3 = squaresConfigByFloor[3] ?? [];

export const getSquaresConfigForFloor = (floor: number = 1): PositionedElementConfig[] =>
  squaresConfigByFloor[floor] ?? [];

export const squaresConfig: PositionedElementConfig[] = getSquaresConfigForFloor(1);

export interface RegularRoomInfo {
  id: string;
  number: number;
  corridor?: number;
  floor: number;
}

export const regularRoomsByFloor: Record<number, RegularRoomInfo[]> = Object.entries(squaresConfigByFloor)
  .reduce<Record<number, RegularRoomInfo[]>>((acc, [floor, rooms]) => {
    const floorNumber = Number(floor);
    acc[floorNumber] = rooms
      .filter(room => room.category === 'regular' && typeof room.number === 'number')
      .map(room => ({
        id: room.id,
        number: room.number as number,
        corridor: room.corridor,
        floor: floorNumber,
      }))
      .sort((a, b) => a.number - b.number);
    return acc;
  }, {});

export const regularRooms: RegularRoomInfo[] = Object.values(regularRoomsByFloor)
  .flat()
  .sort((a, b) => a.number - b.number);

export default squaresConfig;
