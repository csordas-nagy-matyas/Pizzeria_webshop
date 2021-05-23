import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';
import { LoginService } from '../utils/login.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent} from '../products/products.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute, private connectionService: ConnectionService, private loginService: LoginService) { }

  product_count = 0;
  user = JSON.stringify(localStorage.getItem('user')).replace(/"/gi, '');
  accessLevel = JSON.stringify(localStorage.getItem('accessLevel')).replace(/"/gi, '');
  product_id = '';
  product_price = '';
  product_quantity = '';
  product_btn = "Hozzáadás";
  drink_id = '';
  drink_price = '';
  drink_quantity = '';
  drink_btn = "Hozzáadás";
  username = '';
  pwd = '';
  email = '';
  accessLvl = '';
  userExist = false;
  

  edit_product()
  {
    if(this.product_id != '' && this.product_price != '' && this.product_quantity != '' && !isNaN(Number(this.product_price)) && !isNaN(Number(this.product_quantity)))
    {
      if(this.product_btn == 'Hozzáadás')
      {  
        this.connectionService.add_product(this.product_id, this.product_price, this.product_quantity).subscribe();
        this.product_id = '';
        this.product_price = '';
        this.product_quantity = '';
        
      }else if(this.product_btn == 'Módosítás')
      {
        this.connectionService.update_product_quantity(this.product_id, this.product_price, this.product_quantity).subscribe();
        this.product_id = '';
        this.product_price = '';
        this.product_quantity = '';
      }
    }  
  }

  edit_drink()
  {
    if(this.drink_id != '' && this.drink_price != '' && this.drink_quantity != '' && !isNaN(Number(this.drink_price)) && !isNaN(Number(this.drink_quantity)))
    {
      if(this.drink_btn == 'Hozzáadás')
      {  
        this.connectionService.add_drink(this.drink_id, this.drink_price, this.drink_quantity).subscribe();
        this.drink_id = '';
        this.drink_price = '';
        this.drink_quantity = '';
        
      }else if(this.drink_btn == 'Módosítás')
      {
        this.connectionService.update_drink_quantity(this.drink_id, this.drink_price, this.drink_quantity).subscribe();
        this.drink_id = '';
        this.drink_price = '';
        this.drink_quantity = '';
      }
    }  
  }

  add_user()
  {
    if(!this.userExist && this.username != '' && this.pwd != '' && this.email != '' && this.accessLvl != '')
    {
      this.loginService.add_user(this.username, this.pwd, this.email, this.accessLvl).subscribe();
      this.username = '';
      this.pwd = '';
      this.email = '';
      this.accessLvl = '';
    }
  }

  delete_product()
  {
    if(this.product_btn == 'Módosítás')
    {
      this.connectionService.delete_product(this.product_id).subscribe();
      this.product_id = '';
      this.product_price = '';
      this.product_quantity = '';
    }
  }

  delete_drink()
  {
    if(this.drink_btn == 'Módosítás')
    {
      this.connectionService.delete_drink(this.drink_id).subscribe();
      this.drink_id = '';
      this.drink_price = '';
      this.drink_quantity = '';
    }
  }

  delete_user()
  {
    if(this.userExist)
    {
      this.loginService.delete_user(this.username).subscribe();
      this.username = '';
      this.pwd = '';
      this.email = '';
      this.accessLvl = '';
      this.userExist = false;
    }
  }

  get_products()
  {
    let isFound = false;
    this.connectionService.get_product().subscribe(data => {
      for(let result of JSON.parse(data)){
        if(result.id == this.product_id)
        {
          this.product_price = result.price;
          this.product_quantity = result.quantity;
          this.product_btn = "Módosítás";
          isFound = true;
        }
      }
      if(!isFound)
      {
        this.product_btn = "Hozzáadás";
      }
    })
  }

  get_drinks()
  {
    let isFound = false;
    this.connectionService.get_drink().subscribe(data => {
      for(let result of JSON.parse(data)){
        if(result.id == this.drink_id)
        {
          this.drink_price = result.price;
          this.drink_quantity = result.quantity;
          this.drink_btn = "Módosítás";
          isFound = true;
        }
      }
      if(!isFound)
      {
        this.drink_btn = "Hozzáadás";
      }
    })
  }

  get_users()
  {
    this.userExist = false;
    this.loginService.get_users().subscribe(data => {
      for(let result of JSON.parse(data)){
        if(result.username == this.username)
        {
          this.username = result.username;
          this.pwd = result.password;
          this.email = result.email;
          this.accessLvl = result.accessLevel;
          this.userExist = true;
        }
      }
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
    this.get_product_count();
  }

}
