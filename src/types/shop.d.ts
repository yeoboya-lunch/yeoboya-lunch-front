export interface IShop {
  image: string;
  shopName: string;
  items: Item[];
}

interface Item {
  name: string;
  price: number;
}
