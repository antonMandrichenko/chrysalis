// const keyConverter = [
//   [8, 42],
//   [9, 43],
//   [13, 40],
//   [16, { left: 225, right: 229 }],
//   [17, { left: 224, right: 228 }],
//   [18, { left: 226, right: 230 }],
//   [19, 72],
//   [20, 57],
//   [27, 41],
//   [33, 75],
//   [34, 78],
//   [35, 77],
//   [36, 74],
//   [37, 80],
//   [38, 82],
//   [39, 79],
//   [40, 81],
//   [45, 73],
//   [46, 76],
//   [48, { current: 39, withShift: 2087 }],
//   [49, { current: 30, withShift: 2078 }],
//   [50, { current: 31, withShift: 2079 }],
//   [51, { current: 32, withShift: 2080 }],
//   [52, { current: 33, withShift: 2081 }],
//   [53, { current: 34, withShift: 2082 }],
//   [54, { current: 35, withShift: 2083 }],
//   [55, { current: 36, withShift: 2084 }],
//   [56, { current: 37, withShift: 2085 }],
//   [57, { current: 38, withShift: 2086 }],
//   [65, 4],
//   [66, 5],
//   [67, 6],
//   [68, 7],
//   [69, 8],
//   [70, 9],
//   [71, 10],
//   [72, 11],
//   [73, 12],
//   [74, 13],
//   [75, 14],
//   [76, 15],
//   [77, 16],
//   [78, 17],
//   [79, 18],
//   [80, 19],
//   [81, 20],
//   [82, 21],
//   [83, 22],
//   [84, 23],
//   [85, 24],
//   [86, 25],
//   [87, 26],
//   [88, 27],
//   [89, 28],
//   [96, 98],
//   [97, 89],
//   [98, 90],
//   [99, 91],
//   [100, 92],
//   [101, 93],
//   [102, 94],
//   [103, 95],
//   [104, 96],
//   [105, 97],
//   [106, 85],
//   [107, 87],
//   [109, 86],
//   [110, 99],
//   [111, 84],
//   [112, 58],
//   [113, 59],
//   [114, 60],
//   [115, 61],
//   [116, 62],
//   [117, 63],
//   [118, 64],
//   [119, 65],
//   [120, 66],
//   [121, 67],
//   [122, 68],
//   [123, 69],
//   [145, 71],
//   [186, { current: 51, withShift: 2099 }],
//   [187, { current: 46, withShift: 2094 }],
//   [188, { current: 54, withShift: 2012 }],
//   [189, { current: 45, withShift: 2093 }],
//   [190, { current: 55, withShift: 2103 }],
//   [191, { current: 56, withShift: 2104 }],
//   [192, { current: 53, withShift: 2101 }],
//   [219, { current: 47, withShift: 2095 }],
//   [220, { current: 49, withShift: 2097 }],
//   [221, { current: 48, withShift: 2096 }],
//   [222, { current: 52, withShift: 2100 }]
// ];

