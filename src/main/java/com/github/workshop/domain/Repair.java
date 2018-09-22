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
    @Column(name = "price", nullable = false)
    private Long price;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @ManyToMany
    @JoinTable(name = "repair_part",
               joinColumns = @JoinColumn(name = "repairs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "parts_id", referencedColumnName = "id"))
    private Set<Part> parts = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "repair_task",
               joinColumns = @JoinColumn(name = "repairs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tasks_id", referencedColumnName = "id"))
    private Set<Task> tasks = new HashSet<>();

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

    public Set<Part> getParts() {
        return parts;
    }

    public Repair parts(Set<Part> parts) {
        this.parts = parts;
        return this;
    }

    public Repair addPart(Part part) {
        this.parts.add(part);
        return this;
    }

    public Repair removePart(Part part) {
        this.parts.remove(part);
        return this;
    }

    public void setParts(Set<Part> parts) {
        this.parts = parts;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Repair tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Repair addTask(Task task) {
        this.tasks.add(task);
        return this;
    }

    public Repair removeTask(Task task) {
        this.tasks.remove(task);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
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
            ", price=" + getPrice() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
