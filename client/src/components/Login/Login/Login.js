import React, {useState} from "react";


function Login(){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function loginLocalUser(e){
        e.preventDefault();
        const userDetails = {
            email,
            password,
        };
        console.log(userDetails)
    };

    return (<>
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