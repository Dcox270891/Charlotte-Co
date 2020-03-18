import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import {UserContext} from "../../UserContext";
import API from "../../utils/API";
import Axios from "axios";

function HomePage(){
    const [ loggedOnUser, ] = useContext(UserContext);
    const [ hotNow, setHotNow ] = useContext();
    const [ newProduct, setNewProduct ] = useContext();
    // const [ homeProducts, setHomeProducts ] = useContext();
    // const [ allProducts, setAllProducts ] = useState();

    // useEffect(() => {
    //     Axios.get("./homeProducts.js")
    //         .then(res => setHomeProducts(res.data))
    //         .catch(err => console.log(err));
    //     API.getProducts()
    //         .then(res => setAllProducts(res.data))
    //         .catch(err => console.log(err));
    // },[])

    // useEffect(() => {
    //     API.getProductById(homeProducts.hotNow)
    //         .then(res => setHotNow(res.data))
    //         .catch(err => console.log(err));
    //     API.getProductById(homeProducts.newProduct)
    //         .then(res => setNewProduct(res.data))
    //         .catch(err => console.log(err));
    // },[homeProducts])

    // function changeHotNow(product){
    //     const newHotNow = allProducts[product._id];
    //     function changeHomeProducts (req,res){
    //         Axios.put("./homeProducts.js", {"hotNow": {newHotNow}})
    //             .then(dbmodel => res.json(dbmodel))
    //             .catch(err => console.log(err))
    //     }
    //     changeHomeProducts(req,res);
    // }

    
    return(<>
        {(loggedOnUser !== undefined)?(<h1>{loggedOnUser.firstName} {loggedOnUser.lastName}</h1>):""}
        <div className="container row">
            <div className="home-product">
                <h2 className="home-product-title">Hot Now</h2>
                <ProductCard key="hotNow" product={hotNow}/>
                {/* {loggedOnUser.isAdmin?(
                    <div>
                        <label htmlFor="hotNow">
                            Change this product
                        </label>
                        <select 
                            name="hotNow"
                            onChange={(e) => changeHotNow(e.target.value)}
                        >
                            <option 
                                value={null} 
                                key="None Picked yet"
                            >
                                ...
                            </option>
                            {allProducts.map((product, i) => {
                                return <option
                                    value={i}
                                    key={product._id}
                                >
                                    {product.title}
                                </option>
                            })}
                        </select>
                    </div>
                ):""} */}
            </div>
            <div className="home-product">
                <h2 className="home-product-title">New</h2>
                <ProductCard key="New" product={newProduct}/>
            </div>
        </div>
    </>)
}

export default HomePage;