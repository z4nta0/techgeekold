import { createSlice } from '@reduxjs/toolkit';



/* Leaving this for future reference
interface ClickCountObj {

    logoCount : number;
    homeCount : number;

};

const initialClickCountObj : ClickCountObj = {

    logoCount : 0,
    homeCount : 0,

};

interface ClickCountObjAction {

    type : string;

};

const defaultClickCountObjAction : ClickCountObjAction = {

    type : '',

};

export const clickCountObjIncrement = ( type : string ) : ClickCountObjAction => {

    return { type : type };

};

export const clickCountObjReducer = ( clickCountObj : ClickCountObj = initialClickCountObj, action : ClickCountObjAction = defaultClickCountObjAction) : ClickCountObj => {

    switch ( action.type ) {

        case 'clickCountObj/logoCount' :
            return {
                ...clickCountObj,
                logoCount : clickCountObj.logoCount + 1,
            };

        case 'clickCountObj/homeCount' :
            return {
                ...clickCountObj,
                homeCount : clickCountObj.homeCount + 1,
            };

        default :
            return clickCountObj;

    };

};
*/



interface InitialState {

    logoCount : number;
    homeCount : number;

};

const initialState : InitialState = {

    logoCount : 0,
    homeCount : 0,

};

interface Options {

    name         : string;

    initialState : InitialState;

    reducers     : {

        logoCount : ( state : InitialState ) => InitialState;
        homeCount : ( state : InitialState ) => InitialState;

    };

};

const options : Options = {

    name         : 'clickCountObj',

    initialState : initialState,

    reducers     : {

        logoCount : ( state = initialState ) => {

            return {
                ...state,
                logoCount : state.logoCount + 1,
            };

        },

        homeCount : ( state = initialState ) => {

            return {
                ...state,
                homeCount : state.homeCount + 1,
            };

        },

    },

};

export const clickCountObjSlice = createSlice( options );

export const { logoCount, homeCount } = clickCountObjSlice.actions;

export default clickCountObjSlice.reducer;
