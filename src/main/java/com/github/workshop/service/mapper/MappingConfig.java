package com.github.workshop.service.mapper;

import org.mapstruct.CollectionMappingStrategy;

@org.mapstruct.MapperConfig(
    componentModel = "spring",
    collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface MappingConfig {

}
