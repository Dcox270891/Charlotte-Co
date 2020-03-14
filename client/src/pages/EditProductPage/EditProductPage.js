import React, { useState , useEffect} from "react";
import * as qs from 'query-string';
import AddProduct from "../../components/AddProduct/AddProduct";
import ImageUplaoder from "../../components/ImageUploader/ImageUploader";
import UniqueTransfers from "../../components/UniqueTransfers/UniqueTransfers";
import API from "../../utils/API";

function EditProductPage(props){
    const [ productToLoad, setProductToLoad] = useState((props.product)?(props.product._id):"")
    const [ product, setProduct] = useState((props.product)?(props.product._id):"")

    const query = qs.parse(props.location.search);
    
    useEffect(() => {
        console.log(query);
        setProductToLoad(query);
    },[])
    
    useEffect(() => {
        if(productToLoad !== ""){
            API.getProductById(query)
                .then(res => setProduct(res.data))
                .catch(err => console.log(err))
        }
    },[productToLoad])

    // function submitProduct(newProduct){
    //     API.newProduct(newProduct)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    //     console.log(newProduct)
    // }

    return (<>
        <AddProduct 
            loadedProduct={product}
        />
        <ImageUplaoder
            imageInfo={`forProduct: ${product._id}`}
        />
        <UniqueTransfers
            product={product._id}
        />



    </>)
}

export default EditProductPage;