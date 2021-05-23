import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';
import { HttpClient } from '@angular/common/http';
import { LoginService} from '../utils/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private loginService: LoginService, private router: Router, private http: HttpClient){}

  products: Array<{id: string, price: string, quantity: string}> = []
  product_count = 0;
  user = ''; 
  accessLevel = ''; 
  
  add_to_basket(item:{id: string, price: string})
  {
    let products: Array<{id: string, price: string}> = [];
    this.connectionService.get_basket().subscribe(async data => {
      if(data != '')
      {
        let result = JSON.parse(data)
        for(let product of result.products)
        {
            products.push({id:product.id, price: product.price});
        }
        products.push({id:item.id, price: item.price});
        await this.connectionService.update_basket(this.user, products).toPromise();
      }
      else{
        await this.connectionService.add_to_basket(this.user, [{id:item.id, price:item.price}]).toPromise();   
      }
      this.get_product_count();
    })
  }

  get_product_count(){
    let counter = 0;
    this.connectionService.get_basket().subscribe(data => {
      if(data != '')
      {
        let result = JSON.parse(data)
        for(let product of result.products){
          counter++;
        }
      }
      this.product_count=counter;
    })
  }


  ngOnInit(): void {
    this.loginService.get_logged_user().subscribe(data => {
      this.user = JSON.parse(data).username;
      this.accessLevel = JSON.parse(data).accessLevel;
    })

    this.connectionService.get_product().subscribe(data => {
      for(let result of JSON.parse(data)){
        this.products.push({id:result.id, price: result.price, quantity: result.quantity});
      }
    },
    error =>{console.log('Sorry error: ', error);});
    this.get_product_count();
  }

}
