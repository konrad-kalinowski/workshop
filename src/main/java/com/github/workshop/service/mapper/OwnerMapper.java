package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.OwnerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Owner and its DTO OwnerDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OwnerMapper extends EntityMapper<OwnerDTO, Owner> {


    @Mapping(target = "vehicles", ignore = true)
    Owner toEntity(OwnerDTO ownerDTO);

    default Owner fromId(Long id) {
        if (id == null) {
            return null;
        }
        Owner owner = new Owner();
        owner.setId(id);
        return owner;
    }
}
