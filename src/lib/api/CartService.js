import axios from "axios";

import Authentication from "lib/api/Authentication";

const CART_API_BASE_URL = "https://www.koreanrestaurantji.ga/api/cart";

class CartService {
    addCartDish(dishNumber, cartQuantity){
        let data = {
            cartQuantity: cartQuantity,
            dishNumber: dishNumber
        }
        Authentication.setupAxiosInterceptors();
        return axios.post(CART_API_BASE_URL + "/create", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
        });
    }

    findCartByUser() {
        Authentication.setupAxiosInterceptors();
        return axios.get(CART_API_BASE_URL + "/find");
    }

    updateCartQuantitiy(cartNumber, cartQuantity) {
        Authentication.setupAxiosInterceptors();
        return axios.put(CART_API_BASE_URL + "/update/" + cartNumber, JSON.stringify(cartQuantity), {
            headers: {
              "Content-Type": `application/json`,
            },
        });
    }

    deleteCart(cartNumber) {
        Authentication.setupAxiosInterceptors();
        return axios.delete(CART_API_BASE_URL + "/delete" + cartNumber);
    }
}

export default new CartService();