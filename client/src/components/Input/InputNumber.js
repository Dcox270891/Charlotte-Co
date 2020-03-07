import React from "react";
import "./style.css";

function InputNumber(props){
    return(
        <div className="label-form">
            <label htmlFor={props.value}>
                {props.placeholder} :
            </label>
            <input
                className="input-form number"
                type="number"
                placeholder={props.placeholder}
                name={props.value}
                value={props.value}
                onChange={props.onChange}
            /> 
        </div>)
}

export default InputNumber;