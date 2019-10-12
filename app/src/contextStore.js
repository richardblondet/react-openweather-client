import React from "react";

export const initialState = {
    appid: "51cb0b8551eb146cb9f8a237a110a5ee",
    result: null
};
export const Reducer = (state = initialState, action) => {

    /**
     * Simple log for our reducer
     */
    console.log("%c Reducer Action: %s", "font-weight:bold; color: #6B5ADF;", action.type, action );
    
    switch( action.type ) {
        case "WEATHER_RESPONSE":
            return {
                ...state,
                result: action.data
            };
        default:
            return state;
    }
};
const Store = React.createContext();

export const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState);
    const value = { state, dispatch };
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
};

export default Store;