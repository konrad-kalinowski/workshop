package com.github.workshop.service.dto;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

/**
 * A DTO for the RepairHistory entity.
 */
public class NewRepairDTO implements Serializable {


    @NotNull
    private LocalDate repairDate;

    @NotNull
    private VehicleDTO vehicle;

    @NotNull
    private Set<ItemDTO> items;

    public LocalDate getRepairDate() {
        return repairDate;
    }

    public void setRepairDate(LocalDate repairDate) {
        this.repairDate = repairDate;
    }

    public VehicleDTO getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleDTO vehicle) {
        this.vehicle = vehicle;
    }

    public Set<ItemDTO> getItems() {
        return items;
    }

    public void setItems(Set<ItemDTO> items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        NewRepairDTO that = (NewRepairDTO) o;

        return new EqualsBuilder()
            .append(repairDate, that.repairDate)
            .append(vehicle, that.vehicle)
            .append(items, that.items)
            .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
            .append(repairDate)
            .append(vehicle)
            .append(items)
            .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
            .append("repairDate", repairDate)
            .append("vehicle", vehicle)
            .append("items", items)
            .toString();
    }
}
