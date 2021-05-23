package hu.szte.webshop.Webshop.models.transactions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionsServiceimpl implements TransactionsService{

    TransactionsRepository transactionsRepository;

    
    @Autowired
    public TransactionsServiceimpl(TransactionsRepository transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    @Override
    public void addTransaction(Transactions transaction) {
        this.transactionsRepository.save(transaction);
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<Transactions> getAllTransactions() {
        List<Transactions> list = this.transactionsRepository.findAll();
        // TODO Auto-generated method stub
        return list;
    }

    @Override
    public Transactions getTransactionById(int id) {
        Transactions transaction = this.transactionsRepository.findById(id).get();
        // TODO Auto-generated method stub
        return transaction;
    }

    @Override
    public void deleteTransactionById(int id) {
        this.transactionsRepository.deleteById(id);
        // TODO Auto-generated method stub
        
    }
    
}
