import Settings from "./Settings";

export const getAPIs = {
  allProducts: Settings.baseURL + "product",
  getUserById: Settings.baseURL + "user/{uid}",
  getProductById: Settings.baseURL + "product/{pid}",
  getUserCart: Settings.baseURL + "shopping/cart",
  getCommentsByProductId: Settings.baseURL + "review/{pid}",
  getOrderHistory: Settings.baseURL + "shopping/purchase",
};

export const postAPIs = {
  login: Settings.baseURL + "auth/login",
  register: Settings.baseURL + "user",
  updateCart: Settings.baseURL + "shopping/cart",
  makeComment: Settings.baseURL + "review/{pid}",
  placeOrder: Settings.baseURL + "shopping/purchase",
};

export const putAPIs = {
  updateAccountById: Settings.baseURL + "user/{uid}",
};
