import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl;
  constructor(private httpClient: HttpClient) { 
    this.baseUrl = `${environment.apiBaseUrl}/user`; 
  }

  private makeUrl(path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  login(payload: Object): Promise<any>{
    return this.httpClient.post<any>(this.makeUrl('login'), payload).toPromise();
  }



}
