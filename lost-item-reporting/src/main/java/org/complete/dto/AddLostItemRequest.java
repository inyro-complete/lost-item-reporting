package org.complete.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddLostItemRequest {

    @NotBlank(message = "Title is a required field.")
    private String title;

    private String description;

    @NotBlank(message = "Lost location is a required field")
    private String lostLocation;

    @NotBlank(message = "Lost date is a required field")
    private LocalDateTime lostDate;

    private MultipartFile imageFile;
}