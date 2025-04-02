package org.complete.controller;

import lombok.RequiredArgsConstructor;
import org.complete.dto.*;
import org.complete.service.FoundItemService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/found-items")
public class FoundItemApiController {

    private final FoundItemService foundItemService;

    @PostMapping
    public ResponseEntity<FoundItemResponse> addFoundItem(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody AddFoundItemRequest request) {
        return ResponseEntity.ok(foundItemService.addFoundItem(authHeader, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoundItemResponse> updateFoundItem(
            @PathVariable Long id,
            @RequestBody UpdateFoundItemRequest request,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(foundItemService.updateFoundItem(id, request, authHeader));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoundItem(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        foundItemService.deleteFoundItem(id, authHeader);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<FoundItemListResponse>> getAllFoundItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(foundItemService.getAllFoundItems(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoundItemResponse> getFoundItem(@PathVariable Long id) {
        return ResponseEntity.ok(foundItemService.getFoundItem(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<FoundItemListResponse>> searchByTitle(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(foundItemService.searchByTitle(name, page, size));
    }
}
