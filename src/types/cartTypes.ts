export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    category: string;
    onSale: boolean;
    saleText?: string;
  }
}

export interface Cart  {
  id: string;
  userId: string;
  items: CartItem[];
};
