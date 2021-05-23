package hu.szte.webshop.Webshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.webshop.Webshop.models.transactions.Transactions;
import hu.szte.webshop.Webshop.models.transactions.TransactionsService;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class TransactionsController {
    
    TransactionsService transactionsService;

    @Autowired
    public TransactionsController(TransactionsService transactionsService) {
        this.transactionsService = transactionsService;
    }

    @PostMapping(path="/transactions", consumes="application/json")
    public String newTransaction(@RequestBody Transactions transaction){
        try {
            this.transactionsService.addTransaction(transaction);
            return "Success";
        } catch (Exception e) {
            System.out.println(e);
            return "Error, check server logs";
        }
    }

    @GetMapping("/transactions")
    public List<Transactions> gettTransactions(){
        try {
            List<Transactions>list = this.transactionsService.getAllTransactions();
            return list;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/transaction")
    public Transactions getTransaction(@RequestParam int id){
        try {
            Transactions transaction = this.transactionsService.getTransactionById(id);
            return transaction;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping("/transactions")
    public String deleteTransaction(@RequestParam int id){
        try {
            this.transactionsService.deleteTransactionById(id);
            return "Delete Succes";
        } catch (Exception e) {
            System.out.println(e);
            return "Error, check server logs";
        }
    }

    
}
