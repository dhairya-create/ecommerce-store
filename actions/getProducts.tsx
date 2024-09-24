import { Product } from "@/types";
import qs from "query-string";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`; // Renaming to API_URL

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({ // Renaming to finalURL
    url: API_URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId, // Fixed typo
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const response = await fetch(url);
  return response.json();
};

export default getProducts;
