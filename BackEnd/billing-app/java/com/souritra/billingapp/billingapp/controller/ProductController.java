package com.souritra.billingapp.billingapp.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.souritra.billingapp.billingapp.entity.Product;
import com.souritra.billingapp.billingapp.exception.UserNotFoundException;
import com.souritra.billingapp.billingapp.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	
	@RequestMapping("/products")
	public List<Product> products() {
		
		return productService.getAllProducts();
	}
	 
	@RequestMapping("/products/{id}")
	public Product productById(@PathVariable long id) {
		
		Optional<Product> product = productService.getProductById(id);
		
		if(product.isEmpty())
			throw new UserNotFoundException("id : " +id);
			
		return product.get();
	}
	
	@PostMapping("/product/add")
	public ResponseEntity<Product> addProduct(@RequestBody Product product){
		
		productService.addProduct(product);
		
		return ResponseEntity.created(null).build();
		
	}
	
	@DeleteMapping("/product/delete/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable long id){
		
		Optional<Product> product = productService.getProductById(id);
		
		if(product.isEmpty())
			throw new UserNotFoundException("id : " +id);
		
		productService.deleteProduct(product.get());
		return null;
	}
	
	
		
}
