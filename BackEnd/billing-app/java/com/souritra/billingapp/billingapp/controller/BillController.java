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

import com.souritra.billingapp.billingapp.entity.Bill;
import com.souritra.billingapp.billingapp.entity.BillProductDTO;
import com.souritra.billingapp.billingapp.exception.BillNotFoundException;
import com.souritra.billingapp.billingapp.service.BillService;

@RestController
@CrossOrigin("*")
public class BillController {

	@Autowired
	BillService billService;

	@RequestMapping("/bills")
	public List<Bill> bills() {

		return billService.getAllBills();
	}

	@RequestMapping("/bills/{id}")
	public Bill billById(@PathVariable long id) {

		Optional<Bill> bill = billService.getBillById(id);
		if (bill.isEmpty()) {
			throw new BillNotFoundException(" id : " + id);
		}

		return bill.get();
	}

	@PostMapping("/bill/addDraftBill")
	public ResponseEntity<BillProductDTO> addDraftBill(@RequestBody Bill bill) {

		Bill createdBill = billService.addBillDraft(bill);
		BillProductDTO billProductDTO = new BillProductDTO();
		billProductDTO.setBill(createdBill);
		billProductDTO.setCustomer(createdBill.getCustomer());
		return ResponseEntity.created(null).body(billProductDTO);
	}

	@PostMapping("/bill/addBillComplete")
	public ResponseEntity<Bill> addBillComplete(@RequestBody Bill bill) {

		Bill createdBill = billService.addBillComplete(bill);

		return ResponseEntity.created(null).body(createdBill);

	}

	@DeleteMapping("/bill/delete/{id}")
	public void deleteBill(@PathVariable long id) {

		Optional<Bill> bill = billService.getBillById(id);
		if (bill.isEmpty()) {
			throw new BillNotFoundException(" id : " + id);
		}

		billService.deleteBill(bill.get());

	}

}
