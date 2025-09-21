import ApiService from './api';

export const categoryService = {
  // Get all categories
  getCategories: () => ApiService.get('/categories'),
  
  // Get category by ID
  getCategoryById: (id) => ApiService.get(`/categories/${id}`),
  
  // Create new category
  createCategory: (categoryData) => ApiService.post('/categories', categoryData),
  
  // Update category
  updateCategory: (id, categoryData) => ApiService.put(`/categories/${id}`, categoryData),
  
  // Delete category
  deleteCategory: (id) => ApiService.delete(`/categories/${id}`),
  
  // Get products by category with pagination
  getProductsByCategory: (categoryId, page = 0, size = 10) => 
    ApiService.get(`/categories/${categoryId}/products?page=${page}&size=${size}`),
  
  // Create product in category
  createProductInCategory: (categoryId, productData) => 
    ApiService.post(`/categories/${categoryId}/products`, productData),
};
