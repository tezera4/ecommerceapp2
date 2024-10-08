import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  CategoryModel,
  RegisterCustomer,
  Product,
  ProductByCategoryIdModel,
  ApiResponseModel,
  LoginModel,
  AddToCartModel,
} from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  //the following is used for component communication
  addToCartSubject:Subject<boolean>=new Subject<boolean>(); 
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

  registerCustomer(customer: RegisterCustomer):Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>('https://freeapi.miniprojectideas.com/api/BigBasket/RegisterCustomer',customer);
  }

  login(loginModel: LoginModel):Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>('https://freeapi.miniprojectideas.com/api/BigBasket/Login',loginModel);
  }
  addToCart(addToCartModel:AddToCartModel):Observable<ApiResponseModel>{
    debugger
    return this.http.post<ApiResponseModel>("https://freeapi.miniprojectideas.com/api/BigBasket/AddToCart",addToCartModel);
  }

  GetCartProductsByCustomerId(custId:number):Observable<ApiResponseModel>
  {
    debugger
    return this.http.get<ApiResponseModel>("https://freeapi.miniprojectideas.com/api/BigBasket/GetCartProductsByCustomerId?id="+custId);
  }

  DeleteProductFromCartById(itemId:number):Observable<ApiResponseModel>
  {
    debugger
    return this.http.get<ApiResponseModel>("https://freeapi.miniprojectideas.com/api/BigBasket/DeleteProductFromCartById?id="+itemId);
  }
}
