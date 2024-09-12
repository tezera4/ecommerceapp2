import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product, ProductList } from '../../model/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit  {
  private productService=inject(ProductService);

  // productList:Product[]=[];
  productList=signal<ProductList[]>([]);

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(
      (resp:any)=>{
        console.log("response===",resp);
        this.productList.set(resp.data);
      }
    )
  }

}
