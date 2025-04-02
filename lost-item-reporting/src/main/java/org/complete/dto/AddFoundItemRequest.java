package org.complete.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class AddFoundItemRequest {
    private String title;
    private String description;
    private String foundLocation;
    private LocalDateTime foundDate;
    private String imageUrl;
    private String status;
}

