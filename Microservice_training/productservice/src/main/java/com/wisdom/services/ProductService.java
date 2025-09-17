package com.wisdom.services;

import com.wisdom.dto.request.ProductDTO;
import com.wisdom.dto.respone.ProductResponse;
import com.wisdom.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDTO productDTO);

    ProductResponse todo(Product product);

    List<Product> getAll();

    Product getProductById(int productId);

    Product updateProduct (int productId, ProductDTO productDTO);

    void deleteProduct(int productId);

    Page<Product> getAllByCategory(int category_id, Pageable pageable); // (with pagination)

    Product updateProductCategory(int productId, int newCategoryId);

    Page<Product> getPaginatedProducts(Pageable pageable);
}