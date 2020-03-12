import React, {useState, useEffect} from "react";
// import * as qs from 'query-string';
import InputText from "../Input/InputText";
import InputNumber from "../Input/InputNumber";
import Checkbox from "../Input/CheckboxInput";
import CategoryPicker from "../Input/CategoryPicker";
import MultipleOptions from "../Input/MuiltipleInputs";
import API from "../../utils/API";
import "./style.css";
import Submit from "../Buttons/Submit";

function AddProduct(props){
    const [  name, setName ] = useState((props.loadedProduct)?(props.loadedProduct.name):"");
    const [  description, setDescription ] = useState((props.loadedProduct)?(props.loadedProduct.description):"");
    const [  category, setCategory ] = useState((props.loadedProduct)?(props.loadedProduct.category):{});
    const [  categories, setCategories ] = useState([]);
    const [  subCategory, setSubCategory ] = useState((props.loadedProduct)?(props.loadedProduct.subCategory):{});
    const [  subCategories, setSubCategories ] = useState([]);
    const [  price, setPrice ] = useState((props.loadedProduct)?(props.loadedProduct.price):"");
    const [  size, setSize  ] = useState("")
    const [  sizes, setSizes ] = useState((props.loadedProduct)?(props.loadedProduct.sizes):[]);
    const [  colour, setColour  ] = useState("")
    const [  productColours, setProductColours ] = useState((props.loadedProduct)?(props.loadedProduct.productColours):[]);
    const [  isActive, setIsActive ] = useState((props.loadedProduct)?(props.loadedProduct.isActive):false);
    const [  inStock, setInStock ] = useState((props.loadedProduct)?(props.loadedProduct.inStock):false);
    const [  deliveryTimeMax, setDeliveryTimeMax ] = useState((props.loadedProduct)?(props.loadedProduct.deliveryTimeMax):"");
    const [  deliveryTimeMin, setDeliveryTimeMin ] = useState((props.loadedProduct)?(props.loadedProduct.deliveryTimeMin):"");

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

    function submitProduct(e){
        e.preventDefault();
        const newProduct = {
            name: name,
            description: description,
            category: category,
            subCategory: subCategory,
            price: price,
            sizes: sizes,
            productColours: productColours,
            isActive: isActive,
            inStock: inStock,
            deliveryTimeMax: deliveryTimeMax,
            deliveryTimeMin: deliveryTimeMin,
        };
        props.submitHandler(newProduct) 
    }

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
                onChange={(e) => setSubCategory(subCategories[e.target.value])}
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
            <Submit
                onClick={(e) => submitProduct(e)}
            />
        </form>
    </div>
    </>)
};

export default AddProduct;