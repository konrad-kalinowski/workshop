package com.github.workshop.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.workshop.service.CompanyInfoService;
import com.github.workshop.web.rest.errors.BadRequestAlertException;
import com.github.workshop.web.rest.util.HeaderUtil;
import com.github.workshop.web.rest.util.PaginationUtil;
import com.github.workshop.service.dto.CompanyInfoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CompanyInfo.
 */
@RestController
@RequestMapping("/api")
public class CompanyInfoResource {

    private final Logger log = LoggerFactory.getLogger(CompanyInfoResource.class);

    private static final String ENTITY_NAME = "companyInfo";

    private final CompanyInfoService companyInfoService;

    public CompanyInfoResource(CompanyInfoService companyInfoService) {
        this.companyInfoService = companyInfoService;
    }

    /**
     * POST  /company-infos : Create a new companyInfo.
     *
     * @param companyInfoDTO the companyInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companyInfoDTO, or with status 400 (Bad Request) if the companyInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/company-infos")
    @Timed
    public ResponseEntity<CompanyInfoDTO> createCompanyInfo(@RequestBody CompanyInfoDTO companyInfoDTO) throws URISyntaxException {
        log.debug("REST request to save CompanyInfo : {}", companyInfoDTO);
        if (companyInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new companyInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyInfoDTO result = companyInfoService.save(companyInfoDTO);
        return ResponseEntity.created(new URI("/api/company-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /company-infos : Updates an existing companyInfo.
     *
     * @param companyInfoDTO the companyInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companyInfoDTO,
     * or with status 400 (Bad Request) if the companyInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the companyInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/company-infos")
    @Timed
    public ResponseEntity<CompanyInfoDTO> updateCompanyInfo(@RequestBody CompanyInfoDTO companyInfoDTO) throws URISyntaxException {
        log.debug("REST request to update CompanyInfo : {}", companyInfoDTO);
        if (companyInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompanyInfoDTO result = companyInfoService.save(companyInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companyInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /company-infos : get all the companyInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companyInfos in body
     */
    @GetMapping("/company-infos")
    @Timed
    public ResponseEntity<List<CompanyInfoDTO>> getAllCompanyInfos(Pageable pageable) {
        log.debug("REST request to get a page of CompanyInfos");
        Page<CompanyInfoDTO> page = companyInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/company-infos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /company-infos/:id : get the "id" companyInfo.
     *
     * @param id the id of the companyInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companyInfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/company-infos/{id}")
    @Timed
    public ResponseEntity<CompanyInfoDTO> getCompanyInfo(@PathVariable Long id) {
        log.debug("REST request to get CompanyInfo : {}", id);
        Optional<CompanyInfoDTO> companyInfoDTO = companyInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(companyInfoDTO);
    }

    /**
     * DELETE  /company-infos/:id : delete the "id" companyInfo.
     *
     * @param id the id of the companyInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/company-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompanyInfo(@PathVariable Long id) {
        log.debug("REST request to delete CompanyInfo : {}", id);
        companyInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
