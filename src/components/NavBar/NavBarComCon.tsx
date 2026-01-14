
// #region Imports

import { aboCouRed      } from './clickCountArrSlice.tsx'; /** This is the reducer function for managing the click count number state value for the About page link. */
import { conCouRed      } from './clickCountArrSlice.tsx'; /** This is the reducer function for managing the click count number state value for the Contact page link. */
import { homCouRed      } from './clickCountObjSlice.tsx'; /** This is the reducer function for managing the click count number state value for the Home page logo link. */
import { logCouRed      } from './clickCountObjSlice.tsx'; /** This is the reducer function for managing the click count number state value for the Home page link. */
import   NavBarCom        from './NavBarCom';              /** This is the presentational component that contains the JSX for the navigation bar. */
import { type RooStaObj } from '../../store.tsx';          /** This is the custom TypeScript type definition for the Redux store's entire state object. */
import   store            from '../../store.tsx';          /** This is the Redux store object that contains the entire state object tree of the application. */
import { type UseAppDis } from '../../hooks/useAppDis.ts'; /** This is the custom Typescript type definition got a custom React Hook that wraps the React Redux useDispatch hook for better type checking. */

// #endregion Imports



// #region Props Type Definitions

/**
 * NavBarComConPro = Navigation Bar Component Container Props will store all of the props that will be used in the NavBarComCon and NavBarCom components.
 *
 * @property namStr = Name String will store the site/app name that will be displayed in various parts of the site/app.
 * @property staObj = State Object will store the entire Redux store's state object tree for use in the component.
 * @property disFun = Dispatch Function will store the custom React Hook that wraps the React Redux store's dispatch function for use in the component.
 *
*/

type NavBarComConPro = {

  namStr : string;
  staObj : RooStaObj;
  disFun : UseAppDis;

};

// #endregion Props Type Definitions



/**
 * NavBarComCon = Navigation Bar Component Container
 *
 * @summary
 * This functional component will be responsible for handling all of the logic
 * and state management for the NavBarCom (navigation bar component). In the
 * Codecademy tutorial that I followed, it was recommended that when a
 * component contains a lot of logic and state management, it is best practice
 * to separate the presentational and container components. All of the click
 * event handlers and state management stuff is completely unnecessary for a
 * simple navigation bar, but this was just for personal learning purposes to
 * gain some experience with using Redux Toolkit alongside React and TypeScript
 * in a more hands on way (instead of just tutorials) before moving on to my
 * next project that will use these concepts in a more practical, realistic
 * way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link NavBarComConPro.namStr}
 * @param props.staObj - {@link NavBarComConPro.staObj}
 * @param props.disFun - {@link NavBarComConPro.disFun}
 * 
 * @returns A React JSX element representing the NavBarCom component.
 * @see {@link navBarComConJsx}
 * 
 * @example
 * ```tsx
 * <NavBarComCon /> // => <NavBarCom />
 * ```
 *
*/

