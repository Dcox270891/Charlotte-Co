import React, {useState} from "react";
import API from "../../utils/API";


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
        <form>
            <div className="form-question">
                <label for="email">
                    Email Address
                </label>
                <input
                    className="form-login"
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="password">
                    Password
                </label>
                <input
                    className="form-login"
                    type="text"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button 
                className="submit-buutton" 
                onClick={e => loginLocalUser(e)}
            >
                Submit
            </button>
        </form>
    </>)
}

export default Login;