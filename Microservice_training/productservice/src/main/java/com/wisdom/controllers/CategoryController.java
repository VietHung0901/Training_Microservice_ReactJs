package com.wisdom.controllers;

import com.wisdom.dto.RequestResponse;
import com.wisdom.dto.request.CategoryDTO;
import com.wisdom.dto.request.ProductDTO;
import com.wisdom.dto.respone.CategoryResponse;
import com.wisdom.dto.respone.ProductResponse;
import com.wisdom.entity.Category;
import com.wisdom.entity.Product;
import com.wisdom.exception.ExceptionResponse;
import com.wisdom.services.CategoryService;
import com.wisdom.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final ProductService productService;

    @PostMapping()
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO){
        try{
            categoryService.createCategory(categoryDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new RequestResponse("Tạo category thành công!"));
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Lỗi khi tạo category: " + e.getMessage()));
        }
    }

    @GetMapping()
    public ResponseEntity<?> getAll(){
        try{
            List<Category> listCategory = categoryService.getAll();
            List<CategoryResponse> listDTO = listCategory.stream().map(categoryService::todo).toList();;
            return ResponseEntity.ok(new RequestResponse(listDTO,"Lấy danh sách category thành công!"));
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ExceptionResponse("Lỗi khi lấy danh sách category: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable("id") int id) {
        try{
            Category category = categoryService.getCategoryById(id);
            CategoryResponse dto = categoryService.todo(category);
            return ResponseEntity.ok(new RequestResponse(dto,"Lấy category thành công!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ExceptionResponse("Lỗi khi lấy category: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable("id") int id, @RequestBody CategoryDTO categoryDTO) {
        try{
            Category response = categoryService.getCategoryById(id);
            categoryService.updateCategory(id, categoryDTO);
            return ResponseEntity.ok(new RequestResponse("Cập nhật category thành công"));
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Lỗi khi cập nhật category: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") int id) {
        try{
            categoryService.deleteCategory(id);
            return ResponseEntity.ok(new RequestResponse("Xóa category thành công"));
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Lỗi khi xóa category: " + e.getMessage()));
        }
    }

    @GetMapping("/{categoryId}/products")
    public ResponseEntity<?> getAllByCategory(@PathVariable int categoryId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        try{
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> products = productService.getAllByCategory(categoryId, pageable);
            Page<ProductResponse> pageProducts = products.map(productService::todo);
            return ResponseEntity.ok(new RequestResponse(pageProducts, "Lấy danh sách category thành công."));
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ExceptionResponse("Lỗi khi xóa category: " + e.getMessage()));
        }
    }

    @PostMapping("/{categoryId}/products")
    public ResponseEntity<?> createProduct(@PathVariable int  categoryId, @RequestBody ProductDTO productDTO) {
        try {
            productDTO.setCategoryId(categoryId);
            productService.createProduct(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new RequestResponse("Tạo product theo category thành công."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse("Lỗi khi tạo category: " + e.getMessage()));
        }
    }
}