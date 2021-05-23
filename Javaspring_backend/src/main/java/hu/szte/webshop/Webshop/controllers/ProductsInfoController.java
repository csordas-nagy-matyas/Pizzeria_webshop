package hu.szte.webshop.Webshop.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.webshop.Webshop.models.products.ProductsService;
import hu.szte.webshop.Webshop.models.transactions.Transactions;
import hu.szte.webshop.Webshop.models.transactions.TransactionsService;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class ProductsInfoController {

    ProductsService productsService;
    TransactionsService transactionsService;
    SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    public ProductsInfoController(ProductsService productsService, TransactionsService transactionsService) {
        this.productsService = productsService;
        this.transactionsService = transactionsService;
    }

    @GetMapping("/productinfo")
    public String getProductinfo(@RequestParam String id){
        try {
            List<Transactions> transactions = this.transactionsService.getAllTransactions();

            int cnt = 0;
            int sum = 0;
            Date date = sdformat.parse("2000-01-01");
            for(Transactions t: transactions)
            {
                if(t.getName().equals(id))
                {
                    cnt++;
                    sum += t.getAmount();
                    if(sdformat.parse(t.getDate()).compareTo(date) > 0)
                    {
                        date = sdformat.parse(t.getDate());
                    }
                }
            }

            return "A " + id + " termék " + cnt + " tranzakcióban szerepelt.\n Összesen " + sum + " Ft bevételt termelt.\n A legutolsó tranzakció dátuma: " + sdformat.format(date);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    
}
