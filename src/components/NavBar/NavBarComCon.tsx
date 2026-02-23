
// #region Imports

import NavBarCom from './NavBarCom';    /** This import is the custom component that contains the JSX for the navigation bar. */
import React     from 'react';          /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import store     from '../../store.ts'; /** This import is the custom React Redux store that is created using the standard React Redux Toolkit configureStore function. */


import { aboCouRed } from './cliCouArrSlice.ts'; /** This import is the custom reducer function for managing the click count number state array value for the About page link. */
import { conCouRed } from './cliCouArrSlice.ts'; /** This import is the custom reducer function for managing the click count number state array value for the Contact page link. */
import { homCouRed } from './cliCouObjSlice.ts'; /** This import is the custom reducer function for managing the click count number state object value for the Home page logo link. */
import { logCouRed } from './cliCouObjSlice.ts'; /** This import is the custom reducer function for managing the click count number state object value for the Home page link. */


import { type UseAppDis } from '../../hooks/useAppDis.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function. */
import { type Dispatch  } from '@reduxjs/toolkit';         /** This import is the standard Typescript definition for a standard React Redux Toolkit dispatch function that accepts an action as an argument and returns void. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Navigation Bar Component Container Props = This custom type stores the types that will store the properties and values that will be passed into this component.
 * 
 * @property disFun = Dispatch Function custom property stores the type that will be used for the custom {@link appDisFun} variable.
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
 */

type NavBarComConPro = {

    disFun : UseAppDis;
    namStr : string;

};

// #endregion Props Type Definitions



// #region NavBarComCon

/**
 * NavBarComCon = Navigation Bar Component Container
 *
 * @summary
 * This custom functional component executes the logic for the navigation bar
 * and renders the returned JSX of the custom NavBarCom custom component. It's
 * main purpose is to act as a container that handles all of the logic and
 * state management for the NavBarCom custom component. In the Codecademy
 * tutorial that I followed it was recommended that when a custom component
 * contains a lot of logic and state management, then it is best practice to
 * separate said logic and state management from the presentational component
 * into a container component. All of the click event handlers and state
 * management functionality is completely unnecessary of course for a simple
 * navigation bar, but this was just for personal learning purposes to gain
 * some experience with using React Redux Toolkit alongside React and
 * TypeScript in a more hands on way (instead of just tutorials) before moving
 * on to my next project that will use these concepts in a more practical,
 * realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.disFun - {@link appDisFun}
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the NavBarCom component.
 * @see {@link navBarComConJsx}
 * 
 * @example
 * ```tsx
 * <NavBarComCon /> // => navBarComConJsx
 * ```
 *
*/

