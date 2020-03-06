import React from "react";

function Checkbox(props){

    return (
        <div className="form-question">
            <label htmlFor={props.name}>
                {props.placeholder}
            </label>
            <input
                className="form-add-product"
                type="checkbox"
                name={props.name}
                checked={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Checkbox;



            