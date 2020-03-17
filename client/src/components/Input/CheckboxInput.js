import React from "react";

function Checkbox(props){

    return (
        <div className="label-form">
            <label htmlFor={props.name}>
                {props.placeholder}
            </label>
            <input
                className="checkbox-form"
                type="checkbox"
                name={props.name}
                checked={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Checkbox;



            