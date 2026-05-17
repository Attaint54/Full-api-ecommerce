// @ts-nocheck
import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/db';

// GET single product
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT update product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const index = mockProducts.findIndex(p => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    
    const { name, price, image, description } = await request.json();
    
    mockProducts[index] = {
      ...mockProducts[index],
      name: name || mockProducts[index].name,
      price: price ? Number(price) : mockProducts[index].price,
      image: image || mockProducts[index].image,
      description: description !== undefined ? description : mockProducts[index].description
    };
    
    return NextResponse.json(mockProducts[index]);
  } catch (err) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = mockProducts.findIndex(p => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  
  mockProducts.splice(index, 1);
  return NextResponse.json({ message: 'Product deleted successfully' });
}
