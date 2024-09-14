import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoryModel,
  RegisterCustomer,
  Product,
  ProductByCategoryIdModel,
} from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  apiURL: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';
  getAllProduct(): Observable<Product> {
    return this.http.get<Product>(this.apiURL + 'GetAllProducts');
  }

  getAllCategory(): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(this.apiURL + 'GetAllCategory');
  }

  getProductByCategoryId(id: any): Observable<ProductByCategoryIdModel> {
    const url = `${this.apiURL}GetAllProductsByCategoryId?id=${id}`;
    return this.http.get<ProductByCategoryIdModel>(url);
  }

  registerCustomer(customer: RegisterCustomer) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/BigBasket/RegisterCustomer',
      customer
    );
  }
}
