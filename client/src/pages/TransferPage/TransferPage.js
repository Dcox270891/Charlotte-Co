import React, {useState, useEffect, useContext} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from "../../utils/API";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
import {Button, Form, Image} from "react-bootstrap";


function TransferPage(props){
    const [ basketData, setBasketData ] = useContext(BasketContext);
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ selectedProduct, setSelectedProduct ] = useState(undefined);
    const [ selectedTransfer, setSelectedTransfer ] = useState(undefined);
    const [ transferTitle, setTransferTitle  ] = useState("");
    const [ transferDescription, setTransferDescription  ] = useState("");
    const [ transferImages, setTransferImages  ] = useState([]);
    const [ transferMainTranferImage, setTransferMainTranferImage  ] = useState("");
    const [ transferPriceDifference, setTransferPriceDifference  ] = useState("");
    const [ productName, setProductName  ] = useState("");
    const [ productDescription, setProductDescription  ] = useState("");
    const [ productCategory, setProductCategory  ] = useState("");
    const [ productSubCategory, setProductSubCategory  ] = useState("");
    const [ productPrice, setProductPrice  ] = useState("");
    const [ productImages, setProductImages  ] = useState([]);
    const [ productSizes, setProductSizes  ] = useState([]);
    const [ productColours, setProductColours  ] = useState([]);
    const [ personalisableImage, setPersonalisableImage  ] = useState("");
    const [ productIsActive, setProductIsActive  ] = useState("");
    const [ productInStock, setProductInStock  ] = useState("");
    const [ deliveryTimeMax, setDeliveryTimeMax  ] = useState("");
    const [ deliveryTimeMin, setDeliveryTimeMin  ] = useState("");
    const [ productIsEditable, setProductIsEditable  ] = useState("");
    const [ productBlankImage, setProductBlankImage  ] = useState([]);
    const [ productHot, setProductHot  ] = useState("");
    const [ productNew, setProductNew  ] = useState("");
    const [ selectedSize, setSelectedSize ] = useState("");
    const [ selectedColour, setSelectedColour ] = useState("");
    const [ selectedQuantity, setSelectedQuantity ] = useState("");
    const query = props.match.params.id;

    useEffect(() => {
        API.getTransferById(query)
            .then(res => setSelectedTransfer(res.data))
            .catch(err => console.log(err))
    },[query])

    useEffect(() => {
        if(selectedTransfer !== undefined){
            API.getProductById(selectedTransfer.forProduct)
                .then(res => setSelectedProduct(res.data))
                .catch(err => console.log(err))
        }
    },[selectedTransfer])   

    useEffect(() => {
        if(selectedTransfer !== undefined){
            setTransferTitle(selectedTransfer.title);
            setTransferDescription(selectedTransfer.transferDescription);
            setTransferImages(selectedTransfer.transferImages);
            setTransferMainTranferImage(selectedTransfer.mainTransferImage);
            setTransferPriceDifference(selectedTransfer.priceDifference);
        }
        if(selectedProduct !== undefined){
            setProductName(selectedProduct.name);
            setProductDescription(selectedProduct.description);
            setProductCategory(selectedProduct.category);
            setProductSubCategory(selectedProduct.subCategory);
            setProductPrice(selectedProduct.price);
            setProductImages(selectedProduct.images);
            setProductSizes(selectedProduct.sizes);
            setProductColours(selectedProduct.productColours);
            setPersonalisableImage(selectedProduct.personalisableImage);
            setProductIsActive(selectedProduct.isActive);
            setProductInStock(selectedProduct.inStock);
            setDeliveryTimeMax(selectedProduct.deliveryTimeMax);
            setDeliveryTimeMin(selectedProduct.deliveryTimeMin);
            setProductIsEditable(selectedProduct.isEditable);
            setProductBlankImage(selectedProduct.blankImage);
            setProductNew(selectedProduct.new);
            setProductHot(selectedProduct.hot);
        }
    },[selectedProduct, selectedTransfer])

    
    return (<>
        <h1>{productName}</h1>
        
        <h2>{transferTitle}</h2>
        
        {(transferImages)?
        (transferImages.map((image, i)=> {
            return (<>
                <Image src={image}
                alt={transferTitle + " image " + (i + 1)}
                key={i}/>
                <br/>
                </>)
        }))
        :("")}
        
        {(productImages)?
        (productImages.map((image, i)=> {
            return (<>
                <Image src={image}
                alt={productName + " image " + (i + 1)}
                key={i}/>
                <br/>
            </>)
        }))
        :("")}
        
        <p>
            {transferDescription}
            <br/>
            {productDescription}
        </p>
        
        <h3>Price : £{productPrice + transferPriceDifference}</h3>
        
        <Form.Group>
        {(productSizes)?
        (<>
            <Form.Label>
                Select a Size :
            </Form.Label>
            <Form.Control as="select"
            onChange={(e) => setSelectedSize(e.target.value)}>
                {productSizes.map((size, i) => {
                    return (<option key={i}>{size}</option>)
                })}
            </Form.Control>
        </>)
        :("")}

        {(productColours)?
        (<>
        <Form.Label>
                Select a Colour :
            </Form.Label>
            <Form.Control as="select"
            onChange={(e) => setSelectedColour(e.target.value)}>
                {productColours.map((colour, i) => {
                    return (<option key={i}>{colour}</option>)
                })}
            </Form.Control>
        </>)
        :("")}

        <p>
            Delivery usually take between {deliveryTimeMin} to {deliveryTimeMax} days.
        </p>

        {(productInStock)?
        (<Button>
            Add to Basket
        </Button>)
        :("This Product is Currently Out of Stock.")}

        </Form.Group>
    </>)
}

export default TransferPage;