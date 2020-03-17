import React from "react";

function Delete(props){
    
    function remove(e){
        e.preventDefault()
        const remove = e.target.getAttribute("delete");
        props.setDeleteFrom(props.deleteFrom.filter(option => option !== remove))
    }
    return (<button
        delete={props.delete}
        deleteFrom={props.deleteFrom}
        setDeleteFrom={props.setDeleteFrom}
        className="delete-button" 
        onClick={(e) => remove(e)}>
            X Delete
        </button>
    )
}

export default Delete;