package com.github.workshop.service.impl;

import com.github.workshop.service.PartService;
import com.github.workshop.domain.Part;
import com.github.workshop.repository.PartRepository;
import com.github.workshop.service.dto.PartDTO;
import com.github.workshop.service.mapper.PartMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Part.
 */
@Service
@Transactional
public class PartServiceImpl implements PartService {

    private final Logger log = LoggerFactory.getLogger(PartServiceImpl.class);

    private final PartRepository partRepository;

    private final PartMapper partMapper;

    public PartServiceImpl(PartRepository partRepository, PartMapper partMapper) {
        this.partRepository = partRepository;
        this.partMapper = partMapper;
    }

    /**
     * Save a part.
     *
     * @param partDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PartDTO save(PartDTO partDTO) {
        log.debug("Request to save Part : {}", partDTO);
        Part part = partMapper.toEntity(partDTO);
        part = partRepository.save(part);
        return partMapper.toDto(part);
    }

    /**
     * Get all the parts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PartDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Parts");
        return partRepository.findAll(pageable)
            .map(partMapper::toDto);
    }


    /**
     * Get one part by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PartDTO> findOne(Long id) {
        log.debug("Request to get Part : {}", id);
        return partRepository.findById(id)
            .map(partMapper::toDto);
    }

    /**
     * Delete the part by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Part : {}", id);
        partRepository.deleteById(id);
    }
}