const keyConverter = [
  [8, 42],
  [9, 43],
  [13, 40],
  [16, { left: 225, right: 229 }],
  [17, { left: 224, right: 228 }],
  [18, { left: 226, right: 230 }],
  [19, 72],
  [20, 57],
  [27, 41],
  [32, 44],
  [33, 75],
  [34, 78],
  [35, 77],
  [36, 74],
  [37, 80],
  [38, 82],
  [39, 79],
  [40, 81],
  [45, 73],
  [46, 76],
  [48, 39],
  [49, 30],
  [50, 31],
  [51, 32],
  [52, 33],
  [53, 34],
  [54, 35],
  [55, 36],
  [56, 37],
  [57, 38],
  [65, 4],
  [66, 5],
  [67, 6],
  [68, 7],
  [69, 8],
  [70, 9],
  [71, 10],
  [72, 11],
  [73, 12],
  [74, 13],
  [75, 14],
  [76, 15],
  [77, 16],
  [78, 17],
  [79, 18],
  [80, 19],
  [81, 20],
  [82, 21],
  [83, 22],
  [84, 23],
  [85, 24],
  [86, 25],
  [87, 26],
  [88, 27],
  [89, 28],
  [90, 29],
  [96, 98],
  [97, 89],
  [98, 90],
  [99, 91],
  [100, 92],
  [101, 93],
  [102, 94],
  [103, 95],
  [104, 96],
  [105, 97],
  [106, 85],
  [107, 87],
  [109, 86],
  [110, 99],
  [111, 84],
  [112, 58],
  [113, 59],
  [114, 60],
  [115, 61],
  [116, 62],
  [117, 63],
  [118, 64],
  [119, 65],
  [120, 66],
  [121, 67],
  [122, 68],
  [123, 69],
  [145, 71],
  [186, 51],
  [187, 46],
  [188, 54],
  [189, 45],
  [190, 55],
  [191, 56],
  [192, 53],
  [219, 47],
  [220, 49],
  [221, 48],
  [222, 52]
];

const keyMapping = new Map(keyConverter);

export const getCurrentKeyCode = e => {
  const getMapKey = keyMapping.get(e.keyCode || e.charCode);
  return getMapKey;
};

// export function getKeyCodeList(key) {
//   let obj = {
//     backspace: 8,
//     tab: 9,
//     enter: 13,
//     shiftright: 16,
//     ctrlleft: 17,
//     ctrlrigght: 17,
//     altleft: 18,
//     altright: 18,
//     pause: 19,
//     capslock: 20,
//     escape: 27,
//     pageup: 33,
//     pagedown: 34,
//     end: 35,
//     home: 36,
//     arrowleft: 37,
//     arrowup: 38,
//     arrowright: 39,
//     arrowdown: 40,
//     insert: 45,
//     delete: 46,
//     0: 48,
//     1: 49,
//     2: 50,
//     3: 51,
//     4: 52,
//     5: 53,
//     6: 54,
//     7: 55,
//     8: 56,
//     9: 57,
//     a: 65,
//     b: 66,
//     c: 67,
//     d: 68,
//     e: 69,
//     f: 70,
//     g: 71,
//     h: 72,
//     i: 73,
//     j: 74,
//     k: 75,
//     l: 76,
//     m: 77,
//     n: 78,
//     o: 79,
//     p: 80,
//     q: 81,
//     r: 82,
//     s: 83,
//     t: 84,
//     u: 85,
//     v: 86,
//     w: 87,
//     x: 88,
//     y: 89,
//     z: 90,
//     metaleft: 91,
//     metaright: 92,
//     select: 93,
//     numpad0: 96,
//     numpad1: 97,
//     numpad2: 98,
//     numpad3: 99,
//     numpad4: 100,
//     numpad5: 101,
//     numpad6: 102,
//     numpad7: 103,
//     numpad8: 104,
//     numpad9: 105,
//     numpadmultiply: 106,
//     numpadadd: 107,
//     numpadsubtract: 109,
//     numpaddecimal: 110,
//     numpaddivide: 111,
//     f1: 112,
//     f2: 113,
//     f3: 114,
//     f4: 115,
//     f5: 116,
//     f6: 117,
//     f7: 118,
//     f8: 119,
//     f9: 120,
//     f10: 121,
//     f11: 122,
//     f12: 123,
//     numlock: 144,
//     scrolllock: 145,
//     semicolon: 186,
//     equalsign: 187,
//     comma: 188,
//     minus: 189,
//     period: 190,
//     slash: 191,
//     backquote: 192,
//     bracketleft: 219,
//     backslash: 220,
//     braketright: 221,
//     quote: 222
//   };

//   return obj[key];
// }

