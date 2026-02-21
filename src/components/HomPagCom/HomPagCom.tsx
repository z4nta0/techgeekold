
// #region Imports

import React     from 'react';                    /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import reactLogo from '../../assets/react.svg';   /** This import is the React logo image that is used in the this component to display the official React logo. */
import styles    from './HomPagCom.module.css';   /** This import is the custom CSS file that contains all of the styling declarations for this component. */
import useAppSel from '../../hooks/useAppSel.ts'; /** This import is the custom React hook that provides access to the Redux store's state with the additional advantage of applying proper type definitions. */
import viteLogo  from '../../assets/vite.svg';    /** This import is the Vite logo image that is used in this component to display the official Vite logo. */


import { decNumRed    } from '../../features/counterSlice.tsx'; /** This import is the custom counter state number reducer's action creator function that will be used to dispatch an action to decrement the counter number state in the this component. */
import { getMocDatJso } from '../../api/dataSlice.tsx';         /** This import is the custom mock data JSON reducer's thunk action creator function that will be used to dispatch an action to retrieve the mock data JSON state in the this component. */
import { incNumRed    } from '../../features/counterSlice.tsx'; /** This import is the custom counter state number reducer's action creator function that will be used to dispatch an action to increment the counter number state in the this component. */
import { useEffect    } from 'react';                           /** This import is the standard React hook that enables side effects for components. */


import { type Action        } from '@reduxjs/toolkit';         /** This import is the standard Typescript definition for an object used in React Redux management patterns that describes an intention to change the application state. */
import { type Dispatch      } from '@reduxjs/toolkit';         /** This import is the standard Typescript definition for a standard React Redux Toolkit dispatch function that accepts an action as an argument and returns void. */
import { type RooStaObj     } from '../../store.tsx';          /** This import is the custom type definition for the entire state object of the custom React Redux Toolkit store, which is inferred by the store's standard getState method. */
import { type ThunkDispatch } from '@reduxjs/toolkit';         /** This import is the standard Typescript definition for an interface provided by the standard React Redux thunk middleware that describes a dispatch function capable of accepting both standard React Redux action objects and thunk functions. */
import { type UseAppDis     } from '../../hooks/useAppDis.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function. */
import { type UseAppThu     } from '../../hooks/useAppThu.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function, this one designed specifically for working with thunk actions. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Home Page Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property disFun = Dispatch Function custom property stores the type that will be used for the custom {@link appDisFun} variable.
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 * @property staObj = State Object custom property stores the type that will be used for the custom {@link appStaObj} variable.
 * @property thuFun = Thunk Function custom property stores the type that will be used for the custom {@link appThuFun} variable.
 *
*/

type HomPagComPro = {

    disFun : UseAppDis;
    namStr : string;
    staObj : RooStaObj;
    thuFun : UseAppThu;

};

// #endregion Props Type Definitions



// #region HomPagCom

/**
 * HomPagCom = Home Page Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the Home page. The core functionality and appearance of the default React
 * + Vite installation is preserved, though I have heavily customized both to
 * suit my (learning) needs. The incrementing counter, decrementing counter and
 * mock back end data functionality is completely unnecessary, but this was all
 * done for personal learning purposes in order to gain some experience with
 * using React Redux Toolkit alongside React and TypeScript in a more hands on
 * way (instead of just tutorials) before moving on to my next project that
 * will use these concepts in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.disFun - {@link appDisFun}
 * @param props.namStr - {@link appNamStr}
 * @param props.staObj - {@link appStaObj}
 * @param props.thuFun - {@link appThuFun}
 * 
 * @returns A React JSX element representing the Home component.
 * @see {@link homPagComJsx}
 * 
 * @example
 * ```tsx
 * <Home /> // => homPagComJsx
 * ```
 *
*/

