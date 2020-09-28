import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Button, Card} from "react-bootstrap";


function TransferCard({transfer, product}){
    
    return (<>
        {(transfer)?(
            <Card style={{ width: '18rem' }}>
                {(transfer.images)?
                (<Card.Img variant="top" 
                src={transfer.images[0]}/>)
                :("")}
                <Card.Body>
                    <Card.Title>
                        {transfer.title} {product.name}
                    </Card.Title>
                    <Card.Text>
                        {transfer.transferDescription} {product.description}
                        <br/>
                        <strong>£{product.price + transfer.priceDifference}</strong>
                    </Card.Text>
                    <Button variant="primary">
                        <Link to={`/transferpage/${transfer._id}`} >
                            Veiw this item
                        </Link>
                    </Button>
                    {/* <div>
                        <Button onClick={decrease()}>
                            -
                        </Button>
                        {quantity}
                        <Button onClick={increase()}>
                            +
                        </Button>
                    </div> */}
                    {/* <Button>
                        Add to basket
                    </Button> */}
                </Card.Body>
            </Card>
        ):"Sorry we cannot load this at this time."}
    </>)
}

export default TransferCard;