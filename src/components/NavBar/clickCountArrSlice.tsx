
// #region Imports

import { createSlice } from '@reduxjs/toolkit'; /** This import is the standard React Redux Toolkit function that is designed to simplify React Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices, making React Redux easier to set up and use for modern applications. */


import { type ActionCreatorWithoutPayload } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for a standard React Rdux Toolkit function type that takes no arguments and returns an action object with a specific type string. */
import { type Reducer                     } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for reducers that are returned from the standard React Redux Toolkit createSlice function. */
import { type Slice                       } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function. */
import { type SliceSelectors              } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function that take the specific slice's state as input (rather than the root state) and return derived data, enabling better type inference and encapsulation of state logic. */

// #endregion Imports



// #region cliCouArrSlice


// #region cliCouArrSlice Variables

/** Initial State Array     = This custom type stores the type that will be used for the custom {@link iniStaArr} variable. */
type IniStaArr              = [ number, number ];
/** Initial state Array     = This custom variable stores the initial value of the custom cliCouArr state variable in the custom object's standard {@link sliOptObj.initialState} property and is also used in the custom object's standard {@link sliOptObj.reducers} property as the reducers functions' default value for the state parameter. These values correspond to the click count numbers for the About and Contact page links respectively (About = index 0, and Contact = index 1), which would have been better or easier to store inside of an object like with the cliCouObj for the logo and Home page link click counts, but I wanted to also practice state management and updates using an array. */
const iniStaArr : IniStaArr = [ 0, 0 ];



// #region sliOptObj

/**
 * Slice Options Object = This custom type stores the types that will be used for the custom {@link sliOptObj} object.
 * 
 * @property name         = Name standard property stores the type that will be used for the standard {@link sliOptObj.name} property.
 * @property initialState = Initial State standard property stores the type that will be used for the standard {@link sliOptObj.initialState} property.
 * @property reducers     = Reducers standard property stores the type that will be used for the standard {@link sliOptObj.reducers} property.
 * @property aboCouRed    = Increment Number Reducer custom property stores the type that will be used for the custom {@link sliOptObj.reducers.aboCouRed} property.
 * @property conCouRed    = Decrement Number Reducer custom property stores the type that will be used for the custom {@link sliOptObj.reducers.conCouRed} property.
 *
*/

type SliOptObj = {

    name         : string;
    initialState : IniStaArr;

    reducers     : {

        aboCouRed : ( state : IniStaArr ) => void;
        conCouRed : ( state : IniStaArr ) => void;

    };

};


/**
 * Slice Options Object = This custom object stores the properties that are provided to the standard React Redux Toolkit {@link createSlice} function.
 * 
 * @property name         = Name standard property stores the name of the slice, in this case a value of cliCouArr, which React Redux Toolkit will use to identify this slice and its corresponding state and reducers.
 * @property initialState = Initial State standard property stores the value from the custom {@link iniStaArr} variable, which are the starting values of the custom cliCouArr state array variable.
 * @property reducers     = Reducers standard property stores the two custom reducer functions, {@link aboCouRed} and {@link conCouRed}, that handles incrementing the custom cliCouArr state values respectively ([ aboCouNum, conCouNum ]).
 * @property aboCouRed    = About Count Reducer custom property stores the reducer function that will handle incrementing index zero of the custom cliCouArr state array value by 1 when the action is dispatched.
 * @property conCouRed    = Contact Count Reducer custom property stores the reducer function that will handle incrementing index one of the custom cliCouArr state array value by 1 when the action is dispatched.
 *
*/

const sliOptObj : SliOptObj = {

    name         : 'cliCouArr',
    initialState : iniStaArr,

    reducers : {


        aboCouRed   : ( state = iniStaArr ) => {


            /** React Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the custom cliCouArr state variable (starting at [ 0, 0 ]). */
            /** The indexes must be handled carefully to ensure the correct count is incremented. I realize that is a hacky way to do this, but this is just for personal learning purposes anyways. */
            state[0] = state[0] + 1;


        },



        conCouRed : ( state = iniStaArr ) => {


            /** React Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the custom cliCouArr state variable (starting at [ 0, 0 ]). */
            /** The indexes must be handled carefully to ensure the correct count is incremented. I realize that is a hacky way to do this, but this is just for personal learning purposes anyways. */
            state[1] = state[1] + 1;


        },


    },

};

