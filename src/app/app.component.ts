import {
  Component,
  ElementRef,
  inject,
  NgModule,
  ViewChild,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { RegisterCustomer } from './model/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerceapp';
  customermodel: RegisterCustomer = new RegisterCustomer();
  private productService = inject(ProductService);
  @ViewChild('registerModel') registerModel: ElementRef | undefined;
  openRegisterModel() {
    console.log('Before if');
    if (this.registerModel) {
      console.log('inside if===');
      this.registerModel.nativeElement.style.display = 'block';
    }
  }

  closeRegister() {
    console.log('before if===');
    if (this.registerModel) {
      console.log('inside if===');
      this.registerModel.nativeElement.style.display = 'none';
    }
  }
  saveRegister() {
    console.log('customermodel.MobileNo===', this.customermodel.MobileNo);
    console.log('customermodel.Name===', this.customermodel.Name);
    console.log('customermodel.Password===', this.customermodel.Password);

    this.productService
      .registerCustomer(this.customermodel)
      .subscribe((resp: any) => {
        console.log('the response is' || resp);
      });
  }
}
