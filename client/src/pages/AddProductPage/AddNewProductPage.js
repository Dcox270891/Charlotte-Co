import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import AddProduct from "../../components/AddProduct/AddProduct";
import API from "../../utils/API"

function AddNewProductPage(){
    const [ product , setProduct ] = useState({});
    
    function submitProduct(newProduct){
        API.newProduct(newProduct)
            .then(res => {
                setProduct(res)
                return <Redirect to={"/editproduct/" + product._id}/>
            })
            .catch(err => console.log(err))
    }

return (<>
    <AddProduct submitHandler={submitProduct}/>
</>)
}

export default AddNewProductPage;