// @ts-nocheck
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
}

// In-memory array for products (module-level cache)
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-quality wireless headphones with noise cancellation.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    description: 'Feature-rich smartwatch with health tracking and notifications.',
    createdAt: new Date().toISOString()
  }
];
