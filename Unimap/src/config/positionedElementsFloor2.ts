import { createRoom, FloorCorridorGroups } from './positionedElementsCommon';

export const corridorGroupsFloor2: FloorCorridorGroups = {
  corridor1:{
    name: "Коридор 1",

    rooms: [
      createRoom({

        id: {

          Ukrainian: 'Кабінет 1001',

          English: 'Office 1001',

        },

        number: 1001,

        text: {

          OnDefault: {

            Ukrainian: 'Ректорат',

            English: 'Rectory',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 1168,

        y: 2746,

        width: 448,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 1002',

          English: 'Office 1002',

        },

        number: 1002,

        text: {

          OnDefault: {

            Ukrainian: 'Ректорат',

            English: 'Rectory',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 1168,

        y: 3012,

        width: 520,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 1003',

          English: 'Office 1003',

        },

        number: 1003,

        text: {

          OnDefault: {

            Ukrainian: 'Ректорат',

            English: 'Rectory',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 1702,

        y: 3012,

        width: 538,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),
    ]
  },

  corridor2:{
    name: "Коридор 2",

    rooms: [
      createRoom({

        id: {

          Ukrainian: 'Кабінет 20',

          English: 'Office 20',

        },

        number: 20,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 2740,

        y: 2512,

        width: 130,

        height: 125,

        corridor: 2,

        rotation: 44,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 19',

          English: 'Office 19',

        },

        number: 19,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 2780,

        y: 2262,

        width: 156,

        height: 198,

        corridor: 2,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 18',

          English: 'Office 18',

        },

        number: 18,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 2780,

        y: 2126,

        width: 152,

        height: 132,

        corridor: 2,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 17',

          English: 'Office 17',

        },

        number: 17,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 2780,

        y: 1914,

        width: 152,

        height: 198,

        corridor: 2,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 16',

          English: 'Office 16',

        },

        number: 16,

        text: {

          OnDefault: {

            Ukrainian: 'Деканат агробіотехнологічного факультету',

            English: 'Dean’s Office of the Agrobiotechnology Faculty',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 2780,

        y: 1616,

        width: 152,

        height: 288,

        corridor: 2,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 14',

          English: 'Office 14',

        },

        number: 14,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 2630,

        y: 1390,

        width: 304,

        height: 210,

        corridor: 2,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: 'stairs1',

        x: 2518,

        y: 1582,

        width: 98,

        height: 196,

        category: 'stairs',

        corridor: 1,

        corridorEntrySide: 'top'

      }),
    ]
  },

  corridor3:{
  name: "Коридор 3",

  rooms: [
    createRoom({

        id: {

          Ukrainian: 'Кабінет 1004',

          English: 'Office 1004',

        },

        number: 1004,

        text: {

          OnDefault: {

            Ukrainian: 'Актова зала',

            English: 'Assembly Hall',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 586,

        y: 2490,

        width: 290,

        height: 500,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

    }),

    createRoom({

      id: 'stairs3',

      x: 536,

      y: 3114,

      width: 174,

      height: 136,

      rotation: -17,

      category: 'stairs',

      corridor: 3,

      corridorEntrySide: 'top'

    }),
    ]
  },

  corridor4:{
    name: "Коридор 4",
  
    rooms: [
      createRoom({
  
          id: {
  
            Ukrainian: 'Кабінет 80',
  
            English: 'Office 80',
  
          },
  
          number: 80,
  
          text: {
  
            OnDefault: {
  
              Ukrainian: '',
  
              English: '',
  
            },
  
            OnHover: {
  
              Ukrainian: '',
  
              English: '',
  
              Time: {
  
                Ukrainian: "",
  
                English: ""
  
              }
  
            }
  
          },
  
          x: 598,
  
          y: 1616,
  
          width: 158,
  
          height: 444,
  
          rotation: 1,
  
          corridor: 4,
  
          corridorEntrySide: 'top',
  
          styleOverrides: {}
  
      }),
  
      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 81',

          English: 'Office 81',

        },

        number: 81,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 526,

        y: 1996,

        width: 54,

        height: 66,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 82',

          English: 'Office 82',

        },

        number: 82,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 354,

        y: 1840,

        width: 158,

        height: 154,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 83',

          English: 'Office 83',

        },

        number: 83,

        text: {

          OnDefault: {

            Ukrainian: 'Кафедра вищої математики',

            English: 'Department of Higher Mathematics',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 358,

        y: 1670,

        width: 158,

        height: 154,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 84',

          English: 'Office 84',

        },

        number: 84,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 361,

        y: 1462,

        width: 158,

        height: 194,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 85',

          English: 'Office 85',

        },

        number: 85,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 364,

        y: 1306,

        width: 158,

        height: 144,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 86',

          English: 'Office 86',

        },

        number: 86,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 366,

        y: 1236,

        width: 158,

        height: 54,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 87',

          English: 'Office 87',

        },

        number: 87,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 366,

        y: 1144,

        width: 158,

        height: 90,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 88',

          English: 'Office 88',

        },

        number: 88,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 608,

        y: 1074,

        width: 158,

        height: 142,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 89',

          English: 'Office 89',

        },

        number: 89,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 606,

        y: 1226,

        width: 158,

        height: 124,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: 'stairs1',
  
        x: 368,
  
        y: 1072,
  
        width: 158,
  
        height: 56,
  
        rotation: 1,
  
        category: 'stairs',
  
        corridor: 4,
  
        corridorEntrySide: 'top'
  
      }),

      createRoom({

        id: 'stairs2',
  
        x: 604,
  
        y: 1362,
  
        width: 158,
  
        height: 238,
  
        rotation: 1,
  
        category: 'stairs',
  
        corridor: 4,
  
        corridorEntrySide: 'top'
  
      }),
      ]
  },

  corridor5:{
    name: "Коридор 5",
  
    rooms: [
      createRoom({
  
          id: {
  
            Ukrainian: 'Кабінет 122',
  
            English: 'Office 122',
  
          },
  
          number: 122,
  
          text: {
  
            OnDefault: {
  
              Ukrainian: '',
  
              English: '',
  
            },
  
            OnHover: {
  
              Ukrainian: '',
  
              English: '',
  
              Time: {
  
                Ukrainian: "",
  
                English: ""
  
              }
  
            }
  
          },
  
          x: 668,
  
          y: 516,
  
          width: 98,
  
          height: 158,
  
          corridor: 5,
  
          corridorEntrySide: 'top',
  
          styleOverrides: {}
  
      }),
  
      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 121',

          English: 'Office 121',

        },

        number: 121,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 668,
  
        y: 372,
  
        width: 98,
  
        height: 140,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 120',

          English: 'Office 120',

        },

        number: 120,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 672,
  
        y: 210,
  
        width: 98,
  
        height: 156,

        rotation: 0.5,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 119',

          English: 'Office 119',

        },

        number: 119,

        text: {

          OnDefault: {

            Ukrainian: 'Кафедра садово-паркового господарства ВИКЛАДАЦЬКА',

            English: 'Department of Landscape Gardening Staff Room / Teachers’ Room',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 672,
  
        y: 50,
  
        width: 98,
  
        height: 152,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 118',

          English: 'Office 118',

        },

        number: 118,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 370,
  
        y: 46,
  
        width: 242,
  
        height: 122,

        rotation: 1.2,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: 'stairs5',
  
        x: 670,
  
        y: 680,

        width: 98,

        height: 158,

        corridor: 5,
  
        category: 'stairs',
  
        corridorEntrySide: 'top'
  
      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 113',

          English: 'Office 113',

        },

        number: 113,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 510,

        y: 762,

        width: 98,

        height: 72,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 114',

          English: 'Office 114',

        },

        number: 114,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 510,

        y: 608,

        width: 98,

        height: 146,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 115',

          English: 'Office 115',

        },

        number: 115,

        text: {

          OnDefault: {

            Ukrainian: 'Кафедра Підприємництва/ВИКЛАДАЦЬКА',

            English: 'Department of Entrepreneurship / Staff Room',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 510,

        y: 542,

        width: 98,

        height: 60,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 116',

          English: 'Office 116',

        },

        number: 116,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 510,

        y: 488,

        width: 98,

        height: 48,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 117',

          English: 'Office 117',

        },

        number: 117,

        text: {

          OnDefault: {

            Ukrainian: '',

            English: '',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }

        },

        x: 514,

        y: 300,

        width: 96,

        height: 178,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),
      ]
  },
}
