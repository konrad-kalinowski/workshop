package com.github.workshop.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CompanyInfo.
 */
@Entity
@Table(name = "company_info")
public class CompanyInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contact_line_1")
    private String contactLine1;

    @Column(name = "contact_line_2")
    private String contactLine2;

    @Column(name = "phone_number")
    private String phoneNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContactLine1() {
        return contactLine1;
    }

    public CompanyInfo contactLine1(String contactLine1) {
        this.contactLine1 = contactLine1;
        return this;
    }

    public void setContactLine1(String contactLine1) {
        this.contactLine1 = contactLine1;
    }

    public String getContactLine2() {
        return contactLine2;
    }

    public CompanyInfo contactLine2(String contactLine2) {
        this.contactLine2 = contactLine2;
        return this;
    }

    public void setContactLine2(String contactLine2) {
        this.contactLine2 = contactLine2;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public CompanyInfo phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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
        CompanyInfo companyInfo = (CompanyInfo) o;
        if (companyInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyInfo{" +
            "id=" + getId() +
            ", contactLine1='" + getContactLine1() + "'" +
            ", contactLine2='" + getContactLine2() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            "}";
    }
}
