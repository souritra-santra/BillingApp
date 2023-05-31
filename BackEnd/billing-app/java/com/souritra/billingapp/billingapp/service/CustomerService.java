package com.souritra.billingapp.billingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.souritra.billingapp.billingapp.entity.Customer;
import com.souritra.billingapp.billingapp.repository.CustomerRepo;

@Service
public class CustomerService {

	@Autowired
	public CustomerRepo customerRepo;
	
	public List<Customer> getAllCustomers() {
		// TODO Auto-generated method stub
		return customerRepo.findAll() ;
	}

	public Optional<Customer> getCustomerById(long id) {
		// TODO Auto-generated method stub
		return customerRepo.findById(id);
	}

	public void addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		customerRepo.save(customer);
	}

	public void deleteBill(Customer customer) {
		// TODO Auto-generated method stub
		customerRepo.delete(customer);
		
	}

}
