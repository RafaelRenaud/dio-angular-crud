import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "https://sheet.best/api/sheets/a6f1e342-e2d8-4cc0-862b-0e56aaa51b3c";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Retorna Array de Usuários [READ]
  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Cadastra Usuário [CREATE]
  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.apiUrl,user, this.httpOptions);
  }

  // Deletar o Usuário [DELETE]
  deleteUser(userId: string): Observable<User>{
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${userId}`);
  } 

  //Edita usuário [UPDATE]
  updateUser(userId: string, user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.apiUrl}/id/${userId}`,user,this.httpOptions);
  }

  //Lista Usuário por ID [SELECT]
  getUserById(userId: string): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.apiUrl}/id/${userId}`);
  }
}
