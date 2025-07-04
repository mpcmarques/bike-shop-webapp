export interface ICategory {
  name: string;
  description: string;
  label: string;
  showInMenu: boolean;
}

export interface ICategoryData extends ICategory {
  _id: string;
  products: Array<IProductData>;
}

export interface IUserData {
  email: string;
  _id: string;
  roles: Array<"user" | "admin">;
  cart: {
    total: number;
    items: Array<{
      product: IProductData;
      combination: Array<IProductData>;
      quantity: number;
    }>;
  };
}

export interface IProduct {
  name: string;
  label: string;
  description: string;
  productType: "master" | "variant" | "composed";
  category: string;
  listPrice: number;
  salesPrice: number;
  image: string;
  stock: number;
  masterProduct?: IProductDataWithVariants;
  variationAttributes?: Array<{ type: string; value: string }>;
  variants?: IProductData[];
  composed?: Array<
    Array<{
      category?: ICategoryData;
      product?: IProductData;
    }>
  >;
}

export interface IProductData extends IProduct {
  _id: string;
}

interface IProductDataWithVariants extends IProductData {
  variants: IProductData[];
}

interface IComposedProductData extends IProductData {
  composed: Array<Array<{ product: IProductData; category: ICategoryData }>>;
}
