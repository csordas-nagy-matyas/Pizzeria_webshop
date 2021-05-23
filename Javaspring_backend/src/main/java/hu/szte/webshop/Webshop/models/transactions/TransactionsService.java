package hu.szte.webshop.Webshop.models.transactions;

import java.util.List;

public interface TransactionsService {
    void addTransaction(Transactions transaction);
    List<Transactions> getAllTransactions();
    Transactions getTransactionById(int id);
    void deleteTransactionById(int id);
}
