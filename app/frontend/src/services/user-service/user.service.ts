import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from 'src/app/user-profile/user.model';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl;
  private options;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.baseUrl = `${environment.apiBaseUrl}/user`;
    this.options = this.authService.getHeaders();
  }

  private makeUrl(path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  getUser(username: string): Promise<User> {
    return this.httpClient
      .get<any>(this.makeUrl(`username/${username}`))
      .toPromise();
  }
  async getFollowerIds(username: string): Promise<string[]>{
    try {
      const user = await this.getUser(username);
      const followerIds = user.followers?.map((follower: User) => follower.id);
      return followerIds;
    }
    catch(error) {
      console.log('Error fetching followers:', error);
      throw error;
    }
  }
  async getFolloweeIds(username: string): Promise<string[]>{
    try {
      const user = await this.getUser(username);
      console.log(user);
      const followeeIds = user.followees?.map((followee: User) => followee.id);
      return followeeIds;
    }
    catch(error) {
      console.log('Error fetching followees:', error);
      throw error;
    }
  }
  follow(user_id: string): Promise<any>{
    console.log(this.options);
    return this.httpClient
      .post<any>(this.makeUrl("follow"),user_id, this.options)
      .toPromise();
  }
  unfollow(user_id: string): Promise<any>{
    return this.httpClient
      .post<any>(this.makeUrl("unfollow"),user_id, this.options)
      .toPromise();
  }
}
