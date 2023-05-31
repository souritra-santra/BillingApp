package com.souritra.billingapp.billingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.souritra.billingapp.billingapp.entity.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

}
