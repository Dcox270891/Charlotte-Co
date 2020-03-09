import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard"
import API from "../../utils/API";
import "./style.css";

function CategoriesPage(props){
    const [  products, setProducts ] = useState([]);

    useEffect(() => {
        API.getTransferByProduct(props.subCategory._id)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    },[])

    
    return(<>
        {products.map(product =>{
            return <ProductCard key={product._id} transfer={product}/>
        })}
    </>)
}

export default CategoriesPage;