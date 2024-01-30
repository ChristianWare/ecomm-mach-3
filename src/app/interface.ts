export interface simplifiedProduct {
  image(image: any): unknown;
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  isFeatured: boolean;
  quantity: number;
}

export interface fullProduct {
  _id: string;
  images: any;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
  quantity: number;
  sizes: any;
}
