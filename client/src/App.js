import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./components/Login/Login/Login";
import ProductPage from "./pages/ProductPage/ProductPage";
import AddProduct from "./pages/AddProduct/AddProduct";

function App() {
  return (<Router>
      <div>
        <nav>
          <Link to="/login">Log In</Link><br/>
          <Link to="/signup">Sign Up</Link><br/>
          <Link to="/productpage">Product Page</Link><br/>
          <Link to="/addproduct">Add/Edit Product</Link><br/>
        </nav>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/productpage" component={ProductPage} />
        <Route exact path="/addproduct" component={AddProduct} />
      </div>
    </Router>);
}

export default App;