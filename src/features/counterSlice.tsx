
// #region Imports

import { createSlice } from '@reduxjs/toolkit'; /** This is the toolset for Redux that is designed to simplify Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices. This makes Redux easier to set up and use for modern applications. */

// #endregion Imports



/**
 * counterSlice = Counter Slice File
 *
 * @summary
 * This file creates a Redux slice for managing a simple counter state. It
 * defines the initial state of the couStaNum and provides two reducer functions,
 * {@link incNumRed} and {@link decNumRed}, which allow for increasing and
 * decreasing the couStaNum value by a specified amount. The slice is created
 * using Redux Toolkit's {@link createSlice} method, which automatically
 * generates action creators and action types based on the provided reducers. I
 * created this to replace the previous counter implementation on the default
 * home page for the React + Vite package that used {@link useState}. I realize
 * that this is way overkill for what it is accomplishing, but I did this as
 * more of a learning exercise in order to understand how to manage state using
 * Redux Toolkit in a more scalable and maintainable way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 *
*/



// #region File Scoped Variables

/**
 * File Scoped Variables
 *
 * @summary
 * These values are all scoped to the ChristmasCard component function,
 * and are meant to be set and shared between the various functions.
 *
*/


// #region State Variables

/** Initial State Number    = This will store the initial value of the couStaNum variable {@link iniStaNum} in the {@link sliOptObj} object's initialState property. This will also be used in the {@link sliOptObj} object as the reducers functions' default value for the state parameter. */
type IniStaNum              = number;
/** @see {@link IniStaNum} */
const iniStaNum : IniStaNum = 0;

// #endregion State Variables

// #region defActObj

/**
 * DefActObj = Default Action Object will store the default properties and values that will be provided to the {@link sliOptObj} object's reducers function {@link incNumRed} and {@link decNumRed} as their default action parameter's value. This action parameter is what replaces the traditional Redux action object that contained the type and payload properties, which was then handled by a switch statement inside of the reducer.
 * 
 * @property type    = Redux Toolkit automatically generates this value via createSlice, often as a namespaced string like 'sliceName/actionName' (e.g., 'couStaNum/incNumRed'), which is used behind the scene in the reducers to match and update state.
 * @property payload = Payload will store the numeric value that will be used to increment or decrement the couStaNum state number value. This value will be provided when dispatching the action wherever it is called,, e.g. incNumRed( 2 ).
 *
*/

type DefActObj = {

    type    : string;
    payload : number;

};

/** @see {@link DefActObj} */
const defActObj : DefActObj = {

    type    : '',
    payload : 0,

};

// #endregion defActObj


// #region sliOptObj

/**
 * SliOptObj = Slice Options Object will store the default properties and values that will be provided to Redux Toolkit's {@link createSlice} function. It abstracts away all of the boilerplate code that is required by Redux (without Toolkit) to handle state management.
 * 
 * @property name         = Name will store the name of the slice, in this case a value of couStaNum, which Redux Toolkit will use to identify this slice and therefore identify these reducers.
 * @property initialState = Initial State will store the value from {@link iniStaNum}, which will be the starting value of the couStaNum state variable.
 * @property reducers     = Reducers will store the two reducer functions, {@link incNumRed} and {@link decNumRed}, that will handle incrementing and decrementing the couStaNum state number value respectively.
 * @property incNumRed    = Increment Number Reducer will handle incrementing the couStaNum state number value by the amount specified in the action.payload property when the action is dispatched.
 * @property decNumRed    = Decrement Number Reducer will handle decrementing the couStaNum state number value by the amount specified in the action.payload property when the action is dispatched.
 *
*/

type SliOptObj = {

    name         : string;
    initialState : IniStaNum;

    reducers : {

        incNumRed : ( state : IniStaNum, action : DefActObj ) => number;
        decNumRed : ( state : IniStaNum, action : DefActObj ) => number;

    };

};

/** @see {@link SliOptObj} */
const sliOptObj : SliOptObj = {

    name         : 'couStaNum',
    initialState : iniStaNum,

    reducers : {

        incNumRed : ( state = iniStaNum, action = defActObj ) => {

            /** Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the couStaNum (starting at 0) and action.payload will contain how much to increment the couStaNum state variable by. */
            return state + action.payload;

        },

        decNumRed : ( state = iniStaNum, action = defActObj ) => {

            /** Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the couStaNum (starting at 0) and action.payload will contain how much to decrement the couStaNum state variable by. */
            return state - action.payload;

        },

    },

};

// #endregion sliOptObj


// #endregion File Scoped Variables



// #region Slice Creation

/** Counter State Number Slice             = This stores the return of Redux Toolkit's core API that automatically generates action creators and reducers for a single "slice" of application's state. It returns a single object that contains the slice name, generated reducer, its corresponding actions, case reducers, and an optional getSelectors function. */
export const couStaNumSlice                = createSlice( sliOptObj );
/** Increment and Decrement Number Reducer = These store the reducer functions that were generated by the above {@link couStaNumSlice} and that were defined in the {@link sliOptObj} object's reducers property. */
export const { incNumRed, decNumRed }      = couStaNumSlice.actions;
/** Counter State Number Reducer           = This stores the parent reducer of this slice and will be what is exported into the store inside of src/store.tsx. It is responsible for handling all actions defined within this specific slice of the Redux store's state. */
const couStaNumReducer                     = couStaNumSlice.reducer;
/** Counter State Number Reducer           = This stores the type of this slice's parent reducer. Although this may seem redundant, exporting the type of the reducer can be useful for type checking and ensuring consistency across the application. */
export type CouStaNumReducer               = typeof couStaNumReducer;

// #region Slice Creation



export default couStaNumReducer;


