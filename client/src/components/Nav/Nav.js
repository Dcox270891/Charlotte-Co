import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from "../../utils/API";
import {UserContext} from "../../UserContext";
import {NavDropdown, Nav, Dropdown} from "react-bootstrap";
import Login from "../Login/Login";
import Basket from "../Basket/Basket";

function NavMenu(){
    const [ categories, setCategories] = useState([]);
    const [ subCategories, setSubCategories] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ loggedOnUser, ] = useContext(UserContext);

    useEffect(() => {
        API.getCategories()
            .then(res => {setCategories(res.data)})
            .catch(err => console.log(err));
        API.getSubCategories()
            .then(res => {setSubCategories(res.data)})
            .catch(err => console.log(err));
        API.getProducts()  
            .then(res => {setProducts(res.data)})
            .catch(err => console.log(err));
    },[])

    return(<>
        <Nav fill
        sticky="top"
        variant="tabs">
            <Nav.Item>
                <Nav.Link href="/allproducts">
                    All Products
                </Nav.Link>
            </Nav.Item>
            {categories.map((category, i) => {
                return (<>
                    <NavDropdown title={category.title}
                    key={category._id}
                    value={i}
                    id="nav-dropdown">
                        {subCategories.map(subCategory => {
                            if (subCategory.belongsTo == category._id){
                                return (<>
                                    <Dropdown as={Nav.Item}
                                    drop="down"
                                    key={subCategory._id}
                                    href={`/category/${subCategory._id}`}>
                                        <Dropdown.Toggle as={Nav.Link}>
                                            <Link to={`/category/${subCategory._id}`}>
                                                {subCategory.title}
                                            </Link>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {products.map(product =>{
                                                if (product.subCategory == subCategory._id){
                                                    return (
                                                        <Dropdown.Item as={Nav.Link}
                                                        drop="down"
                                                        key={product._id}
                                                        href={`/productpage/${product._id}`}>
                                                             <Link to={`/productpage/${product._id}`}>
                                                                {product.name}
                                                            </Link>
                                                            {(loggedOnUser?.isAdmin)?(
                                                                <Link className="edit"
                                                                to={`/editproduct/${product._id}`}>
                                                                    Edit
                                                                </Link>
                                                            ): null}
                                                        </Dropdown.Item>
                                                    )
                                                }
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>)
                            }
                        })}
                    </NavDropdown>
                </>)
            })}
            <Nav.Item>
                <Nav.Link href="/contactus">
                    Contact Us
                </Nav.Link>
            </Nav.Item>
            {(loggedOnUser?.isAdmin)?(
            <Nav.Item>
                <Nav.Link href="/addnewproduct"
                key="add-products">
                    Add a product
                </Nav.Link>
            </Nav.Item>
            ):("")}
            <div className="justify-content-end">
                {(loggedOnUser === undefined)?(
                    <Login />
                ):(
                    <Basket/>
                )}
            </div>
        </Nav>
    </>);
}

export default NavMenu;