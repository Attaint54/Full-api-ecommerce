// @ts-nocheck
import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/db';

// GET all products
export async function GET() {
  return NextResponse.json(mockProducts);
}

// POST new product
export async function POST(request: Request) {
  try {
    const { name, price, image, description } = await request.json();
    if (!name || !price) {
      return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
    }
    
    const newProduct = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      price: Number(price),
      image: image || 'https://via.placeholder.com/300?text=No+Image',
      description: description || '',
      createdAt: new Date().toISOString()
    };
    
    mockProducts.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
