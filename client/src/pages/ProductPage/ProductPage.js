import React, {useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";

function ProductPage(props){
    const [  product, setProduct ] = useState();
    const [  title, setTitle  ] = useState((product)?(product.title):(""));
    const [  description, setDescription ] = useState((product)?(product.description):(""));
    const [  images, setImages ] = useState((product)?(product.images):([]));
    const [  mainImage, setMainImage ] = useState((product)?(product.mainImage):({}));
    const [  price, setPrice ] = useState((product)?(product.price):(""));
    const [  uniqueTransfers, setUniqueTransfers ] = useState((product)?(product.uniqueTransfers):([]));


    useEffect(() => {
        const query = props.match.params.id;
        
        console.log("query is")
        console.log(query);
        API.getProductById(query)
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        if(product){
            console.log(product)
            setTitle(product[0].name);
            setDescription(product[0].description);
            setImages(product[0].images);
            setMainImage(product[0].mainImage);
            setPrice(product[0].price);
            setUniqueTransfers(product[0].uniqueTransfers)
        }
    },[product])

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
                    {(images)?(images.map(image => {
                        return <img alt={title} src={image}/>
                    })):""}
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
                    {(uniqueTransfers)? (uniqueTransfers.map(transfer => {
                        return <p>{transfer}</p>
                    })):""}
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