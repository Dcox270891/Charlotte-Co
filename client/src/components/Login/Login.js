import React, {useState} from "react";
import Input from "../Input/InputText";
import Submit from "../Buttons/Submit";
import API from "../../utils/API";
import "./style.css";


function Login(){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ user, setUser ] = useState();

    function loginLocalUser(e){
        e.preventDefault();
        API.loginUser(email, password)
            .then(res => {
                setUser(res);
            })
            .catch(err => console.log(err));
    };

    return (<>
        <h1>{(user)?(`Welcome ${user.data.email}`):("You need to log in")}</h1>
        <form className="login-form">
            <Input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email Address" 
            />
            <Input 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <Submit
                onChange={e => loginLocalUser(e)}
            />
        </form>
    </>)
}

export default Login;