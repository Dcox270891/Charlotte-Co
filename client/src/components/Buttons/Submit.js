import React from "react";

function Submit(props){
    return (
        <button 
            className="submit-button" 
            onClick={props.onClick}
        >
            Submit
        </button>
    )
}

export default Submit;