package com.wisdom.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_product")
    private int idProduct;

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "price")
    private int price;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "imagepath")
    private String imagepath;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
