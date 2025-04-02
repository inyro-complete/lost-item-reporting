package org.complete.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoundItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "found_item_id", updatable = false)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 255)
    private String foundLocation;

    @Column(nullable = false)
    private LocalDateTime foundDate;

    @Column(nullable = false, length = 255)
    private String storageLocation;

    @Column
    private String storageContact;

    @Column
    private String loserName;

    @Column
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private FoundItemStatus status;

    @Column(nullable = false)
    private Long finderId;

    public enum FoundItemStatus {
        FOUND, RETURNED, DISPOSED
    }

    public void update(String title, String description, String foundLocation, LocalDateTime foundDate,
                       String storageLocation, String storageContact, String loserName, String imageUrl,
                       FoundItemStatus status) {
        this.title = title;
        this.description = description;
        this.foundLocation = foundLocation;
        this.foundDate = foundDate;
        this.storageLocation = storageLocation;
        this.storageContact = storageContact;
        this.loserName = loserName;
        this.imageUrl = imageUrl;
        this.status = status;
    }
}
