import axios from "axios";

export default {
    loginUser: function (email, password) {
        return axios.post("/api/user/login", {email, password});
    },
    signUpUser: function (newUser) {
        return axios.post("/api/user/signup", newUser);
    },
    logOutUser: function () {
        return axios.get("/api/user/logout");
    },
    getUserData: function () {
        return axios.get("/api/user_data");
    },
    addNewProduct: function (newProduct){
        return axios.post("api/newproduct", newProduct);
    },
    getCategories: function (){
        return axios.get("/api/categories");
    },
    addNewCategory: function (newCategory){
        return axios.post("api/newCategory", newCategory);
    },
}
