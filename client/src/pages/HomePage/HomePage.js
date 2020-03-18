import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import API from "../../utils/API";

function HomePage(){
    const [ hotNow, setHotNow ] = useState();
    const [ newProduct, setNewProduct ] = useState();
    const [ allProducts, setAllProducts ] = useState(null);

    useEffect(() => {
        API.getProducts()
            .then(res => setAllProducts(res.data))
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        if (allProducts !== null){
            setHotNow(allProducts[Math.floor(Math.random() * Math.floor(allProducts.length))]);
            allProducts.filter(product => product !== hotNow);
            setNewProduct(allProducts[Math.floor(Math.random() * Math.floor(allProducts.length))]);
        }
    },[allProducts])

    return(<>
        <div className="container row">
            <div className="home-product">
                {hotNow?(<ProductCard key="hotNow" product={hotNow}/>):""}
            </div>
            <div className="home-product">
                {newProduct?(<ProductCard key="New" product={newProduct}/>):""}
            </div>
        </div>
    </>)
}

export default HomePage;