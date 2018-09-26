package com.github.workshop.service;

import com.github.workshop.service.dto.RepairDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Repair.
 */
public interface RepairService {

    /**
     * Save a repair.
     *
     * @param repairDTO the entity to save
     * @return the persisted entity
     */
    RepairDTO save(RepairDTO repairDTO);

    /**
     * Get all the repairs.
     *
     *
     * @param historyId
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RepairDTO> findAll(Long historyId, Pageable pageable);

    /**
     * Get all the Repair with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<RepairDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" repair.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RepairDTO> findOne(Long id);

    /**
     * Delete the "id" repair.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
