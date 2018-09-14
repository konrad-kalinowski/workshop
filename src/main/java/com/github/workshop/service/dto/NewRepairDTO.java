package com.github.workshop.service.dto;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the RepairHistory entity.
 */
public class NewRepairDTO implements Serializable {


    @NotNull
    private LocalDate repairDate;

    @NotNull
    private VehicleDTO vehicle;

    @NotNull
    private List<PartDTO> parts;

    @NotNull
    private List<TaskDTO> tasks;

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

    public List<PartDTO> getParts() {
        return parts;
    }

    public void setParts(List<PartDTO> parts) {
        this.parts = parts;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        NewRepairDTO that = (NewRepairDTO) o;

        return new EqualsBuilder()
            .append(repairDate, that.repairDate)
            .append(vehicle, that.vehicle)
            .append(parts, that.parts)
            .append(tasks, that.tasks)
            .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
            .append(repairDate)
            .append(vehicle)
            .append(parts)
            .append(tasks)
            .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
            .append("repairDate", repairDate)
            .append("vehicle", vehicle)
            .append("parts", parts)
            .append("tasks", tasks)
            .toString();
    }
}
