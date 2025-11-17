export interface ProductBase {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  User: {
    id: string;
    name: string;
  };
  Category: {
    id: string;
    name: string;
  };
  status: string;
  reason: string | null;
}
