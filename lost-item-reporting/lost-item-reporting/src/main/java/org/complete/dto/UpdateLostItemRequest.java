package org.complete.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateLostItemRequest {

    @NotBlank(message = "Title is a required field.")
    private String title;

    private String description;

    @NotBlank(message = "Lost location is a required field")
    private String lostLocation;

    @NotBlank(message = "Lost date is a required field")
    private LocalDateTime lostDate;

    private String imageUrl;

    @NotBlank(message = "Status is a required field")
    private String status;
}