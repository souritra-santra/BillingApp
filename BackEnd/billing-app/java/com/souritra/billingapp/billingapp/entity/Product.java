package com.souritra.billingapp.billingapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Product {

	@Id
	@GeneratedValue
	private long productId;
	private String name;
	private long price;
	private String type;
	private String size;
	@OneToMany(mappedBy = "product")
	@JsonManagedReference("product-billedProduct")
	private List<BilledProduct> billedProduct;

	protected Product() {
	}

	public Product(long id, String name, long price, String type, String size) {
		super();
		this.productId = id;
		this.name = name;
		this.price = price;
		this.type = type;
		this.size = size;
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

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", name=" + name + ", price=" + price + ", type=" + type + "]";
	}

}
