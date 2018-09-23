package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.RepairHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RepairHistory and its DTO RepairHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {VehicleMapper.class, RepairMapper.class})
public interface RepairHistoryMapper extends EntityMapper<RepairHistoryDTO, RepairHistory> {

    RepairHistoryDTO toDto(RepairHistory repairHistory);

    @Mapping(target = "repairs", ignore = true)
    RepairHistory toEntity(RepairHistoryDTO repairHistoryDTO);

    default RepairHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        RepairHistory repairHistory = new RepairHistory();
        repairHistory.setId(id);
        return repairHistory;
    }
}
