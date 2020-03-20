import React, { useEffect, useContext, useState } from "react";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
import API from "../../utils/API";

function Basket(props){
    const [ basketData, setBasketData ] = useContext(BasketContext);
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ basket, setBasket ] = useState();
    const [ basketRows, setBasketRows ] = useState();
    console.log(loggedOnUser)

    function createNewBasket(){
        API.newBasket({
            userId: loggedOnUser.userId,
            isCompleted: false,
            isSent: false,
            isPaid: false,
            })
            .then(res => {   
                setLoggedOnUser(loggedOnUser);
                setBasketData(res.data[res.data.length]);
                setBasket(res.data[res.data.length]);
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
                    setBasketData(res.data[res.data.length]);
                    setBasket(res.data[res.data.length]);
                }
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        if(basket !== undefined){
            API.getBasketRowById(basket.basketId)
                .then(res => setBasketRows(res.data))
                .catch(err => console.log(err))
        }
    },[])

    return(<>
        <div>
        <h2>{loggedOnUser.firstName}'s Basket</h2>
            {basketRows?(basketRows.map(row => {
                return <div key={row.basketRowId} value={row.basketRowId}>
                        <p>{row.productTitle}</p>
                        <p>{row.transferTitle}</p>
                        <p>{row.size}</p>
                        <p>{row.productColor}</p>
                        <p>{row.price}</p>
                        <p>{row.quantity}</p>
                    </div>
            })):""}

            <button
            >
                Checkout
            </button>
            <button
            >
                Sign out
            </button>
        </div>
    </>)
}

export default Basket;