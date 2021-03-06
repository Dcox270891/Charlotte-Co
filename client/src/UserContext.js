import React, {useState} from "react";

const UserContext = React.createContext([{}, () => {}]);

const UserWrapper = (props) => {
    const [ loggedOnUser, setLoggedOnUser ] = useState(undefined);
    
    return(<>
    <UserContext.Provider value={[ loggedOnUser, setLoggedOnUser ]}>
        {props.children}
    </UserContext.Provider>
    </>)
}

export {UserContext, UserWrapper};