// #endregion sliOptObj


/** Click Count Array Slice = This custom type stores the type that will be used for the custom {@link cliCouArrSlice} variable. */
type CliCouArrSlice         = Slice< IniStaArr, { aboCouRed : ( state : IniStaArr ) => void; conCouRed : ( state : IniStaArr ) => void; }, string, string, SliceSelectors< IniStaArr > >;

// #endregion cliCouArrSlice Variables



/**
 * cliCouArrSlice = Click Count Array Slice
 *
 * @summary
 * This custom variable stores the stores the standard object that is returned by
 * the standard React Redux Toolkit {@link createSlice} function. Said object
 * contains the slice name, generated reducer, its corresponding actions, case
 * reducers, and an optional getSelectors function. Said function is called
 * using the custom {@link sliOptObj} object as its parameter, which defines
 * the slice name, initial state and reducers properties. The reducers property
 * contains the custom reducer functions that handle incrementing the indexes
 * of the custom cliCouArr state variable (About page count = index zero,
 * Contact page count = index one). I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

const cliCouArrSlice : CliCouArrSlice = createSlice( sliOptObj );

// #endregion cliCouArrSlice



// #region aboCouRed


// #region aboCouRed Variables

/** About Count Reducer = This custom type stores the type that will be used for the custom {@link aboCouRed} variable. */
type AboCouRed          = ActionCreatorWithoutPayload< `${ string }/aboCouRed` >;

// #endregion aboCouRed Variables



/**
 * aboCouRed = About Count Reducer
 *
 * @summary
 * This custom variable stores the custom {@link aboCouRed} reducer function
 * that was created in the standard {@link sliOptObj.reducers} property and
 * then generated as the standard {@link cliCouArrSlice.actions} property by
 * the standard React Redux Toolkit {@link createSlice} function. This custom
 * variable is exported for use in whatever component has a need to increment
 * the custom cliCouArr[0] state variable, like the NavBarCom component's
 * aboNavEle NavLink for example. I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const aboCouRed : AboCouRed = cliCouArrSlice.actions.aboCouRed;

// #endregion aboCouRed



// #region conCouRed


// #region conCouRed Variables

/** Contact Count Reducer = This custom type stores the type that will be used for the custom {@link conCouRed} variable. */
type ConCouRed            = ActionCreatorWithoutPayload< `${ string }/conCouRed` >;

// #endregion conCouRed Variables



/**
 * conCouRed = Contact Count Reducer
 *
 * @summary
 * This custom variable stores the custom {@link conCouRed} reducer function
 * that was created in the standard {@link sliOptObj.reducers} property and
 * then generated as the standard {@link cliCouArrSlice.actions} property by
 * the standard React Redux Toolkit {@link createSlice} function. This custom
 * variable is exported for use in whatever component has a need to increment
 * the custom cliCouArr[1] state variable, like the NavBarCom component's
 * conNavEle NavLink for example. I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const conCouRed : ConCouRed = cliCouArrSlice.actions.conCouRed;

// #endregion conCouRed



// #region cliCouArrReducer


// #region cliCouArrReducer Variables

/** Click Count Array Reducer = This custom type stores the type that will be used for the custom {@link cliCouArrReducer} variable and is exported for use in any component that said variable is required. */
export type CliCouArrReducer  = Reducer< IniStaArr >;

// #endregion cliCouArrReducer Variables



/**
 * cliCouArrReducer = Click Count Array Reducer
 *
 * @summary
 * This custom variable stores the standard reducer property of the standard
 * object that is returned from the standard React Redux Toolkit
 * {@link createSlice} function and stored inside of the custom
 * {@link cliCouArrSlice} variable. This custom variable is the default export
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

const cliCouArrReducer : CliCouArrReducer = cliCouArrSlice.reducer;

// #endregion cliCouArrReducer



export default cliCouArrReducer;


