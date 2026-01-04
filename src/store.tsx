
// #region Imports

import   cliCouArrReducer        from './components/NavBar/clickCountArrSlice.tsx'; /** This is the default exported reducer responsible for handling the state of the click count array for the About and Contact page links in the navigation bar component. */
import { type CliCouArrReducer } from './components/NavBar/clickCountArrSlice.tsx'; /** This is the Typescript type definition for the default click count array reducer imported from the clickCountArrSlice file. */
import   cliCouObjReducer        from './components/NavBar/clickCountObjSlice.tsx'; /** This is the default exported reducer responsible for handling the state of the click count object for the Logo and Home page links in the navigation bar component. */
import { type CliCouObjReducer } from './components/NavBar/clickCountObjSlice.tsx'; /** This is the Typescript type definition for the default click count object reducer imported from the clickCountObjSlice file. */
import { configureStore     }    from '@reduxjs/toolkit';                           /** This is Redux Toolkit's standard method for creating a Redux store. It uses the low level Redux core createStore method internally, but wraps that to provide good defaults to the store setup for a better development experience. */
import   couStaNumReducer        from './features/counterSlice.tsx';                /** This is the default exported reducer responsible for handling the state of the counter number for the counter feature in the home page component. */
import { type CouStaNumReducer } from './features/counterSlice.tsx';                /** This is the Typescript type definition for the default click count object reducer imported from the clickCountObjSlice file. */
import { type EnhancedStore }    from '@reduxjs/toolkit';                           /** This is standard Typescript definition for the return type of Redux Toolkit's configureStore function. */
import   mocDatJsoReducer        from './dataSlice.tsx';                            /** This is the default exported reducer for the mock (backend) data json handling that is show in the home page compoenent. */
import { type MocDatJsoReducer } from './dataSlice.tsx';                            /** This is the Typescript type definition for the default mock (backend) data json reducer imported from the dataSlice file. */

// #endregion Imports



/**
 * store = Store
 *
 * @summary
 * Redux Toolkit's configureStore simplifies the state management setup
 * process. One call to configureStore will call combineReducers to combine
 * your slices reducers into the root reducer function, add the thunk
 * middleware and called applyMiddleware, in development it can automatically
 * add more middleware to check for common mistakes like accidentally mutating
 * the state, automatically set up the Redux DevTools Extension connection,
 * call createStore to create a Redux store using that root reducer and those
 * configuration options. configureStore also offers an improved API and usage
 * patterns compared to the original createStore by accepting named fields for
 * reducer, preloadedState, middleware, enhancers, and devtools, as well as
 * much better TS type inference. The RooStaObj type is also exported and used
 * wherever the state object is passed as a prop. All of the state management
 * stuff for this project is completely unnecessary of course, but this was
 * just for personal learning purposes to gain some experience with using Redux
 * Toolkit alongside React and TypeScript while following along with tutorials
 * before moving on to my next project that will use these concepts in a more
 * practical, realistic way.
 *
 * @author Redux Toolkit <https://redux-toolkit.js.org/api/configureStore>
 * @author z4ntao        <https://github.com/z4nta0>
 *
*/



// #region Store Variables


// #region stoOptObj

/**
 * StoOptObj = Store Options Object will store the default properties and values that will be provided to Redux Toolkit's {@link configureStore} function. It abstracts away all of the boilerplate code that is required by Redux (without Toolkit) to handle state management.
 * 
 * @property reducer   = Reducer will store all of the slice reducers that were created in their respective slice files, and will be used to manage their specific parts of the Redux store's state.
 * @property cliCouObj = Click Count Object Reducer will manage the state for the click counts of the Logo and Home page links in the navigation bar component.
 * @property cliCouArr = Click Count Array Reducer will manage the state for the click counts of the About and Contact page links in the navigation bar component.
 * @property couStaNum = Counter State Number Reducer will manage the state for the counter number feature in the Home page component.
 * @property mocDatJso = Mock Data JSON Reducer will manage the state for the mock (backend) data json handling that is show in the home page component.
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

/** @see {@link StoOptObj} */
const stoOptObj : StoOptObj = {

    reducer : {

        couStaNum : couStaNumReducer,
        cliCouObj : cliCouObjReducer,
        cliCouArr : cliCouArrReducer,
        mocDatJso : mocDatJsoReducer,

    },

};


// #endregion Store Variables



// #region Store Creation


/** Store                   = This stores the Redux store that holds the complete state tree of the app. There should only be a single store in a Redux app. A standard Redux store setup typically requires multiple pieces of configuration, but Redux Toolkit's configureStore simplifies that setup process by doing all that work. */
const store : EnhancedStore = configureStore( stoOptObj );

/** Root State Object = This stores the inference of the entire state object from the store itself, and will be used for type checking anywhere that the state object is passed as a prop. Refer to the individual slice state objects for more specific information on their respective parts of the state. */
export type RooStaObj = ReturnType<typeof store.getState>;


// #endregion Store Creation



export default store;


