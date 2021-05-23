package hu.szte.webshop.Webshop.models.order;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown =true)
public class Order {

    @JsonProperty("products")
    private List<Item> items;

    public List<Item> getItems() {
        return items;
    }
    public void setItems(List<Item> items) {
        this.items = items;
    }

}
