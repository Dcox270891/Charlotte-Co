import React, {useState} from "react";
import Submit from "../../components/Buttons/Submit";
import Input from "../../components/Input/InputText";
import API from "../../utils/API";
import "./style.css";

function CategoryPicker(props){
    const [  newOptionName, setNewOptionName] = useState("")
    const [  addingNewOption, setAddingNewOption] = useState(false);

    function toggleAddNewOption(e){
        e.preventDefault();
        setAddingNewOption(true);
    }

    function saveNewOption(e) {
        e.preventDefault();
        APISave();
        setAddingNewOption(false);
    }

    function APISave(){
        if(props.value === "category"){
            API.newCategory({title: newOptionName})
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else if (props.value === "subCategory") {
            API.newSubCategory({
                belongsTo: props.category._id,
                title: newOptionName,
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
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

    return (<div className="label-form">
            <label htmlFor={props.value}>
                Pick a {props.placeholder} :
            </label>
            <select className="dropdown-form"
                name={props.value}
                onChange={props.onChange}
            >
                <option value={null} key="Not picked">{props.placeholder}</option>
                {(props.options.length)?(props.options.map((option, i) => {
                    return <option value={i} key={option._id}>{option.title}</option>
                })):""
                }   
            </select>
            <label htmlFor={props.options}>
                {!addingNewOption?(<button onClick={e => toggleAddNewOption(e)}>
                    Add a new {props.placeholder}
                </button>):addNewOption()}
            </label>
        </div>
    )
}

export default CategoryPicker;