import React from "react";

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