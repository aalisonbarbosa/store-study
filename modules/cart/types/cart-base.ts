import { CartItem } from "./cart-item";

export interface CartBase {
  id: string;
  userId: string;
  CartItem: CartItem[];
}
