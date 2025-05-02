package com.souritra.billingapp.billingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.souritra.billingapp.billingapp.entity.Bill;
import com.souritra.billingapp.billingapp.entity.BilledProduct;
import com.souritra.billingapp.billingapp.entity.Product;

public interface BilledProductRepo extends JpaRepository<BilledProduct, Long> {

	public BilledProduct findByProductAndBill(Product product, Bill bill);

}
