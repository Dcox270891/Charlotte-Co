import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import SignUp from "./pages/SignUp/SignUp";
import Login from "./components/Login/Login";
import ProductPage from "./pages/ProductPage/ProductPage";
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import AddProduct from "./pages/AddProductPage/AddNewProductPage";
import EditProduct from "./pages/EditProductPage/EditProductPage";
import Header from "./components/Header/Header";
import "./styles.css";
import AllProductsPage from './pages/AllProductsPage/AllProductsPage';
import {UserWrapper} from "./UserContext"

function App() {
  
  return (<Router>
    <UserWrapper>
      <CloudinaryContext cloudName="charlotte-co">
      <div>
        <Header />
        <div className="main-page">
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
          <Route path="/allproducts" component={AllProductsPage} />
          <Route path="/category/:id" render={(props) => <CategoriesPage {...props} />} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/productpage/:id" render={(props) => <ProductPage {...props} />} />
          <Route exact path="/addnewproduct" component={AddProduct} />
          <Route path="/editproduct/:id" render={(props) => <EditProduct {...props} />} />
        </div>
      </div>
      </CloudinaryContext>
    </UserWrapper>
  </Router>);
}

export default App;