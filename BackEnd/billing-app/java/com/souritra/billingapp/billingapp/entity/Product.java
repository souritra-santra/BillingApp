package com.souritra.billingapp.billingapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Product {

	@Id
	@GeneratedValue
	private long productId;
	private String name;
	private long price;
	private String type;
	@ManyToOne
	private Bill bill;
	
	public Bill getBill() {
		return bill;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	protected Product() {}
	
	public Product(long id, String name, long price, String type) {
		super();
		this.productId = id;
		this.name = name;
		this.price = price;
		this.type = type;
	}


	public long getProductId() {
		return productId;
	}


	public void setProductId(long id) {
		this.productId = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public long getPrice() {
		return price;
	}


	public void setPrice(long price) {
		this.price = price;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	@Override
	public String toString() {
		return "Product [productId=" + productId + ", name=" + name + ", price=" + price + ", type=" + type + "]";
	}
	
	
	
	
	
}
