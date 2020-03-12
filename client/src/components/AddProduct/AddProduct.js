import React, {useState, useEffect} from "react";
// import * as qs from 'query-string';
import InputText from "../Input/InputText";
import InputNumber from "../Input/InputNumber";
import Checkbox from "../Input/CheckboxInput";
import CategoryPicker from "../Input/CategoryPicker";
import MultipleOptions from "../Input/MuiltipleInputs";
import API from "../../utils/API";
import "./style.css";

function AddProduct(props){
    const [  name, setName ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  category, setCategory ] = useState({});
    const [  categories, setCategories ] = useState([]);
    const [  subCategory, setSubCategory ] = useState({});
    const [  subCategories, setSubCategories ] = useState([]);
    const [  price, setPrice ] = useState("");
    const [  size, setSize  ] = useState("")
    const [  sizes, setSizes ] = useState([]);
    const [  colour, setColour  ] = useState("")
    const [  productColours, setProductColours ] = useState([]);
    const [  isActive, setIsActive ] = useState(false);
    const [  inStock, setInStock ] = useState(false);
    const [  deliveryTimeMax, setDeliveryTimeMax ] = useState("");
    const [  deliveryTimeMin, setDeliveryTimeMin ] = useState("");

    useEffect(() => {
        API.getCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        if (category){
            API.getSubCategoryByCategory(category._id)
            .then(res => setSubCategories(res.data))
            .catch(err => console.log(err))
        }
    },[category])

    if (props.loadedProduct){
        setName(props.loadedProduct.name);
        setDescription(props.loadedProduct.description);
        setCategory(props.loadedProduct.category);
        setSubCategory(props.loadedProduct.subCategory);
        setPrice(props.loadedProduct.price);
        setSizes(props.loadedProduct.sizes);
        setProductColours(props.loadedProduct.productColours);
        setIsActive(props.loadedProduct.isActive);
        setInStock(props.loadedProduct.inStock);
        setDeliveryTimeMax(props.loadedProduct.deliveryTimeMax);
        setDeliveryTimeMin(props.loadedProduct.deliveryTimeMin);
    }

    // function submitProduct(e){
    //     e.preventDefault();
    //     const newProduct = {
    //         name: name,
    //         description: description,
    //         category: category,
    //         subCategory: subCategory,
    //         price: price,
    //         productColours: productColours,
    //         isActive: isActive,
    //         inStock: inStock,
    //         deliveryTimeMax: deliveryTimeMax,
    //         deliveryTimeMin: deliveryTimeMin,
    //     };
    //     API.addNewProduct(newProduct)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    //     console.log(newProduct)
    //     return 
    // }

    return (<>
    <div>
        <form className="add-product">
            <InputText 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name" 
            />
            <CategoryPicker
                value={category}
                options={categories}
                onChange={(e) => setCategory(categories[e.target.value])}
                placeholder="Category"
            />
            {(category === {})?(""):
            (<CategoryPicker
                category={category}
                value={subCategory}
                options={subCategories}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="Sub Category"
            />)}
            <InputText 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
            />
            <InputNumber 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="Price" 
            />
            <Checkbox
                value={isActive}
                name="isActive"
                onChange={e => setIsActive(e.target.checked)?(true):(false)}
                placeholder="Is Active"
            />
            <Checkbox
                name="inStock"
                value={inStock}
                onChange={e => setInStock(e.target.checked)?(true):(false)}
                placeholder="In Stock"
            />
            <MultipleOptions 
                value={size} 
                placeholder="Sizes"
                onChange={e => setSize(e.target.value)}
                optionsTitle="Sizes"
                optionsArray={sizes}
                setOptionsArray={setSizes}
                setOption={setSize}
            />
            <MultipleOptions 
                value={colour} 
                placeholder="Product Colours"
                onChange={e => setColour(e.target.value)}
                optionsTitle="Colours"
                optionsArray={productColours}
                setOptionsArray={setProductColours}
                setOption={setColour}
            />
            <InputNumber 
                value={deliveryTimeMax} 
                onChange={(e) => setDeliveryTimeMax(e.target.value)} 
                placeholder="Delivery time max" 
            />
            <InputNumber 
                value={deliveryTimeMin} 
                onChange={(e) => setDeliveryTimeMin(e.target.value)} 
                placeholder="Delivery time min" 
            />
        </form>
    </div>
    </>)
};

export default AddProduct;