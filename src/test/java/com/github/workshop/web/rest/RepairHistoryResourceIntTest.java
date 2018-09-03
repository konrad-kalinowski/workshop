package com.github.workshop.web.rest;

import com.github.workshop.WorkshopApp;

import com.github.workshop.domain.RepairHistory;
import com.github.workshop.repository.RepairHistoryRepository;
import com.github.workshop.service.RepairHistoryService;
import com.github.workshop.service.dto.RepairHistoryDTO;
import com.github.workshop.service.mapper.RepairHistoryMapper;
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
 * Test class for the RepairHistoryResource REST controller.
 *
 * @see RepairHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WorkshopApp.class)
public class RepairHistoryResourceIntTest {

    @Autowired
    private RepairHistoryRepository repairHistoryRepository;


    @Autowired
    private RepairHistoryMapper repairHistoryMapper;
    

    @Autowired
    private RepairHistoryService repairHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRepairHistoryMockMvc;

    private RepairHistory repairHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepairHistoryResource repairHistoryResource = new RepairHistoryResource(repairHistoryService);
        this.restRepairHistoryMockMvc = MockMvcBuilders.standaloneSetup(repairHistoryResource)
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
    public static RepairHistory createEntity(EntityManager em) {
        RepairHistory repairHistory = new RepairHistory();
        return repairHistory;
    }

    @Before
    public void initTest() {
        repairHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepairHistory() throws Exception {
        int databaseSizeBeforeCreate = repairHistoryRepository.findAll().size();

        // Create the RepairHistory
        RepairHistoryDTO repairHistoryDTO = repairHistoryMapper.toDto(repairHistory);
        restRepairHistoryMockMvc.perform(post("/api/repair-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the RepairHistory in the database
        List<RepairHistory> repairHistoryList = repairHistoryRepository.findAll();
        assertThat(repairHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        RepairHistory testRepairHistory = repairHistoryList.get(repairHistoryList.size() - 1);
    }

    @Test
    @Transactional
    public void createRepairHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repairHistoryRepository.findAll().size();

        // Create the RepairHistory with an existing ID
        repairHistory.setId(1L);
        RepairHistoryDTO repairHistoryDTO = repairHistoryMapper.toDto(repairHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepairHistoryMockMvc.perform(post("/api/repair-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RepairHistory in the database
        List<RepairHistory> repairHistoryList = repairHistoryRepository.findAll();
        assertThat(repairHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRepairHistories() throws Exception {
        // Initialize the database
        repairHistoryRepository.saveAndFlush(repairHistory);

        // Get all the repairHistoryList
        restRepairHistoryMockMvc.perform(get("/api/repair-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repairHistory.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getRepairHistory() throws Exception {
        // Initialize the database
        repairHistoryRepository.saveAndFlush(repairHistory);

        // Get the repairHistory
        restRepairHistoryMockMvc.perform(get("/api/repair-histories/{id}", repairHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repairHistory.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRepairHistory() throws Exception {
        // Get the repairHistory
        restRepairHistoryMockMvc.perform(get("/api/repair-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepairHistory() throws Exception {
        // Initialize the database
        repairHistoryRepository.saveAndFlush(repairHistory);

        int databaseSizeBeforeUpdate = repairHistoryRepository.findAll().size();

        // Update the repairHistory
        RepairHistory updatedRepairHistory = repairHistoryRepository.findById(repairHistory.getId()).get();
        // Disconnect from session so that the updates on updatedRepairHistory are not directly saved in db
        em.detach(updatedRepairHistory);
        RepairHistoryDTO repairHistoryDTO = repairHistoryMapper.toDto(updatedRepairHistory);

        restRepairHistoryMockMvc.perform(put("/api/repair-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the RepairHistory in the database
        List<RepairHistory> repairHistoryList = repairHistoryRepository.findAll();
        assertThat(repairHistoryList).hasSize(databaseSizeBeforeUpdate);
        RepairHistory testRepairHistory = repairHistoryList.get(repairHistoryList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRepairHistory() throws Exception {
        int databaseSizeBeforeUpdate = repairHistoryRepository.findAll().size();

        // Create the RepairHistory
        RepairHistoryDTO repairHistoryDTO = repairHistoryMapper.toDto(repairHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restRepairHistoryMockMvc.perform(put("/api/repair-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RepairHistory in the database
        List<RepairHistory> repairHistoryList = repairHistoryRepository.findAll();
        assertThat(repairHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepairHistory() throws Exception {
        // Initialize the database
        repairHistoryRepository.saveAndFlush(repairHistory);

        int databaseSizeBeforeDelete = repairHistoryRepository.findAll().size();

        // Get the repairHistory
        restRepairHistoryMockMvc.perform(delete("/api/repair-histories/{id}", repairHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RepairHistory> repairHistoryList = repairHistoryRepository.findAll();
        assertThat(repairHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepairHistory.class);
        RepairHistory repairHistory1 = new RepairHistory();
        repairHistory1.setId(1L);
        RepairHistory repairHistory2 = new RepairHistory();
        repairHistory2.setId(repairHistory1.getId());
        assertThat(repairHistory1).isEqualTo(repairHistory2);
        repairHistory2.setId(2L);
        assertThat(repairHistory1).isNotEqualTo(repairHistory2);
        repairHistory1.setId(null);
        assertThat(repairHistory1).isNotEqualTo(repairHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepairHistoryDTO.class);
        RepairHistoryDTO repairHistoryDTO1 = new RepairHistoryDTO();
        repairHistoryDTO1.setId(1L);
        RepairHistoryDTO repairHistoryDTO2 = new RepairHistoryDTO();
        assertThat(repairHistoryDTO1).isNotEqualTo(repairHistoryDTO2);
        repairHistoryDTO2.setId(repairHistoryDTO1.getId());
        assertThat(repairHistoryDTO1).isEqualTo(repairHistoryDTO2);
        repairHistoryDTO2.setId(2L);
        assertThat(repairHistoryDTO1).isNotEqualTo(repairHistoryDTO2);
        repairHistoryDTO1.setId(null);
        assertThat(repairHistoryDTO1).isNotEqualTo(repairHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(repairHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(repairHistoryMapper.fromId(null)).isNull();
    }
}
