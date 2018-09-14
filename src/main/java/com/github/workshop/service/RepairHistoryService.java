package com.github.workshop.service;

import com.github.workshop.service.dto.NewRepairDTO;
import com.github.workshop.service.dto.RepairHistoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing RepairHistory.
 */
public interface RepairHistoryService {

    /**
     * Save a repairHistory.
     *
     * @param repairHistoryDTO the entity to save
     * @return the persisted entity
     */
    RepairHistoryDTO save(RepairHistoryDTO repairHistoryDTO);

    /**
     * Get all the repairHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RepairHistoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" repairHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RepairHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" repairHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    RepairHistoryDTO saveNewRepair(NewRepairDTO repairDTO);
}
