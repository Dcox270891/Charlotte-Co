import React, {useState} from "react";


function Login(){
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState("");
    const [ houseNameOrNumber, setHouseNameOrNumber ] = useState("");
    const [ street, setStreet ] = useState("");
    const [ city, setCity ] = useState("");
    const [ county, setCounty ] = useState("");
    const [ postCode, setPostCode ] = useState("");

    function submitUser(e){
        e.preventDefault();
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            houseNameOrNumber,
            street,
            city,
            county,
            postCode,
        };
        if (password === passwordConfirm){
            console.log(newUser)
        } else {
            console.log("passwords dont match")
        }
    }

    return(<>
        <form>
            <div className="form-question">
                <label for="firstName">
                    First Name
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="lastName">
                    Last Name
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="email">
                    Email Address (this will be your login)
                </label>
                <input
                    className="form-signup"
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
                    className="form-signup"
                    type="text"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="passwordConfirm">
                    Confirm Password
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="houseNameOrNumber">
                    House Number / Name
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="houseNameOrNumber"
                    value={houseNameOrNumber}
                    onChange={e => setHouseNameOrNumber(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="street">
                    Street
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="street"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="city">
                    City
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="county">
                    County
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="county"
                    value={county}
                    onChange={e => setCounty(e.target.value)}
                />
            </div>
            <div className="form-question">
                <label for="postCode">
                    Post Code
                </label>
                <input
                    className="form-signup"
                    type="text"
                    name="postCode"
                    value={postCode}
                    onChange={e => setPostCode(e.target.value)}
                />
            </div>
            <button 
                className="submit-buutton" 
                onClick={e => submitUser(e)}
            >
                Submit
            </button>
        </form>
    </>)
}

export default Login;