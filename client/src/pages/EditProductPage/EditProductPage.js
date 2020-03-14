import React, { useState , useEffect} from "react";
import * as qs from 'query-string';
import AddProduct from "../../components/AddProduct/AddProduct";
import ImageUplaoder from "../../components/ImageUploader/ImageUploader";
import UniqueTransfers from "../../components/UniqueTransfers/UniqueTransfers";
import API from "../../utils/API";

function EditProductPage(props){
    const {id} = props.match.params
    const [ productToLoad, setProductToLoad] = useState((props.product)?(props.product._id):"")
    const [ product, setProduct] = useState((props.product)?(props.product._id):"")

    useEffect(() => {
        API.getProductById(id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    },[])
    
    // useEffect(() => {
    //     if(productToLoad !== ""){
    //         API.getProductById(query)
    //             .then(res => setProduct(res.data))
    //             .catch(err => console.log(err))
    //     }
    // },[productToLoad])

    // function submitProduct(newProduct){
    //     API.newProduct(newProduct)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    //     console.log(newProduct)
    // }

    return (<>
        <div>
            <h2>Edit {product.name}</h2>
            <AddProduct 
                id={id}
                loadedProduct={product._id}
            />
        </div>
        <div>
            <h2>Upload Images to {product.name}</h2>
            <ImageUplaoder
                imageInfo={`forProduct: ${product._id}`}
            />
        </div>
        <div>
            <h2>Transfers for {product.name}</h2>
            <UniqueTransfers
                product={product._id}
            />
        </div>
    </>)
}

export default EditProductPage;