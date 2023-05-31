package com.souritra.billingapp.billingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.souritra.billingapp.billingapp.entity.Bill;
import com.souritra.billingapp.billingapp.repository.BillRepo;

@Service
public class BillService {

	@Autowired
	BillRepo billRepo;
	
	public List<Bill> getAllBills() {
		// TODO Auto-generated method stub
		return billRepo.findAll();
	}

	public Optional<Bill> getBillById(long id) {
		// TODO Auto-generated method stub
		return billRepo.findById(id);
	}

	public void addBill(Bill bill) {
		
		billRepo.save(bill);
		
	}

	public void deleteBill(Bill bill) {
		billRepo.delete(bill);
		
	}

}
