import { createSlice } from '@reduxjs/toolkit';



/* Leaving this for future reference
type ClickCountArr = [ number, number ];

const initialClickCountArr : ClickCountArr = [ 0, 0 ];

interface ClickCountArrAction {

    type : string;

};

const defaultClickCountArrAction : ClickCountArrAction = {

    type : '',

};

export const clickCountArrIncrement = ( type : string ) : ClickCountArrAction => {

    return { type : type };

};

export const clickCountArrReducer = ( clickCountArr : ClickCountArr = initialClickCountArr, action : ClickCountArrAction = defaultClickCountArrAction) : ClickCountArr => {

    switch ( action.type ) {

        case 'clickCountArr/aboutCount' :
            return [ clickCountArr[0] + 1, clickCountArr[1] ];

        case 'clickCountArr/contactCount' :
            return [ clickCountArr[0], clickCountArr[1] + 1 ];

        default :
            return clickCountArr;

    }

};
*/



type InitialState = [ number, number ];

const initialState : InitialState = [ 0, 0 ];

interface Options {

    name         : string;

    initialState : InitialState;

    reducers     : {

        aboutCount   : ( state : InitialState ) => InitialState;
        contactCount : ( state : InitialState ) => InitialState;

    };

};

const options : Options = {

    name         : 'clickCountArr',

    initialState : initialState,

    reducers     : {

        aboutCount   : ( state = initialState ) => {

            return [ state[0] + 1, state[1] ];

        },

        contactCount : ( state = initialState ) => {

            return [ state[0], state[1] + 1 ];

        },

    },

};

export const clickCountArrSlice = createSlice( options );

export const { aboutCount, contactCount } = clickCountArrSlice.actions;

export default clickCountArrSlice.reducer;
