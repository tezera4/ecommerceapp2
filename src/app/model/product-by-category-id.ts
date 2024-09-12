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
