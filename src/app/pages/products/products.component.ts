import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CategoryListModel, Product, ProductByCategoryIdList, ProductByCategoryIdModel, ProductList } from '../../model/product';

import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);

  // productList:Product[]=[];
  productList = signal<ProductList[]>([]);
  // productCategoryList = signal<CategoryListModel[]>([]);
   productCategoryList$:Observable<CategoryListModel[]> = new Observable<CategoryListModel[]>();
  productByCategoryList = signal<ProductByCategoryIdList[]>([]);
  subscription:Subscription[]=[];

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
  }
  ngOnDestroy(): void {
    this.subscription.forEach((element)=>{
      element.unsubscribe();

    })
  }

  getAllProduct() {
   this.subscription.push(this.productService.getAllProduct().subscribe(
    (resp: any) => {
      console.log("response===", resp);
      this.productList.set(resp.data);
    }
  )) ;

  }

  getAllCategory() {
//the following code is used to subscribe and also destroy the subscription
//when the page destroy.
   this.productCategoryList$= this.productService.getAllCategory().pipe(
      map(
        item=>item.data
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

}
