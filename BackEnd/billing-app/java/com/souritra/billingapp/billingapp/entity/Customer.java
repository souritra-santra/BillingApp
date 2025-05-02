package com.souritra.billingapp.billingapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Customer {

	@Id
	@GeneratedValue
	private long customerId;
	private String name;
	private String mobileNo;
	private String address;
	@OneToMany(mappedBy = "customer")
	@JsonManagedReference("bill-customer")
	private List<Bill> bills;
	private long due;

	protected Customer() {
		// TODO Auto-generated constructor stub
	}

	public Customer(long customerId, String name, String mobileNoString) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.mobileNo = mobileNoString;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobileNoString() {
		return mobileNo;
	}

	public void setMobileNoString(String mobileNoString) {
		this.mobileNo = mobileNoString;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", name=" + name + ", mobileNoString=" + mobileNo + ", address="
				+ address + "]";
	}

}
