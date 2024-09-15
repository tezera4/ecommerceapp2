export interface Product {
    message: string;
    result: true;
    data: any
}
export interface ProductList {

    productId: number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    productDescription: string;
    createdDate: string;
    deliveryTimeSpan: string;
    categoryId: number;
    productImageUrl: string;
    categoryName: string
}

export interface CategoryModel {
    message: string;
    result: boolean;
    data: any
}

export interface CategoryListModel {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number;
    userId: number;
}

export interface ProductByCategoryIdModel {
    message: string;
    result: boolean;
    data: any
}

export interface ProductByCategoryIdList {
    productId: number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    productDescription: string;
    createdDate: Date;
    deliveryTimeSpan: string;
    categoryId: number;
    productImageUrl: string;
    categoryName: string;
}

//whenever you want to bind object with a form go for class 
//template and f=

export class RegisterCustomer {
    custId: number;
    name: string;
    MobileNo: string;
    Password: string;
    constructor() {
        this.custId = 0;
        this.name = '';
        this.MobileNo = '';
        this.Password = '';
    }
}

export interface ApiResponseModel {
    message: string;
    result: boolean;
    data: any
}

export class LoginModel {
    UserName: string;
    UserPassword: string;

    constructor() {
        this.UserName = '';
        this.UserPassword = '';
    }
}

export class AddToCartModel{
    CartId: number;
    CustId: number;
    ProductId: number;
    Quantity: number;
    AddedDate: Date;

    constructor()
    {
        this.CartId=0;
        this.CustId=0;
        this.ProductId=0;
        this.Quantity=1;
        this.AddedDate=new Date();
    }
  }

  


