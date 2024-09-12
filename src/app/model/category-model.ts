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