function NavBarComCon ( props : NavBarComConPro ) : React.ReactElement {



    // #region Component Scoped Variables


    // #region Props Variables

    /** Dispatch Function = {@link NavBarComConPro.disFun}. This must be executed as a function to obtain the actual dispatch function. This is a side effect of wrapping the React Redux store's useDispatch function in a custom React Hook. */
    const disFun          = props.disFun();
    /** Name String       = {@link NavBarComConPro.namStr} */
    const { namStr }      = props;
    /** State Object      = {@link NavBarComConPro.staObj} */
    const { staObj }      = props;

    // #endregion Props Variables


    /** App Dispatch Function = This will store an instance of the dispatch function obtained by calling the custom React Hook that wraps the React Redux store's dispatch function. */
    //const appDisFun           = disFun();


    // #endregion Component Scoped Variables



    // #region handleClickLogFun


    // #region Function Type Definitions

    /** Handle Click Logo Function = This will handle the click event for the logo Home page link in the navigation bar. */
    type HandleClickLogFun         = () => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * handleClickLogFun = Handle Click Logo Function
     * @see {@link HandleClickLogFun}
     *
     * @summary
     * This will handle the click event for the logo Home page link in the
     * navigation bar. A Redux Toolkit {@link store.dispatch} function will be
     * called in order to increase the {@link State.clickCountObj.logoCount}
     * variable, then the updated state value will be stored and used in order
     * to log a console message of how many times the logo Home page link has
     * been clicked. As mentioned in the component summary, this is all
     * completely unnecessary for a simple navigation bar, but this was just
     * for personal learning purposes to gain some experience with using Redux
     * Toolkit alongside React and TypeScript in a more hands on way (instead
     * of just tutorials) before moving on to my next project that will use
     * these concepts in a more practical, realistic way.
     *
     * @author z4ntao <https://github.com/z4nta0>
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


        /** This will dispatch the Redux Toolkit custom defined logCouRed reducer in order to increment the logo click count value in the Redux store. */
        disFun( logCouRed() );


        /** logCouNum   = Logo Count Number stores the number of times that the navigation bar's logo Home page link has been clicked. These must use the {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const logCouNum = store.getState().cliCouObj.logCouNum;

        /** This logs the number of times the logo Home page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the logo link for the ${ namStr } Home page ${ logCouNum } times!` );

    };

    // #endregion Function Body


    // #endregion handleClickLogFun



    // #region handleClickHomFun


    // #region Function Type Definitions

    /** Handle Click Home Function = This will handle the click event for the Home page link in the navigation bar. */
    type HandleClickHomFun         = () => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * handleClickHomFun = Handle Click Home Function
     * @see {@link HandleClickHomFun}
     *
     * @summary
     * This will handle the click event for the Home page link in the
     * navigation bar. A Redux Toolkit {@link store.dispatch} function will be
     * called in order to increase the {@link State.clickCountObj.homeCount}
     * variable, then the updated state value will be stored and used in order
     * to log a console message of how many times the Home page link has been
     * clicked. As mentioned in the component summary, this is all completely
     * unnecessary for a simple navigation bar, but this was just for personal
     * learning purposes to gain some experience with using Redux Toolkit
     * alongside React and TypeScript in a more hands on way (instead of just
     * tutorials) before moving on to my next project that will use these
     * concepts in a more practical, realistic way.
     *
     * @author z4ntao <https://github.com/z4nta0>
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


        /** This will dispatch the Redux Toolkit custom defined homCouRed reducer in order to increment the home click count value in the Redux store. */
        disFun( homCouRed() );


        /** homCouNum   = Home Count Number stores the number of times that the navigation bar's Home page link has been clicked. These must use the {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const homCouNum = store.getState().cliCouObj.homCouNum;

        /** This logs the number of times the Home page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the navbar link for the ${ namStr } Home page ${ homCouNum } times!` );

    };

    // #endregion Function Body


    // #endregion handleClickHomFun



    // #region handleClickAboFun


    // #region Function Type Definitions

    /** Handle Click About Function = This will handle the click event for the About page link in the navigation bar. */
    type HandleClickAboFun          = () => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * handleClickAboFun = Handle Click About Function
     * @see {@link HandleClickAboFun}
     *
     * @summary
     * This will handle the click event for the About page link in the
     * navigation bar. A Redux Toolkit {@link store.dispatch} function will be
     * called in order to increase the {@link State.cliCouArr[aboutCount]}
     * variable, then the updated state value will be stored and used in order
     * to log a console message of how many times the About page link has been
     * clicked. As mentioned in the component summary, this is all completely
     * unnecessary for a simple navigation bar, but this was just for personal
     * learning purposes to gain some experience with using Redux Toolkit
     * alongside React and TypeScript in a more hands on way (instead of just
     * tutorials) before moving on to my next project that will use these
     * concepts in a more practical, realistic way.
     *
     * @author z4ntao <https://github.com/z4nta0>
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


        /** This will dispatch the Redux Toolkit custom defined aboCouRed reducer in order to increment the about click count value in the Redux store. */
        disFun( aboCouRed() );


        /** aboCouNum   = About Count Number stores the number of times that the navigation bar's About page link has been clicked. These must use the {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const aboCouNum = store.getState().cliCouArr[0];

        /** This logs the number of times the About page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the navbar link for the ${ namStr } About page ${ aboCouNum } times!` );

    };

    // #endregion Function Body


    // #endregion handleClickAboFun



    // #region handleClickConFun


    // #region Function Type Definitions

    /** Handle Click Contact Function = This will handle the click event for the Contact page link in the navigation bar. */
    type HandleClickConFun            = () => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * handleClickConFun = Handle Click Contact Function
     * @see {@link HandleClickConFun}
     *
     * @summary
     * This will handle the click event for the Contact page link in the
     * navigation bar. A Redux Toolkit {@link store.dispatch} function will be
     * called in order to increase the
     * {@link State.cliCouArr[contactCount]} variable, then the updated state
     * value will be stored and used in order to log a console message of how
     * many times the Contact page link has been clicked. As mentioned in the
     * component summary, this is all completely unnecessary for a simple
     * navigation bar, but this was just for personal learning purposes to gain
     * some experience with using Redux Toolkit alongside React and TypeScript
     * in a more hands on way (instead of just tutorials) before moving on to
     * my next project that will use these concepts in a more practical,
     * realistic way.
     *
     * @author z4ntao <https://github.com/z4nta0>
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


        /** This will dispatch the Redux Toolkit custom defined conCouRed reducer in order to increment the contact click count value in the Redux store. */
        disFun( conCouRed() );


        /** conCouNum   = Contact Count Number stores the number of times that the navigation bar's Contact page link has been clicked. These must use the {@link store.getState} method instead of the {@link staObj} prop or it will use an outdated value. Also, the useSelector method is not needed here because this is simply for console logging purposes and is not for use directly in a React component or hook (i.e. no rerendering is required). */
        const conCouNum = store.getState().cliCouArr[1];

        /** This logs the number of times the Contact page link has been clicked to the console in order to verify that the click count is being tracked correctly. */
        console.log( `You clicked on the navbar link for the ${ namStr } Contact page ${ conCouNum } times!` );

    };

    // #endregion Function Body


    // #endregion handleClickConFun



    // #region Return Statement


    /** Navigation Bar Component Container Javascript XML = This stores the HTML-like code that the Navigation Bar component container will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const navBarComConJsx                                 = (

        <>

            { /** Start Navigation Bar Component */ }

            < NavBarCom namStr={ namStr } onClickLog={ handleClickLogFun } onClickHom={ handleClickHomFun } onClickAbo={ handleClickAboFun } onClickCon={ handleClickConFun } /> { /** Navigation Bar Component = This is the component that contains all of the HTML content for the navigation bar. */ }

            { /** End Navigation Bar Component */ }

        </>

    );


    return navBarComConJsx;


    // #endregion Return Statement

};



export default NavBarComCon;