// function convertKeyCode(evt) {
//   var chara = "";
//   var keyCode = evt.which ? evt.which : evt.keyCode;
//   var shift = evt.shiftKey;
//   //if (keyCode == 8)
//   //  chara = "backspace";
//   //  backspace
//   //if (keyCode == 9)
//   //  chara = "tab";
//   //  tab
//   //if (keyCode == 13)
//   //  chara = "enter";
//   //  enter
//   //if (keyCode == 16)
//   //  chara = "shift";
//   //  shift
//   //if (keyCode == 17)
//   //  chara = "ctrl";
//   //  ctrl
//   //if (keyCode == 18)
//   //  chara = "alt";
//   //  alt
//   if (keyCode == 19) chara = "pause/break";
//   //  pause/break
//   //if (keyCode == 20)
//   //  chara = "caps lock";
//   //  caps lock
//   //if (keyCode == 27)
//   //  chara = "escape";
//   //  escape
//   //if (keyCode == 33)
//   //  chara = "page up";
//   // page up, to avoid displaying alternate character and confusing people
//   //if (keyCode == 34)
//   //  chara = "page down";
//   // page down
//   //if (keyCode == 35)
//   //  chara = "end";
//   // end
//   //if (keyCode == 36)
//   //  chara = "home";
//   // home
//   //if (keyCode == 37)
//   //  chara = "left arrow";
//   // left arrow
//   //if (keyCode == 38)
//   //  chara = "up arrow";
//   // up arrow
//   //if (keyCode == 39)
//   //  chara = "right arrow";
//   // right arrow
//   //if (keyCode == 40)
//   //  chara = "down arrow";
//   // down arrow
//   //if (keyCode == 45)
//   //  chara = "insert";
//   // insert
//   //if (keyCode == 46)
//   //  chara = "delete";
//   // delete
//   // Alphanumeric
//   if (keyCode == 48) chara = shift ? ")" : "0";
//   if (keyCode == 49) chara = shift ? "!" : "1";
//   if (keyCode == 50) chara = shift ? "@" : "2";
//   if (keyCode == 51) chara = shift ? "#" : "3";
//   if (keyCode == 52) chara = shift ? "$" : "4";
//   if (keyCode == 53) chara = shift ? "%" : "5";
//   if (keyCode == 54) chara = shift ? "^" : "6";
//   if (keyCode == 55) chara = shift ? "&" : "7";
//   if (keyCode == 56) chara = shift ? "*" : "8";
//   if (keyCode == 57) chara = shift ? "(" : "9";

