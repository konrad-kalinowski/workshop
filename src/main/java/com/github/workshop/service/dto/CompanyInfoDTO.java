package com.github.workshop.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CompanyInfo entity.
 */
public class CompanyInfoDTO implements Serializable {

    private Long id;

    private String contactLine1;

    private String contactLine2;

    private String phoneNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContactLine1() {
        return contactLine1;
    }

    public void setContactLine1(String contactLine1) {
        this.contactLine1 = contactLine1;
    }

    public String getContactLine2() {
        return contactLine2;
    }

    public void setContactLine2(String contactLine2) {
        this.contactLine2 = contactLine2;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CompanyInfoDTO companyInfoDTO = (CompanyInfoDTO) o;
        if (companyInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyInfoDTO{" +
            "id=" + getId() +
            ", contactLine1='" + getContactLine1() + "'" +
            ", contactLine2='" + getContactLine2() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            "}";
    }
}
