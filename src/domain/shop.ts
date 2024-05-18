export type Shop = {
  shopName: string;
  items: ShopItem[];
};

export type ShopItem = {
  name: string;
  price: number;
};
