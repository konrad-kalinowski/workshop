package com.github.workshop.repository;

import com.github.workshop.domain.RepairHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RepairHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepairHistoryRepository extends JpaRepository<RepairHistory, Long> {

}
