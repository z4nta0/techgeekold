
// #region Imports

import { useSelector } from 'react-redux'; /** This import is the standard React Redux hook that allows functional components to access the standard React Redux store state object tree and is the preferred method for accessing the state object tree (as opposed to accessing it directly via store.getState) for automatic rerendering, performance optimization and integration with React's modern hook ecosystem. */


import { type RooStaObj            } from '../store.ts'; /** This import is the custom type definition for the entire state object of the custom React Redux Toolkit store, which is inferred by the store's standard getState method. */
import { type TypedUseSelectorHook } from 'react-redux'; /** This import is the standard Typescript definition for a utility type from React Reduxthat is used to create a pre-typed version of the standard React Redux useSelector hook. */

// #endregion Imports



// #region useAppSel


// #region useAppSel Variables

/** Use App Selector  = This custom type stores the type that will be used for the custom {@link useAppSel} variable and is exported for use in any component that said variable is required. */
export type UseAppSel = TypedUseSelectorHook< RooStaObj >;

// #endregion useAppSel Variables



/**
 * useAppSel = Use App Selector
 *
 * @summary
 * This custom React hook executes the standard React Redux store's
 * {@link useSelector} hook. The main benefit for executing said hook inside of
 * a custom hook is that it provides consistent type checking throughout the
 * site/app and simplifies type inference. For more complex sites/apps, these
 * custom hooks can also be used for logic reusability (for instance, creating
 * a useCart hook that would be used on multiple pages), better code
 * organization and readability, simplified testing, easier refactoring and
 * maintenance and a flatter component tree.
 *
 * @author React Redux <https://react-redux.js.org/api/hooks#useselector>
 * @author z4nta0      <https://github.com/z4nta0>
 * 
 * @param void - This function takes no parameters.
 * 
 * @returns The standard React Redux useSelector hook.
 * @see {@link useSelector}
 *
 * @example
 * ```ts
 * useAppSel() // => useSelector;
 * ```
*/

const useAppSel : UseAppSel = useSelector.withTypes();

// #endregion useAppSel



export default useAppSel;


