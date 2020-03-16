import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Close from "../Buttons/Close"
import Login from "../Login/Login";
import Nav from "../Nav/Nav";
import "./style.css"
import {UserContext} from "../../UserContext"
import Basket from "../Basket/Basket";

function Header(){
    const [ loggedOnUser, ] = useContext(UserContext);
    const [ toggleLogInBasket , setToggleLogInBasket] = useState(false);
    const [ toggleNav , setToggleNav] = useState(true);

    return (<>
        <header className="header">
            <nav>
                <button onClick={() => setToggleNav(true)}>
                    Menu
                </button>
                {toggleNav? (<Close onClick={() => setToggleNav(false)} />):""}
            </nav>
            <div className="logo">

            </div>
            <div className="login-basket">
                <button onClick={() => setToggleLogInBasket(true)}>
                    Login/Basket
                </button>
                {toggleLogInBasket? (<div>
                        <Close onClick={() => setToggleLogInBasket(false)} />
                        <Login />
                        <Link to="/signup">Sign Up</Link>
                    </div>) : ""}
            </div>
        </header>
        {toggleNav? (<Nav />) : ""} 
    </>)
}

export default Header;