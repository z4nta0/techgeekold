
// #region Imports

import React     from 'react';                    /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles    from './SidTwoCom.module.css';   /** This import is the custom CSS file that contains all of the styling declarations for this component. */
import useAppSel from '../../hooks/useAppSel.ts'; /** This import is the custom React hook that provides access to the Redux store's state with the additional advantage of applying proper type definitions. */
import useAppThu from '../../hooks/useAppThu.ts'; /** This import is the custom React hook that provides access to the standard React Redux store dispatch function with proper TypeScript typing, specifically for working with thunk actions. */


import { getMocDatJso } from '../../api/mocDatJsoSlice.ts'; /** This import is the custom mock data JSON reducer's thunk action creator function that will be used to dispatch an action to retrieve the mock data JSON state in the this component. */
import { useEffect    } from 'react';                       /** This import is the standard React hook that enables side effects for components. */


import { type RooStaObj } from '../../appStoIns.ts';       /** This import is the custom type definition for the entire state object of the custom React Redux Toolkit store, which is inferred by the store's standard getState method. */
import { type UseAppThu } from '../../hooks/useAppThu.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function, this one designed specifically for working with thunk actions. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Sidebar Two Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type SidTwoComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region SidTwoCom

/**
 * SidTwoCom = Sidebar Two Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the Sidebar 2. There is no complex logic or functionality for this page.
 * This was all done for personal learning purposes to gain some experience
 * with using React and TypeScript in a more hands on way (instead of just
 * tutorials) before moving on to my next project that will use these concepts
 * in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the SidTwoCom component.
 * @see {@link sidTwoComJsx}
 * 
 * @example
 * ```tsx
 * <SidTwoCom /> // => sidTwoComJsx
 * ```
 *
*/

function SidTwoCom ( props : SidTwoComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


    // #region State Variables


    // #region AppSelObj

    /**
     * App Selector Object = This custom type stores the types that will be used for the return values from the custom {@link useAppSel} React hook.
     * 
     * @property curLoaBoo = Currently Loading Boolean custom property stores the type that will be used for the custom {@link curLoaBoo} variable.
     * @property encErrBoo = Encountered Error Boolean custom property stores the type that will be used for the custom {@link encErrBoo} variable.
     * @property mocDatObj = Mock Data String custom property stores the type that will be used for the custom {@link mocDatObj} variable.
     *
    */

    type AppSelObj = {

        curLoaBoo : boolean;
        encErrBoo : boolean;
        mocDatObj : { mocDatStr : string; };

    };

    // #endregion AppSelObj



    /** Thunk Dispatch Function     = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function but with proper typing specifically for thunk actions. This must be executed as a function in order to obtain access the the standard React Redux store dispatch function that this custom hook wraps. */
    const   appThuFun   : UseAppThu = useAppThu();
    /** Currently Loading Boolean   = This custom state variable stores the boolean value that indicates whether the mock data JSON is currently being fetched from the API, and it will be used to conditionally render a loading message in the component while the data is being fetched. */
    const { curLoaBoo } : AppSelObj = useAppSel( ( state : RooStaObj ) => state.mocDatJso );
    /** Encountered Error Boolean   = This custom state variable stores the boolean value that indicates whether an error was encountered while fetching the mock data JSON from the API, and it will be used to conditionally render an error message in the component if an error occurs during data fetching. */
    const { encErrBoo } : AppSelObj = useAppSel( ( state : RooStaObj ) => state.mocDatJso );
    /** Mock Data Object            = This custom state variable stores the actual mock data JSON object fetched from the API, and it will be used to display content in the sidebar one's paragraph element. */
    const { mocDatObj } : AppSelObj = useAppSel( ( state : RooStaObj ) => state.mocDatJso );



    /* Sidebar Two Paragraph Content = This custom variable stores the string that will be displayed in this component's .sidebarTwoParagraph HTML element based on the current state of the mock data fetching process. If the data is currently being fetched, it will display a loading message. If an error was encountered during fetching, it will display an error message. Otherwise, it will display the actual mock back end JSON data string. */
    const sb2ParCon : string         = curLoaBoo ? 'Fetching data from API...' : encErrBoo ? 'Error fetching data' : mocDatObj.mocDatStr;

    // #endregion State Variables


    // #endregion Component Scoped Variables



    // #region useEffect

    /**
     * useEffect
     *
     * @summary
     * The standard React useEffect hook executes side effects for functional
     * components, such as data fetching, subscriptions or manual DOM
     * manipulation. Its main purpose is to synchronize a component with
     * external systems. The custom inner code block of this hook handles the
     * fetching of the mock back end JSON data using the custom React hook that
     * wraps the standard React Redux Toolkit useDispatch hook. The empty
     * dependency array ensures that this only runs once when the component is
     * first rendered.
     *
     * @author React  <https://react.dev/reference/react/useEffect>
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * This function is not called directly, but rather it is run on component
     * mount and on changes to whatever variables are specified in the
     * dependency array.
     * ```
     *
    */

    useEffect( () => {


        /** App Thunk Function = This custom React hook executes the standard Redux Toolkit useDispatch hook in order to execute the async thunk action which fetches the mock back end JSON data. */
        appThuFun( getMocDatJso() );


    }, []); /** Empty Aray = This custom dependency array stores the values that define when useEffect should be run, with an empty dependency array ensuring that this hook will run only once when the component mounts. */

    // #endregion useEffect



    // #region Return Statement

    /** Sidebar Two Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const sidTwoComJsx : React.ReactElement = (


        // #region Sidebar Two Div Element

        <  div id='sb2DivEle' className={ styles.sidebarTwoDiv } > { /* Sidebar Two Div Element = This custom section element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            { /** Start Sidebar Two Paragraph Element */ }

            < p  id='sb2ParEle' className={ styles.sidebarTwoParagraph } > { /* Sidebar Two Paragraph Element = This custom paragraph element is the container for the mock backend JSON data. */ }

                { sb2ParCon === undefined ? 'Data should go here' : sb2ParCon } ~ { appNamStr }

            </ p >

            { /** End Sidebar Two Paragraph Element */ }


        </ div >

        // #endregion Sidebar Two Div Element


    );



    return sidTwoComJsx;

    // #endregion Return Statement


};

// #endregion SidTwoCom



export default SidTwoCom;


