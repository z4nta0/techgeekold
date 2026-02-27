
// #region Imports

import React  from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles from './404PagCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { useEffect } from 'react'; /** This import is the standard React hook that enables side effects for components. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Sidebar One Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type SidOneComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region SidOneCom

/**
 * SidOneCom = Sidebar One Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the Sidebar 1. There is no complex logic or functionality for this page.
 * This was all done for personal learning purposes to gain some experience
 * with using React and TypeScript in a more hands on way (instead of just
 * tutorials) before moving on to my next project that will use these concepts
 * in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the SidOneCom component.
 * @see {@link sidOneComJsx}
 * 
 * @example
 * ```tsx
 * <SidOneCom /> // => sidOneComJsx
 * ```
 *
*/

function SidOneCom ( props : SidOneComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


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

    useEffect(() => {return;
  }, []); /** Empty Aray = This custom dependency array stores the values that define when useEffect should be run, with an empty dependency array ensuring that this hook will run only once when the component mounts. */

    // #endregion useEffect



    // #region Return Statement

    /** Sidebar One Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const sidOneComJsx : React.ReactElement = (


        // #region Sidebar One Div Element

        <  section className={ styles.notFoundSection } >


            <  header className={ styles.notFoundHeader } >


                < h1 className={ styles.headerh1 } >< span className={ ` ${ styles.h1Span } ${ styles.impactFont }` } >404</ span ></ h1 >



                < p className={ styles.headerParagraph } >The page you're looking for is < span className={ ` ${ styles.contentSpan } ${ styles.impactFont }` } >LOST</ span >... or was it ever really there?</ p >


            </ header >



            <  div className={ styles.contentDiv } >


                < p className={ styles.contentParagraph } >

                    The { appNamStr }'s' scientists are hard at work on the problem and our best theory is that you have fallen into some sort of temporal anomaly. If you wish to leave, you will need to take your chances and turn the wheel below.

                </ p >



                {/* Frozen Donkey Wheel Button */}
                <  button className={ styles.wheelButton }  >


                    <  svg className={ styles.wheelSVG } width='110' height='110' viewBox='0 0 110 110' fill='none' xmlns='http://www.w3.org/2000/svg' >


                        { /* Outer ring */ }

                        < circle cx='55' cy='55' r='50' stroke='hsl( 29.034, 46.979%, 46.979% )' strokeWidth='6.854' fill='none' />



                        < circle cx='55' cy='55' r='44' stroke='hsl( 29.034, 46.979%, 29.034% )' strokeWidth='2.618' fill='none' strokeDasharray='4.236 2.618' />



                        { /* Inner hub */ }

                        < circle cx='55' cy='55' r='10' stroke='hsl( 29.034, 46.979%, 46.979% )' strokeWidth='4.236' fill='hsl( 29.034, 76.013%, 11.090% )' />



                        < circle cx='55' cy='55' r='5' fill='hsl( 29.034, 46.979%, 46.979% )' />



                        { /* 8 spokes */ }

                        { [ 0, 45, 90, 135, 180, 225, 270, 315 ].map( ( degNum, indNum ) => {


                            const radDegNum = ( degNum * Math.PI ) / 180;
                            const xcoOneNum = 55 + Math.cos( radDegNum ) * 12;
                            const ycoOneNum = 55 + Math.sin( radDegNum ) * 12;
                            const xcoTwoNum = 55 + Math.cos( radDegNum ) * 43;
                            const ycoTwoNum = 55 + Math.sin( radDegNum ) * 43;



                            return < line key={ indNum } x1={ xcoOneNum } y1={ ycoOneNum } x2={ xcoTwoNum } y2={ ycoTwoNum } stroke='hsl( 29.034, 46.979%, 46.979% )' strokeWidth='4.236' strokeLinecap='round' />;


                        } ) }



                        { /* Grip pegs on outer ring */ }

                        { [ 0, 45, 90, 135, 180, 225, 270, 315 ].map( ( degNum, indNum ) => {


                            const radDegNum = ( degNum * Math.PI ) / 180;
                            const cenXcoNum = 55 + Math.cos( radDegNum ) * 50;
                            const cenYcoNum = 55 + Math.sin( radDegNum ) * 50;



                            return < circle key={ indNum } cx={ cenXcoNum } cy={ cenYcoNum } r='4.236' fill='hsl( 29.034, 46.979%, 46.979% )' stroke='hsl( 29.034, 46.979%, 29.034% )' strokeWidth='1.618' />;


                        } ) }


                    </ svg >



                    < span className={ styles.wheelSpan } >Turn the wheel</ span >


                </ button >


            </ div >


        </ section >

        // #endregion Sidebar One Div Element


    );



    return sidOneComJsx;

    // #endregion Return Statement


};

// #endregion SidOneCom



export default SidOneCom;


