import React, { useState } from "react";
import AddProduct from "../../components/AddProduct";
import Submit from "../../components/Buttons/Submit";

function AddNewProductPage(props){
    
    function submitProduct(e){
        e.preventDefault();
        const newProduct = {
            name: name,
            description: description,
            category: category,
            subCategory: subCategory,
            price: price,
            productColours: productColours,
            isActive: isActive,
            inStock: inStock,
            deliveryTimeMax: deliveryTimeMax,
            deliveryTimeMin: deliveryTimeMin,
        };
        API.addNewProduct(newProduct)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        console.log(newProduct)
    }

return (<>
    <AddProduct/>
    <Submit
        onChange={(e) => submitProduct(e)}
    />
</>)
}

export default AddNewProductPage;