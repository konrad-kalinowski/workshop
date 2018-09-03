package com.github.workshop.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.workshop.service.OwnerService;
import com.github.workshop.web.rest.errors.BadRequestAlertException;
import com.github.workshop.web.rest.util.HeaderUtil;
import com.github.workshop.web.rest.util.PaginationUtil;
import com.github.workshop.service.dto.OwnerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Owner.
 */
@RestController
@RequestMapping("/api")
public class OwnerResource {

    private final Logger log = LoggerFactory.getLogger(OwnerResource.class);

    private static final String ENTITY_NAME = "owner";

    private final OwnerService ownerService;

    public OwnerResource(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    /**
     * POST  /owners : Create a new owner.
     *
     * @param ownerDTO the ownerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ownerDTO, or with status 400 (Bad Request) if the owner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/owners")
    @Timed
    public ResponseEntity<OwnerDTO> createOwner(@Valid @RequestBody OwnerDTO ownerDTO) throws URISyntaxException {
        log.debug("REST request to save Owner : {}", ownerDTO);
        if (ownerDTO.getId() != null) {
            throw new BadRequestAlertException("A new owner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OwnerDTO result = ownerService.save(ownerDTO);
        return ResponseEntity.created(new URI("/api/owners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /owners : Updates an existing owner.
     *
     * @param ownerDTO the ownerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ownerDTO,
     * or with status 400 (Bad Request) if the ownerDTO is not valid,
     * or with status 500 (Internal Server Error) if the ownerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/owners")
    @Timed
    public ResponseEntity<OwnerDTO> updateOwner(@Valid @RequestBody OwnerDTO ownerDTO) throws URISyntaxException {
        log.debug("REST request to update Owner : {}", ownerDTO);
        if (ownerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OwnerDTO result = ownerService.save(ownerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ownerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /owners : get all the owners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of owners in body
     */
    @GetMapping("/owners")
    @Timed
    public ResponseEntity<List<OwnerDTO>> getAllOwners(Pageable pageable) {
        log.debug("REST request to get a page of Owners");
        Page<OwnerDTO> page = ownerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/owners");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /owners/:id : get the "id" owner.
     *
     * @param id the id of the ownerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ownerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/owners/{id}")
    @Timed
    public ResponseEntity<OwnerDTO> getOwner(@PathVariable Long id) {
        log.debug("REST request to get Owner : {}", id);
        Optional<OwnerDTO> ownerDTO = ownerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ownerDTO);
    }

    /**
     * DELETE  /owners/:id : delete the "id" owner.
     *
     * @param id the id of the ownerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/owners/{id}")
    @Timed
    public ResponseEntity<Void> deleteOwner(@PathVariable Long id) {
        log.debug("REST request to delete Owner : {}", id);
        ownerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
