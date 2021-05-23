package hu.szte.webshop.Webshop.models.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceimpl implements ProductsService{

    ProductsRepository productsRepository;

    
    @Autowired
    public ProductsServiceimpl( ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public void addProduct(Products product) {
        this.productsRepository.save(product);
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<Products> getAllProducts() {
        List<Products> list = this.productsRepository.findAll();
        // TODO Auto-generated method stub
        return list;
    }

    @Override
    public Products getProductById(int id) {
        Products product = this.productsRepository.findById(id).get();
        // TODO Auto-generated method stub
        return product;
    }

    @Override
    public void deleteProductById(int id) {
        this.productsRepository.deleteById(id);
        // TODO Auto-generated method stub
        
    }
    
}
