import { createRoom, FloorCorridorGroups } from './positionedElementsCommon';

export const corridorGroupsFloor1: FloorCorridorGroups = {

  corridor1: {

    name: "Коридор 1",

    rooms: [

      createRoom({

        id: {

          Ukrainian: 'Кабінет 1',

          English: 'Office 1',

        },

        number: 1,

        text: {

          OnDefault: {

            Ukrainian: 'Приймальна комісія',

            English: 'Admission Committee',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "8:30 – 12:00\nПерерва: 13:00\n14:00 – 16:00",

              English: "8:30 – 12:00\nBreak: 13:00\n14:00 – 16:00"

            }

          }

        },

        x: 2055,

        y: 3014,

        width: 198,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 2',

          English: 'Office 2',

        },

        number: 2,

        text: {

          OnDefault: {

            Ukrainian: 'Приймальна комісія',

            English: 'Admission Committee',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "8:30 – 12:00\nПерерва: 13:00\n14:00 – 16:00",

              English: "8:30 – 12:00\nBreak: 13:00\n14:00 – 16:00"

            }

          }

        },

        x: 1696,

        y: 3014,

        width: 346,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 3',

          English: 'Office 3',

        },

        number: 3,

        text: {

          OnDefault: {

            Ukrainian: 'Архів',

            English: 'Archive',

          },

          OnHover: {

            Ukrainian: '',

            English: ''

          }

        },

        x: 1486,

        y: 3014,

        width: 200,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 4',

          English: 'Office 4',

        },

        number: 4,

        text: {

          OnDefault: {

            Ukrainian: 'Відділ навчально-методичної та виховної роботи',

            English: 'Department of Educational-Methodological and Educational Work',

          },

          OnHover: {

            Ukrainian: '',

            English: ''

          }

        },

        x: 1258,

        y: 3014,

        width: 224,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 5',

          English: 'Office 5',

        },

        number: 5,

        text: {

          OnDefault: {

            Ukrainian: 'Відділ документообігу і кадрового забезпечення',

            English: 'Department of Document Management and Personnel Support',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "8:00 – 17:00\nОбідня перерва: 13:00 – 14:00",

              English: "8:00 – 17:00\nLunch break: 13:00 – 14:00"

            }

          }

        },

        x: 1482,

        y: 2744,

        width: 138,

        height: 160,

        corridor: 1,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 6',

          English: 'Office 6',

        },

        number: 6,

        text: {

          OnDefault: {

            Ukrainian: 'Відділ документообігу і кадрового забезпечення\nВійськовий облік',

            English: 'Department of Document Management and Personnel Support\nMilitary Registration',

          },

          OnHover: {

            Ukrainian: '',

            English: ''

          }

        },

        x: 1258,

        y: 2744,

        width: 210,

        height: 158,

        corridor: 1,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: 'toilet1',

        x: 1166,

        y: 2744,

        width: 78,

        height: 158,

        category: 'toilet',

        corridor: 1,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: 'stairs1',

        x: 1165,

        y: 3014,

        width: 78,

        height: 164,

        category: 'stairs',

        corridor: 1,

        corridorEntrySide: 'top'

      }),

      createRoom({

        id: 'stairs2',

        x: 2168,

        y: 2658,

        width: 140,

        height: 100,

        rotation: -45,

        category: 'stairs',

        corridor: 1,

        corridorEntrySide: 'top'

      }),

      createRoom({

        id: 'stairs3',

        x: 2396,

        y: 2426,

        width: 140,

        height: 100,

        rotation: -46,

        category: 'stairs',

        corridor: 1,

        corridorEntrySide: 'top'

      }),
      ]

  },

  corridor2: {

    name: "Коридор 2",

    rooms: [

      createRoom({

        id: {

          Ukrainian: 'Кабінет 7',

          English: 'Office 7',

        },

        number: 7,

        x: 2778,

        y: 2316,

        width: 156,

        height: 132,

        corridor: 2,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 8',

          English: 'Office 8',

        },

        number: 8,

        x: 2778,

        y: 2112,

        width: 156,

        height: 200,

        corridor: 2,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 9',

          English: 'Office 9',

        },

        number: 9,

        x: 2778,

        y: 1826,

        width: 156,

        height: 274,

        corridor: 2,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 10',

          English: 'Office 10',

        },

        number: 10,

        x: 2778,

        y: 1614,

        width: 156,

        height: 206,

        corridor: 2,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 11',

          English: 'Office 11',

        },

        number: 11,

        text: {

          OnDefault: {

            Ukrainian: 'Бібліотека',

            English: 'Library',

          },

          OnHover: {

            Ukrainian: '',

            English: ''

          }

        },

        x: 2626,

        y: 1388,

        width: 306,

        height: 212,

        corridor: 2,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 12',

          English: 'Office 12',

        },

        number: 12,

        x: 2516,

        y: 1388,

        width: 98,

        height: 188,

        corridor: 2,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Сходи 2',

          English: 'Stairs 2',

        },

        x: 2516,

        y: 1582,

        width: 98,

        height: 196,

        category: 'stairs',

        corridor: 2,

        styleOverrides: {}

      }),

      ]

  },

  corridor3: {

    name: "Коридор 3",

    rooms: [

      createRoom({

        id: {

          Ukrainian: 'Кабінет 62',

          English: 'Office 62',

        },
        text: {

          OnDefault: {

            Ukrainian: 'Архів',

            English: 'Archive',

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
        number: 62,

        x: 642,

        y: 2922,

        width: 116,

        height: 80,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 61',

          English: 'Office 61',

        },

        number: 61,

        x: 597,

        y: 2685,

        width: 114,

        height: 238,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 60',

          English: 'Office 60',

        },

        number: 60,

        x: 535,

        y: 2518,

        width: 116,

        height: 172,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 59',

          English: 'Office 59',

        },

        number: 59,

        x: 482,

        y: 2341,

        width: 116,

        height: 178,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 58',

          English: 'Office 58',

        },
        text: {

          OnDefault: {

            Ukrainian: 'Паспортний стіл БНАУ',

            English: 'Passport Desk BNAU',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "8:00 – 17:00\nПерерва: 13:00\n14:00",

              English: "8:00 – 17:00\nBreak: 13:00\n14:00"

            }

          }
        },
        number: 58,

        x: 446,

        y: 2282,

        width: 116,

        height: 50,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'bottom',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 50',

          English: 'Office 50',

        },
        text: {

          OnDefault: {

            Ukrainian: 'Юридичний відділ',

            English: 'Legal Department',

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
        number: 50,

        x: 822,

        y: 2872,

        width: 109,

        height: 76,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 51',

          English: 'Office 51',

        },
        text: {

          OnDefault: {

            Ukrainian: 'Викладацька',

            English: 'Teaching Department',

          },

          OnHover: {

            Ukrainian: 'КАРПУК',

            English: 'KARPUK',

            Time: {

              Ukrainian: "",

              English: ""

            }

          }
        },
        number: 51,

        x: 800,

        y: 2808,

        width: 109,

        height: 64,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 52',

          English: 'Office 52',

        },

        number: 52,

        x: 762,

        y: 2618,

        width: 109,

        height: 194,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 53',

          English: 'Office 53',

        },
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
        number: 53,

        x: 720,

        y: 2526,

        width: 110,

        height: 94,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 54',

          English: 'Office 54',

        },

        number: 54,

        x: 696,

        y: 2466,

        width: 110,

        height: 60,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 55',

          English: 'Office 55',

        },

        number: 55,

        x: 660,

        y: 2286,

        width: 110,

        height: 180,

        rotation: -17,

        corridor: 3,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Сходи 3',

          English: 'Stairs 3',

        },

        x: 566,

        y: 3158,

        width: 84,

        height: 48,

        rotation: -16,

        category: 'stairs',

        corridor: 1,

        corridorEntrySide: 'top',

        styleOverrides: {}

      }),

      ]

  },

  corridor4: {

    name: "Коридор 4",

    rooms: [

      createRoom({

        id: {

          Ukrainian: 'Кабінет 68',

          English: 'Office 68',

        },

        number: 68,

        x: 352,

        y: 2008,

        width: 160,

        height: 56,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 69',

          English: 'Office 69',

        },
        text: {

          OnDefault: {

            Ukrainian: 'Викладацька',

            English: 'Teaching Department',

          },

          OnHover: {

            Ukrainian: '',

            English: '',

            Time: {

              Ukrainian: "8:30 – 12:00\nПерерва: 13:00\n14:00 – 16:00",

              English: "8:30 – 12:00\nBreak: 13:00\n14:00 – 16:00"

            }

          }

        },
        number: 69,

        x: 354,

        y: 1840,

        width: 160,

        height: 154,

        rotation: 1,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 70',

          English: 'Office 70',

        },

        number: 70,

        x: 357,

        y: 1674,

        width: 158,

        height: 152,

        rotation: 1,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 71',

          English: 'Office 71',

        },

        number: 71,

        x: 357,

        y: 1596,

        width: 161,

        height: 64,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 72',

          English: 'Office 72',

        },

        number: 72,

        x: 360,

        y: 1465,

        width: 161,

        height: 78,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 73',

          English: 'Office 73',

        },

        number: 73,

        x: 361,

        y: 1308,

        width: 161,

        height: 145,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 74',

          English: 'Office 74',

        },

        number: 74,

        x: 364,

        y: 1146,

        width: 160,

        height: 148,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 79',

          English: 'Office 79',

        },

        number: 79,

        x: 594,

        y: 1940,

        width: 160,

        height: 122,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 78',

          English: 'Office 78',

        },

        number: 78,

        x: 596,

        y: 1772,

        width: 160,

        height: 160,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 77',

          English: 'Office 77',

        },

        number: 77,

        x: 596,

        y: 1615,

        width: 162,

        height: 154,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 76',

          English: 'Office 76',

        },

        number: 76,

        x: 604,

        y: 1191,

        width: 160,

        height: 157,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 75',

          English: 'Office 75',

        },

        number: 75,

        x: 606,

        y: 1078,

        width: 160,

        height: 110,

        rotation: 0.80,

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: 'Stairs4',

        x: 602,

        y: 1363,

        width: 160,

        height: 238,

        rotation: 0.80,

        category: 'stairs',

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: 'buffet',

        x: 280,

        y: 962,

        width: 246,

        height: 94,

        rotation: 0.80,

        category: 'buffet',

        corridor: 4,

        styleOverrides: {}

      }),

      createRoom({

        id: 'toilet',

        x: 280,

        y: 1074,

        width: 244,

        height: 62,

        rotation: 0.80,

        category: 'toilet',

        corridor: 4,

        styleOverrides: {}

      })

      ]

  },

  corridor5: {

    name: "Коридор 5",

    rooms: [

      createRoom({

        id: {

          Ukrainian: 'Кабінет 37',

          English: 'Office 37',

        },
        text: {

          OnDefault: {

            Ukrainian: 'Відділ аспірантури',

            English: 'Postgraduate Department',

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

        number: 37,

        x: 772,

        y: 856,

        width: 124,

        height: 190,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 112',

          English: 'Office 112',

        },

        number: 112,

        x: 676,

        y: 470,

        width: 90,

        height: 200,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 111',

          English: 'Office 111',

        },

        number: 111,

        x: 676,

        y: 369,

        width: 92,

        height: 94,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 110',

          English: 'Office 110',

        },

        number: 110,

        x: 678,

        y: 210,

        width: 92,

        height: 152,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 109',

          English: 'Office 109',

        },

        number: 109,

        x: 680,

        y: 52,

        width: 92,

        height: 154,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 101',

          English: 'Office 101',

        },

        number: 101,

        x: 512,

        y: 766,

        width: 89,

        height: 62,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 102',

          English: 'Office 102',

        },

        number: 102,

        x: 514,

        y: 614,

        width: 88,

        height: 140,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 103',

          English: 'Office 103',

        },

        number: 103,

        x: 514,

        y: 544,

        width: 88,

        height: 62,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 104',

          English: 'Office 104',

        },

        number: 104,

        x: 516,

        y: 380,

        width: 88,

        height: 154,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 105',

          English: 'Office 105',

        },

        number: 105,

        x: 516,

        y: 304,

        width: 88,

        height: 66,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 47',

          English: 'Office 47',

        },
        text: {

          OnDefault: {

            Ukrainian: 'ЗДОРОВПУНКТ',

            English: 'medical station',

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
        number: 47,

        x: 368,

        y: 224,

        width: 238,

        height: 78,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 108',

          English: 'Office 108',

        },

        number: 108,

        x: 482,

        y: 50,

        width: 126,

        height: 124,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: {

          Ukrainian: 'Кабінет 107',

          English: 'Office 107',

        },

        number: 107,

        x: 368,

        y: 50,

        width: 108,

        height: 124,

        rotation: 0.70,

        corridor: 5,

        styleOverrides: {}

      }),

      createRoom({

        id: 'Stairs5',

        x: 674,

        y: 678,

        width: 90,

        height: 152,

        rotation: 0.70,

        category: 'stairs',

        corridor: 5,

        styleOverrides: {}

      })

      ]

  },

};
