package com.souritra.billingapp.billingapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.souritra.billingapp.billingapp.entity.Customer;
import com.souritra.billingapp.billingapp.exception.CustomerNotFoundException;
import com.souritra.billingapp.billingapp.service.CustomerService;

@RestController
@CrossOrigin("*")
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	@RequestMapping("/customers")
	public List<Customer> customers() {
			return customerService.getAllCustomers();
		}
	
	@RequestMapping("/customers/{id}")
	public Customer customerById(@PathVariable long id) {
		
		Optional<Customer> customer = customerService.getCustomerById(id); 
		if(customer.isEmpty())
			throw new CustomerNotFoundException(" id : " + id);
		
		return customer.get();
	}
	
	@PostMapping("/customer/add")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
		
		customerService.addCustomer(customer);
		
		return ResponseEntity.created(null).build();
		
	}
	
	@DeleteMapping("/customer/delete/{id}")
	public void deleteCustomer(@PathVariable long id) {
		
		Optional<Customer> customer = customerService.getCustomerById(id); 
		if(customer.isEmpty())
			throw new CustomerNotFoundException(" id : " + id);
		
		customerService.deleteBill(customer.get());
		
	}
	

}
