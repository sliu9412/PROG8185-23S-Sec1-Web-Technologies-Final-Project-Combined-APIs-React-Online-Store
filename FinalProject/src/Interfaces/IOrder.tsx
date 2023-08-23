import { IOrderItem } from "./IOrderItem";

export interface IOrder {
  _id: string;
  orders: IOrderItem[];
}
