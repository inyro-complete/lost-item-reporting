package org.complete.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EmailCheckResponse {
    private boolean available;
    private String message;
}
