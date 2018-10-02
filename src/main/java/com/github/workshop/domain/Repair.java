package com.github.workshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
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
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @ManyToMany
    @JoinTable(name = "repair_item",
               joinColumns = @JoinColumn(name = "repairs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "items_id", referencedColumnName = "id"))
    private Set<Item> items = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("repairs")
    private RepairHistory history;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Item> getItems() {
        return items;
    }

    public Repair items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public Repair addItem(Item item) {
        this.items.add(item);
        item.getRepairs().add(this);
        return this;
    }

    public Repair removeItem(Item item) {
        this.items.remove(item);
        item.getRepairs().remove(this);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
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
            ", date='" + getDate() + "'" +
            "}";
    }
}
