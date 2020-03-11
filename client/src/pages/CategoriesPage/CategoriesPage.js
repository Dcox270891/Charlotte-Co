import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard"
import API from "../../utils/API";
import "./style.css";

function CategoriesPage(props){
    const [  products, setProducts ] = useState([]);
    const [  subCategory, setSubCategory ] = useState({});
    const subCategoryId = props.match.params.id

    useEffect(() => {
        API.getSubCategory(subCategoryId)
            .then(res => {
                setSubCategory(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        API.getTransferByProduct(subCategory._id)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    },[subCategory])
    
    return(<>
        {products.map(product =>{
            return <ProductCard key={product._id} transfer={product}/>
        })}
    </>)
}

export default CategoriesPage;