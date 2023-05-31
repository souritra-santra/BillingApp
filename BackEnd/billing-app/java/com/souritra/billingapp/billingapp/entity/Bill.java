package com.souritra.billingapp.billingapp.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Bill {
	
	@Id
	@GeneratedValue
	private long billNo;
	private Date date;
	@ManyToOne
	private Customer customer;
	@OneToMany(mappedBy = "bill")
	private List<Product> products;
	private long total;
	
	protected Bill() {
	}
	
	public Bill(long billNo, Date date, Customer customer, List<Product> products, long total) {
		super();
		this.billNo = billNo;
		this.date = date;
		this.customer = customer;
		this.products = products;
		this.total = total;
	}


	public long getBillNo() {
		return billNo;
	}


	public void setBillNo(long billNo) {
		this.billNo = billNo;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public Customer getCustomer() {
		return customer;
	}


	public void setCustomerId(Customer customer) {
		this.customer = customer;
	}


	public List<Product> getProducts() {
		return products;
	}


	public void setProducts(List<Product> productIds) {
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
		return "Bill [billNo=" + billNo + ", date=" + date + ", customer=" + customer + ", productIds=" + products
				+ ", total=" + total + "]";
	}
	
	
}
