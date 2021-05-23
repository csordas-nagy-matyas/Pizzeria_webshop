package hu.szte.webshop.Webshop.models.order;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown =true)
public class Item {
    @JsonProperty("id")
    private String id;
    @JsonProperty("price")
    private int price;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
    
}
