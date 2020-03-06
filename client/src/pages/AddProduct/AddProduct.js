import React, {useState, useEffect} from "react";
import API from "../../utils/API"

function AddProduct(){
    const [  name, setName ] = useState("");
    // const [  productId, setProductId ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  category, setCategory ] = useState({});
    const [  newCategoryName, setNewCategoryName] = useState("")
    const [  categories, setCategories ] = useState([]);
    const [  addingNewCategory, setAddingNewCategory] = useState(false);
    const [  subCategory, setSubCategory ] = useState({});
    const [  newSubCategoryName, setNewSubCategoryName] = useState("")
    const [  subCategories, setSubCategories ] = useState([]);
    const [  addingNewSubCategory, setAddingNewSubCategory] = useState(false);
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
                setCategories(res.data);
                console.log(categories)
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        console.log("reloaded sub categories")
        console.log(category._id)
        if (category){
            API.getSubCategoryByCategory(category._id)
            .then(res => {
                setSubCategories(res.data);
            })
            .catch(err => console.log(err))
        }
    },[category])

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
        setAddingNewCategory(true);
    }

    function toggleAddNewSubCategory(e){
        e.preventDefault();
        setAddingNewSubCategory(true);
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
            <button onClick={(e) =>saveNewCategory(e)}>
                Save
            </button>  
        </>)
    }
    
    function addNewSubCategory(){
        return(<>
            <label for="newSubCategoryName">
                Sub Category Name
            </label>
            <input
                className="form-add-product"
                type="text"
                placeholder="new Sub Category Name"
                name="newSubCategoryName"
                value={newSubCategoryName}
                onChange={e => setNewSubCategoryName(e.target.value)}
            /> 
            <button onClick={(e) =>saveNewSubCategory(e)}>
                Save
            </button>  
        </>)
    }

    function saveNewCategory(e) {
        e.preventDefault();
        API.newCategory({title: newCategoryName})
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setAddingNewCategory(false);
    }

    function saveNewSubCategory(e) {
        e.preventDefault();
        API.newSubCategory({
            belongsTo: category._id,
            title: newSubCategoryName,
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setAddingNewSubCategory(false);
    }

    function submitProduct(e){
        e.preventDefault();
        const newProduct = {
            name: name,
            description: description,
            category: category,
            subCategory: subCategory,
            price: price,
            productColours: productColours,
            isActive: isActive,
            inStock: inStock,
            deliveryTimeMax: deliveryTimeMax,
            deliveryTimeMin: deliveryTimeMin,
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
                    onChange={e => {setCategory(categories[e.target.value])
                    console.log(category)}}
                >
                    <option value={null} key="Not picked">Pick a Category</option>
                    {(categories.length)?(categories.map((category, i) => {
                        return <option value={i} key={category._id}>{category.title}</option>
                    })):""
                    }   
                </select>
                <label for="newCategory">
                    {!addingNewCategory?(<button onClick={e => toggleAddNewCategory(e)}>
                        Add a new Category
                    </button>):addNewCategory()}
                </label>
            </div>
            {(category === "")?(""):
            (<div className="form-question">
                <label for="subCategory">
                    Sub Category
                </label>
                <select className="form-add-product"
                    name="subCategory"
                    value={subCategory}
                    onChange={e => setSubCategory(e.target.value)}
                >
                    <option value={null} key="Not picked">Pick a Category</option>
                    {(subCategories.length)?(subCategories.map((category, i)=> {
                        return <option value={i} key={category._id}>{category.title}</option>
                    })):""
                    }   
                </select>
                <label for="newCategory">
                    {!addingNewSubCategory?(<button onClick={e => toggleAddNewSubCategory(e)}>
                        Add a new Sub Category
                    </button>):addNewSubCategory()}
                </label>
            </div>)}
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