package com.wisdom.generic;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class GeneralService {
    public String saveFile(MultipartFile file, String subDirectory) throws IOException, java.io.IOException {

        String uploadDir = StringURL.dirUploads + subDirectory;
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            // Tạo thư mục nếu chưa tồn tại
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Lưu file vào đường dẫn
            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new RuntimeException("Không thể lưu file: " + fileName, e);
        }
        return "/" + subDirectory + "/" + file.getOriginalFilename();
    }
}