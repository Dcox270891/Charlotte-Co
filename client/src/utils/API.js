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
    getCategories: function (){
        return axios.get("/api/category");
    },
    newCategory: function (newCategory){
        return axios.post("/api/category", newCategory);
    },
    getCategory: function(id){
        return axios.post(`/api/category/${id}`);
    },
    deleteCategory: function(id){
        return axios.delete(`/api/category/${id}`);
    },
    editCategory: function(id){
        return axios.put(`/api/category/${id}`);
    },
    getSubCategories: function (){
        return axios.get("/api/subcategory");
    },
    newSubCategory: function (newCategory){
        return axios.post("/api/subcategory", newCategory);
    },
    getSubCategory: function(id){
        return axios.post(`/api/subcategory/${id}`);
    },
    getSubCategoryByCategory: function(id){
        return axios.get(`/api/subcategory/category/${id}`)},
    deleteSubCategory: function(id){
        return axios.delete(`/api/subcategory/${id}`);
    },
    editSubCategory: function(id){
        return axios.put(`/api/subcategory/${id}`);
    },
    getProducts: function (){
        return axios.get("/api/products");
    },
    newProduct: function (newCategory){
        return axios.post("/api/products", newCategory);
    },
    getProduct: function(id){
        return axios.post(`/api/products/${id}`);
    },
    deleteProduct: function(id){
        return axios.delete(`/api/products/${id}`);
    },
    editProduct: function(id){
        return axios.put(`/api/products/${id}`);
    },
}
