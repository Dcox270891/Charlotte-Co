import React from "react";

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
            {props.placeholder}
        </label>
        <input
            className="form-add-product"
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
                return <li key={option}>{option} <button remove={option} onClick={removeOption}>x</button></li>
            })}
        </ul>
    </div>)


}

export default MultipleInputs;