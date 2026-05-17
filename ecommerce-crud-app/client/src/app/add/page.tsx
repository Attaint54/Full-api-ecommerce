// @ts-nocheck
'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AddProduct() {
  const router = useRouter();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

        {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">{error}</div>}

        <Formik
          initialValues={{ name: '', price: '', image: '', description: '' }}
          validate={values => {
            const errors: any = {};
            if (!values.name) errors.name = 'Required';
            if (!values.price) errors.price = 'Required';
            else if (isNaN(Number(values.price)) || Number(values.price) <= 0) errors.price = 'Must be a valid positive number';
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setError('');
              await api.post('/products', values);
              setSuccess('Product added successfully!');
              resetForm();
              setTimeout(() => router.push('/'), 1500);
            } catch (err) {
              setError('Failed to add product. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Product Name</label>
                <Field type="text" name="name" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="e.g. Premium Wireless Headphones" />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Price ($)</label>
                <Field type="number" step="0.01" name="price" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="99.99" />
                <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Image URL</label>
                <Field type="text" name="image" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="https://example.com/image.jpg" />
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Description</label>
                <Field as="textarea" rows={4} name="description" className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Describe the product..." />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
