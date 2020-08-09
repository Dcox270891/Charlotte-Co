import React, {useState, useEffect} from "react";
import API from "../../utils/API";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import {Form, Button, Modal, Image} from "react-bootstrap";

function AddProduct(props){
    const [  product, setProduct ] = useState()
    const [  name, setName ] = useState();
    const [  description, setDescription ] = useState();
    const [  category, setCategory ] = useState(undefined);
    const [  categories, setCategories ] = useState([]);
    const [  newCategory, setNewCategory  ] = useState();
    const [  subCategory, setSubCategory ] = useState();
    const [  subCategories, setSubCategories ] = useState([]);
    const [  newSubCategory, setNewSubCategory  ] = useState();
    const [  price, setPrice ] = useState();
    const [  size, setSize  ] = useState()
    const [  sizes, setSizes ] = useState([]);
    const [  colour, setColour  ] = useState()
    const [  productColours, setProductColours ] = useState([]);
    const [  isActive, setIsActive ] = useState(false);
    const [  inStock, setInStock ] = useState(false);
    const [  hot, setHot ] = useState(false);
    const [  homeNew, setNew ] = useState(false);
    const [  deliveryTimeMax, setDeliveryTimeMax ] = useState();
    const [  deliveryTimeMin, setDeliveryTimeMin ] = useState();
    const [  images, setImages ] = useState([]);
    const [  isEditable, setIsEditable ] = useState();
    const [  blankImage, setBlankImage ] = useState([]);
    const [  newImage, setNewImage  ] = useState(null);
    const [ validated, setValidated] = useState(false);
    const [ showCategory, setShowCategory] = useState(false);
    const [ showSubCategory, setShowSubCategory] = useState(false);
    const [ showError, setShowError] = useState(false);
    const [ productId , setProductId ] = useState(null);
    const history = useHistory();
    const query = props.id;

    const handleCloseCategory = () => setShowCategory(false);
    const handleShowCategory = () => setShowCategory(true);
    const handleCloseSubCategory = () => setShowSubCategory(false);
    const handleShowSubCategory = () => setShowSubCategory(true);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

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
            setHot(product.hot);
            setNew(product.homeNew);
            setProductId(product._id);
        }
    },[product]);

    useEffect(() => {
        API.getCategories()
            .then(res =>  setCategories(res.data))
            .catch(err => console.log(err))
    },[]);

    useEffect(() => {
        if (category){
            API.getSubCategoryByCategory(category._id)
            .then(res => setSubCategories(res.data))
            .catch(err => console.log(err))
        }
    },[category]);

    useEffect(() => {
        if (productId){
            history.push(`/editproduct/${productId}`)
        }
    },[productId]);

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
            hot: hot,
            new: homeNew,
        };
        API.newProduct(newProduct)
            .then(res => {
                setProduct(res.data);
                setProductId(res.data._id);
            })
            .catch(err => {
                console.log(err);
                setShowError(true);
            })
    }

    function saveNewCategory(e) {
        e.preventDefault()
        API.newCategory({title: newCategory})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    
    function saveNewSubCategory(e) {
        e.preventDefault()
        API.newSubCategory({
            belongsTo: category._id,
            title: newSubCategory,
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function addToSizes(e) {
        e.preventDefault();
        sizes.push(size);
        setSize("");
    }

    function removeSize(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        setSizes(sizes.filter(sizes => sizes !== remove));
    }
    
    function addToColors(e) {
        e.preventDefault();
        productColours.push(colour);
        setColour("");
    }

    function removeColour(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        setProductColours(productColours.filter(productColours => productColours !== remove));
    }

    function handleSubmit(e){
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
    };

    function addAnImage(e){
        console.log(e.target.files[0])
        setNewImage(e.target.files[0])
        console.log(newImage)
    }

    const onChangeHandler=event=>{
        setNewImage({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', newImage.selectedFile)
        axios.post("/upload", data,)
            .then(res => {
                const filename = res.data.filename;
                const workingPath = `/images/${filename}`;
                setImages([...images, workingPath]);
                setNewImage(null);
                console.log(images);
            })
            .catch(err => console.log(err));
    }

    return (<>
        <Form noValidate 
        validated={validated}
        onChange={handleSubmit}>
            {(productId)?
            (`This product is saved in the ${category.title} in the ${subCategory.title}.`)
            :(<>
                <Form.Group controlId="category">
                    <Form.Label>
                        Category
                    </Form.Label>
                    <Form.Control as="select"
                    name='category' 
                    defaultValue={(category)?(category):("")}
                    onChange={(e) => setCategory(categories[e.target.value])}> 
                    <option>
                        Please select Category
                    </option>
                    {(categories)?(categories.map((category, i) => {
                        return <option key={i}
                        value={i}>
                            {category.title}
                        </option>
                    })):("")}
                    </Form.Control>

                    <Button variant="primary" onClick={handleShowCategory}>
                        Add a new Category
                    </Button>

                    <Modal show={showCategory} onHide={handleCloseCategory}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a new Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="newCategory">
                                <Form.Label>
                                    New Category Name
                                    <br/>
                                    (You will need to refresh the page to veiw this and add a Sub Category.)
                                </Form.Label>
                                <Form.Control type='text'
                                name='newCategory' 
                                defaultValue={(newCategory)?(newCategory):("")}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New Category Name"
                                required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a name for the Category.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCategory}>
                            Close
                        </Button>
                        <Button variant="primary" 
                        onClick={(e) => {
                            saveNewCategory(e)
                            handleCloseCategory()
                        }}>
                            Save Category
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Form.Group>

                {(category)?
                (<Form.Group controlId="subCategory">
                    <Form.Label>
                        Sub Category
                    </Form.Label>
                    <Form.Control as="select"
                    name='subCategory' 
                    defaultValue={(subCategory)?(subCategory):("")}
                    onChange={(e) => setSubCategory(subCategories[e.target.value])}> 
                    <option value="undefined">
                        Please select Sub Category
                    </option>
                    {subCategories.map((subCategory, i) => {
                        if(subCategory.belongsTo == category._id){
                            return <option key={i}
                            value={i}>
                                {subCategory.title}
                            </option>
                        }
                    })}
                    </Form.Control>
                    
                    <Button variant="primary" onClick={handleShowSubCategory}>
                        Add a new  Sub Category
                    </Button>

                    <Modal show={showSubCategory} onHide={handleCloseSubCategory}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a new Sub Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="newSubCategory">
                                <Form.Label>
                                    New Sub Category Name
                                    <br/>
                                    (You will need to refresh the page to veiw this and add Product Information.)
                                </Form.Label>
                                <Form.Control type='text'
                                name='newSubCategory' 
                                defaultValue={(newSubCategory)?(newSubCategory):("")}
                                onChange={(e) => setNewSubCategory(e.target.value)}
                                placeholder="New Sub Category Name"
                                required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a name for the Sub Category.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCategory}>
                            Close
                        </Button>
                        <Button variant="primary" 
                        onClick={(e) => {
                            saveNewSubCategory(e)
                            handleCloseCategory()
                        }}>
                            Save New Sub Category
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Form.Group>)
                :("")}
            </>)}

            {subCategory? 
                (<>
                    <Form.Group controlId="name">
                        <Form.Label>
                            Product Name
                        </Form.Label>
                        <Form.Control type='text'
                        name='name' 
                        defaultValue={(name)?(name):("")}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a name for the Product.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>
                            Product Description
                        </Form.Label>
                        <Form.Control as='textarea'
                        rows='3'
                        name='description' 
                        defaultValue={(description)?(description):("")}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Product Description"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a description for the Product.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>
                            Product Price
                        </Form.Label>
                        <Form.Control type='number'
                        name='price' 
                        defaultValue={(price)?(price):("")}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Product Price"
                        min="0"
                        step="0.01"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a price for the Product.
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Check type="checkbox"
                    id="isActive"
                    name='isActive' 
                    defaultValue={(isActive)?(isActive):("")}
                    label="Is Active"
                    onChange={e => setIsActive(e.target.checked)?(true):(false)}/>
                    
                    <Form.Check type="checkbox"
                    id="inStock"
                    name='inStock' 
                    defaultValue={(inStock)?(inStock):("")}
                    label="In Stock"
                    onChange={e => setInStock(e.target.checked)?(true):(false)}/>
                    
                    <Form.Check type="checkbox"
                    id="hot"
                    name='hot' 
                    defaultValue={(hot)?(hot):("")}
                    label="Show on the home page as a Hot Product"
                    onChange={e => setHot(e.target.checked)?(true):(false)}/>
                    
                    <Form.Check type="checkbox"
                    id="homeNew"
                    name='homeNew' 
                    defaultValue={(homeNew)?(homeNew):("")}
                    label="Show on the home page as a New Product"
                    onChange={e => setNew(e.target.checked)?(true):(false)}/>
                    
                    <Form.Check type="checkbox"
                    id="isEditable"
                    name='isEditable' 
                    defaultValue={(isEditable)?(isEditable):("")}
                    label="Do you allow the customer to edit their own transfer for this product?"
                    onChange={e => setIsEditable(e.target.checked)?(true):(false)}/>

                    <Form.Group controlId="sizes">
                        <Form.Label>
                            Product Sizes
                        </Form.Label>
                        <Form.Control type='text'
                        name='size' 
                        defaultValue={(size)?(size):("")}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Product Size"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please add some sizes for your Product.
                        </Form.Control.Feedback>
                        <Button variant="primary" 
                        onClick={(e) => addToSizes(e)}>
                            Add this option
                        </Button>
                        {(sizes.length>0)?
                            (sizes.map(size => {
                                return(<span key={size}>
                                        {size}          
                                        <Button remove={size}
                                        onClick={(e) => removeSize(e)}>
                                            Remove
                                        </Button>
                                        <br/>
                                    </span> )
                            }))
                        :("No sizes set Currently")}
                    </Form.Group>
                    
                    <Form.Group controlId="colours">
                        <Form.Label>
                            Product Colours
                        </Form.Label>
                        <Form.Control type='text'
                        name='colour' 
                        defaultValue={(colour)?(colour):("")}
                        onChange={(e) => setColour(e.target.value)}
                        placeholder="Product Colours"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please add some sizes for your Product.
                        </Form.Control.Feedback>
                        <Button variant="primary" 
                        onClick={(e) => addToColors(e)}>
                            Add this option
                        </Button>
                        {(productColours.length>0)?
                            (productColours.map(colour => {
                                return(<span key={colour}>
                                        {colour}          
                                        <Button remove={colour}
                                        onClick={(e) => removeColour(e)}>
                                            Remove
                                        </Button>
                                        <br/>
                                    </span> )
                            }))
                        :("No colours set Currently")}
                    </Form.Group>

                    <Form.Group controlId="deliveryTimeMax">
                        <Form.Label>
                            Product Delivery time max
                        </Form.Label>
                        <Form.Control type='number'
                        name='deliveryTimeMax' 
                        defaultValue={(deliveryTimeMax)?(deliveryTimeMax):("")}
                        onChange={(e) => setDeliveryTimeMax(e.target.value)}
                        placeholder="Delivery time max"
                        min="0"
                        step="1"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a delivery time max for the Product.
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="deliveryTimeMin">
                        <Form.Label>
                            Product Delivery time min
                        </Form.Label>
                        <Form.Control type='number'
                        name='deliveryTimeMin' 
                        defaultValue={(deliveryTimeMin)?(deliveryTimeMin):("")}
                        onChange={(e) => setDeliveryTimeMin(e.target.value)}
                        placeholder="Delivery time min"
                        min="0"
                        step="1"
                        required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a delivery time min for the Product.
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="images">
                        <Form.Label>
                            Choose and Image for the Product
                        </Form.Label>
                        <Form.File id="images"
                        label="Upload an image for the Product"
                        name="images"
                        onChange={onChangeHandler}
                        feedbackTooltip/>
                        <Button onClick={onClickHandler}>
                            Upload
                        </Button>

                        {(images)?
                        (images.map(image => {
                            return <Image key={image}
                            src={image}
                            width="8em"/>
                        }))
                        :("No images saved yet")}
                    </Form.Group>

                </>)
            :("")}

            <Button type="submit"
            onClick={(e) => {
                submitProduct(e)
            }}>
                {(productId)?
                ("Update product")
                :("Submit New Product")}
            </Button>
        </Form>
        
        <Modal show={showError} 
        onHide={handleCloseError}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Error
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    Unfortunatley, there was an Error PLease check all required fields are filled.
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                onClick={handleCloseError}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
};

export default AddProduct;