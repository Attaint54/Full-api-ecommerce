// @ts-nocheck
import { NextResponse } from 'next/server';

// Helper to access the global mock products
const getProducts = () => {
  return global.mockProducts || [];
};

// GET single product
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const products = getProducts();
  const product = products.find(p => p.id === params.id);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT update product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const products = getProducts();
    const index = products.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    
    const { name, price, image, description } = await request.json();
    
    products[index] = {
      ...products[index],
      name: name || products[index].name,
      price: price ? Number(price) : products[index].price,
      image: image || products[index].image,
      description: description !== undefined ? description : products[index].description
    };
    
    return NextResponse.json(products[index]);
  } catch (err) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  
  products.splice(index, 1);
  return NextResponse.json({ message: 'Product deleted successfully' });
}
