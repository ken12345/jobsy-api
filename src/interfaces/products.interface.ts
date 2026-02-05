export interface IProducts {
  name: string;
  description: string | "";
  imageUrl: string;
  price: number;
  isAvailable: boolean;
  merchantId?: number;
  eta: string;
  bestSeller: number | 0;
  createdBy: string | "";
  updatedBy: string | "";
  productImage: FormData
}