import { createRoom, FloorCorridorGroups } from './positionedElementsCommon';

export const corridorGroupsFloor3: FloorCorridorGroups = {
  corridor1:{
    name: "Коридор 1",

    rooms: [
      createRoom({

        id: {

          Ukrainian: 'Кабінет 46',

          English: 'Office 46',

        },

        number: 46,

        text: {

          OnDefault: {

            Ukrainian: 'Темпус Тасіс\n“САСФАРМ”\nРесурсний центр',

            English: 'Temptus Tasis\n“SASCARM”\nResource Center',

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

        x: 1262,

        y: 2746,

        width: 196,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 48',

          English: 'Office 48',

        },

        number: 48,

        text: {

          OnDefault: {

            Ukrainian: 'Викладацька',

            English: 'Teaching Department',

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

        x: 1458,

        y: 2746,

        width: 158,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 45',

          English: 'Office 45',

        },

        number: 45,

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

        x: 1262,

        y: 3012,

        width: 142,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 44',

          English: 'Office 44',

        },

        number: 44,

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

        x: 1410,

        y: 3012,

        width: 214,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 42',

          English: 'Office 42',

        },

        number: 42,

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

        x: 1702,

        y: 3012,

        width: 340,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 41',

          English: 'Office 41',

        },

        number: 41,

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

        x: 2044,

        y: 3012,

        width: 202,

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

          Ukrainian: 'Кабінет 40',

          English: 'Office 40',

        },

        number: 40,

        text: {

          OnDefault: {

            Ukrainian: 'Викладацька',

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

        x: 2280,

        y: 2976,

        width: 160,

        height: 120,

        corridor: 2,
        
        rotation: 47,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 39',

          English: 'Office 39',

        },

        number: 39,

        text: {

          OnDefault: {

            Ukrainian: 'Лабораторія захисту рослин',

            English: 'Plant Protection Laboratory',

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

        x: 2370,

        y: 2906,

        width: 238,

        height: 116,

        corridor: 2,
        
        rotation: 46,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 38',

          English: 'Office 38',

        },

        number: 38,

        text: {

          OnDefault: {

            Ukrainian: 'ВИКЛАДАЦЬКА',
            English: 'Teaching Department',

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

        x: 2620,

        y: 2642,

        width: 210,

        height: 120,

        corridor: 2,
        
        rotation: 45,

        corridorEntrySide: 'top',

        styleOverrides: {}

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
  
            Ukrainian: 'Кабінет 90',
  
            English: 'Office 90',
  
          },

          number: 90,
          text: {
  
            OnDefault: {
  
              Ukrainian: '',
  
              English: '',
  
            },
  
            OnHover: {
  
              Ukrainian: 'Деканат економічного факультету',
  
              English: 'Dean’s Office of the Economic Faculty',
  
              Time: {
  
                Ukrainian: "",
  
                English: ""
  
              }
  
            }
  
          },
  
          x: 598,
  
          y: 1616,
  
          width: 158,
  
          height: 320,
  
          rotation: 1,
  
          corridor: 4,
  
          corridorEntrySide: 'top',
  
          styleOverrides: {}
  
      }),
  
      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 92',

          English: 'Office 92',

        },

        number: 92,
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

        y: 1942,

        width: 158,

        height: 118,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),


      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 93',

          English: 'Office 93',

        },

        number: 93,
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

        x: 358,

        y: 1670,

        width: 158,

        height: 320,

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

        x: 362,

        y: 1490,

        width: 158,

        height: 164,

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

        height: 178,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),


      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 99',

          English: 'Office 99',

        },

        number: 99,
        text: {

          OnDefault: {

            Ukrainian: 'Кафедра інформатики',

            English: 'Department of Computer Science',

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

        height: 144,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 99',

          English: 'Office 99',

        },

        number: 99,

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

        height: 186,

        rotation: 1,

        corridor: 4,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 100',

          English: 'Office 100',

        },

        number: 100,
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

        y: 1266,

        width: 158,

        height: 80,

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
  
            Ukrainian: 'Кабінет 133',
  
            English: 'Office 133',
  
          },
  
          number: 133,
          text: {
  
            OnDefault: {
  
              Ukrainian: 'Кафедра публічного управління, адміністрування та міжнародної економіки',
  
              English: 'Department of Public Administration and International Economics',
  
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

          Ukrainian: 'Кабінет 132',

          English: 'Office 132',

        },

        number: 132,
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

          Ukrainian: 'Кабінет 131',

          English: 'Office 131',

        },

        number: 131,
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

        number: 130,

        text: {

          OnDefault: {

            Ukrainian: 'Кафедра фінансів, банківської справи та страхуання',

            English: 'Department of Finance, Banking and Insurance',

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

          Ukrainian: 'Кабінет 129',

          English: 'Office 129',

        },

        number: 129,
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

        x: 616,
  
        y: 48,
  
        width: 44,
  
        height: 94,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 128',

          English: 'Office 128',

        },

        number: 128,
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

          Ukrainian: 'Кабінет 133a',

          English: 'Office 133a',

        },

        number: 133,
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

        y: 754,

        width: 98,

        height: 82,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 123',

          English: 'Office 123',

        },

        number: 123,
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

        y: 532,

        width: 98,

        height: 216,

        rotation: 0,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 125',

          English: 'Office 125',

        },

        number: 125,

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

        y: 448,

        width: 94,

        height: 80,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 126',

          English: 'Office 126',

        },

        number: 126,
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

        height: 142,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({
  
        id: {

          Ukrainian: 'Кабінет 124',

          English: 'Office 124',

        },

        number: 124,
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

        y: 222,

        width: 96,

        height: 70,

        rotation: 1,

        corridor: 5,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),
      ]
  },

  corridor6:{
    name: "Коридор 6",
    rooms: [
      createRoom({

        id: {

          Ukrainian: 'Кабінет 35',

          English: 'Office 35',

        },

        number: 35,

        text: {

          OnDefault: {

            Ukrainian: 'Викладацька/лабораторія',
            English: 'Teaching/Laboratory',

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

        x: 2778,

        y: 2266,

        width: 152,

        height: 194,

        corridor: 6,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 34',

          English: 'Office 34',

        },

        number: 34,

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

        x: 2778,

        y: 2128,

        width: 152,

        height: 134,

        corridor: 6,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 33',

          English: 'Office 33',

        },

        number: 33,

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

        x: 2778,

        y: 1912,

        width: 152,

        height: 202,

        corridor: 6,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 32',

          English: 'Office 32',

        },

        number: 32,

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

        x: 2778,

        y: 1620,

        width: 152,

        height: 284,

        corridor: 6,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),
      
      createRoom({

        id: {

          Ukrainian: 'Кабінет 31',

          English: 'Office 31',

        },

        number: 31,

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

        x: 2628,

        y: 1394,

        width: 300,

        height: 210,

        corridor: 6,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),
    ]
  },
}
