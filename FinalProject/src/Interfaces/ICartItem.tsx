import IProduct from "./IProduct";

export interface ICartItem {
  totalPrice: number;
  quantity: number;
  totalTaxes: number;
  totalShippingCost: number;
  product: IProduct;
}
