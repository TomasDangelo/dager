export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    onSale: boolean;
    saleText?: string;
    category: string;
}