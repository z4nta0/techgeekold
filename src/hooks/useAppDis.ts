
// #region Imports

import { useDispatch } from 'react-redux'; /** This import is the standard React Redux hook that allows functional components to access the standard React Redux store dispatch function so that they can dispatch actions to the store. */


import { type Dispatch      } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for a standard React Redux Toolkit dispatch function that accepts an action as an argument and returns void. */
import { type UnknownAction } from '@reduxjs/toolkit'; /** This import is the standard Typescript definition for an object that has a type property of type string and all other fields are of the TypeScript unknown type. */

// #endregion Imports



// #region useAppDis


// #region useAppDis Variables

/** Use App Dispatch  = This custom type stores the type that will be used for the custom {@link useAppDis} variable and is exported for use in any component that said variable is required. */
export type UseAppDis = Dispatch< UnknownAction >;

// #endregion useAppDis Variables



/**
 * useAppDis = Use App Dispatch
 *
 * @summary
 * This custom React hook executes the standard React Redux {@link useDispatch}
 * hook. The main benefit for executing said hook inside of a custom hook is
 * that it provides consistent type checking throughout the site/app and
 * simplifies type inference. For more complex sites/apps, these custom hooks
 * can also be used for logic reusability (for instance, creating a useCart
 * hook that would be used on multiple pages), better code organization and
 * readability, simplified testing, easier refactoring and maintenance and a
 * flatter component tree.
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
 * useAppDis() // => useDispatch;
 * ```
*/

const useAppDis = useDispatch.withTypes< UseAppDis >();

// #endregion useAppDis



export default useAppDis;


