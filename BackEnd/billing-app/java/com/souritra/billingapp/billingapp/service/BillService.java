package com.souritra.billingapp.billingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.souritra.billingapp.billingapp.entity.Bill;
import com.souritra.billingapp.billingapp.entity.BilledProduct;
import com.souritra.billingapp.billingapp.entity.Customer;
import com.souritra.billingapp.billingapp.entity.Product;
import com.souritra.billingapp.billingapp.repository.BillRepo;
import com.souritra.billingapp.billingapp.repository.BilledProductRepo;
import com.souritra.billingapp.billingapp.repository.ProductRepo;

import jakarta.transaction.Transactional;

@Service
public class BillService {

	@Autowired
	BillRepo billRepo;

	@Autowired
	ProductRepo productRepo;

	@Autowired
	BilledProductRepo billedProductRepo;

	public List<Bill> getAllBills() {
		// TODO Auto-generated method stub
		return billRepo.findAll();
	}

	public Optional<Bill> getBillById(long id) {
		// TODO Auto-generated method stub
		return billRepo.findById(id);
	}

	public Bill addBill(Bill bill) {

		return billRepo.save(bill);

	}

	@Transactional
	public Bill addBillDraft(Bill bill) {

		Bill newBill = billRepo.save(bill);

//		if (bill.getBillNo() == 0) {

		List<BilledProduct> products = bill.getProducts();

		products.forEach(product -> {
			Product mainProd = productRepo.findById(product.getProductId()).get();
			product.setProduct(mainProd);
			product.setBill(newBill);
			billedProductRepo.save(product);
		});
//		}
		Bill newBill1 = billRepo.findById(newBill.getBillNo()).get();
		return newBill1;

	}

	public BilledProduct checkAddBilledProduct(BilledProduct billedProduct) {

		BilledProduct temp = billedProductRepo.findByProductAndBill(billedProduct.getProduct(),
				billedProduct.getBill());

		return temp;
	}

	@Transactional
	public Bill addBillComplete(Bill bill) {

		Bill newBill = billRepo.findById(bill.getBillNo()).get();
		newBill.setDiscount(bill.getDiscount());
		newBill.setDisTotal(bill.getDisTotal());
		newBill.setDueAmt(bill.getDueAmt());
		newBill.setPaidAmt(bill.getPaidAmt());
		newBill.setStatus("C");
		newBill.setPaymentM(bill.getPaymentM());
		newBill = billRepo.save(newBill);
		if (bill.getDueAmt() > 0) {
			Customer customer = newBill.getCustomer();
			customer.setDue(customer.getDue() + bill.getDueAmt());
		}

		return newBill;

	}

	public void deleteBill(Bill bill) {
		billRepo.delete(bill);

	}

}
