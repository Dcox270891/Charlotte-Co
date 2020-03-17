import React, { useContext } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import {UserContext} from "../../UserContext"

function HomePage(){
    const [ loggedOnUser, ] = useContext(UserContext);

    
    return(<>
        {(loggedOnUser !== undefined)?(<h1>{loggedOnUser.firstName} {loggedOnUser.lastName}</h1>):""}
        <div className="container row">
            <div className="home-product">
                <h2 className="home-product-title">Hot Now</h2>
                <ProductCard key="hotNow" product=""/>
            </div>
            <div className="home-product">
                <h2 className="home-product-title">New</h2>
                <ProductCard key="New" product=""/>
            </div>
        </div>
    </>)
}

export default HomePage;