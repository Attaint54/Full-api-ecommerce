// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${params.id}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${params.id}`);
      router.push('/');
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error || !product) return (
    <div className="text-center p-12 bg-white rounded-3xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
      <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">Return Home</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
          <img 
            src={product.image || 'https://via.placeholder.com/600'} 
            alt={product.name} 
            className="w-full max-w-md h-auto object-cover rounded-2xl shadow-sm"
          />
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
            Product Details
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900 mb-6">${Number(product.price).toFixed(2)}</p>
          
          <div className="prose prose-sm text-gray-500 mb-10">
            <p className="text-lg leading-relaxed">{product.description || 'No description available for this product.'}</p>
          </div>
          
          <div className="flex gap-4 mt-auto">
            <Link 
              href={`/edit/${product.id}`}
              className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
            >
              <Edit size={18} /> Edit Product
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-red-50 px-6 py-4 text-sm font-semibold text-red-600 hover:bg-red-100 transition-all"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
            Added on {new Date(product.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
