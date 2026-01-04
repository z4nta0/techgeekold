
// #region Imports

import { createSlice } from '@reduxjs/toolkit'; /** This is the toolset for Redux that is designed to simplify Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices. This makes Redux easier to set up and use for modern applications. */

// #endregion Imports



/**
 * clickCountObjSlice = Click Count Object Slice File
 *
 * @summary
 * This file creates a Redux slice for managing a simple counter state. It
 * defines the initial state of the cliCouObj and provides two reducer
 * functions, {@link logCouRed} and {@link homCouRed}, which allow for
 * increasing their respective cliCouObj values by 1 every time one of their
 * navigation bar links are clicked. The slice is created using Redux Toolkit's
 * {@link createSlice} method, which automatically generates action creators
 * and action types based on the provided reducers. All of this is completely
 * unnecessary of course, but this was just for personal learning purposes to
 * gain some experience with using Redux Toolkit alongside React and TypeScript
 * while following along with tutorials before moving on to my next project
 * that will use these concepts in a more practical, realistic way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 *
*/



// #region State Variables


// #region iniStaObj

/**
 * IniStaObj = Initial State Object will store the state's initial properties and values that will be provided to the {@link sliOptObj} object.
 * 
 * @property logCouNum = Logo Count Number will store the number of times that the navigation bar's logo Home page link has been clicked.
 * @property homCouNum = Home Count Number will store the number of times that the navigation bar's Home page link has been clicked.
 *
*/

interface IniStaObj {

    logCouNum : number;
    homCouNum : number;

};

/** @see {@link IniStaObj} */
const iniStaObj : IniStaObj = {

    logCouNum : 0,
    homCouNum : 0,

};

// #endregion State Variables



// #region Slice Variables


// #region sliOptObj

/**
 * SliOptObj = Slice Options Object will store the default properties and values that will be provided to Redux Toolkit's {@link createSlice} function. It abstracts away all of the boilerplate code that is required by Redux (without Toolkit) to handle state management.
 * 
 * @property name         = Name will store the name of the slice, in this case a value of cliCouObj, which Redux Toolkit will use to identify this slice and therefore identify these reducers.
 * @property initialState = Initial State will store the value from {@link iniStaObj}, which will be the starting values of the cliCouObj state variable.
 * @property reducers     = Reducers will store the two reducer functions, {@link logCouRed} and {@link homCouRed}, that will handle incrementing the {@link iniStaObj.logCouNum} and {@link iniStaObj.homCouNum} values respectively.
 * @property logCouRed    = Increment Number Reducer will handle incrementing the {@link cliCouObj.logCouNum} (Logo page count) state number value by 1 each time the navigation bar's logo Home page link is clicked.
 * @property homCouRed    = Increment Number Reducer will handle incrementing the {@link cliCouObj.homCouNum} (Home page count) state number value by 1 each time the navigation bar's Home page link is clicked.
 *
*/

interface SliOptObj {

    name         : string;
    initialState : IniStaObj;

    reducers     : {

        logCouRed : ( state : IniStaObj ) => void;
        homCouRed : ( state : IniStaObj ) => void;

    };

};

/** @see {@link SliOptObj} */
const sliOptObj : SliOptObj = {

    name         : 'cliCouObj',
    initialState : iniStaObj,

    reducers     : {

        logCouRed : ( state = iniStaObj ) => {

            /** Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. This also means that the state variable does not need to be returned (as long as it is a complex variable like an object or array, and not just a plain variable). */
            state.logCouNum = state.logCouNum + 1;

        },

        homCouRed : ( state = iniStaObj ) => {

            /** Redux Toolkit abstracts away the need to manually handle immutable state updates by using Immer under the hood. This also means that the state variable does not need to be returned (as long as it is a complex variable like an object or array, and not just a plain variable). */
            state.homCouNum = state.homCouNum + 1;

        },

    },

};

// #endregion Slice Variables



// #region Slice Creation


/** Click Count Object Slice          = This stores the return of Redux Toolkit's core API that automatically generates action creators and reducers for a single slice of application's state. It returns a single object that contains the slice name, generated reducer, its corresponding actions, case reducers, and an optional getSelectors function. */
export const cliCouObjSlice           = createSlice( sliOptObj );
/** Logo and Home Count Reducer       = These store the reducer functions that were generated by the above {@link cliCouObjSlice} and that were defined in the {@link sliOptObj} object's reducers property. */
export const { logCouRed, homCouRed } = cliCouObjSlice.actions;
/** Click Count Object Reducer        = This stores the parent reducer of this slice and will be what is exported into the store inside of src/store.tsx. It is responsible for handling all actions defined within this specific slice of the Redux store's state. */
const cliCouObjReducer                = cliCouObjSlice.reducer;
/** Click Count Object Reducer        = This stores the type of this slice's parent reducer. Although this may seem redundant, exporting the type of the reducer can be useful for type checking and ensuring consistency across the application. */
export type CliCouObjReducer          = typeof cliCouObjReducer;

// #region Slice Creation



export default cliCouObjReducer;


