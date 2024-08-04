import axios, { AxiosResponse } from 'axios';

const BASE_URL: string = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8090";


interface User {
  id?: number;
  email: string;
  password: string;
  [key: string]: any;
}

interface LoginResponse {
  token: string;
  [key: string]: any;
}

interface GetAllUsersResponse {
  customUsersList: User[];
}

class UserService {
  static BASE_URL: string = BASE_URL;
  
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${UserService.BASE_URL}/auth/login`,
        { email, password }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async register(userData: User, token: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(token: string): Promise<User[]> {
    try {
      const response: AxiosResponse<GetAllUsersResponse> = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.customUsersList);
      return response.data.customUsersList;
    } catch (err) {
      throw err;
    }
  }

  static async getYourProfile(token: string): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(userId: number, token: string): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${UserService.BASE_URL}/admin/get-users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(userId: number, token: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userId: number, userData: User, token: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `${UserService.BASE_URL}/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /** AUTHENTICATION CHECKER */
  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  static isUser(): boolean {
    const role = localStorage.getItem('role');
    return role === 'USER';
  }

  static adminOnly(): boolean {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
