import React from "react";
import "./style.css";

function Submit(props){
    return (
        <button 
            className="submit-button" 
            onClick={(e) => e.preventDefault(), props.onClick}
        >
            Submit
        </button>
    )
}

export default Submit;