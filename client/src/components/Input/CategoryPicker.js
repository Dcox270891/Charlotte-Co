import React, {useState, useEffect} from "react";
import Submit from "../../components/Buttons/Submit";
import Input from "../../components/Input/InputText";

function CategoryPicker(props){
    const [  newOptionName, setNewOptionName] = useState("")
    const [  options, setOptions ] = useState([]);
    const [  addingNewOption, setAddingNewOption] = useState(false);

    function toggleAddNewOption(e){
        e.preventDefault();
        setAddingNewOption(true);
    }

    function saveNewOption(e) {
        e.preventDefault();
        props.APISave();
        setAddingNewOption(false);
    }
    
    function addNewOption(){
        return(<>
            <Input
                value={newOptionName} 
                onChange={e => setNewOptionName(e.target.value)} 
                placeholder={props.placeholder + " Name"}
            />
            <Submit
                onClick={(e) =>saveNewOption(e)}
            />
        </>)
    }

    return (<div className="form-question">
            <label htmlFor={props.value}>
                {"Pick a " + props.placeholder}
            </label>
            <select className="form-add-product"
                name={props.value}
                onChange={props.onChange}
            >
                <option value={null} key="Not picked">{props.placeholder}</option>
                {(options.length)?(options.map((option, i) => {
                    return <option value={i} key={option._id}>{option.title}</option>
                })):""
                }   
            </select>
            <label htmlFor={options}>
                {!addingNewOption?(<button onClick={e => toggleAddNewOption(e)}>
                    Add a new {props.placeholder}
                </button>):addNewOption()}
            </label>
        </div>
    )
}

export default CategoryPicker;