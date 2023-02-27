export interface IShop {
  image: string;
  shopName: string;
  items: Item[];
}

interface Item {
  itemName: string;
  price: number;
}
