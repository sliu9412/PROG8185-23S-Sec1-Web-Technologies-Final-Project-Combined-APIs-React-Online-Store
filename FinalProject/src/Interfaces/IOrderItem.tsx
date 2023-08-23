export interface IOrderItem {
  _id: string;
  userID: string;
  transactionID: string;
  productID: string;
  productTotalPrice: number;
  productQuantity: number;
  productTotalTaxes: number;
  productTotalShippingCost: number;
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productShippingCost: number;
  __v: number;
}
