import React, {useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import Gallery from "../../components/Gallery/Gallery";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
import Quantity from "../../components/Quantity/Quantity";
import { Link } from "react-router-dom";
import TransferCard from "../../components/TransferCard/TransferCard";

function ProductPage(props){
    const [  basketData, setBasketData ] = useContext(BasketContext);
    const [  loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [  product, setProduct ] = useState(undefined);
    const [  title, setTitle  ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  images, setImages ] = useState([]);
    const [  price, setPrice ] = useState("");
    const [  uniqueTransfers, setUniqueTransfers ] = useState([]);
    const [  transferSelected, setTransferSelected ] = useState(undefined);
    const [  size, setSize ] = useState();
    const [  color, setColor ] = useState();
    const [  quantity, setQuantity ] = useState(0);
    const [  isEditable, setIsEditable ] = useState();
    const query = props.match.params.id;

    useEffect(() => {
        API.getProductById(query)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
        API.getTransferByProduct(query)
            .then(res => {
                setUniqueTransfers(res.data)
                console.log(`transfers`, uniqueTransfers)})
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

    
    useEffect(()=> {
        console.log(`transfers`, uniqueTransfers)

    },[uniqueTransfers])


    return (<>
        <div className="product-page">
            {(isEditable)? (
                <div>
                    <Link to={`/product/transfer/${product._id}`}>
                        <h1>Create your own Transfer for this product</h1>
                    </Link>
                </div>
            ):""}
            {(uniqueTransfers != undefined)?
            (uniqueTransfers.map(transfer => {
                return (<TransferCard transfer={transfer}
                    product={product}
                    key={transfer._id}/>)
            }))
            :("We are loading your products for you")}
        </div>
    </>)
};

export default ProductPage;