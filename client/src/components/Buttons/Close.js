import React from "react";

function Close(props){
    return (<button className="closeMenu" onClick={props.onClick}>
            x
        </button>
    )
}

export default Close;