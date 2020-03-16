import React, { useContext } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import "./style.css";
import {UserContext} from "../../UserContext"

function HomePage(){
    const [ loggedOnUser, ] = useContext(UserContext);

    
    return(<>
        <h1>{loggedOnUser.firstName} {loggedOnUser.lastName}</h1>
        <div>
            <h2 className="home-product-title">Hot Now</h2>
            <ProductCard />
        </div>
        <div>
            <h2 className="home-product-title">New</h2>
            <ProductCard />
        </div>
    </>)
}

export default HomePage;