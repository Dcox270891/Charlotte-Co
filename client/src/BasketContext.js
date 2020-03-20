import React, {useState} from "react";

const BasketContext = React.createContext([{}, () => {}]);

const BasketWrapper = (props) => {
    const [ basketData, setBasketData ] = useState(undefined);
    
    return(<>
    <BasketContext.Provider value={[ basketData, setBasketData ]}>
        {props.children}
    </BasketContext.Provider>
    </>)
}

export {BasketContext, BasketWrapper};