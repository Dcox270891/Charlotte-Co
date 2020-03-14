import React, {useState, useEffect} from "react";
import InputText from "../Input/InputText";
import InputNumber from "../Input/InputNumber";
import Checkbox from "../Input/CheckboxInput";
import CategoryPicker from "../Input/CategoryPicker";
import MultipleOptions from "../Input/MuiltipleInputs";
import API from "../../utils/API";
import "./style.css";
import Submit from "../Buttons/Submit";

function AddProduct(props){
    const [  product, setProduct ] = useState()
    const [  name, setName ] = useState();
    const [  description, setDescription ] = useState();
    const [  category, setCategory ] = useState();
    const [  categories, setCategories ] = useState([]);
    const [  subCategory, setSubCategory ] = useState();
    const [  subCategories, setSubCategories ] = useState([]);
    const [  price, setPrice ] = useState();
    const [  size, setSize  ] = useState()
    const [  sizes, setSizes ] = useState();
    const [  colour, setColour  ] = useState()
    const [  productColours, setProductColours ] = useState();
    const [  isActive, setIsActive ] = useState(false);
    const [  inStock, setInStock ] = useState(false);
    const [  deliveryTimeMax, setDeliveryTimeMax ] = useState();
    const [  deliveryTimeMin, setDeliveryTimeMin ] = useState();

    useEffect(() => {
        const query = props.id;
        API.getProductById(query)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    },[]);

    useEffect(()=> {
        if(product){
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setSizes(product.sizes);
            setProductColours(product.productColours);
            setIsActive(product.isActive);
            setInStock(product.inStock);
            setDeliveryTimeMax(product.setDeliveryTimeMax);
            setDeliveryTimeMin(product.setDeliveryTimeMin);
        }

    },[product]);

    useEffect(() => {
        console.log(product)
        if(product){
            API.getCategories()
                .then(res => {
                    setCategories(res.data)
                    setCategory(categories.filter(category => product.category[0] === category._id))
                })
                .catch(err => console.log(err))

        } else {
            API.getCategories()
                .then(res => setCategories(res.data))
                .catch(err => console.log(err))

        }
    },[props, product]);

    useEffect(() => {
        if (category){
            API.getSubCategoryByCategory(category._id)
            .then(res => setSubCategories(res.data))
            .catch(err => console.log(err))
        }
    },[category]);

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