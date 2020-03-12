import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./components/Login/Login";
import ProductPage from "./pages/ProductPage/ProductPage";
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import AddProduct from "./pages/AddProductPage/AddNewProductPage";
import EditProduct from "./pages/EditProductPage/EditProductPage";
import Header from "./components/Header/Header";
import ImageUploader from "./components/ImageUploader/ImageUploader";
import "./styles.css";

function App() {
  
  return (<Router>
    <div>
          <Header />
            <nav>
              <Link to="/productpage">Product Page</Link><br/>
              <Link to="/addnewproduct">Add/Edit Product</Link><br/>
              <Link to="/imageUploader">Image Uploader</Link><br/>
              <Link to="/">Home Page</Link><br/>
              <Link to="/category/:id">Category Page</Link><br/>
            </nav>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
          <Route path="/category/:id" render={(props) => <CategoriesPage {...props} />} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/productpage/:id" render={(props) => <ProductPage {...props} />} />
          <Route exact path="/addnewproduct" component={AddProduct} />
          <Route exact path="/editproduct/:id" render={(props) => <EditProduct {...props} />} />
          <Route exact path="/imageUploader" component={ImageUploader} />
          </div>
    </Router>);
}

export default App;