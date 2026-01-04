
// #region Imports

import   store         from '../store';    /** This is the Redux store that holds the complete state object tree of the app, as well as provide methods for the reading of and writing to the state object tree. */
import { useDispatch } from 'react-redux'; /** This is a React Redux hook that allows functional components to access the Redux store's dispatch function so that they can dispatch actions to the store. */

// #endregion Imports



/**
 * useAppDis = Use App Dispatch
 *
 * @summary
 * This is a custom React hook that provides access to the Redux store's
 * {@link useDispatch} function. The main benefit for this site/app is that it
 * provides consistent type checking throughout the application and simplifies
 * type inference. For more complex sites/apps, these custom hooks can also be
 * used for logic reusability (for instance, creating a useCart hook that would
 * be used on multiple pages), better code organization and readability,
 * simplified testing, easier refactoring and maintenance and a flatter
 * component tree.
 *
 * @author z4ntao <https://github.com/z4nta0>
 *
*/



/** App Dispatch Function = This stores the type of the Redux store's dispatch function, making the {@link useAppDis} definition below appear cleaner and more readable. */
type AppDisFun            = typeof store.dispatch;
/** Use App Dispatch      = This stores the standard React hook that provides access to the Redux store's dispatch function but with proper TypeScript typing. */
const useAppDis           = useDispatch.withTypes<AppDisFun>();
/** Use App Dispatch      = This stores the type check for use anywhere that the useAppDis hook is passed as a prop. Although this may seem redundant, exporting this type can be useful for type checking and ensuring consistency across the application. */
export type UseAppDis     = typeof useAppDis;



export default useAppDis;


