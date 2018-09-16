package com.github.workshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Part.
 */
@Entity
@Table(name = "part")
public class Part implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "parts")
    @JsonIgnore
    private Set<Repair> repairs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Part name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Repair> getRepairs() {
        return repairs;
    }

    public Part repairs(Set<Repair> repairs) {
        this.repairs = repairs;
        return this;
    }

    public Part addRepair(Repair repair) {
        this.repairs.add(repair);
        repair.getParts().add(this);
        return this;
    }

    public Part removeRepair(Repair repair) {
        this.repairs.remove(repair);
        repair.getParts().remove(this);
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
        Part part = (Part) o;
        if (part.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), part.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Part{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
