import { Injectable } from '@angular/core'; 
import {HttpClient} from '@angular/common/http'; 
import {Observable} from 'rxjs'; 
@Injectable({ 
  providedIn: 'root'
}) 
export class FileUploadService { 
	
  baseApiUrl = "https://api.imgbb.com/1/upload?expiration=600&key=19acfa61ea7c9427e09b9fe44e06a0ae" //// the url will be changed 

  constructor(private http:HttpClient) { } 

  upload(file : any):Observable<any> { 
    const formData = new FormData(); 
    formData.append("image", file, file.name); 

    return this.http.post(this.baseApiUrl, formData) 
  } 
} 
