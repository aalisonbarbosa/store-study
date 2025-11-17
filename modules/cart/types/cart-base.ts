export interface CartBase {
  id: string;
  userId: string;
  CartItem: {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    Product: {
      id: string;
      title: string;
      price: number;
      imageUrl: string;
    };
  }[];
}
