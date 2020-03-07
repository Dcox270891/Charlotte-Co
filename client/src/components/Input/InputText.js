import React from "react";
import "./style.css";

function Input(props){
    return(
        <div className="form-question">
            <label htmlFor={props.value}>
                {props.placeholder} :
            </label>
            <input
                className="input-form"
                type="text"
                placeholder={props.placeholder}
                name={props.value}
                value={props.value}
                onChange={props.onChange}
            /> 
        </div>)
}

export default Input