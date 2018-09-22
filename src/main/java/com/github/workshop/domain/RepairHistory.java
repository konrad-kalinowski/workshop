package com.github.workshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A RepairHistory.
 */
@Entity
@Table(name = "repair_history")
public class RepairHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Vehicle vehicle;

    @OneToMany(mappedBy = "history")
    private Set<Repair> repairs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public RepairHistory vehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Set<Repair> getRepairs() {
        return repairs;
    }

    public RepairHistory repairs(Set<Repair> repairs) {
        this.repairs = repairs;
        return this;
    }

    public RepairHistory addRepair(Repair repair) {
        this.repairs.add(repair);
        repair.setHistory(this);
        return this;
    }

    public RepairHistory removeRepair(Repair repair) {
        this.repairs.remove(repair);
        repair.setHistory(null);
        return this;
    }

    public void setRepairs(Set<Repair> repairs) {
        this.repairs = repairs;
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
        RepairHistory repairHistory = (RepairHistory) o;
        if (repairHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repairHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RepairHistory{" +
            "id=" + getId() +
            "}";
    }
}
