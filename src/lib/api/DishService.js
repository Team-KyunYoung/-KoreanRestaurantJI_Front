import axios from "axios";

import Authentication from "lib/api/Authentication";

const DISH_API_BASE_URL = "/api/dish";

class DishService {
  createDish(dishName, dishPhoto, dishPrice, dishCategory, dishDescription,
    dishCalroies, dishCarbohydrate, dishCholesterol, dishFat, dishProtein, dishServingSize,
    dishSodium, dishSugars, dishTransFat) {
    let data = {
      dishName: dishName,
      dishPhoto: dishPhoto,
      dishPrice: dishPrice,
      dishCategory: dishCategory,
      dishDescription: dishDescription,
      nutritionFacts: {
        dishCalroies: dishCalroies,
        dishCarbohydrate: dishCarbohydrate,
        dishCholesterol: dishCholesterol,
        dishFat: dishFat,
        dishProtein: dishProtein,
        dishServingSize: dishServingSize,
        dishSodium: dishSodium,
        dishSugars: dishSugars,
        dishTransFat: dishTransFat
      }
    };
    Authentication.setupAxiosInterceptors();
    return axios.post(DISH_API_BASE_URL + "/create", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  findAllDish() {
    return axios.get(DISH_API_BASE_URL + "/find");
  }

  findDish(dishNumber) {
    return axios.get(DISH_API_BASE_URL + "/find/" + dishNumber);
  }

  searchDish(dishName) {
    let data = {
      input: dishName
    };
    Authentication.setupAxiosInterceptors();
    return axios.post(DISH_API_BASE_URL + "/search", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  deleteDish(dishNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      DISH_API_BASE_URL + "/delete/" + dishNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }
}

export default new DishService();
