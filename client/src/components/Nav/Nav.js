import React, {useState, useEffect} from "react";
import { BrowserRouter as Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

function Nav(){
    const [ categories, setCategories] = useState([]);
    const [ categoryChosen, setCategroyChosen] = useState();
    const [ loadSubCategories, setLoadSubCategories ] = useState(false);
    const [ subCategories, setSubCategories] = useState([]);
    const [ subCategoryChosen, setSubCategroyChosen] = useState();
    const [ loadProducts, setLoadProducts ] = useState(false);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        API.getCategories()
            .then(res => {setCategories(res.data)})
            .catch(err => console.log(err));
        API.getProducts()     
            .then(res => {setProducts(res.data)})
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        console.log("getting categories")
        API.getSubCategoryByCategory(categoryChosen)
            .then(res => {
                setSubCategories(res.data)
                setLoadSubCategories(true);
                console.log("subcategory set")
            })
            .catch(err => console.log(err))
    },[categoryChosen])

    function chooseCategory(e, category){
        e.preventDefault();
        setCategroyChosen(category);
        console.log(category);
    }
    
    useEffect(() => {
        console.log("getting sub Categories")
        API.getProductBySubCategory(subCategoryChosen)
            .then(res => {
                setProducts(res.data)
                setLoadProducts(true);
                console.log("products set")
            })
            .catch(err => console.log(err))
    },[subCategoryChosen])

    function chooseSubCategory(e, subCategory){
        e.preventDefault();
        setSubCategroyChosen(subCategory);
        console.log(subCategory);
    }

    return(<>
        <nav>
            <ul>
                <li>All products</li>
                {categories.map((category, i) => {
                    return (<>
                        <button 
                            value={i} 
                            key={category._id} 
                            onClick={(e) => chooseCategory(e, category._id)}>
                                {category.title}
                            </button>
                            <ul>
                                {loadSubCategories ? (
                                    subCategories.map(subCategory => {
                                        return <div>
                                                <button 
                                                    key={subCategory._id} 
                                                    onClick={(e) => chooseSubCategory(e, subCategory._id)}>
                                                    <Link to={`/category/${subCategory._id}`}>{subCategory.title}</Link>
                                                </button>
                                                <ul>
                                                    {loadProducts ? (
                                                        products.map(product =>{
                                                            return <li key={product._id}>
                                                                <Link to={`/productpage/${product._id}`}>{product.title}</Link>
                                                                <Link to={`/editproduct/${product._id}`}>edit</Link>
                                                            </li>
                                                        })
                                                    ) : ""}
                                                </ul>
                                            </div>
                                    }) ) : ""}
                            </ul>
                    </>)
                })}
                <li>Contact us</li>
            </ul>
        </nav>
    </>);
}

export default Nav;