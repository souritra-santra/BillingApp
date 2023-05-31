package com.souritra.billingapp.billingapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Shopper {
	
	@Id
	@GeneratedValue
	private String username;
	private String password;
	private String shopName;
	private String type;
	private String ownerName;
	
	
	public Shopper(String username, String password, String shopName, String type, String ownerName) {
		super();
		this.username = username;
		this.password = password;
		this.shopName = shopName;
		this.type = type;
		this.ownerName = ownerName;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getShopName() {
		return shopName;
	}


	public void setShopName(String shopName) {
		this.shopName = shopName;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getOwnerName() {
		return ownerName;
	}


	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}


	@Override
	public String toString() {
		return "Shopper [username=" + username + ", password=" + password + ", shopName=" + shopName + ", type=" + type
				+ ", ownerName=" + ownerName + "]";
	}
	
	

}
