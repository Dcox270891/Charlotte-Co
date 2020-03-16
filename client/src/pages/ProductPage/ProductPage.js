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
    const [  transferSelected, setTransferSelected ] = useState(undefined);
    const query = props.match.params.id;

    useEffect(() => {
        API.getProductById(query)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
        API.getTransferByProduct(query)
            .then(res => setUniqueTransfers(res.data))
            .catch(err => console.log(err))
    },[query])

    useEffect(() => {
        if(product){
            setTitle(product.name);
            setDescription(product.description);
            setImages(product.images);
            setMainImage(product.mainImage);
            setPrice(product.price);
            setUniqueTransfers(product.uniqueTransfers)
            console.log(uniqueTransfers)
        }
    },[product])

    function selectedTransfer(transfer){
        setTransferSelected(transfer);
    }

    return (<>
        <div className="product-page">
            <div className="row">
                <div className="product-main">
                    <div className="product-title">
                        <h3>{title}</h3>
                        {(transferSelected !== undefined)?(<h2>{transferSelected.title}</h2>):""}
                    </div>
                    <div className="product-main-img">
                        <img alt={title} src={mainImage}/>
                    </div>
                </div>
                <div className="product-other-img">
                    {(transferSelected !== undefined)?(transferSelected.images.map((image, i) =>{
                        return <img 
                            key={i}
                            alt={transferSelected.title} 
                            src={image}
                        />
                    })):""}
                    {(images)?(images.map((image, i) => {
                        return <img 
                            key={i}
                            alt={title} 
                            src={image}
                        />
                    })):""}
                </div>
            </div>
            <div className="row">
                <div className="product-description">
                    {(transferSelected !== undefined)?transferSelected.description:""}
                    {description}
                </div>
            </div>
            <div className="row">
                <div className="product-price">
                {(transferSelected !== undefined)?(<p>£{transferSelected.priceDifference + price}</p>):(<p>£{price}</p>)}
                </div>
                <div className="product-unique-transfers">
                    <select onChange={(e) => selectedTransfer(e.target.value)}>
                        <option value="null">Select Your option</option>
                        {uniqueTransfers ? (uniqueTransfers.map(transfer => {
                            return (<option
                                key={transfer.id}
                                value={transfer._id}
                            >
                                {transfer.title}
                            </option>)
                        })):""}
                    </select>
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