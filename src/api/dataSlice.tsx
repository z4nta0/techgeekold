
// #region Imports

import { type ActionReducerMapBuilder } from "@reduxjs/toolkit"; /** This is the standard Typescript definition that is needed for typing the builder parameter in the extraReducers function. */
import { type AsyncThunk              } from "@reduxjs/toolkit"; /** This is the standard Typescript definition that is needed for typing the return value of Redux Toolkit's createAsyncThunk function. */
import { type AsyncThunkConfig        } from "@reduxjs/toolkit"; /** This is the standard Typescript definition that is needed for typing the third argument for Redux Toolkit's createAsyncThunk function. */
import { createAsyncThunk             } from "@reduxjs/toolkit"; /** This is the standard Reux Toolkit function that is used to create asynchronous thunk actions for handling side effects like API calls. */
import { createSlice                  } from '@reduxjs/toolkit'; /** This is the toolset for Redux that is designed to simplify Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices. This makes Redux easier to set up and use for modern applications. */

// #endregion Imports



/**
 * dataSlice = Data Slice
 *
 * @summary
 * This file creates a Redux slice for managing a mock API call, retrieving
 * data from a local file rather than an actual API. It defines the initial
 * state of the mocDatJso and instead of providing reducer functions like the
 * other slices for this site/app, it uses the builder method to create cases
 * for handling the different states of the API call (pending, fulfilled,
 * rejected). Other than needing to define a {@link createAsyncThunk} function
 * to actually fetch the data it works much the same as the other slices, with
 * the slice being created using Redux Toolkit's {@link createSlice} method,
 * which automatically generates action creators and action types. I realize
 * that this is way overkill for what it is accomplishing, but I did this as
 * more of a learning exercise in order to understand how to manage state using
 * Redux Toolkit in a more scalable and maintainable way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 *
*/



// #region payCreFun


// #region Function Type Definitions

/** Payload Creator Function = This will store the function that performs the asynchronous operation to fetch the backend mock data, and it will be passed as the second argument to Redux Toolkit's {@link createAsyncThunk} function. */
type PayCreFun               = () => Promise< MocDatJso >;

// #endregion Function Type Definitions


// #region Function Body

/**
 * payCreFun = Payload Creator Function
 *
 * @summary
 * This function serves as the payload creator (second argument) for Redux
 * Toolkit's {@link createAsyncThunk} function that will be used in order to
 * fetch the mock backend data from a local JSON file. It will use the standard
 * fetch API to make the request and will then use the standard JSON method to
 * parse the response, which will then be returned as the payload for the
 * fulfilled action that is dispatched by the thunk. REMINDER: No try-catch
 * blocks are required because Redux Toolkit is designed to automatically
 * handle promise rejections internally and dispatch the appropriate rejected
 * action.
 *
 * @author z4ntao <https://github.com/z4nta0>
 *
 * @param void - This function takes no parameters.
 *
 * @returns A standard JSON object that mirrors the structure of the mock backend data.
 * @see {@link MocDatJso}
 *
 * @example
 * ```ts
 * payCreFun() // => { "message" : "Hello from the mock backend!" }
 * ```
 *
*/

const payCreFun : PayCreFun = async () => {


    /** Fetch Response Object   = This will store the return of the fetch function's API call to the mock backend data.json file. */
    type FetResObj              = Awaited< Promise< Response > >;
    /** @see {@link FetResObj} */
    const fetResObj : FetResObj = await fetch( '../../mock-backend/data.json' );
    /** JSON Data Object        = This will store the parsed JSON data from the previously defined fetch response object, which will mirror the structure of the {@link MocDatJso} type. */
    const jsoDatObj : MocDatJso = await fetResObj.json();


    /** Return the result of the previously defined JSON data object. */
    return jsoDatObj;


};

// #endregion Function Body


// #endregion payCreFun



// #region getMocDatJso

/** Options Object    = This will store the options parameter value for the Redux Toolkit {@link createAsyncThunk} function, in this case none of the options are required so it will be an empty object. */
type OptObj           = {};
/** @see {@link OptObj} */
const optObj : OptObj = {};
/** Type String       = This will store the type parameter for the Redux Toolkit {@link createAsyncThunk} function, it will be used to generate additional Redux action type constants that represent the lifecycle of an async request (pending, fulfilled and rejected). */
type TypStr           = string;
/** @see {@link TypStr} */
const typStr : TypStr = 'mocDatJso/getMocDatJso';

/**  Get Mock Data JSON                  = This will store the return of Redux Toolkit's {@link createAsyncThunk} function. I am not going to pretend that I understand all of the defined types here (even after reading the documentation =P), but the only part that matters for this particular use case is the first type parameter {@link MocDatJso} which represents the mock backend's data structure. */
type GetMocDatJso                        = AsyncThunk< MocDatJso, undefined, AsyncThunkConfig >;
/** @see {@link GetMocDatJso} */
export const getMocDatJso : GetMocDatJso = createAsyncThunk( typStr, payCreFun, optObj );

// #endregion getMocDatJso



// #region State & Action Variables

