
// #region Imports

import { createAsyncThunk } from '@reduxjs/toolkit'; /** This import is the standard React Redux Toolkit function that is used to create asynchronous thunk actions for handling specific side effects like API calls. */
import { createSlice      } from '@reduxjs/toolkit'; /** This import is the standard React Redux Toolkit function that is designed to simplify React Redux logic, reduce boilerplate and streamline state management by bundling essential utilities and best practices, making React Redux easier to set up and use for modern applications. */


import { type ActionReducerMapBuilder } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the builder object used in the standard React Redux Toolkit's createReducer, createSlice and extraReducers functions. */
import { type AsyncThunk              } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for a type safe wrapper for defining asynchronous operations (thunks) that dispatch custom React Redux Toolkit actions. */
import { type AsyncThunkConfig        } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for an internal interface within the standard React Redux Toolkit createAsyncThunk function that defines the shape of the third generic argument, which is a configuration object for the thunk's API. */
import { type Reducer                 } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for reducers that are returned from the standard React Redux Toolkit createSlice function. */
import { type Slice                   } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function. */
import { type SliceSelectors          } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for the standard React Redux Toolkit createSlice function that take the specific slice's state as input (rather than the root state) and return derived data, enabling better type inference and encapsulation of state logic. */

// #endregion Imports



// #region payCreFun


// #region Function Type Definitions

/** Payload Creator Function = This custom type stores the type that will be used for the custom {@link payCreFun} function. */
type PayCreFun               = () => Promise< MocDatJso >;

// #endregion Function Type Definitions



/**
 * payCreFun = Payload Creator Function
 *
 * @summary
 * This custom function executes the asynchronous API call to the mock backend
 * and will be provided as the payload creator parameter for the standard React
 * Redux Toolkit {@link createAsyncThunk} function. It will use the standard JS
 * Fetch API to make the request and will then use the standard JS Fetch API's
 * JSON method to parse the response, which will then be returned as the
 * payload for the fulfilled action that is dispatched by the thunk. REMINDER:
 * No try-catch blocks are required because React Redux Toolkit is designed to
 * automatically handle promise rejections internally and dispatch the
 * appropriate rejected action. I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param void - This function takes no parameters.
 *
 * @returns A standard JSON object that mirrors the structure of the mock backend data JSON.
 * @see {@link MocDatJso}
 *
 * @example
 * ```ts
 * payCreFun() // => jsoDatObj;
 * ```
 *
*/

const payCreFun : PayCreFun = async () => {


    /** Fetch Response Object   = This custom type stores the standard return type that will be returned by the standard JS Fetch API call to the mock backend data.json file. */
    type FetResObj              = Awaited< Promise< Response > >;
    /** Fetch Response Object   = This custom variable stores the standard Response object that is returned from the standard JS Fetch API call, in this case it is a call to the mock backend data.json file. */
    const fetResObj : FetResObj = await fetch( '../../mock-backend/data.json' );
    /** JSON Data Object        = This custom JSON object stores the parsed JSON data from the previously defined fetch response object, which will mirror the structure of the custom {@link MocDatJso} type. */
    const jsoDatObj : MocDatJso = await fetResObj.json();



    return jsoDatObj;


};

// #endregion payCreFun



// #region getMocDatJso


// #region getMocDatJso Variables

/** Get Mock Data JSON  = This custom type stores the type that will be used for the custom {@link getMocDatJso} variable. */
type GetMocDatJso       = AsyncThunk< MocDatJso, undefined, AsyncThunkConfig >;
/** Options Object      = This custom type stores the types that will be used for the custom {@link optObj} object. */
type OptObj             = {};
/** Options Object      = This custom object stores the properties for the standard options object parameter that is used in the standard React Redux Toolkit {@link createAsyncThunk} function, in this case none of the options are required so it will be an empty object. */
const optObj : OptObj   = {};
/** Type String         = This custom type stores the type that will be used for the custom {@link typStr} variable. */
type TypStr             = string;
/** Type string         = This custom variable stores the string for the standard type parameter that is used in the standard React Redux Toolkit {@link createAsyncThunk} function, which is used to generate additional React Redux action type constants that represent the lifecycle of an async request (pending, fulfilled and rejected). */
const typStr : TypStr   = 'mocDatJso/getMocDatJso';

// #endregion getMocDatJso Variables



