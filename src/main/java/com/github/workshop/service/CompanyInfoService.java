package com.github.workshop.service;

import com.github.workshop.service.dto.CompanyInfoDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CompanyInfo.
 */
public interface CompanyInfoService {

    /**
     * Save a companyInfo.
     *
     * @param companyInfoDTO the entity to save
     * @return the persisted entity
     */
    CompanyInfoDTO save(CompanyInfoDTO companyInfoDTO);

    /**
     * Get all the companyInfos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CompanyInfoDTO> findAll(Pageable pageable);


    /**
     * Get the "id" companyInfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CompanyInfoDTO> findOne(Long id);

    /**
     * Delete the "id" companyInfo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
