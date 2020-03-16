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
        return axios.delete("/api/category/" , id);
    },
    editCategory: function(id){
        return axios.put("/api/category/" , id);
    },
    getSubCategories: function (){
        return axios.get("/api/subcategory");
    },
    newSubCategory: function (newCategory){
        return axios.post("/api/subcategory", newCategory);
    },
    getSubCategory: function(id){
        return axios.get("/api/subcategory/" , id);
    },
    getSubCategoryByCategory: function(id){
        return axios.get(`/api/subcategory/category/${id}`)
    },
    deleteSubCategory: function(id){
        return axios.delete("/api/subcategory/" , id);
    },
    editSubCategory: function(id){
        return axios.put("/api/subcategory/" , id);
    },
    getProducts: function (){
        return axios.get("/api/product");
    },
    newProduct: function (newProduct){
        return axios.post("/api/products", newProduct);
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
    getTransfer: function(id){
        return axios.post("/api/uniquetransfers/" , id);
    },
    deleteTransfer: function(id){
        return axios.delete("/api/uniquetransfers/" , id);
    },
    editTransfer: function(id){
        return axios.put("/api/uniquetransfers/" , id);
    },
    getTransferByProduct: function(id){
        return axios.get("/api/uniquetransfers/product/" , id);
    },
    getAllImages: function(){
        return axios.get("/api/image");
    },
    findImageById: function(id){
        return axios.get("/api/image/" , id);
    },
    postImage: function(newImage){
        return axios.post("/api/image", newImage);
    },
    deletImageById: function(id){
        return axios.delete("/api/image/" , id);
    },
    deletImageByProduct: function(id){
        return axios.delete("/api/image/product/" , id);
    },
    findImageByProduct: function(newImage){
        return axios.get("/api/image/product/" , newImage);
    },
    deletImageByTransfer: function(id){
        return axios.delte("/api/image/transfer/" , id);
    },
    findImageByTransfer: function(newImage){
        return axios.get("/api/image/transfer/" , newImage);
    },
}
