import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProduct():Observable<Product>
  {
   return this.http.get<Product>("https://freeapi.miniprojectideas.com/api/BigBasket/GetAllProducts");
  }
}
