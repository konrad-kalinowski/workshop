package com.github.workshop.service.impl;

import com.github.workshop.service.RepairHistoryService;
import com.github.workshop.domain.RepairHistory;
import com.github.workshop.repository.RepairHistoryRepository;
import com.github.workshop.service.dto.RepairHistoryDTO;
import com.github.workshop.service.mapper.RepairHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing RepairHistory.
 */
@Service
@Transactional
public class RepairHistoryServiceImpl implements RepairHistoryService {

    private final Logger log = LoggerFactory.getLogger(RepairHistoryServiceImpl.class);

    private final RepairHistoryRepository repairHistoryRepository;

    private final RepairHistoryMapper repairHistoryMapper;

    public RepairHistoryServiceImpl(RepairHistoryRepository repairHistoryRepository, RepairHistoryMapper repairHistoryMapper) {
        this.repairHistoryRepository = repairHistoryRepository;
        this.repairHistoryMapper = repairHistoryMapper;
    }

    /**
     * Save a repairHistory.
     *
     * @param repairHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RepairHistoryDTO save(RepairHistoryDTO repairHistoryDTO) {
        log.debug("Request to save RepairHistory : {}", repairHistoryDTO);
        RepairHistory repairHistory = repairHistoryMapper.toEntity(repairHistoryDTO);
        repairHistory = repairHistoryRepository.save(repairHistory);
        return repairHistoryMapper.toDto(repairHistory);
    }

    /**
     * Get all the repairHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RepairHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RepairHistories");
        return repairHistoryRepository.findAll(pageable)
            .map(repairHistoryMapper::toDto);
    }


    /**
     * Get one repairHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RepairHistoryDTO> findOne(Long id) {
        log.debug("Request to get RepairHistory : {}", id);
        return repairHistoryRepository.findById(id)
            .map(repairHistoryMapper::toDto);
    }

    /**
     * Delete the repairHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RepairHistory : {}", id);
        repairHistoryRepository.deleteById(id);
    }
}
