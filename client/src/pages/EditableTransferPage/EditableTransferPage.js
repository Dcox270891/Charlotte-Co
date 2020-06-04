import React, {useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import Picture from "../../components/Picture/Picture";


function EditableTransferPage(props){
    const [  product, setProduct ] = useState(undefined);
    const [  title, setTitle  ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  images, setImages ] = useState([]);
    const [  price, setPrice ] = useState("");
    const [  size, setSize ] = useState();
    const [  color, setColor ] = useState();
    const [ quantity, setQuantity ] = useState(0);
    const [  blankImage, setBlankImage ] = useState();
    const query = props.match.params.id;

    useEffect(() => {
        API.getProductById(query)
            .then(res => setProduct(res.data))
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
            setBlankImage(product.blankImage[0]);
        }
    },[product])

    console.log(blankImage)
    return (<>
        <h2>Create your own..</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>£{price}</p>
        <p>Quantity: {quantity}</p>
        {(blankImage)?(<Picture
            publicId={blankImage.public_id}
            version={blankImage.version}
            width="500"
            quality="100"
        />):""}

    </>)
}

export default EditableTransferPage;