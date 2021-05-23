package hu.szte.webshop.Webshop.models.products;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Integer> { 
    
}
