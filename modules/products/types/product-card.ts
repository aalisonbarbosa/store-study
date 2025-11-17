export interface ProductCard {
  id: string;
  title: string;
  imageUrl: string;
  Category: {
    id: string;
    name: string;
  };
  price: number;
}
