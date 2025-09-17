package com.wisdom.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ProductDTO {
    private String name;
    private int price;
    private String description;
    private MultipartFile imagepath;
    private int categoryId;
}