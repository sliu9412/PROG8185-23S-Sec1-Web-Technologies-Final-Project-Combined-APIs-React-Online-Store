import { ICartItem } from "./ICartItem";

export interface ICart {
  totalPrice: number;
  totalQuantity: number;
  totalShippingCost: number;
  totalTaxes: number;
  items: ICartItem[];
}
