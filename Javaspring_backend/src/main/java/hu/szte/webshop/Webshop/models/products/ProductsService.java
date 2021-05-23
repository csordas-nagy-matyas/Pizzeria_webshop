package hu.szte.webshop.Webshop.models.products;

import java.util.List;

public interface ProductsService {
    void addProduct(Products product);
    List<Products> getAllProducts();
    Products getProductById(int id);
    void deleteProductById(int id);
}
