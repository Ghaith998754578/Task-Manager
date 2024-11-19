import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {}

  /**
   * Logs in a user with the provided username and password.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns A promise that resolves with the login response.
   */
  async loginWithEmailAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = { username: username, password: password };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Logs out the current user.
   * @returns A promise that resolves when the logout request is completed.
   */
  async logout() {
    const url = environment.baseUrl + '/logout/';

    return lastValueFrom(this.http.post(url, {}));
  }

  /**
   * Checks if the user is authenticated by sending a request to the server.
   * @returns A promise that resolves to true if the user is authenticated, otherwise false.
   */
  async checkAuth() {
    const url = environment.baseUrl + '/check_auth/';

    try {
      const response: { message?: string } = await lastValueFrom(
        this.http.get(url)
      );

      return response && response.message === 'Authenticated';
    } catch (err) {
      return false;
    }
  }

  /**
   * Creates a new user with the provided username and password.
   * @param user The user object containing the username, password, and other details.
   * @returns A promise that resolves when the user is successfully created.
   */
  async createUserWithUsernameAndPassword(user: User) {
    const url = environment.baseUrl + '/create_user/';
    const body = user.toJson();

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Deletes the user.
   * @returns A promise that resolves when the user is successfully deleted.
   */
  async deleteUser() {
    const url = environment.baseUrl + '/delete_user/';

    return lastValueFrom(this.http.get(url));
  }

 
}
