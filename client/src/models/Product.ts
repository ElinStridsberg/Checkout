type Product = {
    default_price: any;
    id: string;
    name: string;
    description: string;
    price: number;
    images?: string[]; // Gör images-egenskapen valfri (optional)
};
