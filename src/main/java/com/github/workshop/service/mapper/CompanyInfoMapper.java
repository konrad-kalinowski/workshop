package com.github.workshop.service.mapper;

import com.github.workshop.domain.*;
import com.github.workshop.service.dto.CompanyInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CompanyInfo and its DTO CompanyInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CompanyInfoMapper extends EntityMapper<CompanyInfoDTO, CompanyInfo> {



    default CompanyInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        CompanyInfo companyInfo = new CompanyInfo();
        companyInfo.setId(id);
        return companyInfo;
    }
}
