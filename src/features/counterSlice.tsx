import { createSlice } from '@reduxjs/toolkit';



/* Leaving this for future reference
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
*/



type InitialState = number;

const initialState = 0;

interface Action {

    type    : string;
    payload : number;

};

const defaultAction : Action = {

    type    : '',
    payload : 0,

};

interface Options {

    name         : string;

    initialState : InitialState;

    reducers     : {

        increment : ( state : InitialState, action : Action ) => number;
        decrement : ( state : InitialState, action : Action ) => number;

    };

};

const options : Options = {

    name         : 'counter',

    initialState : initialState,

    reducers     : {

        increment : ( state = initialState, action = defaultAction ) => {

            return state + action.payload;

        },

        decrement : ( state = initialState, action = defaultAction ) => {

            return state - action.payload;

        },

    },

};

export const counterSlice = createSlice( options );

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
