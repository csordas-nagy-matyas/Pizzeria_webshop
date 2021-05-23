import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent} from '../products/products.component';
import { ConnectionService } from '../utils/connection.service';
import { LoginService} from '../utils/login.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  message = '';

  product_count = 0;
  user = '';
  accessLevel = '';
  selected_products: Array<{id: string, price: string}> = [];
  final_price = 0;
  success_order = "default";
  error_msg = "";

  name ="";
  telephone="";
  address="";
  email= "";

  constructor(private route: ActivatedRoute, private connectionService: ConnectionService,  private loginService: LoginService) { }

  make_order(){

    let empty = false;
    let is_error = false;
    let quantity = 0;
    this.error_msg = "\nAz Ön által válaszott termékek közül van ami nem elérhető!\n\n";

    this.connectionService.get_product().subscribe(data => {
      for(let result of JSON.parse(data)){
          quantity = parseInt(result.quantity);
          for(var product of this.selected_products){
            if(product.id == result.id){            
              if(quantity==0){
                empty=true;
                is_error = true;    
              }else{
                quantity -= 1;
              }
            }
          }
          if(is_error){
            this.error_msg += result.id + '-ból ' + result.quantity + 'db áll rendelkezésre\n\n';
            is_error = false;
          }
      }

      this.connectionService.get_drink().subscribe(data => {
        for(let result of JSON.parse(data)){
            quantity = parseInt(result.quantity);
            for(var drink of this.selected_products){
              if(drink.id == result.id){            
                if(quantity==0){
                  empty=true;
                  is_error = true;    
                }else{
                  quantity -= 1;
                }
              }
            }
            if(is_error){
              this.error_msg += result.id + '-ból ' + result.quantity + 'db áll rendelkezésre\n\n';
              is_error = false;
            }
        }
        if(!empty && this.product_count!=0 && this.check_inputs()){
          this.connectionService.get_product().subscribe(data => {
            for(let result of JSON.parse(data)){
                for(var product of this.selected_products){  
                  if(product.id == result.id){
                    result.quantity = (parseInt(result.quantity)-1).toString();
                    this.connectionService.update_product_quantity(result.id,result.price,result.quantity).subscribe();
                  }
                }
            }
          })

          this.connectionService.get_drink().subscribe(data => {
            for(let result of JSON.parse(data)){
                for(var drink of this.selected_products){  
                  if(drink.id == result.id){
                    result.quantity = (parseInt(result.quantity)-1).toString();
                    this.connectionService.update_drink_quantity(result.id,result.price,result.quantity).subscribe();
                  }
                }
            }
          })

          

          let date = new Date();
          let formatted_date = date.toISOString().substring(0, 10);
          this.connectionService.save_order(this.user, formatted_date, this.selected_products).subscribe();
          this.connectionService.save_transaction(this.selected_products).subscribe();
          this.connectionService.delete_basket(this.user).subscribe();
          this.connectionService.send_mail(this.name, this.email, this.selected_products).subscribe();

          this.success_order = "success";
        }else if(empty && this.product_count!=0){
          this.success_order = "error";
        }
      })    
    });     
  }


  remove_selected_item(item: string){
    let isFound=false;
    let products: Array<{id: string, price: string}> = [];
    this.connectionService.get_basket().subscribe(async data => {
      let result = JSON.parse(data);
      for(let product of result.products){
          if(product.id==item && !isFound){
            isFound=true;
          }else{
            products.push(product);
          }    
      }
      await this.connectionService.update_basket(this.user, products).toPromise();
      this.get_products();
    })
  }

  dialog_back(){
    this.success_order = "default";
  }

  check_inputs(): boolean{
      if(this.name!="" && this.telephone!="" && this.address!="" && this.email!=""){
        return true;
      }
      this.success_order = "error";
      this.error_msg = "Üresen maradt valamelyik mező!"
      return false;
  }

  get_products(){
    let counter = 0;
    let sum_price = 0;
    let products: Array<{id: string, price: string}> = [];
    this.connectionService.get_basket().subscribe(data => {
      if(data != '')
      {
        let result = JSON.parse(data); 
        for(let product of result.products){
            counter++;
            sum_price += parseInt(product.price);
            products.push(product);
        }
      }
      this.selected_products = products;
      this.product_count=counter;
      this.final_price = sum_price;
    })
  }

  ngOnInit(): void {
    this.loginService.get_logged_user().subscribe(data => {
      this.user = JSON.parse(data).username;
      this.accessLevel = JSON.parse(data).accessLevel;
    })
    this.get_products();
  }

}
