package com.github.workshop.repository;

import com.github.workshop.domain.CompanyInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompanyInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyInfoRepository extends JpaRepository<CompanyInfo, Long> {

}
