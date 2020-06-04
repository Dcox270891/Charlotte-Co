import React, { useEffect, useContext, useState } from "react";
import {UserContext} from "../../UserContext";
import API from "../../utils/API";

function OrderHistory(props){
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ orders, setOrders ] = useState();

    useEffect(() => {
        API.getBasketById(loggedOnUser.id)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    },[])

    return(<>
    <div>
        <h1>{loggedOnUser.firtsName} {loggedOnUser.lastName}'s Orders</h1>
        <div>
            <h2>Current Orders</h2>
            {(orders>0)?((orders.isPaid && !orders.isSent && !orders.isCompleted)?(
                <p>{orders.basketId}</p>
            ):""):(<p>You currently dont have any orders</p>)}
        </div>
        <div>
            <h2>Orders to be delivered</h2>
            {(orders>0)?((orders.isSent && !orders.isPaid && !orders.isCompleted)?(
                <p>{orders.basketId}</p>
            ):""):(<p>You currently dont have any orders awaiting delivery</p>)}
        </div>
        <div>
            <h2>Complete Orders</h2>
            {(orders>0)?((orders.isCompleted && !orders.isSent && !orders.isPaid)?(
                <p>{orders.basketId}</p>
            ):""):(<p>You have not made any orders through us yet</p>)}
        </div>
    </div>
    </>)
}

export default OrderHistory;