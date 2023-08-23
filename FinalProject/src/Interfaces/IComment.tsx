export interface IComment {
  _id: string;
  productID: string;
  userID: string;
  username: string;
  comment: string;
  rating: number;
  images: string[];
}
