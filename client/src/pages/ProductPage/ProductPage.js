import React from "react";
import "./style.css";

function ProductPage(){
    const props = {
        title: "Glass pint cup",
        mainImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQso1TEwQBLsC0ky27bsn7nGAvkiBSM0TEUtDB2SGRJZOJYq3uV&s",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQso1TEwQBLsC0ky27bsn7nGAvkiBSM0TEUtDB2SGRJZOJYq3uV&s",
        ],
        description: "This holds water",
        price: 4.99,
        uniqueTransfers:[
            "1",
            "2",
            "3",
        ],
    };

    return (<>
        <div className="product-page">
            <div className="row">
                <div className="product-main">
                    <div className="product-title">
                        <h3>{props.title}</h3>
                    </div>
                    <div className="product-main-img">
                        <img alt={props.title} src={props.mainImage}/>
                    </div>
                </div>
                <div className="product-other-img">
                    {props.images.map(image => {
                        return <img alt={props.title} src={image}/>
                    })}
                </div>
            </div>
            <div className="row">
                <div className="product-description">
                    {props.description}
                </div>
            </div>
            <div className="row">
                <div className="product-price">
                    £{props.price}
                </div>
                <div className="product-unique-transfers">
                    {props.uniqueTransfers.map(transfer => {
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