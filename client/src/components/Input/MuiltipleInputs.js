import React from "react";
import Close from "../Buttons/Close";
import "./style.css";

function MultipleInputs(props){
    function addOption(e){
        e.preventDefault();
        props.setOptionsArray([...props.optionsArray, props.value ]);
        props.setOption("")
    }
    
    function removeOption(e){
        e.preventDefault();
        const remove = e.target.getAttribute("remove");
        props.setOptionsArray(props.optionsArray.filter(option => option !== remove));
    }
    
    return (<div className="form-question">
        <label htmlFor={props.value}>
            {props.placeholder} :
        </label>
        <input
            className="input-form"
            type="text"
            name={props.value}
            value={props.value}
            onChange={props.onChange}
        />
        <button onClick={addOption}>
            +
        </button>
        <ul>
            {props.optionsTitle}:
            {props.optionsArray.map(option => {
                return <li key={option}>
                        {option} <Close remove={option} onClick={removeOption}/>
                    </li>
            })}
        </ul>
    </div>)
}

export default MultipleInputs;