/** Initial Data Object   = This stores the initial state of the mock data string, and it mirrors the structure of the actual mock back end data that will be returned as {@link MocDatJso}. */
const iniDatObj           = { mocDatStr : 'Fetching data from API...', };
/** Mock Data JSON Object = This will store the structure of the mock backend data that will be returned as JSON from {@link payCreFun} via {@link getMocDatJso}. */
type MocDatJso            = { mocDatStr : string; };
/** Reducer Action Object = This will storee the structure of the Redux Toolkit action object that is used a parameter for the fulfilled case reducer. @property payload = This will contain the {@link MocDatJso} object that is returned from the mock back end. Payload is a standard return property of a call to Redux Toolkit's {@link createAsyncThunk}. */
type RedActObj            = { payload : MocDatJso; };


// #region iniStaObj

/**
 * IniStaObj = Initial State Object will store the state's initial properties and values that will be provided to the {@link sliOptObj} object.
 * 
 * @property mocDatObj = Mock Data Object will store the mock data object {@link iniDatObj}, which is a placeholder for the {@link MocDatJso} object that will be fetched from the mock backend inside of {@link payCreFun} via {@link getMocDatJso}. This data will then be used to update the state's mocDatJso.mocDatObj property inside of the fulfilled case reducer if said function calls were successful.
 * @property curLoaBoo = Currently Loading Boolean will indicate whether the call to {@link getMocDatJso} are currently in progress. This property can then be used inside of any components that require the {@link MocDatJso} object to display loading indicators or disable user interactions during the data fetching process.
 * @property encErrBoo = Encountered Error Boolean will indicate whether there was an error from the call to {@link getMocDatJso}. This property can then be used inside of any components that require the {@link MocDatJso} object to display error messages or take appropriate actions when an error occurs during the data fetching process.
 *
*/

type IniStaObj = {

    mocDatObj : MocDatJso;
    curLoaBoo : boolean;
    encErrBoo : boolean;

};

/** @see {@link IniStaObj} */
const iniStaObj : IniStaObj = {

    mocDatObj : iniDatObj,
    curLoaBoo : false,
    encErrBoo : false,

};

// #endregion iniStaObj


// #endregion State & Action Variables



// #region Slice Variables


// #region sliOptObj

/**
 * SliOptObj = Slice Options Object will store the default properties and values that will be provided to Redux Toolkit's {@link createSlice} function. It abstracts away all of the boilerplate code that is required by Redux (without Toolkit) to handle state management.
 * 
 * @property name          = Name will store the name of the slice, in this case a value of mocDatJso, which Redux Toolkit will use to identify this slice and therefore identify these reducers.
 * @property initialState  = Initial State will store the value from {@link iniStaObj}, which will be the starting values of the mocDatJso state variable.
 * @property reducers      = Reducers will not store anything for this slice, instead it will use the below extraReducers property in combination with the builder method to define how to create reducers for this slice.
 * @property extraReducers = Extra Reducers will store a function that takes the builder parameter and uses it to define cases for handling the different states of the API call (pending, fulfilled and rejected) that is made by the {@link getMocDatJso} thunk action. This is where the state updates will be handled based on the lifecycle of the async request. The builder pattern is the standard, type safe approach that replaces traditional switch statements in Redux reducers and is particularly useful for handling actions that are not defined within the current slice, such as those generated by createAsyncThunk or actions from other slices.
 *
*/

type SliOptObj = {

    name         : string;
    initialState : IniStaObj;
    reducers     : {};

    extraReducers : ( builder : ActionReducerMapBuilder< IniStaObj > ) => void;

};

/** @see {@link SliOptObj} */
const sliOptObj : SliOptObj = {

  name         : 'mocDatJso',
  initialState : iniStaObj,
  reducers     : {},

  extraReducers : ( builder ) => {

        builder

            .addCase( getMocDatJso.pending, ( state : IniStaObj ) => {

                state.curLoaBoo = true;
                state.encErrBoo = false;

            })

            .addCase( getMocDatJso.fulfilled, ( state : IniStaObj, action : RedActObj ) => {

                state.curLoaBoo = false;
                state.encErrBoo = false;
                state.mocDatObj = action.payload;

            })

            .addCase( getMocDatJso.rejected, ( state : IniStaObj ) => {

                state.curLoaBoo = false;
                state.encErrBoo = true;

            });

  },

};

// #endregion Slice Variables


// #endregion sliOptObj



// #region Slice Creation

/** Mock Data JSON Slice     = This stores the return of Redux Toolkit's core API that automatically generates action creators and reducers for a single slice of application's state. It returns a single object that contains the slice name, generated reducer, its corresponding actions, case reducers, and an optional getSelectors function. */
export const mocDatJsoSlice  = createSlice(sliOptObj);
/** Mock Data JSON Reducer   = This stores the parent reducer of this slice and will be what is exported into the store inside of src/store.tsx, and it is responsible for handling all actions defined within this specific slice of the Redux store's state. */
const mocDatJsoReducer       = mocDatJsoSlice.reducer;
/** Mock Data JSON Reducer   = This stores the type of this slice's parent reducer. Although this may seem redundant, exporting the type of the reducer can be useful for type checking and ensuring consistency across the application. */
export type MocDatJsoReducer = typeof mocDatJsoReducer;

// #endregion Slice Creation



export default mocDatJsoReducer;


