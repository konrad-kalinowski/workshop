package com.github.workshop.service;

import com.github.workshop.service.dto.VehicleDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Vehicle.
 */
public interface VehicleService {

    /**
     * Save a vehicle.
     *
     * @param vehicleDTO the entity to save

     * @return the persisted entity
     */
    VehicleDTO save(VehicleDTO vehicleDTO);

    /**
     * Get all the vehicles.
     *
     *
     * @param ownerId
     * @param pageable the pagination information
     * @return the li
     *
     * st of entities
     */
    Page<VehicleDTO> findAll(Long ownerId, Pageable pageable);


    /**
     * Get the "id" vehicle.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<VehicleDTO> findOne(Long id);

    /**
     * Delete the "id" vehicle.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
