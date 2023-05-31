package com.souritra.billingapp.billingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.souritra.billingapp.billingapp.entity.Product;
import com.souritra.billingapp.billingapp.repository.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepo productRepo;
	
	public List<Product> getAllProducts() {
		
		return productRepo.findAll();
		
	}

	public Optional<Product> getProductById(long id) {
	
		return productRepo.findById(id);
	}

	public void addProduct(Product product) {
	
		productRepo.save(product);
		
	}

	public void deleteProduct(Product product) {
		
		productRepo.delete(product);
	}
	
	
	

}