function NavBarComCon ( props : NavBarComConPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Dispatch Function  = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function. This must be executed as a function in order to obtain access the the standard React Redux store dispatch function that this custom hook wraps. */
    const appDisFun : Dispatch = props.disFun();
    /** App Name String        = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string   = props.namStr;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region handleClickAboFun


    // #region Function Type Definitions

    /** Handle Click About Function = This custom type stores the type that will be used for the custom {@link handleClickAboFun} function. */
    type HandleClickAboFun          = () => void;

    // #endregion Function Type Definitions



    /**
     * handleClickAboFun = Handle Click About Function
     * @see {@link HandleClickAboFun}
     *
     * @summary
     * This custom function will execute the handling of the on click event for
     * the About page link in the navigation bar. The custom {@link disFun}
     * hook will be called in order to increase the state array's about count
     * variable, then the updated state value will be retrieved and stored in
     * order to log a console message of how many times the About page link has
     * been clicked. As mentioned in the component summary, this is all
     * completely unnecessary for a simple navigation bar, but this was just
     * for personal learning purposes to gain some experience with using Redux
     * Toolkit alongside React and TypeScript in a more hands on way (instead
     * of just tutorials) before moving on to my next project that will use
     * these concepts in a more practical, realistic way.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleClickAboFun() // => void
     * ```
     *
    */

    const handleClickAboFun : HandleClickAboFun = () => {


        /** App Dispatch Function = This custom React hook executes the custom {@link aboCouRed} reducer in order to increment the custom state variable for the About page link click count. */
        appDisFun( aboCouRed() );



        /** About Count Number   = This custom variable stores the state array's about count variable which is equal to the number of times that the navigation bar's About page link has been clicked. These variables must use the standard React Redux Toolkit {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const aboCouNum : number = store.getState().cliCouArr[0];



        /** Console Log = This standard JS Web API function executes the logging of the number of times that the About page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the navbar link for the ${ appNamStr } About page ${ aboCouNum } times!` );


    };

    // #endregion handleClickAboFun



    // #region handleClickConFun


    // #region Function Type Definitions

    /** Handle Click Contact Function = This custom type stores the type that will be used for the custom {@link handleClickConFun} function. */
    type HandleClickConFun            = () => void;

    // #endregion Function Type Definitions



    /**
     * handleClickConFun = Handle Click Contact Function
     * @see {@link HandleClickConFun}
     *
     * @summary
     * This custom function will execute the handling of the on click event for
     * the Contact page link in the navigation bar. The custom {@link disFun}
     * hook will be called in order to increase the state array's contact count
     * variable, then the updated state value will be retrieved and stored in
     * order to log a console message of how many times the Contact page link
     * has been clicked. As mentioned in the component summary, this is all
     * completely unnecessary for a simple navigation bar, but this was just
     * for personal learning purposes to gain some experience with using Redux
     * Toolkit alongside React and TypeScript in a more hands on way (instead
     * of just tutorials) before moving on to my next project that will use
     * these concepts in a more practical, realistic way.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleClickConFun() // => void
     * ```
     *
    */
   
    const handleClickConFun : HandleClickConFun = () => {


        /** App Dispatch Function = This custom React hook executes the custom {@link conCouRed} reducer in order to increment the custom state variable for the Contact page link click count. */
        appDisFun( conCouRed() );



        /** Contact Count Number = This custom variable stores the state array's contact count variable which is equal to the number of times that the navigation bar's Contact page link has been clicked. These variables must use the standard React Redux Toolkit {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const conCouNum : number = store.getState().cliCouArr[1];



        /** Console Log = This standard JS Web API function executes the logging of the number of times that the Contact page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the navbar link for the ${ appNamStr } Contact page ${ conCouNum } times!` );


    };

    // #endregion handleClickConFun



    // #region handleClickHomFun


    // #region Function Type Definitions

    /** Handle Click Home Function = This custom type stores the type that will be used for the custom {@link handleClickHomFun} function. */
    type HandleClickHomFun         = () => void;

    // #endregion Function Type Definitions



    /**
     * handleClickHomFun = Handle Click Home Function
     * @see {@link HandleClickHomFun}
     *
     * @summary
     * This custom function will execute the handling of the on click event for
     * the Home page link in the navigation bar. The custom {@link disFun}
     * hook will be called in order to increase the state object's home count
     * variable, then the updated state value will be retrieved and stored in
     * order to log a console message of how many times the Home page link
     * has been clicked. As mentioned in the component summary, this is all
     * completely unnecessary for a simple navigation bar, but this was just
     * for personal learning purposes to gain some experience with using Redux
     * Toolkit alongside React and TypeScript in a more hands on way (instead
     * of just tutorials) before moving on to my next project that will use
     * these concepts in a more practical, realistic way.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleClickHomFun() // => void
     * ```
     *
    */

    const handleClickHomFun : HandleClickHomFun = () => {


        /** App Dispatch Function = This custom React hook executes the custom {@link homCouRed} reducer in order to increment the custom state variable for the Home page link click count. */
        appDisFun( homCouRed() );



        /** Home Count Number    = This custom variable stores the state object's home count variable which is equal to the number of times that the navigation bar's Home page link has been clicked. These variables must use the standard React Redux Toolkit {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const homCouNum : number = store.getState().cliCouObj.homCouNum;



        /** Console Log = This standard JS Web API function executes the logging of the number of times that the Home page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the navbar link for the ${ appNamStr } Home page ${ homCouNum } times!` );


    };

    // #endregion handleClickHomFun



    // #region handleClickLogFun


    // #region Function Type Definitions

    /** Handle Click Logo Function = This custom type stores the type that will be used for the custom {@link handleClickLogFun} function. */
    type HandleClickLogFun         = () => void;

    // #endregion Function Type Definitions



    /**
     * handleClickLogFun = Handle Click Logo Function
     * @see {@link HandleClickLogFun}
     *
     * @summary
     * This custom function will execute the handling of the on click event for
     * the logo Home page link in the navigation bar. The custom {@link disFun}
     * hook will be called in order to increase the state object's logo count
     * variable, then the updated state value will be retrieved and stored in
     * order to log a console message of how many times the logo Home page link
     * has been clicked. As mentioned in the component summary, this is all
     * completely unnecessary for a simple navigation bar, but this was just
     * for personal learning purposes to gain some experience with using Redux
     * Toolkit alongside React and TypeScript in a more hands on way (instead
     * of just tutorials) before moving on to my next project that will use
     * these concepts in a more practical, realistic way.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleClickLogFun() // => void
     * ```
     *
    */

    const handleClickLogFun : HandleClickLogFun = () => {


        /** App Dispatch Function = This custom React hook executes the custom {@link logCouRed} reducer in order to increment the custom state variable for the logo Home page link click count. */
        appDisFun( logCouRed() );



        /** Logo Count Number    = This custom variable stores the state object's logo count variable which is equal to the number of times that the navigation bar's logo Home page link has been clicked. These variables must use the standard React Redux Toolkit {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const logCouNum : number = store.getState().cliCouObj.logCouNum;



        /** Console Log = This standard JS Web API function executes the logging of the number of times that the logo Home page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the logo link for the ${ appNamStr } Home page ${ logCouNum } times!` );


    };

    // #endregion handleClickLogFun



    // #region Return Statement

    /** Navigation Bar Component Container Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const navBarComConJsx : React.ReactElement            = (


        // #region Root Element

        <> { /** Root Element = This custom element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            { /** Start Navigation Bar Component */ }

            < NavBarCom namStr={ appNamStr } onClickLog={ handleClickLogFun } onClickHom={ handleClickHomFun } onClickAbo={ handleClickAboFun } onClickCon={ handleClickConFun } /> { /** Navigation Bar Component = This custom element is the container for all of the HTML content that is returned from the NavBarCom custom component. */ }

            { /** End Navigation Bar Component */ }


        </>

        // #endregion Root Element


    );



    return navBarComConJsx;

    // #endregion Return Statement


};

// #endregion NavBarComCon



export default NavBarComCon;


