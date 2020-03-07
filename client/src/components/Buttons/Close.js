import React from "react";
import "./style.css";

function Close(props){
    return (<button
        remove={props.remove}
        className="close-menu" 
        onClick={props.onClick}>
            x
        </button>
    )
}

export default Close;