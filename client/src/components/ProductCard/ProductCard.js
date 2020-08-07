import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Button, Card} from "react-bootstrap";


function ProductCard({product}){
    
    return (<>
        {(product)?(
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" 
                src={product.images[0].secure_url}/>
                <Card.Body>
                    <Card.Title>
                        {product.name}
                    </Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Button variant="primary">
                        <Link to={`/productpage/${product._id}`} >
                            Veiw this item
                        </Link>
                    </Button>
                </Card.Body>
            </Card>
        ):""}
    </>)
}

export default ProductCard;