import React, {useState, useEffect} from "react";
import InputText from "../Input/InputText";
import InputNumber from "../Input/InputNumber";
import Checkbox from "../Input/CheckboxInput";
import CategoryPicker from "../Input/CategoryPicker";
import MultipleOptions from "../Input/MuiltipleInputs";
import API from "../../utils/API";
import Submit from "../Buttons/Submit";
import ImageUploader from "../ImageUploader/ImageUploader";
import EditableImageUploader from "../ImageUploader/EditableImageUploader";

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
    const [  sizes, setSizes ] = useState([]);
    const [  colour, setColour  ] = useState()
    const [  productColours, setProductColours ] = useState([]);
    const [  isActive, setIsActive ] = useState(false);
    const [  inStock, setInStock ] = useState(false);
    const [  deliveryTimeMax, setDeliveryTimeMax ] = useState();
    const [  deliveryTimeMin, setDeliveryTimeMin ] = useState();
    const [  images, setImages ] = useState([]);
    const [  isEditable, setIsEditable ] = useState();
    const [  blankImage, setBlankImage ] = useState([]);
    const query = props.id;

    useEffect(() => {
        API.getProductById(query)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    },[query]);

    useEffect(()=> {
        if(product){
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setSizes(product.sizes);
            setCategory(product.category);
            setSubCategory(product.subCategory);
            setProductColours(product.productColours);
            setIsActive(product.isActive);
            setInStock(product.inStock);
            setImages(product.images);
            setDeliveryTimeMax(product.deliveryTimeMax);
            setDeliveryTimeMin(product.deliveryTimeMin);
            setIsEditable(product.isEditable);
            setBlankImage(product.blankImage);
        }

    },[product]);

    useEffect(() => {
        API.getCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    },[]);

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
            images: images,
            isEditable: isEditable,
            blankImage: blankImage,
        };
        props.submitHandler(newProduct) 
    }

    return (<>
    <div className="form">
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
            <Checkbox
                name="isEditable"
                value={isEditable}
                onChange={e => setIsEditable(e.target.checked)?(true):(false)}
                placeholder="Personalized transfers available"
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
            <ImageUploader
                images={images}
                setImages={setImages}
            />
            {/* {(isEditable)?(<>
                <p>Only blank images for the personilzation</p>
                <EditableImageUploader
                    images={blankImage}
                    setImages={setBlankImage}
                />
            </>):""} */}
            <Submit
                onClick={(e) => submitProduct(e)}
            />
        </form>
    </div>
    </>)
};

export default AddProduct;