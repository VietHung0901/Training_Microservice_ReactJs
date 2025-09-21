import ApiService from './api';

export const productService = {
  // Get all products with pagination
  getProducts: (page = 0, size = 10) => 
    ApiService.get(`/products?page=${page}&size=${size}`),
  
  // Get product by ID
  getProductById: (id) => ApiService.get(`/products/${id}`),
  
  // Create new product
  createProduct: (productData) => ApiService.post('/products', productData),
  
  // Update product
  updateProduct: (id, productData) => ApiService.put(`/products/${id}`, productData),
  
  // Delete product
  deleteProduct: (id) => ApiService.delete(`/products/${id}`),
  
  // Update product category
  updateProductCategory: (productId, categoryId) => 
    ApiService.request(`/products/${productId}/category/${categoryId}`, { method: 'PATCH' }),
};
