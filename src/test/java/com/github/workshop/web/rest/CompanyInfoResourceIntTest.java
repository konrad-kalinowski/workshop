package com.github.workshop.web.rest;

import com.github.workshop.WorkshopApp;

import com.github.workshop.domain.CompanyInfo;
import com.github.workshop.repository.CompanyInfoRepository;
import com.github.workshop.service.CompanyInfoService;
import com.github.workshop.service.dto.CompanyInfoDTO;
import com.github.workshop.service.mapper.CompanyInfoMapper;
import com.github.workshop.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.github.workshop.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CompanyInfoResource REST controller.
 *
 * @see CompanyInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WorkshopApp.class)
public class CompanyInfoResourceIntTest {

    private static final String DEFAULT_CONTACT_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private CompanyInfoRepository companyInfoRepository;


    @Autowired
    private CompanyInfoMapper companyInfoMapper;
    

    @Autowired
    private CompanyInfoService companyInfoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCompanyInfoMockMvc;

    private CompanyInfo companyInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyInfoResource companyInfoResource = new CompanyInfoResource(companyInfoService);
        this.restCompanyInfoMockMvc = MockMvcBuilders.standaloneSetup(companyInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CompanyInfo createEntity(EntityManager em) {
        CompanyInfo companyInfo = new CompanyInfo()
            .contactLine1(DEFAULT_CONTACT_LINE_1)
            .contactLine2(DEFAULT_CONTACT_LINE_2)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return companyInfo;
    }

    @Before
    public void initTest() {
        companyInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanyInfo() throws Exception {
        int databaseSizeBeforeCreate = companyInfoRepository.findAll().size();

        // Create the CompanyInfo
        CompanyInfoDTO companyInfoDTO = companyInfoMapper.toDto(companyInfo);
        restCompanyInfoMockMvc.perform(post("/api/company-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the CompanyInfo in the database
        List<CompanyInfo> companyInfoList = companyInfoRepository.findAll();
        assertThat(companyInfoList).hasSize(databaseSizeBeforeCreate + 1);
        CompanyInfo testCompanyInfo = companyInfoList.get(companyInfoList.size() - 1);
        assertThat(testCompanyInfo.getContactLine1()).isEqualTo(DEFAULT_CONTACT_LINE_1);
        assertThat(testCompanyInfo.getContactLine2()).isEqualTo(DEFAULT_CONTACT_LINE_2);
        assertThat(testCompanyInfo.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createCompanyInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyInfoRepository.findAll().size();

        // Create the CompanyInfo with an existing ID
        companyInfo.setId(1L);
        CompanyInfoDTO companyInfoDTO = companyInfoMapper.toDto(companyInfo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyInfoMockMvc.perform(post("/api/company-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyInfo in the database
        List<CompanyInfo> companyInfoList = companyInfoRepository.findAll();
        assertThat(companyInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompanyInfos() throws Exception {
        // Initialize the database
        companyInfoRepository.saveAndFlush(companyInfo);

        // Get all the companyInfoList
        restCompanyInfoMockMvc.perform(get("/api/company-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companyInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].contactLine1").value(hasItem(DEFAULT_CONTACT_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].contactLine2").value(hasItem(DEFAULT_CONTACT_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())));
    }
    

    @Test
    @Transactional
    public void getCompanyInfo() throws Exception {
        // Initialize the database
        companyInfoRepository.saveAndFlush(companyInfo);

        // Get the companyInfo
        restCompanyInfoMockMvc.perform(get("/api/company-infos/{id}", companyInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companyInfo.getId().intValue()))
            .andExpect(jsonPath("$.contactLine1").value(DEFAULT_CONTACT_LINE_1.toString()))
            .andExpect(jsonPath("$.contactLine2").value(DEFAULT_CONTACT_LINE_2.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCompanyInfo() throws Exception {
        // Get the companyInfo
        restCompanyInfoMockMvc.perform(get("/api/company-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanyInfo() throws Exception {
        // Initialize the database
        companyInfoRepository.saveAndFlush(companyInfo);

        int databaseSizeBeforeUpdate = companyInfoRepository.findAll().size();

        // Update the companyInfo
        CompanyInfo updatedCompanyInfo = companyInfoRepository.findById(companyInfo.getId()).get();
        // Disconnect from session so that the updates on updatedCompanyInfo are not directly saved in db
        em.detach(updatedCompanyInfo);
        updatedCompanyInfo
            .contactLine1(UPDATED_CONTACT_LINE_1)
            .contactLine2(UPDATED_CONTACT_LINE_2)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        CompanyInfoDTO companyInfoDTO = companyInfoMapper.toDto(updatedCompanyInfo);

        restCompanyInfoMockMvc.perform(put("/api/company-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyInfoDTO)))
            .andExpect(status().isOk());

        // Validate the CompanyInfo in the database
        List<CompanyInfo> companyInfoList = companyInfoRepository.findAll();
        assertThat(companyInfoList).hasSize(databaseSizeBeforeUpdate);
        CompanyInfo testCompanyInfo = companyInfoList.get(companyInfoList.size() - 1);
        assertThat(testCompanyInfo.getContactLine1()).isEqualTo(UPDATED_CONTACT_LINE_1);
        assertThat(testCompanyInfo.getContactLine2()).isEqualTo(UPDATED_CONTACT_LINE_2);
        assertThat(testCompanyInfo.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanyInfo() throws Exception {
        int databaseSizeBeforeUpdate = companyInfoRepository.findAll().size();

        // Create the CompanyInfo
        CompanyInfoDTO companyInfoDTO = companyInfoMapper.toDto(companyInfo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCompanyInfoMockMvc.perform(put("/api/company-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyInfo in the database
        List<CompanyInfo> companyInfoList = companyInfoRepository.findAll();
        assertThat(companyInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompanyInfo() throws Exception {
        // Initialize the database
        companyInfoRepository.saveAndFlush(companyInfo);

        int databaseSizeBeforeDelete = companyInfoRepository.findAll().size();

        // Get the companyInfo
        restCompanyInfoMockMvc.perform(delete("/api/company-infos/{id}", companyInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompanyInfo> companyInfoList = companyInfoRepository.findAll();
        assertThat(companyInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyInfo.class);
        CompanyInfo companyInfo1 = new CompanyInfo();
        companyInfo1.setId(1L);
        CompanyInfo companyInfo2 = new CompanyInfo();
        companyInfo2.setId(companyInfo1.getId());
        assertThat(companyInfo1).isEqualTo(companyInfo2);
        companyInfo2.setId(2L);
        assertThat(companyInfo1).isNotEqualTo(companyInfo2);
        companyInfo1.setId(null);
        assertThat(companyInfo1).isNotEqualTo(companyInfo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyInfoDTO.class);
        CompanyInfoDTO companyInfoDTO1 = new CompanyInfoDTO();
        companyInfoDTO1.setId(1L);
        CompanyInfoDTO companyInfoDTO2 = new CompanyInfoDTO();
        assertThat(companyInfoDTO1).isNotEqualTo(companyInfoDTO2);
        companyInfoDTO2.setId(companyInfoDTO1.getId());
        assertThat(companyInfoDTO1).isEqualTo(companyInfoDTO2);
        companyInfoDTO2.setId(2L);
        assertThat(companyInfoDTO1).isNotEqualTo(companyInfoDTO2);
        companyInfoDTO1.setId(null);
        assertThat(companyInfoDTO1).isNotEqualTo(companyInfoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(companyInfoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(companyInfoMapper.fromId(null)).isNull();
    }
}
