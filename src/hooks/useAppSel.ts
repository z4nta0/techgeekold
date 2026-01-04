
// #region Imports

import { type RooStaObj }            from '../store';    /** This is the custom TypeScript type definition for the Redux store's entire state object. */
import { useSelector }               from 'react-redux'; /** This is the standard React Redux hook that allows functional components to access the Redux store's state object tree. This is the preferred method for accessing the state object tree (as opposed to accessing it directly via store.getState) for automatic rerendering, performance optimization and integration with React's modern hook ecosystem. */
import { type TypedUseSelectorHook } from 'react-redux'; /** This is the standard Typescript definition for a typed version of the useSelector hook, which allows for type safe access to the Redux store's state object tree. */

// #endregion Imports



/**
 * useAppThu = Use App Thunk
 *
 * @summary
 * This is a custom React hook that provides access to the Redux store's
 * selector function. The main benefit for wrapping the {@link useSelector}
 * hook into a custom hook for this site/app is that it provides consistent
 * type checking throughout the application and simplifies type inference. For
 * more complex sites/apps, these custom hooks can also be used for logic
 * reusability (for instance, creating a useCart hook that would be used on
 * multiple pages), better code organization and readability, simplified
 * testing, easier refactoring and maintenance and a flatter component tree.
 *
 * @author z4ntao <https://github.com/z4nta0>
 *
*/



/** App Selector Function = This stores the standard Typescript type for the Redux store's {@link useSelector} Function, making the {@link useAppSel} definition below appear cleaner and more readable. */
type AppSelFun            = TypedUseSelectorHook<RooStaObj>;
/** Use App Selector      = This stores the standard React hook that provides access to the Redux store's selector function but with proper TypeScript typing. */
const useAppSel           = useSelector.withTypes<AppSelFun>();
/** Use App Selector      = This stores the type check for use anywhere that the useAppSel hook is passed as a prop. Although this may seem redundant, exporting this type can be useful for type checking and ensuring consistency across the application. */
export type UseAppSel     = typeof useAppSel;



export default useAppSel


