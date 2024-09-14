export interface Product {
    "message": "",
    "result": true,
    data:any
}
export interface ProductList{
    
    "productId": number,
    "productSku": string,
    "productName": string,
    "productPrice": number,
    "productShortName": string,
    "productDescription": string,
    "createdDate": string,
    "deliveryTimeSpan":string,
    "categoryId": number,
    "productImageUrl": string,
    "categoryName": string
}

export interface CategoryModel {
    message: string,
    result: boolean,
    data:any
}

export interface CategoryListModel {
    categoryId:       number;
    categoryName:     string;
    parentCategoryId: number;
    userId:           number;
}

export interface ProductByCategoryIdModel {
    message: string,
    result: boolean,
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
    CustId: number;
    Name:string;
    MobileNo:string;
    Password:string;
   constructor()
    {
        this.CustId=0;
        this.Name='';
        this.MobileNo='';
        this.Password='';
    }
   }


