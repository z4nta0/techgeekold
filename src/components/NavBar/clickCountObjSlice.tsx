
// #region Imports

import { createSlice } from '@reduxjs/toolkit'; /** This import is the standard React Redux Toolkit function that is designed to simplify React Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices, making React Redux easier to set up and use for modern applications. */


import { type ActionCreatorWithoutPayload } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for a standard React Rdux Toolkit function type that takes no arguments and returns an action object with a specific type string. */
import { type Reducer                     } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for reducers that are returned from the standard React Redux Toolkit createSlice function. */
import { type Slice                       } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function. */
import { type SliceSelectors              } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function that take the specific slice's state as input (rather than the root state) and return derived data, enabling better type inference and encapsulation of state logic. */

// #endregion Imports



// #region cliCouObjSlice


// #region cliCouObjSlice Variables


// #region iniStaObj

/**
 * Initial State Object = This custom type stores the types that will be used for the custom {@link iniStaObj} object.
 * 
 * @property logCouNum = Logo Count Number custom property stores the type that will be used for the custom {@link iniStaObj.logCouNum} property.
 * @property homCouNum = Home Count Number custom property stores the type that will be used for the custom {@link iniStaObj.homCouNum} property.
 *
*/

interface IniStaObj {

    logCouNum : number;
    homCouNum : number;

};


/**
 * Initial State Object = This custom object stores the state's initial properties that will be provided to the custom {@link sliOptObj} object.
 * 
 * @property logCouNum = Logo Count Number custom property stores the initial value of the custom cliCouObj.logCouNum state variable, that tracks the number of times that the NavBarCom component's logo Home page link has been clicked.
 * @property homCouNum = Home Count Number custom property stores the initial value of the custom cliCouObj.homCouNum state variable, that tracks the number of times that the NavBarCom component's Home page link has been clicked.
 *
*/

const iniStaObj : IniStaObj = {

    logCouNum : 0,
    homCouNum : 0,

};

// #endregion iniStaObj



// #region sliOptObj

/**
 * Slice Options Object = This custom type stores the types that will be used for the custom {@link sliOptObj} object.
 * 
 * @property name         = Name standard property stores the type that will be used for the standard {@link sliOptObj.name} property.
 * @property initialState = Initial State standard property stores the type that will be used for the standard {@link sliOptObj.initialState} property.
 * @property reducers     = Reducers standard property stores the type that will be used for the standard {@link sliOptObj.reducers} property.
 * @property logCouRed    = Logo Count Reducer custom property stores the type that will be used for the custom {@link sliOptObj.reducers.logCouRed} property.
 * @property homCouRed    = Home Count Reducer custom property stores the type that will be used for the custom {@link sliOptObj.reducers.homCouRed} property.
 *
*/

type SliOptObj = {

    name         : string;
    initialState : IniStaObj;

    reducers     : {

        logCouRed : ( state : IniStaObj ) => void;
        homCouRed : ( state : IniStaObj ) => void;

    };

};


/**
 * Slice Options Object = This custom object stores the properties that are provided to the standard React Redux Toolkit {@link createSlice} function.
 * 
 * @property name         = Name standard property stores the name of the slice, in this case a value of cliCouObj, which React Redux Toolkit will use to identify this slice and its corresponding state and reducers.
 * @property initialState = Initial State standard property stores the value from the custom {@link iniStaObj} variable, which are the starting values of the custom cliCouObj state object.
 * @property reducers     = Reducers standard property stores the two custom reducer functions, {@link logCouRed} and {@link homCouRed}, that handles incrementing the custom cliCouObj state values respectively ({ logCouNum, homCouNum }).
 * @property logCouRed    = Logo Count Reducer custom property stores the reducer function that will handle incrementing the logCouNum property of the custom cliCouObj state object by 1 when the action is dispatched.
 * @property homCouRed    = Home Count Reducer custom property stores the reducer function that will handle incrementing the homCouNum property of the custom cliCouObj state object by 1 when the action is dispatched.
 *
*/

const sliOptObj : SliOptObj = {

    name         : 'cliCouObj',
    initialState : iniStaObj,

    reducers : {


        logCouRed   : ( state = iniStaObj ) => {


            /** React Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the custom iniStaObj.logCouNum state variable (starting at 0). */
            state.logCouNum = state.logCouNum + 1;


        },



        homCouRed : ( state = iniStaObj ) => {


            /** React Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. */
            /** State will contain the current state value of the custom iniStaObj.homCouNum state variable (starting at 0). */
            state.homCouNum = state.homCouNum + 1;


        },


    },

};

