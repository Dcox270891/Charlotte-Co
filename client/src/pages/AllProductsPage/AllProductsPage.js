import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import API from "../../utils/API";

function AllProductsPage(){
    const [ produtcs, setProducts ] = useState();

    useEffect(() => {
        API.getProducts()
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    },[])

    return (<>
        {produtcs?(produtcs.map(product => {
            return <ProductCard product={product} />
        })
        ):""}
    </>)
}

export default AllProductsPage;