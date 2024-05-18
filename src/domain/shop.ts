export type Shop = {
  image: string;
  shopName: string;
  items: ShopItem[];
};

export type ShopItem = {
  itemName: string;
  price: number;
};
