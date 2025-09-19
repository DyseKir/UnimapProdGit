export interface BeaconPoint {
  id: string;
  x: number;
  y: number;
  name?: string;
  type: 'corridor' | 'intersection' | 'landmark' | 'room_entrance';
  connections: string[]; // ID других маяков, с которыми этот соединен
  floor?: number; // Этаж для многоэтажных зданий
  description?: string;
}

// Маяки для построения маршрутов
export const beaconPoints: BeaconPoint[] = [
  // Основные коридоры - коридор 1 (нижний уровень)
  {
    id: 'beacon_corridor1_start',
    x: 1166,
    y: 3014,
    name: 'Начало коридора 1',
    type: 'corridor',
    connections: ['beacon_corridor1_mid', 'beacon_room5_entrance', 'beacon_room20_entrance'],
    floor: 1,
    description: 'Начальная точка коридора 1'
  },
  {
    id: 'beacon_corridor1_mid',
    x: 1486,
    y: 3014,
    name: 'Середина коридора 1',
    type: 'corridor',
    connections: ['beacon_corridor1_start', 'beacon_corridor1_end', 'beacon_room3_entrance', 'beacon_room4_entrance'],
    floor: 1,
    description: 'Центральная точка коридора 1'
  },
  {
    id: 'beacon_corridor1_end',
    x: 2046,
    y: 3014,
    name: 'Конец коридора 1',
    type: 'corridor',
    connections: ['beacon_corridor1_mid', 'beacon_room1_entrance', 'beacon_room2_entrance'],
    floor: 1,
    description: 'Конечная точка коридора 1'
  },

  // Входы в комнаты коридора 1
  {
    id: 'beacon_room1_entrance',
    x: 2046,
    y: 3014,
    name: 'Вход в комнату 1',
    type: 'room_entrance',
    connections: ['beacon_corridor1_end'],
    floor: 1,
    description: 'Вход в комнату 1'
  },
  {
    id: 'beacon_room2_entrance',
    x: 1696,
    y: 3014,
    name: 'Вход в комнату 2',
    type: 'room_entrance',
    connections: ['beacon_corridor1_mid'],
    floor: 1,
    description: 'Вход в комнату 2'
  },
  {
    id: 'beacon_room3_entrance',
    x: 1486,
    y: 3014,
    name: 'Вход в комнату 3',
    type: 'room_entrance',
    connections: ['beacon_corridor1_mid'],
    floor: 1,
    description: 'Вход в комнату 3'
  },
  {
    id: 'beacon_room4_entrance',
    x: 1258,
    y: 3014,
    name: 'Вход в комнату 4',
    type: 'room_entrance',
    connections: ['beacon_corridor1_mid'],
    floor: 1,
    description: 'Вход в комнату 4'
  },
  {
    id: 'beacon_room5_entrance',
    x: 1166,
    y: 3014,
    name: 'Вход в комнату 5',
    type: 'room_entrance',
    connections: ['beacon_corridor1_start'],
    floor: 1,
    description: 'Вход в комнату 5'
  },

  // Коридор 2 (верхний уровень)
  {
    id: 'beacon_corridor2_start',
    x: 1166,
    y: 2744,
    name: 'Начало коридора 2',
    type: 'corridor',
    connections: ['beacon_corridor2_mid', 'beacon_room8_entrance'],
    floor: 1,
    description: 'Начальная точка коридора 2'
  },
  {
    id: 'beacon_corridor2_mid',
    x: 1482,
    y: 2744,
    name: 'Середина коридора 2',
    type: 'corridor',
    connections: ['beacon_corridor2_start', 'beacon_corridor2_end', 'beacon_room6_entrance', 'beacon_room7_entrance'],
    floor: 1,
    description: 'Центральная точка коридора 2'
  },
  {
    id: 'beacon_corridor2_end',
    x: 2046,
    y: 2744,
    name: 'Конец коридора 2',
    type: 'corridor',
    connections: ['beacon_corridor2_mid'],
    floor: 1,
    description: 'Конечная точка коридора 2'
  },

  // Входы в комнаты коридора 2
  {
    id: 'beacon_room6_entrance',
    x: 1482,
    y: 2744,
    name: 'Вход в комнату 6',
    type: 'room_entrance',
    connections: ['beacon_corridor2_mid'],
    floor: 1,
    description: 'Вход в комнату 6'
  },
  {
    id: 'beacon_room7_entrance',
    x: 1258,
    y: 2744,
    name: 'Вход в комнату 7',
    type: 'room_entrance',
    connections: ['beacon_corridor2_mid'],
    floor: 1,
    description: 'Вход в комнату 7'
  },
  {
    id: 'beacon_room8_entrance',
    x: 1166,
    y: 2744,
    name: 'Вход в комнату 8',
    type: 'room_entrance',
    connections: ['beacon_corridor2_start'],
    floor: 1,
    description: 'Вход в комнату 8'
  },

  // Коридор 3 (правый уровень)
  {
    id: 'beacon_corridor3_start',
    x: 2626,
    y: 1388,
    name: 'Начало коридора 3',
    type: 'corridor',
    connections: ['beacon_corridor3_mid', 'beacon_room14_entrance'],
    floor: 1,
    description: 'Начальная точка коридора 3'
  },
  {
    id: 'beacon_corridor3_mid',
    x: 2778,
    y: 1614,
    name: 'Середина коридора 3',
    type: 'corridor',
    connections: ['beacon_corridor3_start', 'beacon_corridor3_end', 'beacon_room13_entrance', 'beacon_room12_entrance'],
    floor: 1,
    description: 'Центральная точка коридора 3'
  },
  {
    id: 'beacon_corridor3_end',
    x: 2778,
    y: 2316,
    name: 'Конец коридора 3',
    type: 'corridor',
    connections: ['beacon_corridor3_mid', 'beacon_room10_entrance', 'beacon_room11_entrance'],
    floor: 1,
    description: 'Конечная точка коридора 3'
  },

  // Входы в комнаты коридора 3
  {
    id: 'beacon_room10_entrance',
    x: 2778,
    y: 2316,
    name: 'Вход в комнату 10',
    type: 'room_entrance',
    connections: ['beacon_corridor3_end'],
    floor: 1,
    description: 'Вход в комнату 10'
  },
  {
    id: 'beacon_room11_entrance',
    x: 2778,
    y: 2112,
    name: 'Вход в комнату 11',
    type: 'room_entrance',
    connections: ['beacon_corridor3_end'],
    floor: 1,
    description: 'Вход в комнату 11'
  },
  {
    id: 'beacon_room12_entrance',
    x: 2778,
    y: 1826,
    name: 'Вход в комнату 12',
    type: 'room_entrance',
    connections: ['beacon_corridor3_mid'],
    floor: 1,
    description: 'Вход в комнату 12'
  },
  {
    id: 'beacon_room13_entrance',
    x: 2778,
    y: 1614,
    name: 'Вход в комнату 13',
    type: 'room_entrance',
    connections: ['beacon_corridor3_mid'],
    floor: 1,
    description: 'Вход в комнату 13'
  },
  {
    id: 'beacon_room14_entrance',
    x: 2626,
    y: 1388,
    name: 'Вход в комнату 14',
    type: 'room_entrance',
    connections: ['beacon_corridor3_start'],
    floor: 1,
    description: 'Вход в комнату 14'
  },

  // Маяк для комнаты 20 (левая часть карты)
  {
    id: 'beacon_room20_entrance',
    x: 480,
    y: 2430,
    name: 'Вход в комнату 20',
    type: 'room_entrance',
    connections: ['beacon_corridor1_start'], // Соединяем с коридором 1
    floor: 1,
    description: 'Вход в комнату 20'
  },

  // Соединительные маяки между коридорами
  {
    id: 'beacon_intersection_1_2',
    x: 1166,
    y: 2880,
    name: 'Пересечение коридоров 1 и 2',
    type: 'intersection',
    connections: ['beacon_corridor1_start', 'beacon_corridor2_start'],
    floor: 1,
    description: 'Соединение между коридорами 1 и 2'
  },
  {
    id: 'beacon_intersection_2_3',
    x: 2046,
    y: 2880,
    name: 'Пересечение коридоров 2 и 3',
    type: 'intersection',
    connections: ['beacon_corridor2_end', 'beacon_corridor3_end'],
    floor: 1,
    description: 'Соединение между коридорами 2 и 3'
  }
];

export default beaconPoints;
