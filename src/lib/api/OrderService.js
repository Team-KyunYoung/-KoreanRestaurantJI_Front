import axios from "axios";

const USER_API_BASE_URL = "/api/order";

class OrderService {
  findAllOrder() {
    return axios.get(USER_API_BASE_URL + "/find");
  }
}

export default new OrderService();
