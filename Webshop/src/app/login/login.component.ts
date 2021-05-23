import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) { 
    this.username = '';
    this.password = '';
  }

  login(){
    if(this.username != '' && this.password != ''){
      this.loginService.login(this.username, this.password).subscribe(async msg => {
        console.log(msg);
        this.router.navigate(['/products']); 
      }, error =>{
          console.log(error);
      })
    }
  }

  ngOnInit(): void {
    this.loginService.get_logged_user().subscribe(data => {
        if(data != '')
        {
          this.loginService.logout().subscribe();
        }
    })
  }

}
