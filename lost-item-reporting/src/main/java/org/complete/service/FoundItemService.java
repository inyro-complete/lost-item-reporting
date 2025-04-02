package org.complete.service;

import lombok.RequiredArgsConstructor;
import org.complete.domain.FoundItem;
import org.complete.dto.AddFoundItemRequest;
import org.complete.dto.UpdateFoundItemRequest;
import org.complete.dto.FoundItemResponse;
import org.complete.dto.FoundItemListResponse;
import org.complete.repository.FoundItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


@RequiredArgsConstructor
@Service
public class FoundItemService {

    private final FoundItemRepository foundItemRepository;
    private final TokenService tokenService;

    // 습득물 등록
    public FoundItemResponse addFoundItem(String authHeader, AddFoundItemRequest request) {
        Long userId = tokenService.getUserId(authHeader.replace("Bearer ", ""));
        FoundItem foundItem = FoundItem.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .foundLocation(request.getFoundLocation())
                .imageUrl(request.getImageUrl())
                .status(FoundItem.FoundItemStatus.valueOf(request.getStatus()))
                .finderId(userId)
                .build();
        FoundItem savedItem = foundItemRepository.save(foundItem);
        return new FoundItemResponse(savedItem.getId(), savedItem.getTitle(), savedItem.getDescription(),
                savedItem.getFoundLocation(), savedItem.getImageUrl(), savedItem.getStatus().name());
    }

    // 습득물 수정
    public FoundItemResponse updateFoundItem(Long id, UpdateFoundItemRequest request, String authHeader) {
        Long userId = tokenService.getUserId(authHeader.replace("Bearer ", ""));
        FoundItem foundItem = foundItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Found item not found"));

        foundItem.update(request.getTitle(), request.getDescription(), request.getFoundLocation(),
                request.getFoundDate(), request.getStorageLocation(), request.getStorageContact(),
                request.getLoserName(), request.getImageUrl(),
                FoundItem.FoundItemStatus.valueOf(request.getStatus()));

        foundItemRepository.save(foundItem);
        return new FoundItemResponse(foundItem.getId(), foundItem.getTitle(), foundItem.getDescription(),
                foundItem.getFoundLocation(), foundItem.getImageUrl(), foundItem.getStatus().name());
    }

    // 습득물 삭제
    public void deleteFoundItem(Long id, String authHeader) {
        foundItemRepository.deleteById(id);
    }

    // 모든 습득물 조회 (페이징 처리)
    public Page<FoundItemListResponse> getAllFoundItems(int page, int size) {
        return foundItemRepository.findAll(PageRequest.of(page, size))
                .map(item -> new FoundItemListResponse(item.getId(), item.getTitle(),
                        item.getFoundLocation(), item.getFoundDate(), item.getStatus().name()));
    }

    // 특정 습득물 상세 조회
    public FoundItemResponse getFoundItem(Long id) {
        FoundItem item = foundItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Found item not found"));
        return new FoundItemResponse(item.getId(), item.getTitle(), item.getDescription(),
                item.getFoundLocation(), item.getImageUrl(), item.getStatus().name());
    }

    // 제목으로 습득물 조회 (페이징 처리)
    public Page<FoundItemListResponse> searchByTitle(String title, int page, int size) {
        return foundItemRepository.findByTitleContaining(title, PageRequest.of(page, size))
                .map(item -> new FoundItemListResponse(item.getId(), item.getTitle(),
                        item.getFoundLocation(), item.getFoundDate(), item.getStatus().name()));
    }


}
