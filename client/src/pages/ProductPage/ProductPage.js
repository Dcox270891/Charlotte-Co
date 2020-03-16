import React, {useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";

function ProductPage(props){
    const [  product, setProduct ] = useState();
    const [  title, setTitle  ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  images, setImages ] = useState([]);
    const [  mainImage, setMainImage ] = useState({});
    const [  price, setPrice ] = useState("");
    const [  uniqueTransfers, setUniqueTransfers ] = useState([]);
    const query = props.match.params.id;

    useEffect(() => {
        API.getProductById(query)
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    },[query])

    useEffect(() => {
        if(product){
            console.log(product)
            setTitle(product.name);
            setDescription(product.description);
            setImages(product.images);
            setMainImage(product.mainImage);
            setPrice(product.price);
            setUniqueTransfers(product.uniqueTransfers)
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