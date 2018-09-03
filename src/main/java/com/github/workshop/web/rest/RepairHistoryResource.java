package com.github.workshop.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.workshop.service.RepairHistoryService;
import com.github.workshop.web.rest.errors.BadRequestAlertException;
import com.github.workshop.web.rest.util.HeaderUtil;
import com.github.workshop.web.rest.util.PaginationUtil;
import com.github.workshop.service.dto.RepairHistoryDTO;
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
 * REST controller for managing RepairHistory.
 */
@RestController
@RequestMapping("/api")
public class RepairHistoryResource {

    private final Logger log = LoggerFactory.getLogger(RepairHistoryResource.class);

    private static final String ENTITY_NAME = "repairHistory";

    private final RepairHistoryService repairHistoryService;

    public RepairHistoryResource(RepairHistoryService repairHistoryService) {
        this.repairHistoryService = repairHistoryService;
    }

    /**
     * POST  /repair-histories : Create a new repairHistory.
     *
     * @param repairHistoryDTO the repairHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new repairHistoryDTO, or with status 400 (Bad Request) if the repairHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/repair-histories")
    @Timed
    public ResponseEntity<RepairHistoryDTO> createRepairHistory(@RequestBody RepairHistoryDTO repairHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save RepairHistory : {}", repairHistoryDTO);
        if (repairHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new repairHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepairHistoryDTO result = repairHistoryService.save(repairHistoryDTO);
        return ResponseEntity.created(new URI("/api/repair-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /repair-histories : Updates an existing repairHistory.
     *
     * @param repairHistoryDTO the repairHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated repairHistoryDTO,
     * or with status 400 (Bad Request) if the repairHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the repairHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/repair-histories")
    @Timed
    public ResponseEntity<RepairHistoryDTO> updateRepairHistory(@RequestBody RepairHistoryDTO repairHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update RepairHistory : {}", repairHistoryDTO);
        if (repairHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepairHistoryDTO result = repairHistoryService.save(repairHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, repairHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /repair-histories : get all the repairHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of repairHistories in body
     */
    @GetMapping("/repair-histories")
    @Timed
    public ResponseEntity<List<RepairHistoryDTO>> getAllRepairHistories(Pageable pageable) {
        log.debug("REST request to get a page of RepairHistories");
        Page<RepairHistoryDTO> page = repairHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/repair-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /repair-histories/:id : get the "id" repairHistory.
     *
     * @param id the id of the repairHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the repairHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/repair-histories/{id}")
    @Timed
    public ResponseEntity<RepairHistoryDTO> getRepairHistory(@PathVariable Long id) {
        log.debug("REST request to get RepairHistory : {}", id);
        Optional<RepairHistoryDTO> repairHistoryDTO = repairHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(repairHistoryDTO);
    }

    /**
     * DELETE  /repair-histories/:id : delete the "id" repairHistory.
     *
     * @param id the id of the repairHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/repair-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteRepairHistory(@PathVariable Long id) {
        log.debug("REST request to delete RepairHistory : {}", id);
        repairHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
