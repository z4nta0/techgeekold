
// #region Imports

import { createSlice } from '@reduxjs/toolkit'; /** This import is the standard React Redux Toolkit function that is designed to simplify React Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices, making React Redux easier to set up and use for modern applications. */


import { type ActionCreatorWithPayload } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for a standard React Rdux Toolkit function type that takes a single argument (the payload) and returns a specific action object. */
import { type Reducer                  } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for reducers that are returned from the standard React Redux Toolkit createSlice function. */
import { type Slice                    } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function. */
import { type SliceSelectors           } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function that take the specific slice's state as input (rather than the root state) and return derived data, enabling better type inference and encapsulation of state logic. */

// #endregion Imports



// #region couStaNumSlice


// #region couStaNumSlice Variables

/** Initial State Number    = This custom type stores the type that will be used for the custom {@link iniStaNum} variable. I chose to create this custom type instead of just using 'number' because I wanted to make it clear in the custom {@link SliOptObj} type that what would be stored there would be the value of the initial state. */
type IniStaNum              = number;
/** Initial state Number    = This custom variable stores the initial value of the custom couStaNum state variable in the custom object's standard {@link sliOptObj.initialState} property and is also used in the custom object's standard{@link sliOptObj.reducers} property as the reducers functions' default value for the state parameter. */
const iniStaNum : IniStaNum = 0;



// #region defActObj

/**
 * Default Action Object = This custom type stores the types that will be used for the custom {@link defActObj} object.
 * 
 * @property type    = Type standard property stores the type that will be used for the standard {@link defActObj.type} property.
 * @property payload = Payload standard property stores the type that will be used for the standard {@link defActObj.payload} property.
 *
*/

type DefActObj = {

    type    : string;
    payload : number;

};


/**
 * Default Action Object = This custom object stores the properties that are provided to the standard {@link sliOptObj.reducers} property's reducers functions {@link incNumRed} and {@link decNumRed} as their default action parameter's value.
 * 
 * @property type    = Type standard property stores the string value that React Redux Toolkit automatically generates via the standard React Redux Toolkit {@link createSlice} function, as a namespaced string like 'sliceName/actionName' (e.g., 'couStaNum/incNumRed') which is used behind the scene in the reducers to match and update the corresponding state.
 * @property payload = Payload standard property stores the numeric value that will be used to increment or decrement the custom couStaNum state variable and will be provided when dispatching the action wherever it is called, e.g. incNumRed( 2 ).
 *
*/

const defActObj : DefActObj = {

    type    : '',
    payload : 0,

};

// #endregion defActObj



// #region sliOptObj

/**
 * Slice Options Object = This custom type stores the types that will be used for the custom {@link sliOptObj} object.
 * 
 * @property name         = Name standard property stores the type that will be used for the standard {@link sliOptObj.name} property.
 * @property initialState = Initial State standard property stores the type that will be used for the standard {@link sliOptObj.initialState} property.
 * @property reducers     = Reducers standard property stores the type that will be used for the standard {@link sliOptObj.reducers} property.
 * @property incNumRed    = Increment Number Reducer custom property stores the type that will be used for the custom {@link sliOptObj.reducers.incNumRed} property.
 * @property decNumRed    = Decrement Number Reducer custom property stores the type that will be used for the custom {@link sliOptObj.reducers.decNumRed} property.
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


/**
 * Slice Options Object = This custom object stores the properties that are provided to the standard React Redux Toolkit {@link createSlice} function.
 * 
 * @property name         = Name standard property stores the name of the slice, in this case a value of couStaNum, which React Redux Toolkit will use to identify this slice and its corresponding state and reducers.
 * @property initialState = Initial State standard property stores the value from the custom {@link iniStaNum} variable, which is the starting value of the custom couStaNum state variable.
 * @property reducers     = Reducers standard property stores the two custom reducer functions, {@link incNumRed} and {@link decNumRed}, that handles incrementing and decrementing the custom couStaNum state number value respectively.
 * @property incNumRed    = Increment Number Reducer custom property stores the reducer function that will handle incrementing the custom couStaNum state number value by the amount specified in the standard action object's payload property when the action is dispatched, e.g. incNumRed( 2 ).
 * @property decNumRed    = Decrement Number Reducer custom property stores the reducer function that will handle decrementing the custom couStaNum state number value by the amount specified in the standard action object's payload property when the action is dispatched, e.g. decNumRed( 3 ).
 *
*/

