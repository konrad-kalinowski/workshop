package com.github.workshop.repository;

import com.github.workshop.domain.Repair;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Repair entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {

}