/**
 * getMocDatJso = Get Mock Data JSON
 *
 * @summary
 * This custom variable stores the stores the standard React Redux Toolkit
 * thunk action creator function that is returned from the standard React Redux
 * Toolkit {@link createAsyncThunk} function. Said function is used in the
 * custom {@link sliOptObj} object's standard {@link sliOptObj.extraReducers}
 * property via the builder method to generate cases for the handling of the
 * async thunk actions of pending, fulfilled, and rejected. The thunk action
 * creator function handles the dispatching of the pending, fulfilled, and
 * rejected actions automatically based on the lifecycle of the async request.
 * This custom variable is exported for use in whatever component has a need to
 * retrieve the custom mocDatJso state variable, like the HomPagCom component's
 * datParEle paragraph for example. I realize that all of this functionality is
 * complete overkill for what it is accomplishing, but I did this as more of a
 * learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createAsyncThunk>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

export const getMocDatJso : GetMocDatJso = createAsyncThunk( typStr, payCreFun, optObj );

// #endregion getMocDatJso



// #region mocDatJsoSlice


// #region mocDatJsoSlice Variables

/** Initial Data Object   = This custom variable stores the initial state of the mock data string and will be used as the value for the {@link iniStaObj.mocDatObj} property. */
const iniDatObj           = { mocDatStr : 'Fetching data from API...', };
/** Mock Data JSON Object = This custom type stores the type that will be used for the custom {@link IniStaObj.mocDatObj} property. */
type MocDatJso            = { mocDatStr : string; };



// #region iniStaObj

/**
 * Initial State Object = This custom type stores the types that will be used for the custom {@link iniStaObj} object.
 * 
 * @property curLoaBoo = Currently Loading Boolean custom property stores the type that will be used for the custom {@link iniStaObj.curLoaBoo} property.
 * @property encErrBoo = Encountered Error Boolean custom property stores the type that will be used for the custom {@link iniStaObj.encErrBoo} property.
 * @property mocDatObj = Mock Data Object custom property stores the type that will be used for the custom {@link iniStaObj.mocDatObj} property.
 *
 *
*/

type IniStaObj = {

    curLoaBoo : boolean;
    encErrBoo : boolean;
    mocDatObj : MocDatJso;

};


/**
 * Initial State Object = This custom object stores the properties that are provided to the custom {@link sliOptObj} object and represents the initial state for this slice.
 * 
 * @property curLoaBoo = Currently Loading Boolean custom property stores the intial boolean value for the currently loading status of the call to the custom {@link getMocDatJso} function. This property can then be used inside of any components that require mock backend data JSON object in order to display loading indicators or disable user interactions during the data fetching process.
 * @property encErrBoo = Encountered Error Boolean custom property stores the initial boolean value for the encountered error status of the call to the custom {@link getMocDatJso} function. This property can then be used inside of any components that require the mock backend data JSON object to display error messages or take appropriate actions when an error occurs during the data fetching process.
 * @property mocDatObj = Mock Data Object custom property stores the custom {@link iniDatObj} object, which is a placeholder for the mock backend data JSON object that will be fetched via the custom {@link getMocDatJso} function's calls to the custom {@link payCreFun} function.
 *
 *
*/

const iniStaObj : IniStaObj = {

    curLoaBoo : false,
    encErrBoo : false,
    mocDatObj : iniDatObj,

};

// #endregion iniStaObj



// #region RedActObj

/**
 * Reducer Action Object = This custom type stores the properties of the standard React Redux Toolkit action object that will be provided as a parameter for the custom {@link sliOptObj.extraReducers} property's fulfilled case reducer.
 * 
 * @property payload = This custom type stores the type of the standard React Redux Toolkit action object that will mirror the structure of the custom {@link MocDatJso} type.
 * 
 */

type RedActObj = {

    payload : MocDatJso;

};

// #endregion RedActObj



// #region sliOptObj

/**
 * Slice Options Object = This custom type stores the types that will be used for the custom {@link sliOptObj} object.
 * 
 * @property name          = Name will custom property stores the type that will be used for the standard {@link sliOptObj.name} property.
 * @property initialState  = Initial State custom property stores the type that will be used for the standard {@link sliOptObj.initialState} property.
 * @property reducers      = Reducers custom property stores the type that will be used for the standard {@link sliOptObj.reducers} property.
 * @property extraReducers = Extra Reducers custom property stores the type that will be used for the standard {@link sliOptObj.extraReducers} property.
 *
*/

type SliOptObj = {

    name         : string;
    initialState : IniStaObj;
    reducers     : {};

    extraReducers : ( builder : ActionReducerMapBuilder< IniStaObj > ) => void;

};


/**
 * Slice Options Object = This custom object stores the standard properties that will be provided to the standard React Redux Toolkit {@link createSlice} function.
 * 
 * @property name          = Name standard property stores the string for this specific slice's value, in this case a value of mocDatJso which React Redux Toolkit will use to identify this slice and its corresponding state and reducers.
 * @property initialState  = Initial State standard property stores the custom {@link iniStaObj} object, which contains the initial values for this slice's state variable.
 * @property reducers      = Reducers standard property stores an object that normally contains all reducers for a particular slice, but in this case it will not store anything becuase this slice uses asynchronous thunk actions. Instead, the standard {@link sliOptObj.extraReducers} property will be used in combination with the builder method to instruct React Redux Toolkit on how to create reducers for this slice.
 * @property extraReducers = Extra Reducers standard property stores a custom function that executes logic that will take the builder parameter and use it to define cases for handling the different states of the standard JS Fetch API call (pending, fulfilled and rejected) that is made by the custom {@link payCreFun} function via a call by the custom {@link getMocDatJso} function. This is where the state updates will be handled based on the lifecycle of the async request. This builder pattern is the standard, type safe approach that replaces traditional switch statements in React Redux reducers and is particularly useful for handling actions that are not defined within the current slice, such as those generated by {@link createAsyncThunk} or actions from other slices.
 *
*/

