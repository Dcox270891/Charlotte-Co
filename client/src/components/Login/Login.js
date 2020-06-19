import React, { useState, useContext } from "react";
import Input from "../Input/InputText";
import Submit from "../Buttons/Submit";
import API from "../../utils/API";
import {UserContext} from "../../UserContext";


function Login(){
    const [ loggedOnUser, setLoggedOnUser ] = useContext(UserContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function loginLocalUser(e){
        e.preventDefault();
        API.loginUser(email, password)
            .then(res => {
                setLoggedOnUser(res.data);
            })
            .catch(err => console.log(err));
    };

    return (<>
        <h1>{(loggedOnUser !== undefined)?(`Welcome ${loggedOnUser.email}`):("You need to log in")}</h1>
        <form className="login-form column">
            <Input 
                value={email} 
                onChange={e => {setEmail(e.target.value)}} 
                placeholder="Email Address" 
            /><br/>
            <Input 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
            /><br/>
            <Submit
                onClick={e => loginLocalUser(e)}
            />
        </form>
    </>)
}

export default Login;