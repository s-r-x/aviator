export const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
export const mapNumber = (x, a, b, c, d,) => (x - a) * ( (d - c) / (b - a) ) + c;
