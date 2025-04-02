package org.complete.repository;

import org.complete.domain.LostItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    Page<LostItem> findByTitle(String title, Pageable pageable);
}