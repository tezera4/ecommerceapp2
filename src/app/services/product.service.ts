import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../model/product';
import { CategoryModel } from '../model/category-model';
import {ProductByCategoryIdModel } from '../model/product-by-category-id';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product> {
    return this.http.get<Product>("https://freeapi.miniprojectideas.com/api/BigBasket/GetAllProducts");
  }

  getAllCategory(): Observable<CategoryModel> {
    return this.http.get<CategoryModel>("https://freeapi.miniprojectideas.com/api/BigBasket/GetAllCategory");
  }

  getProductByCategoryId(id:any):Observable<ProductByCategoryIdModel>{
    return this.http.get<ProductByCategoryIdModel>("https://freeapi.miniprojectideas.com/api/BigBasket/GetAllProductsByCategoryId?id="+id);
  }


}
