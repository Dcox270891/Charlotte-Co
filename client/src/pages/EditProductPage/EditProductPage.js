import React, { useState , useEffect} from "react";
import AddProduct from "../../components/AddProduct";
import ImageUplaoder from "../../components/ImageUploader/ImageUploader";
import UniqueTransfers from "../../components/UniqueTransfers/UniqueTransfers";


function EditProductPage(props){
    const [ loadedProduct, setLoadedProduct] = useState("")
    const query = qs.parse(props.location.search);
    console.log(query);
    if (query !== "new"){
        API.getProductById(query)
            .then(res => setLoadedProduct(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setTitle(loadedProduct.title);

    },[loadedProduct])

return (<>
    <AddProduct 
        loadedProduct={loadedProduct}
    />
    <ImageUplaoder
        imageInfo={`forProduct: ${loadedProduct._id}`}
    />
    <UniqueTransfers
        product={loadedProduct._id}
    />



</>)
}

export default EditProductPage;