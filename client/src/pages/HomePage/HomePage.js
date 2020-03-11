import React, { useEffect, useState } from "react";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import ProductCard from "../../components/ProductCard/ProductCard"
import API from "../../utils/API";
import "./style.css";

function HomePage(){
    
    return(<>
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