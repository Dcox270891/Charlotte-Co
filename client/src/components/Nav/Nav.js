import React, {useState, useEffect} from "react";
import { BrowserRouter as Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

function Nav(){
    const [ categories, setCategories] = useState([]);
    const [ subCategories, setSubCategories] = useState([]);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        API.getCategories()
            .then(res => {setCategories(res.data)})
            .catch(err => console.log(err));
        API.getSubCategories()
            .then(res => {setSubCategories(res.data)})
            .catch(err => console.log(err))
        API.getProducts()     
            .then(res => {setProducts(res.data)})
            .catch(err => console.log(err));
    },[])

    function LoadSubCategories(e, category){
        e.preventDefault();
        subCategories.filter(products.belongsTo === category)
        subCategories.map(subCategory => {
            return <li key={subCategory._id} onClick={(e) => LoadProducts(e, subCategory._id)}>
                <Link to={`/category/${subCategory._id}`}>{subCategory.title}</Link>
                <ul>
                </ul>
                </li>
        })
    }

    function LoadProducts(e, subCategory){
        e.preventDefault();
        products.filter(products.subCategory === subCategory)
        products.map(product => {
            return <li key={product._id}>
                <Link to={`/productpage/${product._id}`}>{product.title}</Link>
                <Link to={`/editproduct/${product._id}`}>edit</Link>
            </li>
        })
    }

    return(<>
        <nav>
            <ul>
                <li>All products</li>
                {categories.map(category => {
                    return (<>
                        <li key={category._id} onClick={(e) => LoadSubCategories(e, category._id)}>{category.title}</li>
                            <ul>
                                
                            </ul>
                    </>)
                })}
                <li>Contact us</li>
            </ul>
        </nav>
    </>);
}

export default Nav;