package com.wisdom.services.impl;

import com.wisdom.dto.request.CategoryDTO;
import com.wisdom.dto.respone.CategoryResponse;
import com.wisdom.entity.Category;
import com.wisdom.repository.CategoryRepository;
import com.wisdom.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryDTO categoryDTO){
        Category category = new Category();
        return saveOrUpdateCategory(category, categoryDTO);
    }

    @Override
    public CategoryResponse todo(Category category){
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setIdCategory(category.getIdCategory());
        categoryResponse.setName(category.getName());
        categoryResponse.setDescription(category.getDescription());
        return categoryResponse;
    }

    @Override
    public List<Category> getAll(){
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Category với id = " + categoryId));
    }

    @Override
    public Category updateCategory(int categoryId, CategoryDTO categoryDTO){
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Category với id = " + categoryId));
        return saveOrUpdateCategory(category, categoryDTO);
    }

    @Override
    public void deleteCategory(int categoryId){
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Category với id = " + categoryId));
        categoryRepository.delete(category);
    }

    private Category saveOrUpdateCategory(Category category, CategoryDTO categoryDTO){
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        return categoryRepository.save(category);
    }
}