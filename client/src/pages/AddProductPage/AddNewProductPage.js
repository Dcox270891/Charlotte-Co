import React, { useState } from "react";
import AddProduct from "../../components/AddProduct/AddProduct";
import API from "../../utils/API"
import { Redirect } from "react-router-dom";

function AddNewProductPage(){
    const [ product, setProduct ] = useState({});
    
    function submitProduct(newProduct){
        console.log(newProduct)
        API.newProduct(newProduct)
            .then(res => {
                console.log("saved:", res);
                setProduct(res.json())})
            .catch(err => console.log(err))
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