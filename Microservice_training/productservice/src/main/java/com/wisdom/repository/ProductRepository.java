package com.wisdom.repository;

import com.wisdom.entity.Category;
import com.wisdom.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findAllByCategory(Category category, Pageable pageable);
    Page<Product> findAll(Pageable pageable);
}
