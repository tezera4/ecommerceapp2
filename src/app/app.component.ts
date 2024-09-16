import {
  Component,
  ElementRef,
  inject,
  NgModule,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {
  ApiResponseModel,
  CartByCustomerListModel,
  LoginModel,
  RegisterCustomer,
} from './model/product';
import { ProductService } from './services/product.service';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';
import { Constant } from './constant/constant';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ecommerceapp';
  customermodel: RegisterCustomer = new RegisterCustomer();
  private productService = inject(ProductService);
  @ViewChild('registerModel') registerModel: ElementRef | undefined;
  @ViewChild('loginModal') loginModal: ElementRef | undefined;
  apiResponseModel!: ApiResponseModel;
  loginModel: LoginModel = new LoginModel();
  loginCredInformation: RegisterCustomer = new RegisterCustomer();
  userLogedIn: boolean = false;
  isPopupCartOpen: boolean = false;
  cartByCustomerListModel: CartByCustomerListModel[] = [];
  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);

    if (isUser != null) {
      console.log('on init===isUser true==', isUser);
      const parseObj = JSON.parse(isUser);
      this.loginCredInformation = parseObj;
//the following line of code is used to populate cart added by the specific user
      this.getCartProductsByCustomerId();
    }
    //the following subscription is for inter commponent communication
    this.productService.addToCartSubject.subscribe(
      (resp:boolean)=>{
        if(resp){
          this.getCartProductsByCustomerId();
        }

      }
    )
  }
  showCartPopup() {
    this.isPopupCartOpen = !this.isPopupCartOpen;
  }
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

  openLogin() {
    console.log('login model before if=======', this.loginModel);
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'block';
    }
  }

  logOff() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loginCredInformation = new RegisterCustomer();
  }
  closeLogin() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'none';
    }
  }
  saveRegister() {
    console.log('customermodel.MobileNo===', this.customermodel.MobileNo);
    console.log('customermodel.Name===', this.customermodel.name);
    console.log('customermodel.Password===', this.customermodel.Password);

    this.productService
      .registerCustomer(this.customermodel)
      .subscribe((resp: ApiResponseModel) => {
        if (resp.result) {
          alert('Customer Registered successfully');
          this.closeRegister();
        } else {
          alert('There is an issue==' + resp.message);
        }
      });
  }

  login() {
    console.log('loginModel.UserName===', this.loginModel.UserName);
    console.log('loginModel.UserPassword===', this.loginModel.UserPassword);

    this.productService
      .login(this.loginModel)
      .subscribe((resp: ApiResponseModel) => {
        if (resp.result) {
          this.loginCredInformation = resp.data;
          localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(resp.data));
          alert('login successfully');
          console.log('loginInfo==');

          this.closeLogin();
        } else {
          alert('There is an issue==' + resp.message);
        }
      });
  }

  getCartProductsByCustomerId() {
    debugger;
    this.productService
      .GetCartProductsByCustomerId(this.loginCredInformation.custId)
      .subscribe((resp: ApiResponseModel) => {
        if (resp.result) {
          this.cartByCustomerListModel = resp.data;
          console.log('GetCartProductsByCustomerId result==', resp.data);
        } else {
        }
      });
  }

  DeleteProductFromCartById(cartId:number) {
    debugger; 
    if(confirm("are sure you want to delete")){
      this.productService
      .DeleteProductFromCartById(cartId)
      .subscribe((resp: ApiResponseModel) => {
        if (resp.result) {
          this.getCartProductsByCustomerId();
          alert("Cart Item Deleted Successfully");
        } else {
        }
      });
    }  
   
  }
}
