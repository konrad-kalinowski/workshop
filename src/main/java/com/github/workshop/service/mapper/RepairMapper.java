package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.RepairDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Repair and its DTO RepairDTO.
 */
@Mapper(componentModel = "spring", uses = {PartMapper.class, TaskMapper.class, RepairHistoryMapper.class})
public interface RepairMapper extends EntityMapper<RepairDTO, Repair> {

    @Mapping(source = "history.id", target = "historyId")
    RepairDTO toDto(Repair repair);

    @Mapping(source = "historyId", target = "history")
    Repair toEntity(RepairDTO repairDTO);

    default Repair fromId(Long id) {
        if (id == null) {
            return null;
        }
        Repair repair = new Repair();
        repair.setId(id);
        return repair;
    }
}
