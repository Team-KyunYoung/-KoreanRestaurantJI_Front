import axios from "axios";

import Authentication from "lib/api/Authentication";

const ORDER_API_BASE_URL = "/api/order";

class OrderService {
    addOrder(dishOrderList){
        let data = {
            dishOrderList: dishOrderList
        }
        Authentication.setupAxiosInterceptors();
        return axios.post(ORDER_API_BASE_URL + "/create", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
        });
    }
    addCarttoOrder(dishOrderList){
        let data = {
            dishOrderList: dishOrderList
        }
        Authentication.setupAxiosInterceptors();
        return axios.post(ORDER_API_BASE_URL + "/create/cart", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
        });
    }

    findOrderByUser() {
        Authentication.setupAxiosInterceptors();
        return axios.get(ORDER_API_BASE_URL + "/find");
    }

    updateOrderStatus(orderNumber, orderStatus) {
        Authentication.setupAxiosInterceptors();
        return axios.put(ORDER_API_BASE_URL + "/update/" + orderNumber, JSON.stringify(orderStatus), {
            headers: {
              "Content-Type": `application/json`,
            },
        });
    }

    deleteOrder(orderNumber) {
        Authentication.setupAxiosInterceptors();
        return axios.delete(ORDER_API_BASE_URL + "/delete/" + orderNumber);
    }
}

export default new OrderService();
