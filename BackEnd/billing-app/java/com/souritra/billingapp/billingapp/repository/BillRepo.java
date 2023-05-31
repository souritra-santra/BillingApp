package com.souritra.billingapp.billingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.souritra.billingapp.billingapp.entity.Bill;

public interface BillRepo extends JpaRepository<Bill, Long> {

}
