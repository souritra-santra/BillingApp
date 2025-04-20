package com.souritra.billingapp.billingapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class BilledProduct {
	@Id
	@GeneratedValue
	private long billedProductId;
	@ManyToOne
	private Product product;
	private String name;
	private String size;
	private int quantity;
	private long value;
	@ManyToOne
	private Bill bill;

	protected BilledProduct() {
	}

	public BilledProduct(long billedProductId, Product product, String name, String size, int quantity, long value,
			Bill bill) {
		super();
		this.billedProductId = billedProductId;
		this.product = product;
		this.name = name;
		this.size = size;
		this.quantity = quantity;
		this.value = value;
		this.bill = bill;
	}

}
