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

import hu.szte.webshop.Webshop.models.products.Products;
import hu.szte.webshop.Webshop.models.products.ProductsService;

@RestController
@RequestMapping
@CrossOrigin(origins="*")
public class ProductsController {
    
    ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping("/")
    public String hellowWorld(){
        return "Hello World!";
    }

    @PostMapping(path="/products", consumes="application/json")
    public String newProduct(@RequestBody Products product){
        try {
            this.productsService.addProduct(product);
            return "Success";
        } catch (Exception e) {
            System.out.println(e);
            return "Error, check server logs";
        }
    }

    @GetMapping("/products")
    public List<Products> getProducts(){
        try {
            List<Products>list = this.productsService.getAllProducts();
            return list;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/product")
    public Products getProduct(@RequestParam int id){
        try {
            Products product = this.productsService.getProductById(id);
            return product;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @DeleteMapping("/products")
    public String deleteProduct(@RequestParam int id){
        try {
            this.productsService.deleteProductById(id);
            return "Delete Succes";
        } catch (Exception e) {
            System.out.println(e);
            return "Error, check server logs";
        }
    }

    
}
