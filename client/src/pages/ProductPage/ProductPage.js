import React, {useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import Gallery from "../../components/Gallery/Gallery";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
import Quantity from "../../components/Quantity/Quantity";
import { Link } from "react-router-dom";

function ProductPage(props){
    const [ basketData, setBasketData ] = useContext(BasketContext);
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [  product, setProduct ] = useState(undefined);
    const [  title, setTitle  ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  images, setImages ] = useState([]);
    const [  price, setPrice ] = useState("");
    const [  uniqueTransfers, setUniqueTransfers ] = useState([]);
    const [  transferSelected, setTransferSelected ] = useState(undefined);
    const [  size, setSize ] = useState();
    const [  color, setColor ] = useState();
    const [ quantity, setQuantity ] = useState(0);
    const [ isEditable, setIsEditable ] = useState();
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
            setPrice(product.price);
            setSize(product.sizes[0]);
            setColor(product.productColours[0]);
            setUniqueTransfers(product.uniqueTransfers);
            setIsEditable(product.isEditable);
        }
    },[product])

    useEffect(()=> {
        if (transferSelected !== undefined){
            setImages([...transferSelected.transferImages, ...images])
            setPrice(transferSelected.priceDifference + product.price)
        }
    },[transferSelected])

    function selectedTransfer(e){
        e.preventDefault()
        setTransferSelected(uniqueTransfers[e.target.value])
    }

    function addToBasket(){
        if(loggedOnUser !== undefined && transferSelected !== undefined){
            console.log(`basket row id ${basketData[0].basketId}`)
            API.newBasketRow({
                    basketId: basketData[0].basketId,
                    userId: loggedOnUser.userId,
                    productId: product._id,
                    productTitle: product.name,
                    transferId: transferSelected._id,
                    transferTitle: transferSelected.title,
                    size: size,
                    productColor: color,
                    quantity: quantity,
                    price: price,
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } else {
            alert("You need to log on and select a transfer before you can add an item to your basket.")
        }
    }

    return (<>
        <div className="product-page">
            {(isEditable)? (
                <div>
                    <Link to={`/product/transfer/${product._id}`}>
                        <h1>Create your own Transfer for this product</h1>
                    </Link>
                </div>
            ):""}
            <div className="container">
                <div className="product-main">
                    <div className="product-title">
                        <h3>{title}</h3>
                        {(transferSelected !== undefined)?(<h2>{transferSelected.title}</h2>):""}
                    </div>
                </div>
                <div className="product-other-img">
                    <Gallery
                        images={images}
                    />
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
                    <p>£{price}</p>
                </div>
                <div className="product-unique-transfers">
                    <select onChange={(e) => selectedTransfer(e)}>
                        <option value="null">Select Your option</option>
                        {uniqueTransfers ? (uniqueTransfers.map((transfer, i) => {
                            return (<option
                                key={transfer._id}
                                value={i}
                            >
                                {transfer.title}
                            </option>)
                        })):""}
                    </select>
                </div>
            </div>
            <div className="row">
            <div>
                    {(product !== undefined)?(
                        <div>
                            <label htmlFor="sizeSelector">
                                Select your Size : 
                            </label>
                            <select
                                name="sizeSelector"
                                onChange={(e) => setSize(product.sizes[e.target.value])}
                            >
                                {product.sizes.map((size, i)=> {
                                    return <option value={i} key={size}>
                                        {size}
                                    </option>
                                })}
                            </select>
                        </div>
                    ):""}
                </div>
                <div>
                    {(product !== undefined)?(
                        <div>
                            <label htmlFor="colorSelector">
                                Select your Color : 
                            </label>
                            <select
                                name="colorSelector"
                                onChange={(e) => setColor(product.productColours[e.target.value])}
                            >
                                {product.productColours.map((color, i)=> {
                                    return <option value={i} key={color}>
                                        {color}
                                    </option>
                                })}
                            </select>
                        </div>
                    ):""}
                </div>
                <div className="product-add-to-basket">
                    <button onClick={addToBasket}>Add to Basket</button>                </div>
                <div className="product-quantity">
                    <Quantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </div>
            </div>
        </div>
    </>)
};

export default ProductPage;