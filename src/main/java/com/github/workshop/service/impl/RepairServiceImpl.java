package com.github.workshop.service.impl;

import com.github.workshop.service.RepairService;
import com.github.workshop.domain.Repair;
import com.github.workshop.repository.RepairRepository;
import com.github.workshop.service.dto.RepairDTO;
import com.github.workshop.service.mapper.RepairMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Repair.
 */
@Service
@Transactional
public class RepairServiceImpl implements RepairService {

    private final Logger log = LoggerFactory.getLogger(RepairServiceImpl.class);

    private final RepairRepository repairRepository;

    private final RepairMapper repairMapper;

    public RepairServiceImpl(RepairRepository repairRepository, RepairMapper repairMapper) {
        this.repairRepository = repairRepository;
        this.repairMapper = repairMapper;
    }

    /**
     * Save a repair.
     *
     * @param repairDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RepairDTO save(RepairDTO repairDTO) {
        log.debug("Request to save Repair : {}", repairDTO);
        Repair repair = repairMapper.toEntity(repairDTO);
        repair = repairRepository.save(repair);
        return repairMapper.toDto(repair);
    }

    /**
     * Get all the repairs.
     *
     *
     * @param historyId
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RepairDTO> findAll(Long historyId, Pageable pageable) {
        log.debug("Request to get all Repairs");
        if(historyId == null){
            return repairRepository.findAll(pageable)
                .map(repairMapper::toDto);
        }
        return repairRepository.findAllByHistoryId(historyId, pageable).map(repairMapper::toDto);

    }

    /**
     * Get all the Repair with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<RepairDTO> findAllWithEagerRelationships(Pageable pageable) {
        return repairRepository.findAllWithEagerRelationships(pageable).map(repairMapper::toDto);
    }


    /**
     * Get one repair by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RepairDTO> findOne(Long id) {
        log.debug("Request to get Repair : {}", id);
        return repairRepository.findOneWithEagerRelationships(id)
            .map(repairMapper::toDto);
    }

    /**
     * Delete the repair by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Repair : {}", id);
        repairRepository.deleteById(id);
    }
}
