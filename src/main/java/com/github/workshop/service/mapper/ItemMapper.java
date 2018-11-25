package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.ItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Item and its DTO ItemDTO.
 */
@Mapper(componentModel = "spring", uses = {RepairMapper.class})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

    @Mapping(source = "repair.id", target = "repairId")
    ItemDTO toDto(Item item);

    @Mapping(source = "repairId", target = "repair")
    Item toEntity(ItemDTO itemDTO);

    default Item fromId(Long id) {
        if (id == null) {
            return null;
        }
        Item item = new Item();
        item.setId(id);
        return item;
    }
}
