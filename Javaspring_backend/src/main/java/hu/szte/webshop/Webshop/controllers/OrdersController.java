package hu.szte.webshop.Webshop.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.szte.webshop.Webshop.models.order.Item;
import hu.szte.webshop.Webshop.models.order.Order;
import hu.szte.webshop.Webshop.models.products.Products;
import hu.szte.webshop.Webshop.models.products.ProductsService;
import hu.szte.webshop.Webshop.models.transactions.Transactions;
import hu.szte.webshop.Webshop.models.transactions.TransactionsService;


@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class OrdersController {

    ProductsService productsService;
    TransactionsService transactionsService;
    SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    public OrdersController(ProductsService productsService, TransactionsService transactionsService) {
        this.productsService = productsService;
        this.transactionsService = transactionsService;
    }

    @PostMapping(path="/orders", consumes="application/json")
    public String newOrder(@RequestBody Order order){
        try {
                List<Item> items = order.getItems();
                List<String> temp = new ArrayList<>();
                Map<String, Integer> products = new HashMap<String, Integer>(); 
                for(Item it: items)
                {
                    //add item to Products table
                    if(!temp.contains(it.getId()))
                    {
                        this.productsService.addProduct(new Products(0, it.getId(),it.getPrice()));
                        temp.add(it.getId());
                    }  

                    //calculate amount for transaction
                    if(products.get(it.getId()) != null)
                    {
                        products.put(it.getId(), products.get(it.getId()) + it.getPrice());
                    }else{
                        products.put(it.getId(),it.getPrice());
                    }
                }

            //add element to transactions table
            for(Map.Entry<String, Integer> m:products.entrySet()){  
                this.transactionsService.addTransaction(new Transactions(0, m.getKey(), formatter.format(new Date()), m.getValue()));
            }  
            return "Success";
        } catch (Exception e) {
            System.out.println(e);
            return "Error, check server logs";
        }
    }
    
}
