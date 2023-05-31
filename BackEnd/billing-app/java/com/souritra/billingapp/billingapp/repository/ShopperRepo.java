package com.souritra.billingapp.billingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.souritra.billingapp.billingapp.entity.Shopper;

public interface ShopperRepo extends JpaRepository<Shopper, String> {

}
