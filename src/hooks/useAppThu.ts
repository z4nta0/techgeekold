
// #region Imports

import { useDispatch } from 'react-redux'; /** This import is the standard React Redux hook that allows functional components to access the standard React Redux store dispatch function so that they can dispatch actions to the store. */


import { type Action        } from 'redux';       /** This import is the standard Typescript definition for an object used in React Redux management patterns that describes an intention to change the application state. */
import { type ThunkDispatch } from 'redux-thunk'; /** This import is the standard Typescript definition for an interface provided by the standard React Redux thunk middleware that describes a dispatch function capable of accepting both standard React Redux action objects and thunk functions. */

// #endregion Imports



// #region useAppThu


// #region useAppThu Variables

/** Use App Thunk     = This custom type stores the type that will be used for the custom {@link useAppThu} variable and is exported for use in any component that said variable is required. */
export type UseAppThu = ThunkDispatch< any, any, Action >;

// #endregion useAppThu Variables



/**
 * useAppThu = Use App Thunk
 *
 * @summary
 * This custom React hook executes the standard React Redux {@link useDispatch}
 * hook. Unlike the custom useAppDis React hook, this one is specifically typed
 * to handle thunk actions. The main benefit for executing said hook inside of
 * a custom hook is that it provides consistent type checking throughout the
 * site/app and simplifies type inference. For more complex sites/apps, these
 * custom hooks can also be used for logic reusability (for instance, creating
 * a useCart hook that would be used on multiple pages), better code
 * organization and readability, simplified testing, easier refactoring and
 * maintenance and a flatter component tree.
 *
 * @author React Redux <https://react-redux.js.org/api/hooks#usedispatch>
 * @author z4nta0      <https://github.com/z4nta0>
 * 
 * @param void - This function takes no parameters.
 * 
 * @returns The standard React Redux useDispatch hook.
 * @see {@link useDispatch}
 * 
 * @example
 * ```ts
 * useAppThu() // => useDispatch;
 * ```
*/

const useAppThu = useDispatch.withTypes< UseAppThu >();

// #endregion useAppThu



export default useAppThu;


