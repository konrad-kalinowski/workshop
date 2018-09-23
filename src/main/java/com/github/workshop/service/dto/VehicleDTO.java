package com.github.workshop.service.dto;

import com.github.workshop.domain.Owner;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Vehicle entity.
 */
public class VehicleDTO implements Serializable {

    private Long id;

    @NotNull
    private String registrationNumber;

    @NotNull
    private String brand;

    @NotNull
    private String model;

    private Owner owner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VehicleDTO vehicleDTO = (VehicleDTO) o;
        if (vehicleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleDTO{" +
            "id=" + getId() +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", brand='" + getBrand() + "'" +
            ", model='" + getModel() + "'" +
            ", owner=" + getOwner() +
            "}";
    }
}
