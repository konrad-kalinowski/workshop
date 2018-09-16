package com.github.workshop.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Repair entity.
 */
public class RepairDTO implements Serializable {

    private Long id;

    @NotNull
    private Long price;

    @NotNull
    private Instant date;

    private Long historyId;

    private Long taskId;

    private Set<PartDTO> parts = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long repairHistoryId) {
        this.historyId = repairHistoryId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Set<PartDTO> getParts() {
        return parts;
    }

    public void setParts(Set<PartDTO> parts) {
        this.parts = parts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RepairDTO repairDTO = (RepairDTO) o;
        if (repairDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repairDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RepairDTO{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", date='" + getDate() + "'" +
            ", history=" + getHistoryId() +
            ", task=" + getTaskId() +
            "}";
    }
}
