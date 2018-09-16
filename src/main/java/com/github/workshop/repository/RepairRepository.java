package com.github.workshop.repository;

import com.github.workshop.domain.Repair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Repair entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {

    @Query(value = "select distinct repair from Repair repair left join fetch repair.parts left join fetch repair.tasks",
        countQuery = "select count(distinct repair) from Repair repair")
    Page<Repair> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct repair from Repair repair left join fetch repair.parts left join fetch repair.tasks")
    List<Repair> findAllWithEagerRelationships();

    @Query("select repair from Repair repair left join fetch repair.parts left join fetch repair.tasks where repair.id =:id")
    Optional<Repair> findOneWithEagerRelationships(@Param("id") Long id);

}
