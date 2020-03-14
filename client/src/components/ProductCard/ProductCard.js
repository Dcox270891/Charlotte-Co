import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";

function ProductCard({product}){
    return (<>
        <Link to={`/productpage/${product._id}`} >
            <div>
                {(product.images.length>0)?(<img src={product.images[0].url}/>):""}
                <h3>{product.name}</h3>
            </div>
        </Link>
    </>)
}

export default ProductCard;