package com.github.workshop.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the RepairHistory entity.
 */
public class RepairHistoryDTO implements Serializable {

    private Long id;

    private Long vehicleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RepairHistoryDTO repairHistoryDTO = (RepairHistoryDTO) o;
        if (repairHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repairHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RepairHistoryDTO{" +
            "id=" + getId() +
            ", vehicle=" + getVehicleId() +
            "}";
    }
}
