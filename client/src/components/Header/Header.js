import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Close from "../Buttons/Close"
import Login from "../Login/Login";
import Nav from "../Nav/Nav";

function Header(){
    const [ toggleLogInBasket , setToggleLogInBasket] = useState(false);
    const [ toggleNav , setToggleNav] = useState(false);

    return (<>
        <header>
            <nav>
                <button onClick={() => setToggleNav(true)}>
                    Menu
                </button>
                {toggleNav? (<div>
                    <Close onClick={() => setToggleNav(false)} />
                    <Nav />
                </div>) : ""} 
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
    </>)
}

export default Header;