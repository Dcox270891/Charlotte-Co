import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Picture from "../Picture/Picture";

function ProductCard({product}){
    return (<>
        {(product)?(<div className="productCard">
            <Link to={`/productpage/${product._id}`} >         
                {(product.transfer)?(<h3 className="productCard-price" >£{product.price + product.transfer.pricedifferce}</h3>):""}
                {(product.images)?(<Picture 
                        publicId={product.images[0].public_id}
                        version={product.images[0].version}
                        width="200"
                        quality="60"
                        />
                ):""}
                <h3 className="productCard-name">{product.name}</h3>
            </Link>
            </div>):""}
    </>)
}

export default ProductCard;