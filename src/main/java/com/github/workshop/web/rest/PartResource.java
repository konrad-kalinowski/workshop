package com.github.workshop.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.workshop.service.PartService;
import com.github.workshop.web.rest.errors.BadRequestAlertException;
import com.github.workshop.web.rest.util.HeaderUtil;
import com.github.workshop.web.rest.util.PaginationUtil;
import com.github.workshop.service.dto.PartDTO;
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
 * REST controller for managing Part.
 */
@RestController
@RequestMapping("/api")
public class PartResource {

    private final Logger log = LoggerFactory.getLogger(PartResource.class);

    private static final String ENTITY_NAME = "part";

    private final PartService partService;

    public PartResource(PartService partService) {
        this.partService = partService;
    }

    /**
     * POST  /parts : Create a new part.
     *
     * @param partDTO the partDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partDTO, or with status 400 (Bad Request) if the part has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parts")
    @Timed
    public ResponseEntity<PartDTO> createPart(@Valid @RequestBody PartDTO partDTO) throws URISyntaxException {
        log.debug("REST request to save Part : {}", partDTO);
        if (partDTO.getId() != null) {
            throw new BadRequestAlertException("A new part cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartDTO result = partService.save(partDTO);
        return ResponseEntity.created(new URI("/api/parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parts : Updates an existing part.
     *
     * @param partDTO the partDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partDTO,
     * or with status 400 (Bad Request) if the partDTO is not valid,
     * or with status 500 (Internal Server Error) if the partDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parts")
    @Timed
    public ResponseEntity<PartDTO> updatePart(@Valid @RequestBody PartDTO partDTO) throws URISyntaxException {
        log.debug("REST request to update Part : {}", partDTO);
        if (partDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PartDTO result = partService.save(partDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parts : get all the parts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of parts in body
     */
    @GetMapping("/parts")
    @Timed
    public ResponseEntity<List<PartDTO>> getAllParts(Pageable pageable) {
        log.debug("REST request to get a page of Parts");
        Page<PartDTO> page = partService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/parts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /parts/:id : get the "id" part.
     *
     * @param id the id of the partDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partDTO, or with status 404 (Not Found)
     */
    @GetMapping("/parts/{id}")
    @Timed
    public ResponseEntity<PartDTO> getPart(@PathVariable Long id) {
        log.debug("REST request to get Part : {}", id);
        Optional<PartDTO> partDTO = partService.findOne(id);
        return ResponseUtil.wrapOrNotFound(partDTO);
    }

    /**
     * DELETE  /parts/:id : delete the "id" part.
     *
     * @param id the id of the partDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parts/{id}")
    @Timed
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        log.debug("REST request to delete Part : {}", id);
        partService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
