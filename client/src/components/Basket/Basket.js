import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
import Delete from "../Buttons/Delete";
import API from "../../utils/API";

function Basket(props){
    const [ basketData, setBasketData ] = useContext(BasketContext);
    const [ basketRowData, setBasketRowData ] = useContext(BasketContext);
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ basket, setBasket ] = useState()

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
                if (basketData.length <= 0){
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
            console.log(basketData[0].basketId)
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
        <div>
        <h2>{loggedOnUser.firstName}'s Basket</h2>
            {basketRowData?(basketRowData.map(row => {
                return <div key={row.basketRowId} value={row.basketRowId}>
                        <p>{row.productTitle}</p>
                        <p>{row.transferTitle}</p>
                        <p>Size: {row.size}</p>
                        <p>Colour: {row.productColor}</p>
                        <p>£{row.price}</p>
                        <p>Amount: {row.quantity}</p>
                        <button 
                            delete={row.basketRowId}
                            onClick={(e) => remove(e)}>Delete</button>
                    </div>
            })):""}

            <button
            onClick={(e) => checkout(e)}>
                Checkout
            </button>
            <button>
                <Link to="/orderhistory">Your Orders</Link>
            </button>
            <button>
                Sign out
            </button>
        </div>
    </>)
}

export default Basket;