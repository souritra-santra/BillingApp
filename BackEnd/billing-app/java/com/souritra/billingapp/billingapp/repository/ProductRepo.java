package com.souritra.billingapp.billingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.souritra.billingapp.billingapp.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

}
