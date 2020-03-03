import React, {useState, useEffect} from "react";
import API from "../../utils/API"

function AddProduct(){
    const [  name, setName ] = useState("");
    // const [  productId, setProductId ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  category, setCategory ] = useState("");
    const [  newCategoryName, setNewCategoryName] = useState("")
    const [  categories, setCategories ] = useState([]);
    const [  addingnewcategory, setAddingnewcategory] = useState(false);
    const [  subCategory, setSubCategory ] = useState("");
    const [  subCategories, setSubCategories ] = useState([]);
    const [  price, setPrice ] = useState("");
    const [  size, setSize  ] = useState("")
    const [  sizes, setSizes ] = useState([]);
    const [  colour, setColour  ] = useState("")
    const [  productColours, setProductColours ] = useState([]);
    // const [  personalisableImage, setPersonalisableImage ] = useState("");
    const [  isActive, setIsActive ] = useState(false);
    const [  inStock, setInStock ] = useState(false);
    const [  deliveryTimeMax, setDeliveryTimeMax ] = useState("");
    const [  deliveryTimeMin, setDeliveryTimeMin ] = useState("");

    useEffect(() => {
        console.log("reloaded categories")
        API.getCategories()
            .then(res => {
                console.log(res);
                setCategories(res);
            })
            .catch(err => console.log(err))
    },[categories])

    function addSize(e){
        e.preventDefault();
        setSizes([...sizes, size ]);
        setSize("")
    }

    function removeSize(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        setSizes(sizes.filter(size => size !== remove));
    }
    
    function addColour(e){
        e.preventDefault();
        setProductColours([...productColours, colour ]);
        setColour("")
    }
    
    function removeColour(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        setProductColours(productColours.filter(colours => colours !== remove));
    }

    function toggleAddNewCategory(e){
        e.preventDefault();
        setAddingnewcategory(true);
    }

    function addNewCategory(){
        return(<>
            <label for="newCategoryName">
                Category Name
            </label>
            <input
                className="form-add-product"
                type="text"
                placeholder="new Category Name"
                name="newCategoryName"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
            /> 
            <button onClick={saveNewCategory}>
                Save
            </button>  
        </>)
    }

    function saveNewCategory(newCategoryName) {
        API.addNewCategory(newCategoryName)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setAddingnewcategory(false);
    }

    function submitProduct(e){
        e.preventDefault();
        const newProduct = {
            name,
            description,
            category,
            subCategory,
            price,
            productColours,
            isActive,
            inStock,
            deliveryTimeMax,
            deliveryTimeMin,
        };
        API.addNewProduct(newProduct)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        console.log(newProduct)
    }

    return (<>
        <form>
            <div className="form-question">
                <label for="name">
                    Name
                </label>
                <input
                    className="form-add-product"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />    
            </div>
            <div className="form-question">
                <label for="category">
                    Category
                </label>
                <select className="form-add-product"
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value={null} key="Not picked">Pick a Category</option>
                    {categories.map(category => {
                        return <option value={category} key={category._id}>{category}</option>
                    })
                    }   
                </select>
                <label for="newCategory">
                    {!addingnewcategory?(<button onClick={e => toggleAddNewCategory(e)}>
                        Add a new Category
                    </button>):addNewCategory()}
                </label>
            </div>
            <div className="form-question">
                <label for="subCategory">
                    Sub Category
                </label>
                <select className="form-add-product"
                    name="subCategory"
                    value={subCategory}
                    onChange={e => setSubCategory(e.target.value)}
                >
                    <option value={null} key="Not picked">Pick a Sub Category</option>
                    {subCategories.map(subCategory => {
                        return <option value={subCategory} key={subCategory}>{subCategory}</option>
                    })
                    }   
                </select>
            </div>
            <div className="form-question">
                <label for="description">
                    Description
                </label>
                <textarea
                    className="form-add-product"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="price">
                    Price: £
                </label>
                <input
                    className="form-add-product"
                    type="int"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="isActive">
                    Is Active
                </label>
                <input
                    className="form-add-product"
                    type="checkbox"
                    name="isActive"
                    checked={isActive}
                    onChange={e => setIsActive(e.target.checked)?(true):(false)}
                />
            </div>
            <div className="form-question">
                <label for="inStock">
                    In Stock
                </label>
                <input
                    className="form-add-product"
                    type="checkbox"
                    name="inStock"
                    checked={inStock}
                    onChange={e => setInStock(e.target.checked)?(true):(false)}
                />
            </div>
            <div className="form-question">
                <label for="size">
                    Sizes
                </label>
                <input
                    className="form-add-product"
                    type="text"
                    name="size"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                />
                <button onClick={addSize}>
                    +
                </button>
                <ul>
                    Sizes:
                    {sizes.map(size => {
                        return <li key={size}>{size} <button remove={size} onClick={removeSize}>x</button></li>
                    })}
                </ul>
            </div>
            <div className="form-question">
                <label for="productColours">
                    Product Colours
                </label>
                <input
                    className="form-add-product"
                    type="text"
                    name="colout"
                    value={colour}
                    onChange={e => setColour(e.target.value)}
                />
                <button onClick={addColour}>
                    +
                </button>
                <ul>
                    Colours:
                    {productColours.map(colour => {
                        return <li key={colour}>{colour} <button remove={colour} onClick={removeColour}>x</button></li>
                    })}
                </ul>
            </div>
            <div className="form-question">
                <label for="deliveryTimeMax">
                    Delivery time max
                </label>
                <input
                    className="form-add-product"
                    type="text"
                    name="deliveryTimeMax"
                    value={deliveryTimeMax}
                    onChange={e => setDeliveryTimeMax(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="deliveryTimeMin">
                    Delivery time min
                </label>
                <input
                    className="form-add-product"
                    type="text"
                    name="deliveryTimeMin"
                    value={deliveryTimeMin}
                    onChange={e => setDeliveryTimeMin(e.target.value)}
                />
            </div>
            <button 
                className="submit-buutton" 
                onClick={e => submitProduct(e)}
            >
                Submit
            </button>
        </form>
    </>)
};

export default AddProduct;