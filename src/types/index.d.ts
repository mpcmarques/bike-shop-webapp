export interface ICategory {
  name: string;
  description: string;
  label: string;
}

export interface ICategoryData extends ICategory {
  _id: string;
  products: Array<IProductData>;
}

export interface IProduct {
  name: string;
  label: string;
  description: string;
  productType: "single" | "composed" | "bundle";
  category: string;
  listPrice: number;
  salesPrice: number;
}

export interface IProductData extends IProduct {
  _id: string;
}
