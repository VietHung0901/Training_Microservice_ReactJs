package com.wisdom.generic;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class GeneralService {
    public String saveFile(MultipartFile file, String subDirectory) throws IOException, java.io.IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = System.getProperty("user.dir") +"/productservice"+ "/src/main/resources/static/" + subDirectory;
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectory(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        file.transferTo(filePath);
        return "/" + subDirectory + "/" + file.getOriginalFilename();
    }
}