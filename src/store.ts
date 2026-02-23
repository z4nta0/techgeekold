
// #region Imports

import cliCouArrReducer from './components/NavBar/cliCouArrSlice.ts'; /** This import is the custom reducer responsible for handling the state of the click count array for the About and Contact page links in the navigation bar component. */
import cliCouObjReducer from './components/NavBar/cliCouObjSlice.ts'; /** This import is the custom reducer responsible for handling the state of the click count object for the logo and Home page links in the navigation bar component. */
import couStaNumReducer from './features/couStaNumSlice.ts';          /** This import is the custom reducer responsible for handling the state of the counter number for the counter feature in the Home page component. */
import mocDatJsoReducer from './api/mocDatJsoSlice.ts';               /** This import is the custom reducer responsible for handling the mock (backend) data json that is show in the Home page compoenent. */


import { configureStore } from '@reduxjs/toolkit'; /** This import is the standard React Redux Toolkit's method for creating a Redux store using the low level standard React Redux createStore method internally but wrapping that to provide good defaults to the store setup for a better development experience. */


import { type CliCouArrReducer } from './components/NavBar/cliCouArrSlice.ts'; /** This import is the custom type definition for the custom click count array reducer. */
import { type CliCouObjReducer } from './components/NavBar/cliCouObjSlice.ts'; /** This import is the custom type definition for the custom click count object reducer. */
import { type CouStaNumReducer } from './features/couStaNumSlice.ts';          /** This import is the custom type definition for the custom click count object reducer. */
import { type MocDatJsoReducer } from './api/mocDatJsoSlice.ts';               /** This import is the custom type definition for the custom mock (backend) data json reducer. */

// #endregion Imports



// #region File Scoped Variables


// #region stoOptObj

/**
 * Store Options Object = This custom type stores the types that will be used for the custom {@link stoOptObj} object.
 * 
 * @property reducer   = Reducer custom type stores the type that will be used for the standard {@link stoOptObj.reducer} property.
 * @property cliCouObj = Click Count Object custom type stores the type that will be used for the custom {@link stoOptObj.reducer.cliCouObj} property.
 * @property cliCouArr = Click Count Array custom type stores the type that will be used for the custom {@link stoOptObj.reducer.cliCouArr} property.
 * @property couStaNum = Counter State Number custom type stores the type that will be used for the custom {@link stoOptObj.reducer.couStaNum} property.
 * @property mocDatJso = Mock Data JSON custom type stores the type that will be used for the custom {@link stoOptObj.reducer.mocDatJso} property.
 * 
*/

type StoOptObj = {

    reducer : {

        cliCouObj : CliCouObjReducer;
        cliCouArr : CliCouArrReducer;
        couStaNum : CouStaNumReducer;
        mocDatJso : MocDatJsoReducer;

    };

};


/**
 * Store Options Object = This custom object stores the properties that are provided to the standard React Redux Toolkit {@link configureStore} function.
 * 
 * @property reducer   = Reducer standard property stores the custom slice reducer functions that were created in their respective custom slice files and are used to manage their specific parts of the custom React Redux store's state.
 * @property cliCouObj = Click Count Object custom property stores the custom reducer function that executes the logic for managing the custom state object for the click counts of the logo and Home page links in the navigation bar component.
 * @property cliCouArr = Click Count Array custom property stores the custom reducer function that executes the logic for managing the custom state array for the click counts of the About and Contact page links in the navigation bar component.
 * @property couStaNum = Counter State Number custom property stores the custom reducer function that executes the logic for managing the custom state number for the counter number feature in the Home page component.
 * @property mocDatJso = Mock Data JSON custom property stores the custom reducer function that executes the logic for managing the custom state json for the mock (backend) data json handling that is shown in the Home page component.
 * 
*/

const stoOptObj : StoOptObj = {

    reducer : {

        couStaNum : couStaNumReducer,
        cliCouObj : cliCouObjReducer,
        cliCouArr : cliCouArrReducer,
        mocDatJso : mocDatJsoReducer,

    },

};

// #endregion stoOptObj


// #endregion File Scoped Variables



// #region Store

/**
 * store = Store
 *
 * @summary
 * This custom object stores the result of a custom React Redux store object
 * that was created via calls to the standard React Redux Toolkit
 * {@link configureStore} function, which simplifies the state management setup
 * process. Said function will call the standard React Redux combineReducers
 * function in the background in order to combine the provided custom slice
 * reducers into the root reducer function, add the standard React Redux thunk
 * middleware and applyMiddleware functions, automatically set up the React
 * Redux DevTools Extension connection, call the standard React Redux
 * createStore function in order to create a standard React Redux store using
 * said root reducer and configuration options. The standard React Redux
 * Toolkit {@link configureStore} function also offers an improved API and
 * usage patterns compared to the original React Redux createStore by accepting
 * named fields for reducer, preloadedState, middleware, enhancers, and
 * devtools, as well as much better Typescript type inference. The custom type
 * {@link RooStaObj} will also be exported and then used wherever the state
 * object is passed as a prop for proper type checking. All of the state
 * management functionality for this project is completely unnecessary of
 * course, but this was just for personal learning purposes to gain some
 * experience with using React Redux Toolkit alongside React and TypeScript
 * while following along with tutorials before moving on to my next project
 * that will use these concepts in a more practical, realistic way.
 *
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/configureStore>
 * @author z4nta0        <https://github.com/z4nta0>
 *
*/

const store = configureStore( stoOptObj );



/** Root State Object = This custom type stores the standard Typescript inference of the entire custom state object from the store itself and is exported for use as a type check anywhere that the state object is passed as a prop. Please refer to the individual slice state objects for more specific information on their respective parts of the state. */
export type RooStaObj = ReturnType< typeof store.getState >;

// #endregion Store



export default store;


