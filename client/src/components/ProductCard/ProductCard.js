import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "./style.css";

function ProductCard({product}){
    return (<>
        {(product)?(<Link to={`/productpage/${product._id}`} >
            <div>
                {(product.transfer)?(<h3>£{product.price + product.transfer.pricedifferce}</h3>):""}
                {(product.image)?(<img  alt={product.name} src={product.images[0].url}/>):""}
                <h3>{product.name}</h3>
            </div>
        </Link>):""}
    </>)
}

export default ProductCard;