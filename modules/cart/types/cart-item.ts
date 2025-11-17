export interface CartItem {
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
}
