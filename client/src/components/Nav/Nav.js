import React, {useState, useEffect} from "react";
import { BrowserRouter as Link } from "react-router-dom";
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
            console.log("getting sub categories")
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
            console.log("getting products")
            API.getProducts() // this isnt connectin but will connect with get products
                .then(res => {
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
            <ul>
                <li>All products</li>
                {categories.map((category, i) => {
                    return (<>
                        <div 
                            value={i} 
                            key={category._id} 
                            onClick={(e) => chooseCategory(e, category._id)}>
                                {category.title}
                        </div>
                            <ul>
                                {loadSubCategories && category._id === categoryChosen ? (
                                    subCategories.map(subCategory => {
                                        return <div>
                                                <div 
                                                    key={subCategory._id} 
                                                    onClick={(e) => chooseSubCategory(e, subCategory._id)}>
                                                    <Link to={`/category/${subCategory._id}`}>{subCategory.title}</Link>
                                                </div>
                                                <ul>
                                                    {loadProducts ? (
                                                        products.map(product =>{
                                                            return <div key={product._id}>
                                                                <Link to={`/productpage/${product._id}`}>{product.name}</Link>
                                                                <Link to={`/editproduct/${product._id}`}>edit</Link>
                                                            </div>
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