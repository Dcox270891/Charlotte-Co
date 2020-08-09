import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import {Carousel} from "react-bootstrap";
import Picture from "../../components/Picture/Picture.js";


function HomePage(){
    const [ hotNow, setHotNow ] = useState([]);
    const [ newProduct, setNewProduct ] = useState([]);

    useEffect(() => {
        API.getHotProducts()
            .then(res => setHotNow(res.data))
            .catch(err => console.log(err));
        API.getNewProducts()
            .then(res => setNewProduct(res.data))
            .catch(err => console.log(err));
    },[])

    return(<>
        <Carousel>
            {(newProduct)?
                (newProduct.map(product => {
                    return <Carousel.Item key={product._id}>
                                <img className="d-block w-100"
                                src={product.images[0].secure_url}
                                alt={product.name}/>
                            <Carousel.Caption>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                })
            ):""}
            {(hotNow)?
                (hotNow.map(product => {
                    return <Carousel.Item key={product._id}>
                                <img className="d-block w-100"
                                src={product.images[0].secure_url}
                                alt={product.name}/>
                            <Carousel.Caption>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                })
            ):""}
        </Carousel>
    </>)
}

export default HomePage;