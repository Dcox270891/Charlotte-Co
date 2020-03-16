import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

function Nav(){
    const [ categories, setCategories] = useState([]);
    const [ categoryChosen, setCategroyChosen] = useState("");
    const [ loadSubCategories, setLoadSubCategories ] = useState(false);
    const [ subCategories, setSubCategories] = useState([]);
    const [ subCategoryChosen, setSubCategroyChosen] = useState("");
    const [ loadProducts, setLoadProducts ] = useState(false);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        API.getCategories()
            .then(res => {setCategories(res.data)})
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        if(categoryChosen !== ""){
            API.getSubCategoryByCategory(categoryChosen)
                .then(res => {
                    setSubCategories(res.data);
                    setLoadSubCategories(true);
                })
                .catch(err => console.log(err))
            }
    },[categoryChosen])

    function chooseCategory(e, category){
        e.preventDefault();
        setCategroyChosen(category);
    }
    
    useEffect(() => {
        if(subCategoryChosen !== ""){
            API.getProductBySubCategory(subCategoryChosen) 
                .then(res => {
                    console.log(res.data)
                    setProducts(res.data);
                    setLoadProducts(true);
                })
                .catch(err => console.log(err))
        }
    },[subCategoryChosen])

    function chooseSubCategory(e, subCategory){
        e.preventDefault();
        setSubCategroyChosen(subCategory);
    }

    return(<>
        <nav>
            <div className="nav-category">
                <div className="nav-category-links">
                    <Link to="/allproducts">All products</Link>
                </div>
                <div className="nav-category-links">
                    <Link to="/addnewproduct">Add a product</Link>
                </div>
                {categories.map((category, i) => {
                    return (<>
                        <div 
                            value={i}
                            className="nav-category-links"
                            key={category._id} 
                            onClick={(e) => chooseCategory(e, category._id)}>
                                {category.title}
                        </div>
                            <div className="nav-subcategory">
                                {loadSubCategories && category._id === categoryChosen ? (
                                    subCategories.map(subCategory => {
                                        return <div>
                                                <div
                                                    className="nav-subcategory-links"
                                                    key={subCategory._id} 
                                                    onClick={(e) => chooseSubCategory(e, subCategory._id)}>
                                                    <Link to={`/category/${subCategory._id}`}>{subCategory.title}</Link>
                                                </div>
                                                <div className="nav-products">
                                                    {loadProducts && subCategory._id === subCategoryChosen ? (
                                                        products.map(product =>{
                                                            return <div 
                                                                className="nav-product-links"
                                                                key={product._id}
                                                            >
                                                                <Link to={`/productpage/${product._id}`}>{product.name}</Link>
                                                                <Link 
                                                                    className="edit"
                                                                    to={`/editproduct/${product._id}`}
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </div>
                                                        })
                                                    ) : ""}
                                                </div>
                                            </div>
                                    }) ) : ""}
                            </div>
                    </>)
                })}
                <div className="nav-category-links">Contact us</div>
            </div>
        </nav>
    </>);
}

export default Nav;