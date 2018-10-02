package com.github.workshop.service.impl;

import com.github.workshop.service.CompanyInfoService;
import com.github.workshop.domain.CompanyInfo;
import com.github.workshop.repository.CompanyInfoRepository;
import com.github.workshop.service.dto.CompanyInfoDTO;
import com.github.workshop.service.mapper.CompanyInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing CompanyInfo.
 */
@Service
@Transactional
public class CompanyInfoServiceImpl implements CompanyInfoService {

    private final Logger log = LoggerFactory.getLogger(CompanyInfoServiceImpl.class);

    private final CompanyInfoRepository companyInfoRepository;

    private final CompanyInfoMapper companyInfoMapper;

    public CompanyInfoServiceImpl(CompanyInfoRepository companyInfoRepository, CompanyInfoMapper companyInfoMapper) {
        this.companyInfoRepository = companyInfoRepository;
        this.companyInfoMapper = companyInfoMapper;
    }

    /**
     * Save a companyInfo.
     *
     * @param companyInfoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CompanyInfoDTO save(CompanyInfoDTO companyInfoDTO) {
        log.debug("Request to save CompanyInfo : {}", companyInfoDTO);
        CompanyInfo companyInfo = companyInfoMapper.toEntity(companyInfoDTO);
        companyInfo = companyInfoRepository.save(companyInfo);
        return companyInfoMapper.toDto(companyInfo);
    }

    /**
     * Get all the companyInfos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CompanyInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CompanyInfos");
        return companyInfoRepository.findAll(pageable)
            .map(companyInfoMapper::toDto);
    }


    /**
     * Get one companyInfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompanyInfoDTO> findOne(Long id) {
        log.debug("Request to get CompanyInfo : {}", id);
        return companyInfoRepository.findById(id)
            .map(companyInfoMapper::toDto);
    }

    /**
     * Delete the companyInfo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CompanyInfo : {}", id);
        companyInfoRepository.deleteById(id);
    }
}
