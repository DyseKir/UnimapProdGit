import type { PositionedElementConfig } from '../services/PositionedElementsService';

// �'�����?�?�<�� �?���+�>�?�? �?�>�? �?�+�<�ؐ?�<�: ��?�?�?���'
const baseRoomStyle = {
  color: '#39A39B',           // ���?��' �"�?�?�� ��?�?�?���'�<
  borderColor: '#2d8a84',      // ���?��' �?�?���?��ő< ��?�?�?���'�<
  borderWidth: 2,              // ���?�>�%��?�� �?�?���?��ő< (�? �����?��>�?�:)
  borderRadius: 8,             // ����?�?�?�>��?��� �?�?�>�?�? (�? �����?��>�?�:)
  fontSize: 24,                // �������?��? �?�?��"�'�� �?�?�?��?�� ��?�?�?���'�<
  fontColor: '#ffffff',        // ���?��' �'���?�'�� �?�?�?��?�� ��?�?�?���'�<
  zIndex: 1,                   // �?�?�?�?�?�?�� �?�'�?�+�?�����?��? (�+�?�>�?�?�� = �?�<�?��)
  visible: true,               // �'��?��?�?�?�'�? ��?�?�?���'�<
  rotation: 0,                 // �?�?�?�?�?�?�' ��?�?�?���'�< (�? �?�?���?�?�?���:)
} as const;

// ����+�>�?�? �?�>�? �'�?���>��'�?�?
const toiletStyle = {
  ...baseRoomStyle,
  // �?�?��?�? ����?��?���?��?��>��'�? �?�'��>�� �?�>�? �'�?���>��'�?�?, �?�����?��?��?:
  // color: '#4CAF50',
  // borderColor: '#45a049',
} as const;

// ����+�>�?�? �?�>�? �>��?�'�?���
const stairsStyle = {
  ...baseRoomStyle,
  // �?�?��?�? ����?��?���?��?��>��'�? �?�'��>�� �?�>�? �>��?�'�?���, �?�����?��?��?:
  // color: '#FF9800',
  // borderColor: '#F57C00',
} as const;

// ����+�>�?�? �?�>�? �+�?�"��'�?�?
const buffetStyle = {
  ...baseRoomStyle,
  color: '#5ABCB3' as const,
  borderColor: '#3D9F97' as const,
};

// ============================================
// �?��>�?��� �"�>�� ���?�-�"�?�?�?�� �?�?�?�?�?��
// ============================================

export type RoomCategory = 'regular' | 'toilet' | 'stairs' | 'buffet';

export interface CreateRoomParams {
  id: string | { Ukrainian: string; English: string };
  x?: number;
  y: number;
  width: number;
  height: number;
  number?: number;
  rotation?: number;
  category?: RoomCategory;
  corridor: number;
  floor?: number;
  corridorEntrySide?: 'top' | 'bottom' | 'left' | 'right';
  text?:
    | {
        OnDefault?: {
          Ukrainian: string;
          English: string;
        };
        OnHover?: {
          Ukrainian: string;
          English: string;
          Time?: {
            Ukrainian: string;
            English: string;
          };
        };
      }
    | {
        Ukrainian?: string;
        English?: string;
        OnDefault?: boolean;
        OnHover?: string;
      };
  // �?��?��?���?��?��>��?��� �?�'��>��� �?�>�? ��?�?��?��'�?�?�� ��?�?�?���'�< (�?���Ő�?�?���>�?�?�?)
  styleOverrides?: Partial<Omit<typeof baseRoomStyle, 'color' | 'borderColor'>> & {
    color?: string;
    borderColor?: string;
  };
}

export function createRoom(params: CreateRoomParams): PositionedElementConfig {
  const { category = 'regular', styleOverrides = {}, rotation, floor } = params;

  // �'�<�+��?����? �+�����?�?�<�� �?�'��>�? �? �����?��?��?�?�?�'�� �?�' ����'��?�?�?���
  let baseStyle: typeof baseRoomStyle = baseRoomStyle;
  if (category === 'toilet') baseStyle = toiletStyle as unknown as typeof baseRoomStyle;
  else if (category === 'stairs') baseStyle = stairsStyle as unknown as typeof baseRoomStyle;
  else if (category === 'buffet') baseStyle = buffetStyle as unknown as typeof baseRoomStyle;

  // �?�?��?��?�?��? ����?��?���?��?��>��?��? �?�'��>���, �?�? ��?��>�?�ؐ���? rotation ��� baseStyle
  const { rotation: baseRotation, ...styleWithoutRotation } = baseStyle;
  const finalStyle = { ...styleWithoutRotation, ...styleOverrides };

  // �?�+�?���+���'�<�?����? id - ��?�>�� �?�'�? �?�+�?���', ��?���?�>�?���?��? Ukrainian ����� �?�'�?�?��?
  const id = typeof params.id === 'string' ? params.id : params.id.Ukrainian;

  // ���?���?����? �+�����?�?�<�� �?�+�?���'
  const room: PositionedElementConfig = {
    id,
    x: params.x ?? 0, // x �?�+�?�����'��>��?, ��?���?�>�?���?��? 0 ���? �?�?�?�>�ؐ��?��?
    y: params.y,
    width: params.width,
    height: params.height,
    rotation: rotation ?? baseRotation,
    number: params.number,
    category,
    corridor: params.corridor,
    floor: floor ?? 1,
    corridorEntrySide: params.corridorEntrySide,
    ...finalStyle,
  };

  // �?�+�?���+���'�<�?����? text - ��?���?�>�?���?��? type assertion, �'���� ����� ��?�'��?�"����? �?�� ���?�>�?�?�?�'�?�? �?�?�?�'�?��'�?�'�?�?��' �?����>�?�?�?�?�? ��?���?�>�?���?�?���?��?
  if (params.text) {
    room.text = params.text as PositionedElementConfig['text'];
  }

  // Normalize id for all regular numbered rooms to "�?���+�-�?��' {number}"
  if (category === 'regular' && typeof params.number === 'number') {
    room.id = `�?���+�-�?��' ${params.number}`;
  }

  return room;
}

export type CorridorGroupConfig = {
  name: string;
  rooms: PositionedElementConfig[];
};

export type FloorCorridorGroups = Record<string, CorridorGroupConfig>;

export const cloneCorridorGroups = (groups: FloorCorridorGroups): FloorCorridorGroups =>
  JSON.parse(JSON.stringify(groups)) as FloorCorridorGroups;
