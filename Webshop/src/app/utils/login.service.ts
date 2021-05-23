import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string){
     return this.http.post(environment.serverUrl + 'login', {username: username, password: password}, {responseType: 'text'});
  }

  logout(){
     return this.http.post(environment.serverUrl + 'logout', {}, {withCredentials: true, responseType: 'text'});
  }

  get_logged_user()
  {
    return this.http.get(environment.serverUrl + 'active_user', {responseType: 'text', withCredentials: true});
  }

  get_users()
  {
    return this.http.get(environment.serverUrl + 'user', {responseType: 'text', withCredentials: true});
  }

  add_user(username: string, password: string, email: string, accessLevel: string)
  {
    return this.http.post(environment.serverUrl + 'user', {username: username, password: password, email: email, accessLevel: accessLevel}, {responseType: 'text'});
  }

  delete_user(username: string)
  {
    return this.http.request('delete', environment.serverUrl + 'user', { body: {username : username} , responseType: 'text'});
  }
}
