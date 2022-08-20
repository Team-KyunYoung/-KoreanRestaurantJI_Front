import axios from "axios";

const USER_API_BASE_URL = "/api/dish";

class DishService {
  findAllDish() {
    return axios.get(USER_API_BASE_URL + "/find");
  }

  findDish(dishNumber) {
    return axios.get(USER_API_BASE_URL + "/find/" + dishNumber);
  }
}

export default new DishService();