const sliOptObj : SliOptObj = {

    name         : 'couStaNum',
    initialState : iniStaNum,

    reducers : {


        incNumRed : ( state = iniStaNum, action = defActObj ) => {


            /** React Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the custom couStaNum state variable (starting at 0) and the action object's payload property will contain how much to increment the custom couStaNum state variable by. */
            return state + action.payload;


        },



        decNumRed : ( state = iniStaNum, action = defActObj ) => {


            /** React Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the custom couStaNum state variable (starting at 0) and the action object's payload property will contain how much to decrement the custom couStaNum state variable by. */
            return state - action.payload;


        },


    },

};

// #endregion sliOptObj



/** Counter State Number Slice = This custom type stores the type that will be used for the custom {@link couStaNumSlice} variable. */
type CouStaNumSlice            = Slice< number, { incNumRed : ( state : IniStaNum, action : DefActObj ) => number; decNumRed : ( state : IniStaNum, action : DefActObj ) => number; }, string, string, SliceSelectors< number > >;

// #endregion couStaNumSlice Variables



/**
 * couStaNumSlice = Counter State Number Slice
 *
 * @summary
 * This custom variable stores the stores the standard object that is returned by
 * the standard React Redux Toolkit {@link createSlice} function. Said object
 * contains the slice name, generated reducer, its corresponding actions, case
 * reducers, and an optional getSelectors function. Said function is called
 * using the custom {@link sliOptObj} object as its parameter, which defines
 * the slice name, initial state and reducers properties. The reducers property
 * contains the custom reducer functions that handle the incrementing and
 * decrementing of the custom couStaNum state variable. I realize that all of
 * this functionality is complete overkill for what it is accomplishing, but I
 * did this as more of a learning exercise in order to understand how to manage
 * state using React Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

const couStaNumSlice : CouStaNumSlice = createSlice( sliOptObj );

// #endregion couStaNumSlice



// #region incNumRed


// #region incNumRed Variables

/** Increment Number Reducer = This custom type stores the type that will be used for the custom {@link incNumRed} variable. */
type IncNumRed               = ActionCreatorWithPayload< number, `${ string }/incNumRed` >;

// #endregion incNumRed Variables



/**
 * incNumRed = Increment Number Reducer
 *
 * @summary
 * This custom variable stores the custom {@link incNumRed} reducer function
 * that was created in the standard {@link sliOptObj.reducers} property and
 * then generated as the standard {@link couStaNumSlice.actions} property by
 * the standard React Redux Toolkit {@link createSlice} function. This custom
 * variable is exported for use in whatever component has a need to increment
 * the custom couStaNum state variable, like the HomPagCom component's
 * incButEle button for example. I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const incNumRed : IncNumRed = couStaNumSlice.actions.incNumRed;

// #endregion incNumRed



// #region decNumRed


// #region decNumRed Variables

/** Decrement Number Reducer = This custom type stores the type that will be used for the custom {@link decNumRed} variable. */
type DecNumRed               = ActionCreatorWithPayload< number, `${ string }/decNumRed` >;

// #endregion decNumRed Variables



/**
 * decNumRed = Decrement Number Reducer
 *
 * @summary
 * This custom variable stores the custom {@link decNumRed} reducer function
 * that was created in the standard {@link sliOptObj.reducers} property and
 * then generated as the standard {@link couStaNumSlice.actions} property by
 * the standard React Redux Toolkit {@link createSlice} function. This custom
 * variable is exported for use in whatever component has a need to decrement
 * the custom couStaNum state variable, like the HomPagCom component's
 * decButEle button for example. I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const decNumRed : DecNumRed = couStaNumSlice.actions.decNumRed;

// #endregion decNumRed



// #region couStaNumReducer


// #region couStaNumReducer Variables

/** Counter State Number Reducer = This custom type stores the type that will be used for the custom {@link couStaNumReducer} variable and is exported for use in any component that said variable is required. */
export type CouStaNumReducer     = Reducer< number >;

// #endregion couStaNumReducer Variables



/**
 * couStaNumReducer = Counter State Number Reducer
 *
 * @summary
 * This custom variable stores the standard reducer property of the standard
 * object that is returned from the standard React Redux Toolkit
 * {@link createSlice} function and stored inside of the custom
 * {@link couStaNumSlice} variable. This custom variable is the default export
 * of this file, and it will be imported into the site/app's custom React Redux
 * store to be used in the reducer object property that is passed into the
 * standard React Redux Toolkit createStore function. I realize that all of
 * this functionality is complete overkill for what it is accomplishing, but I
 * did this as more of a learning exercise in order to understand how to manage
 * state using React Redux Toolkit in a more scalable and maintainable way.
 *
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

const couStaNumReducer : CouStaNumReducer = couStaNumSlice.reducer;

// #endregion couStaNumReducer



export default couStaNumReducer;


