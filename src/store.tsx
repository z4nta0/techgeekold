import { createStore } from 'redux';

interface InitialState {

    counter : number;

    clickCountObj : {

        logoCount : number;
        homeCount : number;

    };

    clickCountArr : [ number, number ];

};

const initialState : InitialState = {
    
    counter : 0,

    clickCountObj : {

        logoCount : 0,
        homeCount : 0,

    },

    clickCountArr : [ 0, 0 ],

};

interface DefaultAction {

    type : string
    payload? : number

};


const defaultAction : DefaultAction = {

    type : ''

};

export const counterIncrement = ( payload : number ) : { type : string; payload : number } => {

    printCount();

    if ( store.getState().counter >= 10 ) {
        alert("Count has reached 10, cannot increment further!");
        unsubscribe();
        return { type : '', payload : 0 };
    }

    return { type: 'counter/increment', payload: payload };
};

export const counterDecrement = ( payload : number ) : { type : string; payload : number } => {

    printCount();

    if ( store.getState().counter <= -10 ) {
        alert("Count has reached -10, cannot increment further!");
        unsubscribe();
        return { type : '', payload : 0 };
    }

    return { type: 'counter/decrement', payload : payload };
};

export const navClickIncrement = ( type : string ) : { type : string } => {

    return { type: type };

};

const countReducer = ( state : InitialState = initialState, action : DefaultAction = defaultAction ) : InitialState => {

    const payload : number = action.payload === undefined ? 0 : action.payload;

    switch ( action.type ) {

        case 'counter/increment' :
            return {
                ...state,
                counter: state.counter + payload
            };

        case 'counter/decrement' :
            return {
                ...state,
                counter: state.counter - payload
            };

        case 'clickCountObj/logoCount' :
            return {
                ...state,
                clickCountObj: {
                    ...state.clickCountObj,
                    logoCount: state.clickCountObj.logoCount + 1,
                }
            };

        case 'clickCountObj/homeCount' :
            return {
                ...state,
                clickCountObj: {
                    ...state.clickCountObj,
                    homeCount: state.clickCountObj.homeCount + 1,
                }
            };

        case 'clickCountArr/aboutCount' :
            return {
                ...state,
                clickCountArr: [ state.clickCountArr[0] + 1, state.clickCountArr[1] ]
            };

        case 'clickCountArr/contactCount' :
            return {
                ...state,
                clickCountArr: [ state.clickCountArr[0], state.clickCountArr[1] + 1 ]
            };

        default :
            return { ...state };

    }

};

export const store = createStore( countReducer );

const printCount = () : void => {
    console.log(`Current count is: ${store.getState().counter}`);
};

const unsubscribe = store.subscribe(printCount);
