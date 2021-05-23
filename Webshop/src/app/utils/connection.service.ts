import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  get_product()
  {
    return this.http.get(environment.serverUrl + 'product', {responseType: 'text', withCredentials: true});
  }

  add_product(id: string, price: string, quantity: string)
  {
    return this.http.post(environment.serverUrl + 'product',{id: id, price: price, quantity: quantity}, {responseType: 'text'});
  }

  delete_product(id: string)
  {
    return this.http.request('delete', environment.serverUrl + 'product', { body: {id : id} , responseType: 'text'});
  }

  get_drink()
  {
    return this.http.get(environment.serverUrl + 'drink', {responseType: 'text', withCredentials: true});
  }

  add_drink(id: string, price: string, quantity: string)
  {
    return this.http.post(environment.serverUrl + 'drink',{id: id, price: price, quantity: quantity}, {responseType: 'text'});
  }

  delete_drink(id: string)
  {
    return this.http.request('delete', environment.serverUrl + 'drink', { body: {id : id} , responseType: 'text'});
  }

  update_product_quantity(id: string, price: string, quantity: string)
  {
    return this.http.put(environment.serverUrl + 'product',{id: id, price: price, quantity: quantity}, {responseType: 'text'});
  }  

  update_drink_quantity(id: string, price: string, quantity: string)
  {
    return this.http.put(environment.serverUrl + 'drink',{id: id, price: price, quantity: quantity}, {responseType: 'text'});
  }  

  save_order(user: string, date: string, products: object)
  {
    return this.http.post(environment.serverUrl + 'order',{user: user, date: date, products: products}, {responseType: 'text'});
  }

  save_transaction(products: object)
  {
    return this.http.post(environment.javaUrl + 'orders',{products: products}, {responseType: 'text'});
  }

  add_to_basket(user: string, products: object)
  {
    return this.http.post(environment.serverUrl + 'basket',{user: user, products: products}, {responseType: 'text'});
  }

  get_basket()
  {
    return this.http.get(environment.serverUrl + 'basket', {responseType: 'text', withCredentials: true});
  }

  update_basket(user: string, products: Array<{id: string, price: string}>)
  {
    return this.http.put(environment.serverUrl + 'basket',{user: user, products: products}, {responseType: 'text'});
  }

  delete_basket(user: string)
  {
    return this.http.request('delete', environment.serverUrl + 'basket', { body: {user : user} , responseType: 'text'});
  }

  send_mail(username: string, email: string, products:  Array<{id: string, price: string}>)
  {
    return this.http.post(environment.serverUrl + 'email',{username: username, email: email, products: products}, {responseType: 'text'});
  }
}
