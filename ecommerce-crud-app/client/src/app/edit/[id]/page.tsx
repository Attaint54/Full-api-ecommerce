// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
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
    <div className="max-w-2xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>

        {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">{error}</div>}

        <Formik
          initialValues={{ 
            name: product.name, 
            price: product.price, 
            image: product.image, 
            description: product.description 
          }}
          validate={values => {
            const errors: any = {};
            if (!values.name) errors.name = 'Required';
            if (!values.price) errors.price = 'Required';
            else if (isNaN(Number(values.price)) || Number(values.price) <= 0) errors.price = 'Must be a valid positive number';
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setError('');
              await api.put(`/products/${params.id}`, values);
              setSuccess('Product updated successfully!');
              setTimeout(() => router.push('/'), 1500);
            } catch (err) {
              setError('Failed to update product. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Product Name</label>
                <Field type="text" name="name" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Price ($)</label>
                <Field type="number" step="0.01" name="price" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Image URL</label>
                <Field type="text" name="image" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Description</label>
                <Field as="textarea" rows={4} name="description" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
