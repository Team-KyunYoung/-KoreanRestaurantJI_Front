import axios from "axios";

import Authentication from "lib/api/Authentication";

const DISH_API_BASE_URL = "https://www.koreanrestaurantji.ga/api/dish";

class DishService {
  createDish(createDishInput) {
    let data = {
      dishName: createDishInput.dishName,
      dishPhoto: createDishInput.dishPhoto,
      dishPrice: createDishInput.dishPrice,
      dishCategory: createDishInput.dishCategory,
      dishDescription: createDishInput.dishDescription,
      nutritionFacts: {
        dishCalroies: createDishInput.dishCalroies,
        dishCarbohydrate: createDishInput.dishCarbohydrate,
        dishCholesterol: createDishInput.dishCholesterol,
        dishFat: createDishInput.dishFat,
        dishProtein: createDishInput.dishProtein,
        dishServingSize: createDishInput.dishServingSize,
        dishSodium: createDishInput.dishSodium,
        dishSugars: createDishInput.dishSugars,
        dishTransFat: createDishInput.dishTransFat,
      },
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
      input: dishName,
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
