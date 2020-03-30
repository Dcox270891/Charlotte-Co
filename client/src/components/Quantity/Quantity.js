import React from "react";

function Quantity(props){

    function minus(){
        if(props.quantity !== 0){
            props.setQuantity(props.quantity-1)
        }
    }

    function add(){
        props.setQuantity(props.quantity+1)
    }

    return(<>
        <button onClick={minus}>-</button>
        {props.quantity}
        <button onClick={add}>+</button>
    </>)
}

export default Quantity