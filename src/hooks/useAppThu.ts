
// #region Imports

import { type ThunkDispatch } from 'redux-thunk'; /** This is the standard Typescript definition for a Redux Thunk dispatch function that can handle thunk actions in addition to standard action objects. */
import { useDispatch        } from 'react-redux'; /** This is a React Redux hook that allows functional components to access the Redux store's dispatch function so that they can dispatch actions to the store. */
import { type Action        } from 'redux';       /** This is the standard Typescript definition for a Redux Action, which is a plain JavaScript object representing an intention to change the application's state but when using Redux Toolkit they are typically generated automatically using the createSlice or createAction utilities to reduce boilerplate code. */
import { type RooStaObj     } from '../store';    /** This is the custom TypeScript type definition for the Redux store's entire state object. */

// #endregion Imports



/**
 * useAppThu = Use App Thunk
 *
 * @summary
 * This is a custom React hook that provides access to the Redux store's
 * dispatch function. Unlike the useAppDis hook, this one is specifically
 * designed to handle thunk actions. The main benefit for wrapping the
 * {@link useDispatch} hook into a custom hook for this site/app is that it
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



/** App Thunk Function = This stores the standard Typescript type for the Redux store's Thunk Dispatch, making the {@link useAppThu} definition below appear cleaner and more readable. */
type AppThunkFun       = ThunkDispatch<RooStaObj, any, Action>;
/** Use App Thunk      = This stores the standard React hook that provides access to the Redux store's dispatch function for use with thunk actions and with proper TypeScript typing. */
const useAppThu        = useDispatch.withTypes<AppThunkFun>();
/** Use App Thunk      = This stores the type check for use anywhere that the useAppThu hook is passed as a prop. Although this may seem redundant, exporting this type can be useful for type checking and ensuring consistency across the application. */
export type UseAppThu  = typeof useAppThu;



export default useAppThu;


