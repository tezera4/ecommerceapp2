import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { AddToCartModel, ApiResponseModel, CategoryListModel, Product, ProductByCategoryIdList, ProductByCategoryIdModel, ProductList, RegisterCustomer } from '../../model/product';

import { map, Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);

  // productList:Product[]=[];
  productList = signal<ProductList[]>([]);
  // productCategoryList = signal<CategoryListModel[]>([]);
  productCategoryList$: Observable<CategoryListModel[]> = new Observable<CategoryListModel[]>();
  productByCategoryList = signal<ProductByCategoryIdList[]>([]);
  subscription: Subscription[] = [];
  addToCartModel: AddToCartModel=new AddToCartModel();
  loginCredInformation: RegisterCustomer = new RegisterCustomer();
  constructor() {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      console.log("on init===isUser true==", isUser);
      const parseObj = JSON.parse(isUser);
      this.loginCredInformation = parseObj;
    }
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
  }
  ngOnDestroy(): void {
    this.subscription.forEach((element) => {
      element.unsubscribe();

    })
  }

  getAllProduct() {
    this.subscription.push(this.productService.getAllProduct().subscribe(
      (resp: any) => {
        console.log("response===", resp);
        this.productList.set(resp.data);
      }
    ));

  }

  getAllCategory() {
    //the following code is used to subscribe and also destroy the subscription
    //when the page destroy.
    this.productCategoryList$ = this.productService.getAllCategory().pipe(
      map(
        item => item.data
      )
    );

    // .subscribe(
    //   (resp: CategoryModel) => {
    //     console.log("Category List====", resp.data);
    //     this.productCategoryList.set(resp.data);


    //   }
    // );



  }
  CategorizeProduct(id: any) {
    this.getProductByCategoryId(id);
  }

  getProductByCategoryId(id: any) {
    this.productService.getProductByCategoryId(id).subscribe((resp: ProductByCategoryIdModel) => {
      this.productList.set(resp.data);
    });
  }

  addToCart(productId: number) {
    debugger
    const addtoCartObj: AddToCartModel = new AddToCartModel();
    addtoCartObj.ProductId = productId;
    addtoCartObj.CustId = this.loginCredInformation.custId;
    this.productService.addToCart(addtoCartObj).subscribe(
      (resp: ApiResponseModel) => {
        if (resp.result) {
          alert("add to cart is successful");
        } else {
          alert("There is an issue");
        }

      }

    );
  }

}
