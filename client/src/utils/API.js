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
    editCategory: function(id, category){
        return axios.put(`/api/category/${id}`, category);
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
    editSubCategory: function(id, subCategory){
        return axios.put(`/api/subcategory/${id}`, subCategory);
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
    editTransfer: function(id, transfer){
        return axios.put(`/api/uniquetransfers/${id}`, transfer);
    },
    getTransferByProduct: function(id){
        return axios.get(`/api/uniquetransfers/product/${id}`);
    },
}
