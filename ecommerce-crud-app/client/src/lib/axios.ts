// @ts-nocheck
import axios from 'axios';

export const api = axios.create({
  baseURL: typeof window !== 'undefined' ? '/api' : 'http://localhost:5000', // Uses Next.js API routes on Vercel automatically
  headers: {
    'Content-Type': 'application/json',
  },
});