function HomPagCom ( props : HomPagComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Dispatch Function   = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function. This must be executed as a function in order to obtain access the the standard React Redux store dispatch function that this custom hook wraps. */
    const appDisFun : Dispatch = props.disFun();
    /** App Name String         = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string    = props.namStr;
    /** App Thunk Function      = This custom type stores the type that will be used for the custom {@link appThuFun} variable. */
    type AppThuFun              = ThunkDispatch< any, any, Action >;
    /** Thunk Dispatch Function = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function but with proper typing specifically for thunk actions. This must be executed as a function in order to obtain access the the standard React Redux store dispatch function that this custom hook wraps. */
    const appThuFun : AppThuFun = props.thuFun();

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


    /** Currently Loading Boolean   = This custom state variable stores the boolean value that indicates whether the mock data JSON is currently being fetched from the API, and it will be used to conditionally render a loading message in the component while the data is being fetched. */
    const { curLoaBoo } : AppSelObj = useAppSel( ( state : RooStaObj ) => state.mocDatJso );
    /** Encountered Error Boolean   = This custom state variable stores the boolean value that indicates whether an error was encountered while fetching the mock data JSON from the API, and it will be used to conditionally render an error message in the component if an error occurs during data fetching. */
    const { encErrBoo } : AppSelObj = useAppSel( ( state : RooStaObj ) => state.mocDatJso );
    /** Mock Data Object            = This custom state variable stores the actual mock data JSON object fetched from the API, and it will be used to display some of the content on the Home page. */
    const { mocDatObj } : AppSelObj = useAppSel( ( state : RooStaObj ) => state.mocDatJso );



    /* Data Paragraph Content = This custom variable stores the string that will be displayed in this component's .dataParagraph HTML element based on the current state of the mock data fetching process. If the data is currently being fetched, it will display a loading message. If an error was encountered during fetching, it will display an error message. Otherwise, it will display the actual mock back end JSON data string. */
    const datParCon : string  = curLoaBoo ? 'Fetching data from API...' : encErrBoo ? 'Error fetching data' : mocDatObj.mocDatStr;

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

    /** Home Page Component Javascript XML  = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const homPagComJsx : React.ReactElement = (


        // #region Home Section Element

        < section id='homSecEle' className={ styles.homeSection } > { /* Home Section Element = This custom section element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            { /** Start Home Header Element */ }

            <  header id='homHeaEle' className={ styles.homeHeader } > { /* Home Header Element = This custom header element is the container for the h1 heading and the logo anchors and images. */ }


                < h1 id='heaHe1Ele' className={ styles.headerH1 } >< span id='vitSpaEle' className={ styles.viteSpan } >Vite</ span >< span id='pluSpaEle' className={ styles.plusSpan } > + </ span >< span id='reaSpaEle' className={ styles.reactSpan } >React</ span ></ h1 > { /* Header H1 Element = This custom h1 element is the container for the title text of the page. The Span elements were added in order to align the individual parts of the heading with the logo and counter buttons. */ }



                { /** Start Header Div Element */ }

                < div id='heaDivEle' className={ styles.headerDiv } > { /* Header Div Element = This custom div element is the container for the logo anchors and images. */ }


                    { /** Start Vite Anchor Element */ }

                    <  a id='vitAncEle' className={ `${ styles.headerAnchors } ${ styles.viteAnchor }` } href='https://vite.dev' target='_blank' > { /* Vite Anchor Element = This custom anchor element is the container for the link to the Vite website and for the Vite logo image. */ }


                        < img id='vitImgEle' className={ `${ styles.headerImgs } ${ styles.viteImg }` } src={ viteLogo } alt='Vite logo' /> { /* Vite Image Element = This custom img element is the container for the official Vite logo image. */ }


                    </ a >

                    { /** End Vite Anchor Element */ }


                    { /** Start React Anchor Element */ }

                    <  a id='reaAncEle' className={ `${ styles.headerAnchors } ${ styles.reactAnchor }` } href='https://react.dev' target='_blank' > { /* React Anchor Element = This custom anchor element is the container for the link to the React website and for the React logo image. */ }


                        < img id='reaImgEle' className={ `${ styles.headerImgs } ${ styles.reactImg }` } src={ reactLogo } alt='React logo' /> { /* React Image Element = This custom img element is the container for the official React logo image. */ }


                    </ a >

                    { /** End React Anchor Element */ }


                </ div >

                { /** End Header Div Element */ }


            </ header>

            { /** End Home Header Element */ }



            { /** Start Content Div Element */ }

            <  div id='conDivEle' className={ styles.contentDiv } > { /* Content Div Element = This custom div element is the container for the content of this component, including the buttons to increment and decrement the counter state, and the paragraphs that display instructions for editing the site/app, instructions to click on the logos to learn more and the mock backend JSON data. */ }


                { /** Start Button Div Element */ }

                <  div id='butDivEle' className={ styles.buttonDiv } > { /* Button Div Element = This custom div element is the container for the buttons that increment and decrement the counter state. */ }


                    { /** Start Increment Button Element */ }

                    <  button id='incButEle' className={ `${ styles.contentButtons } ${ styles.incrementButton }` } onClick={ () => { appDisFun( incNumRed( 2 ) ) } } > { /* Increment Button Element = This custom button element is the container for the button that will dispatch an action to increment the counter state by 2 when clicked, as well as displaying the current value of the counter state in the button's text. */ }

                        Count = { useAppSel( ( state : RooStaObj ) => state.couStaNum ) }

                    </ button >

                    { /** End Increment Button Element */ }



                    { /** Start Decrement Button Element */ }

                    <  button id='decButEle' className={ `${ styles.contentButtons } ${ styles.decrementButton }` } onClick={ () => { appDisFun( decNumRed( 3 ) ) } } > { /* Decrement Button Element = This custom button element is the container for the button that will dispatch an action to decrement the counter state by 3 when clicked, as well as displaying the current value of the counter state in the button's text. */ }

                        Count = { useAppSel( ( state : RooStaObj ) => state.couStaNum ) }

                    </ button >

                    { /** End Decrement Button Element */ }


                </ div >

                { /** End Button Div Element */ }



                { /** Start Edit Paragraph Element */ }

                <  p id='ediParEle' className={ styles.editParagraph } > { /* Edit Paragraph Element = This custom paragraph element is the container for the text instructions on editing the code to test hot module replacement (HMR) functionality. */ }

                    Edit < code id='ediCodEle' className={ styles.editCode } >src/App.tsx</ code > and save to test HMR

                </ p >

                { /** End Edit Paragraph Element */ }



                { /** Start Learn Paragraph Element */ }

                <  p id='leaParEle' className={ styles.learnParagraph } > { /* Learn Paragraph Element = This custom paragraph element is the container for the text instructions on learning more about Vite and React. */ }

                    Click on the < a href='https://vite.dev' target='_blank' >Vite</ a > and < a href='https://react.dev' target='_blank' >React</ a > logos to learn more.

                </ p >

                { /** End Learn Paragraph Element */ }



                { /** Start Data Paragraph Element */ }

                <  p id='datParEle' className={ styles.dataParagraph } > { /* Data Paragraph Element = This custom paragraph element is the container for the mock backend JSON data text or for the placeholder text if the data is either loading or it encountered an error. */ }

                    { datParCon === undefined ? 'Data should go here' : datParCon } ~ { appNamStr }

                </ p >

                { /** End Data Paragraph Element */ }


            </ div >

            { /** End Content Div Element */ }


        </ section >

        // #endregion Home Section Element


    );



    return homPagComJsx;

    // #endregion Return Statement


};

// #endregion HomPagCom



export default HomPagCom;


