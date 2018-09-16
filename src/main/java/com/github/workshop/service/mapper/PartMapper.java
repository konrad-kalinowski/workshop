package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.PartDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Part and its DTO PartDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PartMapper extends EntityMapper<PartDTO, Part> {


    @Mapping(target = "repairs", ignore = true)
    Part toEntity(PartDTO partDTO);

    default Part fromId(Long id) {
        if (id == null) {
            return null;
        }
        Part part = new Part();
        part.setId(id);
        return part;
    }
}
