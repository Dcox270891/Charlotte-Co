import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import Picture from "../Picture/Picture";

function ProductCard({product}){
    return (<>
        {(product)?(<div className="productCard">
            <Link to={`/productpage/${product._id}`} >         
                {(product.transfer)?(<h3 className="productCard-price" >£{product.price + product.transfer.pricedifferce}</h3>):""}
                {(product.images)?(product.images.map(image =>{
                return <Picture 
                        publicId={image.public_id}
                        version={image.version}
                        width="200"
                        quality="60"
                        />
                })):""}
                <h3 className="productCard-name">{product.name}</h3>
            </Link>
            </div>):""}
    </>)
}

export default ProductCard;