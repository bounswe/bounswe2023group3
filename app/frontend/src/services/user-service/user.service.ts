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
      const followeeIds = user.followings?.map((followee: User) => followee.id);
      return followeeIds;
    }
    catch(error) {
      console.log('Error fetching followees:', error);
      throw error;
    }
  }
  follow(user_id: string): Promise<any>{
    const payload = {followerUserID: user_id};
    return this.httpClient
      .post<any>(this.makeUrl("follow"),payload, this.options)
      .toPromise();
  }
  unfollow(user_id: string): Promise<any>{
    const payload = {followerUserID: user_id};
    return this.httpClient
      .post<any>(this.makeUrl("unfollow"),payload, this.options)
      .toPromise();
  }

  like(pollId: string): Promise<any>{
    return this.httpClient
      .post<any>(`${environment.apiBaseUrl}/like/${pollId}`, null, this.options).toPromise();
  }
  unlike(pollId: string): Promise<any>{
    try{
      return this.httpClient
      .delete<any>(`${environment.apiBaseUrl}/like/${pollId}`, this.options).toPromise();
    }
    catch(error){
      console.log('Error unliking the poll:', error);
      throw error;
    }
  }
  
  async getLikedUserIds(pollId: string): Promise<string[]> {
    try {
      console.log(`${environment.apiBaseUrl}/like/${pollId}`);
      const likedUsers = await this.httpClient
        .get<any>(`${environment.apiBaseUrl}/like/${pollId}`)
        .toPromise();
        const likedUserIds = likedUsers?.map((u: User) => u.id);
        console.log(likedUsers);
        return likedUserIds;
    } catch (error) {
      console.log('Error fetching likes:', error);
      throw error;
    }
  }
}
  
