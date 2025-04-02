package org.complete.repository;

import org.complete.domain.FoundItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {
    Page<FoundItem> findByTitleContaining(String title, Pageable pageable);
}
