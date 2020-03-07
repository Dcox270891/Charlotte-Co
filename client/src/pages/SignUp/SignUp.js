import React, {useState} from "react";
import Submit from "../../components/Buttons/Submit";
import InputText from "../../components/Input/InputText";
import API from "../../utils/API";

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
            API.signUpUser(newUser)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else {
            console.log("passwords dont match")
        }
    }

    return(<>
        <form>
            <InputText 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name" 
            />
            <InputText 
                value={lastName} 
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name" 
            />
            <InputText 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address" 
            />
            <InputText 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Password" 
            />
            <InputText 
                value={passwordConfirm} 
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password" 
            />
            <InputText 
                value={houseNameOrNumber} 
                onChange={e => setHouseNameOrNumber(e.target.value)}
                placeholder="House name/number" 
            />
            <InputText 
                value={street} 
                onChange={e => setStreet(e.target.value)}
                placeholder="Street" 
            />
            <InputText 
                value={city} 
                onChange={e => setCity(e.target.value)}
                placeholder="City" 
            />
            <InputText 
                value={county} 
                onChange={e => setCounty(e.target.value)}
                placeholder="County" 
            />
            <InputText 
                value={postCode} 
                onChange={e => setPostCode(e.target.value)}
                placeholder="Post Code" 
            />
            <Submit
                onChange={e => submitUser(e)}
            />
        </form>
    </>)
}

export default Login;