package com.wisdom.services;

import com.wisdom.dto.request.CategoryDTO;
import com.wisdom.dto.respone.CategoryResponse;
import com.wisdom.entity.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryDTO categoryDTO);

    CategoryResponse todo(Category category);

    List<Category> getAll();

    Category getCategoryById(int categoryId);

    Category updateCategory(int categoryId, CategoryDTO categoryDTO);

    void deleteCategory(int categoryId);
}
