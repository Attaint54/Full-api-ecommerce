# Full-Stack E-commerce CRUD Application

A simple, beautifully designed, beginner-friendly full-stack e-commerce CRUD application built with Next.js, Express, and Tailwind CSS.

## Features
- **Full CRUD Operations**: Create, Read, Update, and Delete products.
- **Loading States**: Visual feedback during API calls.
- **Error Handling**: Graceful error handling for API requests.
- **Success Messages**: Confirmation messages upon successful actions.
- **Responsive UI**: Premium, modern design built with Tailwind CSS that works on all screen sizes.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Formik, Axios
- **Backend**: Node.js, Express.js
- **Database**: In-memory array (Fast, simple, reliable)

## Prerequisites
- Node.js installed on your machine.

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Attaint54/Full-api-ecommerce.git
   cd ecommerce-crud-app
   ```

2. **Run the Backend Server**:
   ```bash
   cd server
   npm install
   node server.js
   ```
   The backend will start running on `http://localhost:5000`.

3. **Run the Frontend Server**:
   Open a new terminal window:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## API Endpoints

- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a specific product by ID
- `POST /products` - Add a new product
- `PUT /products/:id` - Update an existing product
- `DELETE /products/:id` - Delete a product

## Author
- **Name**: Attaint54
- **Email**: attaulbari080@gmail.com
- **GitHub**: [https://github.com/Attaint54](https://github.com/Attaint54)
