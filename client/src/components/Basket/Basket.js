import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
import API from "../../utils/API";
import {Button, Modal} from "react-bootstrap";


function Basket(props){
    const [ basketData, setBasketData ] = useContext(BasketContext);
    const [ basketRowData, setBasketRowData ] = useContext(BasketContext);
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ basket, setBasket ] = useState();
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function createNewBasket(){
        API.newBasket({
            userId: loggedOnUser.userId,
            isCompleted: false,
            isSent: false,
            isPaid: false,
            })
            .then(res => {   
                setLoggedOnUser(loggedOnUser);
                setBasketData(res.data);
                setBasket(res.data)
            })
    }

    useEffect(() => {
        API.getBasketById(loggedOnUser.userId)
            .then(res => {
                const basketData = res.data
                if (!basketData.isPaid <= 0){
                    createNewBasket()
                } else {
                    setLoggedOnUser(loggedOnUser);
                    setBasketData(res.data);
                    setBasket(res.data)
                }
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        if(basketData !== undefined){
            API.getBasketRowById(basketData[0].basketId)
                .then(res => {
                    setBasketRowData(res.data)
                })
                .catch(err => console.log(err))
        }
    },[basket])

    function remove(e){
        e.preventDefault()
        API.deleteBasketRow(e.target.getAttribute("delete"))
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setBasketData(undefined);
    }

    function checkout(e){
        e.preventDefault()
        API.basketPaid(basketData[0].basketId)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return(<>
        <Button variant="primary" onClick={handleShow}>
            Basket
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {loggedOnUser.firstName + " " + loggedOnUser.lastName}'s Basket
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {basketRowData?(basketRowData.map(row => {
                    return (<>
                        <div key={row.basketRowId} value={row.basketRowId}>
                            <p>{row.productTitle}</p>
                            <p>{row.transferTitle}</p>
                            <p>Size: {row.size}</p>
                            <p>Colour: {row.productColor}</p>
                            <p>£{row.price}</p>
                            <p>Amount: {row.quantity}</p>
                            <button delete={row.basketRowId}
                            onClick={(e) => remove(e)}>
                                Delete
                            </button>
                        </div>
                    </>)})
                ):"You currently dont have any items in your basket"}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                onClick={handleClose}>
                    Continue Shopping
                </Button>
                <Button variant="primary" 
                onClick={(e) => checkout(e)}>
                    Checkout
                </Button>
                <Button>
                <Link to="/orderhistory">Your Orders</Link>
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default Basket;