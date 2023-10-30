import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl;
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = '${environment.apiBaseUrl}/user'; 
  }

  private makeUrl(path: string): string {
    return '${this.baseUrl}/${path}';
  }

  getUser(id: int): Promise<UserModel>{
    return this.httpClient.get<UserModel>(this.makeUrl(id)).toPromise();
  }


}
