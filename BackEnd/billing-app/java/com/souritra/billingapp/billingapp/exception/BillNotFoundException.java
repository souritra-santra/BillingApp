package com.souritra.billingapp.billingapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class BillNotFoundException extends RuntimeException {
	
	public BillNotFoundException(String msg) {
		super(msg);
		
	}
		

}
