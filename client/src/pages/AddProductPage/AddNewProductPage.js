import React, { useState } from "react";
import AddProduct from "../../components/AddProduct/AddProduct";
import API from "../../utils/API"
import { Redirect } from "react-router-dom";

function AddNewProductPage(){
    const [ product, setProduct ] = useState({});
    const redirectUrl = `/editproduct/${product._id}`;
    
    function submitProduct(newProduct){
        console.log(newProduct)
        API.newProduct(newProduct)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
        console.log("saved:" + newProduct);
        return <Redirect to={{
            pathname: "/editproduct/:id",
            state: {product: product._id}
        }} />
    }

return (<>
    <AddProduct submitHandler={submitProduct}/>
</>)
}

export default AddNewProductPage;