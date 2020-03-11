import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

function Nav(){
    const [ categories, setCategories] = useState([]);
    const [ subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        API.getCategories()
            .then(res => {setCategories(res.data)})
            .catch(err => console.log(err));
        API.getSubCategories()
            .then(res => {setSubCategories(res.data)})
            .catch(err => console.log(err))
    },[])

    return(<>
        <nav>
            <ul>
                <li>All products</li>
                {categories.map(category => {
                    return (<>
                        <li key={category._id}>{category.title}</li>
                            <ul>
                                {subCategories.map(subCategory => {
                                    if(subCategory.belongsTo == category._id){
                                        return <li key={subCategory._id}>
                                            <Link to={`/category/${subCategory._id}`}>{subCategory.title}</Link>
                                        </li>
                                    }})}
                            </ul>
                    </>)
                })}
                <li>Contact us</li>
            </ul>
        </nav>
    </>);
}

export default Nav;