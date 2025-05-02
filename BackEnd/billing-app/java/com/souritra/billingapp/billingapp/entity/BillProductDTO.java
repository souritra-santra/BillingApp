package com.souritra.billingapp.billingapp.entity;

import lombok.Data;

@Data
public class BillProductDTO {

	private Bill bill;
	private BilledProduct billedProduct;
	private Customer customer;
	private Product product;
	private Shopper shopper;

}
