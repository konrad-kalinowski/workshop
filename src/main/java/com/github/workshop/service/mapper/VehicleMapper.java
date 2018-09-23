package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.VehicleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vehicle and its DTO VehicleDTO.
 */
@Mapper(componentModel = "spring", uses = {OwnerMapper.class})
public interface VehicleMapper extends EntityMapper<VehicleDTO, Vehicle> {

    VehicleDTO toDto(Vehicle vehicle);

    @Mapping(target = "history", ignore = true)
    Vehicle toEntity(VehicleDTO vehicleDTO);

    default Vehicle fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vehicle vehicle = new Vehicle();
        vehicle.setId(id);
        return vehicle;
    }
}
