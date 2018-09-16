package com.github.workshop.web.rest;

import com.github.workshop.WorkshopApp;

import com.github.workshop.domain.Repair;
import com.github.workshop.repository.RepairRepository;
import com.github.workshop.service.RepairService;
import com.github.workshop.service.dto.RepairDTO;
import com.github.workshop.service.mapper.RepairMapper;
import com.github.workshop.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import static com.github.workshop.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RepairResource REST controller.
 *
 * @see RepairResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WorkshopApp.class)
public class RepairResourceIntTest {

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RepairRepository repairRepository;
    @Mock
    private RepairRepository repairRepositoryMock;

    @Autowired
    private RepairMapper repairMapper;
    
    @Mock
    private RepairService repairServiceMock;

    @Autowired
    private RepairService repairService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRepairMockMvc;

    private Repair repair;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepairResource repairResource = new RepairResource(repairService);
        this.restRepairMockMvc = MockMvcBuilders.standaloneSetup(repairResource)
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
    public static Repair createEntity(EntityManager em) {
        Repair repair = new Repair()
            .price(DEFAULT_PRICE)
            .date(DEFAULT_DATE);
        return repair;
    }

    @Before
    public void initTest() {
        repair = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepair() throws Exception {
        int databaseSizeBeforeCreate = repairRepository.findAll().size();

        // Create the Repair
        RepairDTO repairDTO = repairMapper.toDto(repair);
        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isCreated());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeCreate + 1);
        Repair testRepair = repairList.get(repairList.size() - 1);
        assertThat(testRepair.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testRepair.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createRepairWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repairRepository.findAll().size();

        // Create the Repair with an existing ID
        repair.setId(1L);
        RepairDTO repairDTO = repairMapper.toDto(repair);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = repairRepository.findAll().size();
        // set the field null
        repair.setPrice(null);

        // Create the Repair, which fails.
        RepairDTO repairDTO = repairMapper.toDto(repair);

        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = repairRepository.findAll().size();
        // set the field null
        repair.setDate(null);

        // Create the Repair, which fails.
        RepairDTO repairDTO = repairMapper.toDto(repair);

        restRepairMockMvc.perform(post("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRepairs() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);

        // Get all the repairList
        restRepairMockMvc.perform(get("/api/repairs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repair.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    public void getAllRepairsWithEagerRelationshipsIsEnabled() throws Exception {
        RepairResource repairResource = new RepairResource(repairServiceMock);
        when(repairServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restRepairMockMvc = MockMvcBuilders.standaloneSetup(repairResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restRepairMockMvc.perform(get("/api/repairs?eagerload=true"))
        .andExpect(status().isOk());

        verify(repairServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllRepairsWithEagerRelationshipsIsNotEnabled() throws Exception {
        RepairResource repairResource = new RepairResource(repairServiceMock);
            when(repairServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restRepairMockMvc = MockMvcBuilders.standaloneSetup(repairResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restRepairMockMvc.perform(get("/api/repairs?eagerload=true"))
        .andExpect(status().isOk());

            verify(repairServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getRepair() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);

        // Get the repair
        restRepairMockMvc.perform(get("/api/repairs/{id}", repair.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repair.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRepair() throws Exception {
        // Get the repair
        restRepairMockMvc.perform(get("/api/repairs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepair() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);

        int databaseSizeBeforeUpdate = repairRepository.findAll().size();

        // Update the repair
        Repair updatedRepair = repairRepository.findById(repair.getId()).get();
        // Disconnect from session so that the updates on updatedRepair are not directly saved in db
        em.detach(updatedRepair);
        updatedRepair
            .price(UPDATED_PRICE)
            .date(UPDATED_DATE);
        RepairDTO repairDTO = repairMapper.toDto(updatedRepair);

        restRepairMockMvc.perform(put("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isOk());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeUpdate);
        Repair testRepair = repairList.get(repairList.size() - 1);
        assertThat(testRepair.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testRepair.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingRepair() throws Exception {
        int databaseSizeBeforeUpdate = repairRepository.findAll().size();

        // Create the Repair
        RepairDTO repairDTO = repairMapper.toDto(repair);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restRepairMockMvc.perform(put("/api/repairs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repairDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repair in the database
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepair() throws Exception {
        // Initialize the database
        repairRepository.saveAndFlush(repair);

        int databaseSizeBeforeDelete = repairRepository.findAll().size();

        // Get the repair
        restRepairMockMvc.perform(delete("/api/repairs/{id}", repair.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Repair> repairList = repairRepository.findAll();
        assertThat(repairList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repair.class);
        Repair repair1 = new Repair();
        repair1.setId(1L);
        Repair repair2 = new Repair();
        repair2.setId(repair1.getId());
        assertThat(repair1).isEqualTo(repair2);
        repair2.setId(2L);
        assertThat(repair1).isNotEqualTo(repair2);
        repair1.setId(null);
        assertThat(repair1).isNotEqualTo(repair2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepairDTO.class);
        RepairDTO repairDTO1 = new RepairDTO();
        repairDTO1.setId(1L);
        RepairDTO repairDTO2 = new RepairDTO();
        assertThat(repairDTO1).isNotEqualTo(repairDTO2);
        repairDTO2.setId(repairDTO1.getId());
        assertThat(repairDTO1).isEqualTo(repairDTO2);
        repairDTO2.setId(2L);
        assertThat(repairDTO1).isNotEqualTo(repairDTO2);
        repairDTO1.setId(null);
        assertThat(repairDTO1).isNotEqualTo(repairDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(repairMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(repairMapper.fromId(null)).isNull();
    }
}
