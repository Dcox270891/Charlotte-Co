import React, { useState , useEffect} from "react";
import AddProduct from "../../components/AddProduct/AddProduct";
import UniqueTransfers from "../../components/UniqueTransfers/UniqueTransfers";
import API from "../../utils/API";

function EditProductPage(props){
    const {id} = props.match.params
    const [ product, setProduct] = useState("")

    useEffect(() => {
        API.getProductById(id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    },[id])

    function editProduct(product){
        console.log(product)
        API.editProduct(product._id, product)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }
    

    return (<>
        <div>
            <h2>Edit {product.name}</h2>
            <AddProduct 
                id={id}
                submitHandler={editProduct}
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