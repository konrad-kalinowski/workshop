package com.github.workshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Repair.
 */
@Entity
@Table(name = "repair")
public class Repair implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "price", nullable = false)
    private Long price;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("")
    private RepairHistory history;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Task task;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Part part;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public Repair price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Instant getDate() {
        return date;
    }

    public Repair date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public RepairHistory getHistory() {
        return history;
    }

    public Repair history(RepairHistory repairHistory) {
        this.history = repairHistory;
        return this;
    }

    public void setHistory(RepairHistory repairHistory) {
        this.history = repairHistory;
    }

    public Task getTask() {
        return task;
    }

    public Repair task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Part getPart() {
        return part;
    }

    public Repair part(Part part) {
        this.part = part;
        return this;
    }

    public void setPart(Part part) {
        this.part = part;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Repair repair = (Repair) o;
        if (repair.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repair.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Repair{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
