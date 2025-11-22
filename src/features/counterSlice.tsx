export const counterIncrement = ( payload : number ) : { type : string; payload : number } => {

    return { type : 'counter/increment', payload: payload };

};

export const counterDecrement = ( payload : number ) : { type : string; payload : number } => {

    return { type : 'counter/decrement', payload : payload };

};

const intialCounter : number = 0;

interface CounterAction {

    type : string;
    payload : number;

};

const defaultCounterAction : CounterAction = {

    type : '',
    payload : 0,

};

export const counterReducer = ( counter : number = intialCounter, action : CounterAction = defaultCounterAction ) : number => {

    switch ( action.type ) {

        case 'counter/increment' :
            return counter + action.payload;

        case 'counter/decrement' :
            return counter - action.payload;

        default :
            return counter;

    };

};
