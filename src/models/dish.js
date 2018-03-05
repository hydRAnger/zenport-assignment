import {fromJS, List} from 'immutable';

// Akira: Cause this is a React test and has no async need, I'm not involve Redux for now.
// Akira: This models object takes role of Action+Reducer in Redex.
const dishInfo = fromJS([
  {
    'id': 1,
    'name': 'Chicken Burger',
    'restaurant': 'Mc Donalds',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 2,
    'name': 'Ham Burger',
    'restaurant': 'Mc Donalds',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 3,
    'name': 'Cheese Burger',
    'restaurant': 'Mc Donalds',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 4,
    'name': 'Fries',
    'restaurant': 'Mc Donalds',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 5,
    'name': 'Egg Muffin',
    'restaurant': 'Mc Donalds',
    'availableMeals': ['breakfast']
  },
  {
    'id': 6,
    'name': 'Burrito',
    'restaurant': 'Taco Bell',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 7,
    'name': 'Tacos',
    'restaurant': 'Taco Bell',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 8,
    'name': 'Quesadilla',
    'restaurant': 'Taco Bell',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 9,
    'name': 'Steak',
    'restaurant': 'BBQ Hut',
    'availableMeals': ['dinner']
  },
  {
    'id': 10,
    'name': 'Yakitori',
    'restaurant': 'BBQ Hut',
    'availableMeals': ['dinner']
  },
  {
    'id': 11,
    'name': 'Nankotsu',
    'restaurant': 'BBQ Hut',
    'availableMeals': ['dinner']
  },
  {
    'id': 12,
    'name': 'Piman',
    'restaurant': 'BBQ Hut',
    'availableMeals': ['dinner']
  },
  {
    'id': 13,
    'name': 'Vegan Bento',
    'restaurant': 'Vege Deli',
    'availableMeals': ['lunch']
  },
  {
    'id': 14,
    'name': 'Coleslaw Sandwich',
    'restaurant': 'Vege Deli',
    'availableMeals': ['breakfast']
  },
  {
    'id': 15,
    'name': 'Grilled Sandwich',
    'restaurant': 'Vege Deli',
    'availableMeals': ['breakfast']
  },
  {
    'id': 16,
    'name': 'Veg. Salad',
    'restaurant': 'Vege Deli',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 17,
    'name': 'Fruit Salad',
    'restaurant': 'Vege Deli',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 18,
    'name': 'Corn Soup',
    'restaurant': 'Vege Deli',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 19,
    'name': 'Tomato Soup',
    'restaurant': 'Vege Deli',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 20,
    'name': 'Minestrone Soup',
    'restaurant': 'Vege Deli',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 21,
    'name': 'Pepperoni Pizza',
    'restaurant': 'Pizzeria',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 22,
    'name': 'Pepperoni Pizza',
    'restaurant': 'Pizzeria',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 23,
    'name': 'Hawaiian Pizza',
    'restaurant': 'Pizzeria',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 24,
    'name': 'Seafood Pizza',
    'restaurant': 'Pizzeria',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 25,
    'name': 'Deep Dish Pizza',
    'restaurant': 'Pizzeria',
    'availableMeals': ['dinner']
  },
  {
    'id': 26,
    'name': 'Chow Mein',
    'restaurant': 'Panda Express',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 27,
    'name': 'Mapo Tofu',
    'restaurant': 'Panda Express',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 28,
    'name': 'Kung Pao',
    'restaurant': 'Panda Express',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 29,
    'name': 'Wontons',
    'restaurant': 'Panda Express',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 30,
    'name': 'Garlic Bread',
    'restaurant': 'Olive Garden',
    'availableMeals': ['breakfast', 'lunch', 'dinner']
  },
  {
    'id': 31,
    'name': 'Ravioli',
    'restaurant': 'Olive Garden',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 32,
    'name': 'Rigatoni Spaghetti',
    'restaurant': 'Olive Garden',
    'availableMeals': ['lunch', 'dinner']
  },
  {
    'id': 33,
    'name': 'Fettucine Pasta',
    'restaurant': 'Olive Garden',
    'availableMeals': ['lunch', 'dinner']
  }
]);

export const availableMeals = new List(['breakfast', 'lunch', 'dinner']);

export const getRestaurantsByMeal = meal => {
  if (!meal) {
    return dishInfo.reduce((restaurants, dish) =>
      restaurants.unshift(dish.get('restaurant')),
      new List()
    ).toSet().toList(); // toSet() for Deduplication
  }

  return dishInfo.filter(dish =>
    dish.get('availableMeals').includes(meal)
  ).reduce((restaurants, dish) =>
    restaurants.unshift(dish.get('restaurant')),
    new List()
  ).toSet().toList(); // toSet() for Deduplication
}

export const getDishesByMealAndRestaurant = (meal, restaurant) => {
  return dishInfo.filter(dish =>
    dish.get('restaurant') === restaurant && dish.get('availableMeals').includes(meal)
  ).reduce((dishes, dish) =>
    dishes.unshift(dish.get('name')),
    new List()
  ).toSet().toList(); // toSet() for Deduplication
}
