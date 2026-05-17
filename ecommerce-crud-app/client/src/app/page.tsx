// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return <div className="text-red-500 text-center p-8 bg-red-50 rounded-xl border border-red-100">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Our Collection</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first product.</p>
          <Link href="/add" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500 transition-all">
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 mb-4">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="mt-1 text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Link 
                  href={`/product/${product.id}`}
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Eye size={16} /> View
                </Link>
                <Link 
                  href={`/edit/${product.id}`}
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  <Edit size={16} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="inline-flex justify-center items-center rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
