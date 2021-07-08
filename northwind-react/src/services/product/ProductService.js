import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products";

class ProductService{
    getProducts(){
        return axios.get(PRODUCT_API_BASE_URL);
    }
    addProduct(product){
        return axios.post(PRODUCT_API_BASE_URL,product);
    }
    getProductByID(productID){
        return axios.get(PRODUCT_API_BASE_URL + '/' + productID );
    }
    updateProduct(productID, product){
        return axios.put(PRODUCT_API_BASE_URL + '/' + productID ,product);
    }
    deleteProduct(productID){
        return axios.delete(PRODUCT_API_BASE_URL + '/' + productID);
    }
}
export default new ProductService()