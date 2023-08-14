import { RestaurantMenu } from "../../types/menu";

  export const menuData: RestaurantMenu = {
  "restaurantName": "Bistro Central",
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "id": 1,
          "name": "Bruschetta",
          "description": "Toasted bread with tomatoes, basil, garlic, and olive oil.",
          "price": 6.50
        },
        {
          "id": 2,
          "name": "Caesar Salad",
          "description": "Romaine lettuce with Caesar dressing, croutons, and parmesan.",
          "price": 7.00
        }
      ]
    },
    {
      "category": "Main Courses",
      "items": [
        {
          "id": 3,
          "name": "Grilled Salmon",
          "description": "Salmon fillet served with asparagus and lemon butter sauce.",
          "price": 18.00
        },
        {
          "id": 4,
          "name": "Steak Frites",
          "description": "Prime beef steak with a side of fries.",
          "price": 22.00
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "id": 5,
          "name": "Crème Brûlée",
          "description": "Rich custard base topped with caramelized sugar.",
          "price": 8.00
        },
        {
          "id": 6,
          "name": "Chocolate Fondant",
          "description": "Molten chocolate cake with a creamy center, served with vanilla ice cream.",
          "price": 9.00
        }
      ]
    },
    {
      "category": "Drinks",
      "items": [
        {
          "id": 7,
          "name": "House Red Wine",
          "description": "Glass of our best red wine.",
          "price": 7.50
        },
        {
          "id": 8,
          "name": "Mojito",
          "description": "Refreshing minty cocktail with white rum, sugar, lime juice, soda water, and mint.",
          "price": 10.00
        }
      ]
    }
  ]
}
