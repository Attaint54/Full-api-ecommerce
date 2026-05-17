const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory array for products
let products = [
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

// Generate simple unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET single product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST new product
app.post('/products', (req, res) => {
  const { name, price, image, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  
  const newProduct = {
    id: generateId(),
    name,
    price: Number(price),
    image: image || 'https://via.placeholder.com/300?text=No+Image',
    description: description || '',
    createdAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const { name, price, image, description } = req.body;
  const index = products.findIndex(p => p.id === req.params.id);
  
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  
  products[index] = {
    ...products[index],
    name: name || products[index].name,
    price: price ? Number(price) : products[index].price,
    image: image || products[index].image,
    description: description !== undefined ? description : products[index].description
  };
  
  res.json(products[index]);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
