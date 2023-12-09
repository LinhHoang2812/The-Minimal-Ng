export interface SingleProduct {
  id: string;
  brand: string;
  category: string;
  color: string[];
  des: string;
  images: string[];
  name: string;
  price: number;
  rating: number;
  sale: boolean;
  salePrice: number;
  size: string[];
  viewCount: number;
}
export interface FavoriteItem {
  id: string;
  product_id: string;
}
export interface CartItem {
  id: string;
  product_id: string;
  color: string;
  size: string;
  quantity: number;
  finalPrice: number;
  img: string;
}

export interface TopSize {
  measure: string;
  chest: number;
  length: number;
  shoulder: number;
}

export interface BottomSize {
  measure: string;
  waist: number;
  length: number;
  hip: number;
}

export interface AddressInfo {
  name: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  amount: number;
  paid: boolean;
  createdAt: Date;
}
