package org.complete.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UpdateFoundItemRequest {
    private String title;
    private String description;
    private String foundLocation;
    private LocalDateTime foundDate;
    private String storageLocation;
    private String storageContact;
    private String loserName;
    private String imageUrl;
    private String status;
}
