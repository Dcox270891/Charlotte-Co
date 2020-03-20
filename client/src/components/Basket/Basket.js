import React, { useEffect, useContext, useState } from "react";
import {UserContext} from "../../UserContext";
import {BasketContext} from "../../BasketContext";
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