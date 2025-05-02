package com.souritra.billingapp.billingapp.entity;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Bill {

	@Id
	@GeneratedValue
	private long billNo;
	@ManyToOne
	@JsonBackReference("bill-customer")
	private Customer customer;
	@OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference("billedProduct-bill")
	private List<BilledProduct> products;
	private String status;
	private long totalQty;
	private long total;
	private Timestamp billingDtTime;
	private long disTotal;
	private double discount;
	private long dueAmt;
	private long paidAmt;
	private String paymentM;

	public Bill() {
	}

	public Bill(Customer customer, String status, long totalQty, long total, Timestamp billingDtTime) {
		super();
		this.customer = customer;
		this.status = status;
		this.totalQty = totalQty;
		this.total = total;
		this.billingDtTime = billingDtTime;
	}

	public long getBillNo() {
		return billNo;
	}

	public void setBillNo(long billNo) {
		this.billNo = billNo;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomerId(Customer customer) {
		this.customer = customer;
	}

	public List<BilledProduct> getProducts() {
		return products;
	}

	public void setProducts(List<BilledProduct> productIds) {
		this.products = productIds;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "Bill [billNo=" + billNo + ", billingDtTime=" + billingDtTime + ", customer=" + customer
				+ ", productIds=" + products + ", total=" + total + "]";
	}

}
