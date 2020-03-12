import React, {useState } from "react";
//import * as qs from 'query-string';
import "./style.css";

function ProductPage(props){
    const [  title,  ] = useState();
    const [  description,  ] = useState();
    const [  images,  ] = useState();
    const [  mainImage,  ] = useState();
    const [  price,  ] = useState();
    const [  uniqueTransfers,  ] = useState();


    // useEffect(() => {
    //     const query = qs.parse(props.location.search);
    //     console.log(query);
    // },[])


    return (<>
        <div className="product-page">
            <div className="row">
                <div className="product-main">
                    <div className="product-title">
                        <h3>{title}</h3>
                    </div>
                    <div className="product-main-img">
                        <img alt={title} src={mainImage}/>
                    </div>
                </div>
                <div className="product-other-img">
                    {images.map(image => {
                        return <img alt={title} src={image}/>
                    })}
                </div>
            </div>
            <div className="row">
                <div className="product-description">
                    {description}
                </div>
            </div>
            <div className="row">
                <div className="product-price">
                    £{price}
                </div>
                <div className="product-unique-transfers">
                    {uniqueTransfers.map(transfer => {
                        return <p>{transfer}</p>
                    })}
                </div>
            </div>
            <div className="row">
                <div className="product-add-to-basket">
                    <button>Add to Basket</button>
                </div>
                <div className="product-quantity">
                    -0+
                </div>
            </div>
        </div>
    </>)
};

export default ProductPage;