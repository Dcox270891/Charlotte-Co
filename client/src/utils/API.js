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
    getCategoryById: function(id){
        return axios.get("/api/category/" , id);
    },
    deleteCategory: function(id){
        return axios.delete(`/api/category/${id}`);
    },
    getSubCategories: function (){
        return axios.get("/api/subcategory");
    },
    newSubCategory: function (newCategory){
        return axios.post("/api/subcategory", newCategory);
    },
    getSubCategory: function(id){
        return axios.get(`/api/subcategory/${id}`);
    },
    getSubCategoryByCategory: function(id){
        return axios.get(`/api/subcategory/category/${id}`)
    },
    deleteSubCategory: function(id){
        return axios.delete(`/api/subcategory/${id}`);
    },
    getProducts: function (){
        return axios.get("/api/product");
    },
    newProduct: function (newProduct){
        return axios.post("/api/product", newProduct);
    },
    getProductById: function(id){
        return axios.get(`/api/products/${id}`);
    },
    deleteProduct: function(id){
        return axios.delete(`/api/products/${id}`);
    },
    editProduct: function(id, product){
        return axios.put(`/api/products/${id}`, product);
    },
    getProductBySubCategory: function(id){
        return axios.get(`/api/products/subcategory/${id}`)
    },
    getTransfers: function(){
        return axios.get("/api/uniquetransfers/");
    },
    newTransfer: function (newTransfer){
        return axios.post("/api/uniquetransfers", newTransfer);
    },
    getTransferById: function(id){
        return axios.get(`/api/uniquetransfers/${id}`);
    },
    deleteTransfer: function(id){
        return axios.delete(`/api/uniquetransfers/${id}`);
    },
    getTransferByProduct: function(id){
        return axios.get(`/api/uniquetransfers/product/${id}`);
    },
    newBasket: function(newBasket){
        return axios.post(`/api/basket/new`, newBasket );
    },
    getBasketById: function(id){
        return axios.get(`/api/basket/${id}`);
    },
    getAllBaskets: function(){
        return axios.post(`/api/basket`);
    },
    editBasket: function(id){
        return axios.put(`/api/basket/${id}`);
    },
    newBasketRow: function(newBasketrow){
        return axios.post(`/api/Basketrow/new`, newBasketrow );
    },
    getBasketRowById: function(id){
        return axios.get(`/api/Basketrow/${id}`);
    },
    getAllBasketRows: function(){
        return axios.post(`/api/Basketrow`);
    },
    editBasketRow: function(id){
        return axios.put(`/api/Basketrow/${id}`);
    },
    deleteBasketRow: function(id){
        return axios.delete(`/api/Basketrow/${id}`);
    },

}
