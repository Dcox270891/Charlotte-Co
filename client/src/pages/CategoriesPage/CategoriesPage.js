import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard"
import API from "../../utils/API";
import "./style.css";

function CategoriesPage(props){
    const {id} = props.match.params
    const [  products, setProducts ] = useState([]);

    useEffect(() => {
        API.getProductBySubCategory(id)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
        console.log(products)
    },[props])
    
    return(<>
        {products.map(product =>{
            return <ProductCard key={product._id} product={product}/>
        })}
    </>)
}

export default CategoriesPage;