const sliOptObj : SliOptObj = {

  name         : 'mocDatJso',
  initialState : iniStaObj,
  reducers     : {},

  extraReducers : ( builder ) => {


        builder


            .addCase( getMocDatJso.pending, ( state : IniStaObj ) => { /** Pending = This standard case handles when the mock backend data is being fetched in the custom {@link payCreFun} function via the custom {@link getMocDatJso} function. */


                state.curLoaBoo = true;  /** Currently Loading Boolean = This custom property is used in order to indicate to the user that the mock data is currently being loaded, using a spinner animation for example. */
                state.encErrBoo = false; /** Encountered Error Boolean = This custom property is set to false here in the off chance that it had been previously set to true. */


            })



            .addCase( getMocDatJso.fulfilled, ( state : IniStaObj, action : RedActObj ) => { /** Fulfilled = This standard case handles when the mock backend data has been successfully fetched in the custom {@link payCreFun} function via the custom {@link getMocDatJso} function. */


                state.curLoaBoo = false;          /** Currently Loading Boolean = This custom property is set to false here since it had been previously set to true in the pending case handler. */
                state.encErrBoo = false;          /** Encountered Error Boolean = This custom property is set to false here in the off chance that it had been previously set to true. */
                state.mocDatObj = action.payload; /** Mock Data Object          = This custom property is what stores the actual mock backend data and is what will be displayed inside of the component's JSX. */


            })



            .addCase( getMocDatJso.rejected, ( state : IniStaObj ) => { /** Rejected = This standard case handles when the mock backend data has failed to be fetched in the custom {@link payCreFun} function via the custom {@link getMocDatJso} function. */


                state.curLoaBoo = false; /** Currently Loading Boolean = This custom property is set to false here in the off chance that it had been previously set to true. */
                state.encErrBoo = true;  /** Encountered Error Boolean = This custom property may be used in order to indicate to the user that an error has been encountered while attempting to load the mock backend data. */


            });


  },

};

// #endregion sliOptObj



/** Mock Data JSON Slice = This custom type stores the type that will be used for the custom {@link mocDatJsoSlice} variable. */
type MocDatJsoSlice      = Slice< IniStaObj, {}, string, string, SliceSelectors< IniStaObj > >;

// #endregion mocDatJsoSlice Variables



/**
 * mocDatJsoSlice = Mock Data JSON Slice
 *
 * @summary
 * This custom variable stores the stores the standard object that is returned by
 * the standard React Redux Toolkit {@link createSlice} function. Said object
 * contains the slice name, generated reducer, its corresponding actions, case
 * reducers, and an optional getSelectors function. Said function is called
 * using the custom {@link sliOptObj} object as its parameter, which defines
 * the slice name, initial state and extra reducers properties. The extra
 * reducers property handles the different states of the async thunk action
 * that are created by the custom {@link getMocDatJso} function, which is a
 * creator function that is returned from the standard React Redux Toolkit
 * {@link createAsyncThunk} function. I realize that all of this functionality
 * is complete overkill for what it is accomplishing, but I did this as more of
 * a learning exercise in order to understand how to manage state using React
 * Redux Toolkit in a more scalable and maintainable way.
 * 
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/createSlice>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

const mocDatJsoSlice : MocDatJsoSlice = createSlice( sliOptObj );

// #endregion mocDatJsoSlice



// #region mocDatJsoReducer


// #region mocDatJsoReducer Variables

/** Mock Data JSON Reducer   = This custom type stores the type that will be used for the custom {@link mocDatJsoSlice} variable and is exported for use in any component that said variable is required. */
export type MocDatJsoReducer = Reducer< IniStaObj >;

// #endregion mocDatJsoReducer Variables



/**
 * mocDatJsoReducer = Mock Data JSON Reducer
 *
 * @summary
 * This custom variable stores the standard reducer property of the standard
 * object that is returned from the standard React Redux Toolkit
 * {@link createSlice} function and stored inside of the custom
 * {@link mocDatJsoSlice} variable. This custom variable is the default export
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

const mocDatJsoReducer : MocDatJsoReducer = mocDatJsoSlice.reducer;

// #endregion mocDatJsoReducer



export default mocDatJsoReducer;


