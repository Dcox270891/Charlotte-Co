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
         const editedProduct = {
            ...product,
            _id: id,
        }
        API.editProduct(id, editedProduct)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }
    

    return (<>
        <div className="edit-product">
            <h2>Edit {product.name}</h2>
            <AddProduct id={id}/>
        </div>
        <div className="edit-transfers">
            <h2>Transfers for {product.name}</h2>
            <UniqueTransfers
                product={product._id}
            />
        </div>
    </>)
}

export default EditProductPage;