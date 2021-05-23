package hu.szte.webshop.Webshop.models.transactions;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionsRepository extends JpaRepository<Transactions, Integer> { 
    
}
