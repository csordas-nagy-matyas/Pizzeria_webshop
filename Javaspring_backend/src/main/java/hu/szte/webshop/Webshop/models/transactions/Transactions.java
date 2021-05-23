package hu.szte.webshop.Webshop.models.transactions;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transactions")
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String date;
    private int amount;

    public Transactions() {
    }

    public Transactions(int id, String name, String date, int amount) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", date=" + date + ", amount=" + amount + "]";
    }

    

    
}
