import { w as writable } from "./index3.js";
import "@vercel/analytics";
const getCart = () => {
  return [];
};
const cartLengthStore = writable(getCart().length);
export {
  cartLengthStore as c,
  getCart as g
};
