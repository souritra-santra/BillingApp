package com.souritra.billingapp.billingapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.Data;

@Data
@Entity
public class BilledProduct {
	@Id
	@GeneratedValue
	private long billedProductId;
	@ManyToOne
	@JsonBackReference("product-billedProduct")
	private Product product;
	private String name;
	private long price;
//	private String size;
	private int quantity;
	private long value;
	@ManyToOne
	@JsonBackReference("billedProduct-bill")
	private Bill bill;

	@Transient
	private long productId;

	protected BilledProduct() {
	}

	public BilledProduct(long billedProductId, Product product, String name, int quantity, long value, Bill bill) {
		super();
		this.billedProductId = billedProductId;
		this.product = product;
		this.name = name;
//		this.size = size;
		this.quantity = quantity;
		this.value = value;
		this.bill = bill;
	}

}
