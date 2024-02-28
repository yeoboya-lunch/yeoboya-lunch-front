export type Shop = {
  image: string;
  shopName: string;
  items: ShopItem[];
};

export type ShopItem = {
  name: string;
  price: number;
};
