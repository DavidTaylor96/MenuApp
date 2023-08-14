export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface RestaurantMenu {
  restaurantName: string;
  menu: MenuCategory[];
}
