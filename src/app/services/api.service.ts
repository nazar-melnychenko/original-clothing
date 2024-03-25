import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Options, Product} from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options?: Options) {
    return this.httpClient.get(url, options) as Observable<T>;
  }

  post<T>(url: string, body: Product, options?: Options) {
    return this.httpClient.post(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: Product, options?: Options) {
    return this.httpClient.put(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options?: Options) {
    return this.httpClient.delete(url, options) as Observable<T>;
  }
}