// #endregion sliOptObj



/** Click Count Object Slice = This custom type stores the type that will be used for the custom {@link cliCouObjSlice} variable. */
type CliCouObjSlice          = Slice< IniStaObj, { logCouRed : ( state : IniStaObj ) => void; homCouRed : ( state : IniStaObj ) => void; }, string, string, SliceSelectors< IniStaObj > >;

// #endregion cliCouObjSlice Variables



/**
 * cliCouObjSlice = Click Count Object Slice
 *
 * @summary
 * This custom variable stores the stores the standard object that is returned by
 * the standard React Redux Toolkit {@link createSlice} function. Said object
 * contains the slice name, generated reducer, its corresponding actions, case
 * reducers, and an optional getSelectors function. Said function is called
 * using the custom {@link sliOptObj} object as its parameter, which defines
 * the slice name, initial state and reducers properties. The reducers property
 * contains the custom reducer functions that handle incrementing the
 * properties of the custom cliCouObj state variable (Logo count =
 * logCouNum, Home count = homCouNum). I realize that all of this functionality
 * is complete overkill for what it is accomplishing, but I did this as more of
 * a learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

const cliCouObjSlice : CliCouObjSlice = createSlice( sliOptObj );

// #endregion cliCouObjSlice



// #region logCouRed


// #region logCouRed Variables

/** Logo Count Reducer = This custom type stores the type that will be used for the custom {@link logCouRed} variable. */
type LogCouRed         = ActionCreatorWithoutPayload< `${ string }/logCouRed` >;

// #endregion logCouRed Variables



/**
 * logCouRed = Logo Count Reducer
 *
 * @summary
 * This custom variable stores the custom {@link logCouRed} reducer function
 * that was created in the standard {@link sliOptObj.reducers} property and
 * then generated as the standard {@link cliCouObjSlice.actions} property by
 * the standard React Redux Toolkit {@link createSlice} function. This custom
 * variable is exported for use in whatever component has a need to increment
 * the custom cliCouObj.logCouNum state variable, like the NavBarCom
 * component's logNavEle NavLink for example. I realize that all of this
 * functionality is complete overkill for what it is accomplishing, but I did
 * this as more of a learning exercise in order to understand how to manage
 * state using React Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const logCouRed : LogCouRed = cliCouObjSlice.actions.logCouRed;

// #endregion logCouRed



// #region homCouRed


// #region homCouRed Variables

/** Home Count Reducer = This custom type stores the type that will be used for the custom {@link homCouRed} variable. */
type HomCouRed         = ActionCreatorWithoutPayload< `${ string }/homCouRed` >;

// #endregion homCouRed Variables



/**
 * homCouRed = Home Count Reducer
 *
 * @summary
 * This custom variable stores the custom {@link homCouRed} reducer function
 * that was created in the standard {@link sliOptObj.reducers} property and
 * then generated as the standard {@link cliCouArrSlice.actions} property by
 * the standard React Redux Toolkit {@link createSlice} function. This custom
 * variable is exported for use in whatever component has a need to increment
 * the custom cliCouObj.homCouNum state variable, like the NavBarCom
 * component's homNavEle NavLink for example. I realize that all of this
 * functionality is complete overkill for what it is accomplishing, but I did
 * this as more of a learning exercise in order to understand how to manage
 * state using React Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const homCouRed : HomCouRed = cliCouObjSlice.actions.homCouRed;

// #endregion homCouRed



// #region cliCouObjReducer


// #region cliCouObjReducer Variables

/** Click Count Object Reducer = This custom type stores the type that will be used for the custom {@link cliCouObjReducer} variable and is exported for use in any component that said variable is required. */
export type CliCouObjReducer   = Reducer< IniStaObj >;

// #endregion cliCouObjReducer Variables



/**
 * cliCouObjReducer = Click Count Object Reducer
 *
 * @summary
 * This custom variable stores the standard reducer property of the standard
 * object that is returned from the standard React Redux Toolkit
 * {@link createSlice} function and stored inside of the custom
 * {@link cliCouObjSlice} variable. This custom variable is the default export
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

const cliCouObjReducer : CliCouObjReducer = cliCouObjSlice.reducer;

// #endregion cliCouObjReducer



export default cliCouObjReducer;


