export const getGridCellSize = () => (window.innerWidth - 100) / 12;

export const intToColor = (int) => {
  int >>>= 0;
  var b = int & 0xff,
    g = (int & 0xff00) >>> 8,
    r = (int & 0xff0000) >>> 16,
    a = ((int & 0xff000000) >>> 24) / 255;
  return "rgba(" + [r, g, b, a].join(",") + ")";
};