import { IProductData } from "@/types";

export const calculateCartProductPrice = (
  product: IProductData,
  quantity: number,
  combination?: IProductData[],
) => {
  if (combination && combination.length > 0) {
    let price = 0;

    combination.forEach((product) => {
      price += calculateCartProductPrice(product, 1);
    });

    return price * quantity;
  }

  if (product.salesPrice) {
    return product.salesPrice * quantity;
  }

  return product.listPrice * quantity;
};
