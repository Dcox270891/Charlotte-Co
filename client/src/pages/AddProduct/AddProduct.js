import React, {useState} from "react";


function AddProduct(){
    const [  name, setName ] = useState("");
    // const [  productId, setProductId ] = useState("");
    const [  description, setDescription ] = useState("");
    const [  category, setCategory ] = useState("");
    const [  subCategory, setSubCategory ] = useState("");
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

    const categorys = ["Clothing", "Home"];
    const subCategorys = ["Mens", "Womens"]

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
        console.log(newProduct)
        // API.saveProduct(newProduct)
        //     .then(console.log(
        //         `Saved
        //         ----------------------------
        //         Name: ${name}
        //         Descrition: ${description}
        //         Category: ${category}
        //         Sub Category: ${subCategory}
        //         Price: ${price}
        //         Sizes: ${sizes}
        //         Product Colours: ${productColours}
        //         Is Active: ${isActive}
        //         In Stock: ${inStock}
        //         Delivery Time: ${deliveryTimeMin}-${deliveryTimeMax}`
        //     ))
        //     .catch(err => console.log(err))
    }

    return (<>
        <form>
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
        <br/>
        <label for="category">
            Category
        </label>
        <select className="form-add-product"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
        >
            <option value={null} key="Not picked">Pick a Category</option>
            {categorys.map(category => {
                return <option value={category} key={category}>{category}</option>
            })
            }   
        </select>
        <br/>
        <label for="subCategory">
            Sub Category
        </label>
        <select className="form-add-product"
            name="subCategory"
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
        >
            <option value={null} key="Not picked">Pick a Sub Category</option>
            {subCategorys.map(subCategory => {
                return <option value={subCategory} key={subCategory}>{subCategory}</option>
            })
            }   
        </select>
        <br/>
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
        <br/>
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
        <br/>
        <label for="isActive">
            Is Active
        </label>
        <input
            className="form-add-product"
            type="checkbox"
            name="isActive"
            checked={isActive}
            onClick={e => setIsActive(e.target.checked)?(true):(false)}
        />
        <br/>
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
        <br/>
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
        <br/>
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
        <br/>
        <ul>
            Colours:
            {productColours.map(colour => {
                return <li key={colour}>{colour} <button remove={colour} onClick={removeColour}>x</button></li>
            })}
        </ul>
        <br/>
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
        <br/>
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
        <br/>
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