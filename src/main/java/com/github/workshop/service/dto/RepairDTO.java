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
    private Instant date;

    private Set<ItemDTO> items = new HashSet<>();

    private Long historyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<ItemDTO> getItems() {
        return items;
    }

    public void setItems(Set<ItemDTO> items) {
        this.items = items;
    }

    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long repairHistoryId) {
        this.historyId = repairHistoryId;
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
            ", date='" + getDate() + "'" +
            ", history=" + getHistoryId() +
            "}";
    }
}