//   if (keyCode == 65) chara = shift ? "A" : "a";
//   if (keyCode == 66) chara = shift ? "B" : "b";
//   if (keyCode == 67) chara = shift ? "C" : "c";
//   if (keyCode == 68) chara = shift ? "D" : "d";
//   if (keyCode == 69) chara = shift ? "E" : "e";
//   if (keyCode == 70) chara = shift ? "F" : "f";
//   if (keyCode == 71) chara = shift ? "G" : "g";
//   if (keyCode == 72) chara = shift ? "H" : "h";
//   if (keyCode == 73) chara = shift ? "I" : "i";
//   if (keyCode == 74) chara = shift ? "J" : "j";
//   if (keyCode == 75) chara = shift ? "K" : "k";
//   if (keyCode == 76) chara = shift ? "L" : "l";
//   if (keyCode == 77) chara = shift ? "M" : "m";
//   if (keyCode == 78) chara = shift ? "N" : "n";
//   if (keyCode == 79) chara = shift ? "O" : "o";
//   if (keyCode == 80) chara = shift ? "P" : "p";
//   if (keyCode == 81) chara = shift ? "Q" : "q";
//   if (keyCode == 82) chara = shift ? "R" : "r";
//   if (keyCode == 83) chara = shift ? "S" : "s";
//   if (keyCode == 84) chara = shift ? "T" : "t";
//   if (keyCode == 85) chara = shift ? "U" : "u";
//   if (keyCode == 86) chara = shift ? "V" : "v";
//   if (keyCode == 87) chara = shift ? "W" : "w";
//   if (keyCode == 88) chara = shift ? "X" : "x";
//   if (keyCode == 89) chara = shift ? "Y" : "y";
//   if (keyCode == 90) chara = shift ? "Z" : "z";
//   // Alphanumeric
//   //if (keyCode == 91)
//   //  chara = "left window";
//   // left window
//   //if (keyCode == 92)
//   //  chara = "right window";
//   // right window
//   if (keyCode == 93) chara = "select key";
//   // select key
//   //if (keyCode == 96)
//   //  chara = "numpad 0";
//   // numpad 0
//   //if (keyCode == 97)
//   //  chara = "numpad 1";
//   // numpad 1
//   //if (keyCode == 98)
//   //  chara = "numpad 2";
//   // numpad 2
//   //if (keyCode == 99)
//   //  chara = "numpad 3";
//   // numpad 3
//   //if (keyCode == 100)
//   //  chara = "numpad 4";
//   // numpad 4
//   //if (keyCode == 101)
//   //  chara = "numpad 5";
//   // numpad 5
//   //if (keyCode == 102)
//   //  chara = "numpad 6";
//   // numpad 6
//   //if (keyCode == 103)
//   //  chara = "numpad 7";
//   // numpad 7
//   //if (keyCode == 104)
//   //  chara = "numpad 8";
//   // numpad 8
//   //if (keyCode == 105)
//   //  chara = "numpad 9";
//   // numpad 9
//   //if (keyCode == 106)
//   //  chara = "multiply";
//   // multiply
//   //if (keyCode == 107)
//   //  chara = "add";
//   // add
//   //if (keyCode == 109)
//   //  chara = "subtract";
//   // subtract
//   //if (keyCode == 110)
//   //  chara = "decimal point";
//   // decimal point
//   //if (keyCode == 111)
//   //  chara = "divide";
//   // divide
//   //if (keyCode == 112)
//   //  chara = "F1";
//   // F1
//   //if (keyCode == 113)
//   //  chara = "F2";
//   // F2
//   //if (keyCode == 114)
//   //  chara = "F3";
//   // F3
//   //if (keyCode == 115)
//   //  chara = "F4";
//   // F4
//   //if (keyCode == 116)
//   //  chara = "F5";
//   // F5
//   //if (keyCode == 117)
//   //  chara = "F6";
//   // F6
//   //if (keyCode == 118)
//   //  chara = "F7";
//   // F7
//   //if (keyCode == 119)
//   //  chara = "F8";
//   // F8
//   //if (keyCode == 120)
//   //  chara = "F9";
//   // F9
//   //if (keyCode == 121)
//   //  chara = "F10";
//   // F10
//   //if (keyCode == 122)
//   //  chara = "F11";
//   // F11
//   //if (keyCode == 123)
//   //  chara = "F12";
//   // F12
//   //if (keyCode == 144)
//   //  chara = "num lock";
//   // num lock
//   //if (keyCode == 145)
//   //  chara = "scroll lock";
//   // scroll lock
//   if (keyCode == 186) chara = ";";
//   // semi-colon
//   if (keyCode == 187) chara = "=";
//   // equal-sign
//   if (keyCode == 188) chara = ",";
//   // comma
//   if (keyCode == 189) chara = "-";
//   // dash
//   if (keyCode == 190) chara = ".";
//   // period
//   if (keyCode == 191) chara = "/";
//   // forward slash
//   if (keyCode == 192) chara = "`";
//   // grave accent
//   if (keyCode == 219) chara = shift ? "{" : "[";
//   // open bracket
//   if (keyCode == 220) chara = "\\";
//   // back slash
//   if (keyCode == 221) chara = shift ? "}" : "]";
//   // close bracket
//   if (keyCode == 222) chara = "'";
//   // single quote

//   return chara;
// }
