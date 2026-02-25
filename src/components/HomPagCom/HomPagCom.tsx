
// #region Imports

import React     from 'react';                    /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import reactLogo from '../../assets/react.svg';   /** This import is the React logo image that is used in the this component to display the official React logo. */
import styles    from './HomPagCom.module.css';   /** This import is the custom CSS file that contains all of the styling declarations for this component. */
import useAppDis from '../../hooks/useAppDis.ts'; /** This import is the custom React hook that provides access to the standard React Redux store dispatch function with proper TypeScript typing. */
import useAppSel from '../../hooks/useAppSel.ts'; /** This import is the custom React hook that provides access to the Redux store's state with the additional advantage of applying proper type definitions. */
import viteLogo  from '../../assets/vite.svg';    /** This import is the Vite logo image that is used in this component to display the official Vite logo. */


import { decNumRed    } from '../../features/couStaNumSlice.ts'; /** This import is the custom counter state number reducer's action creator function that will be used to dispatch an action to decrement the counter number state in the this component. */
import { incNumRed    } from '../../features/couStaNumSlice.ts'; /** This import is the custom counter state number reducer's action creator function that will be used to dispatch an action to increment the counter number state in the this component. */


import { type RooStaObj } from '../../appStoIns.ts';       /** This import is the custom type definition for the entire state object of the custom React Redux Toolkit store, which is inferred by the store's standard getState method. */
import { type UseAppDis } from '../../hooks/useAppDis.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Home Page Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type HomPagComPro = {

    namStr : string;

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
 * @param props.namStr - {@link appNamStr}
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

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables



    // #region State Variables

    /** App Dispatch Function   = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function. This must be executed as a function in order to obtain access the the standard React Redux store dispatch function that this custom hook wraps. */
    const appDisFun : UseAppDis = useAppDis();

    // #endregion State Variables


    // #endregion Component Scoped Variables



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


