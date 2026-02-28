
// #region Imports

import React, { useState }  from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles from './404PagCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { useEffect } from 'react'; /** This import is the standard React hook that enables side effects for components. */

// #endregion Imports



// #region Props Type Definitions

/**
 * 404 Page Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type FofPagComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region FofPagCom

/**
 * FofPagCom = 404 Page Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the 404 page. This page will be rendered by React Router anytime a route
 * does not match any defined paths. Most 404 pages tend to have fun with their
 * content, which makes sense since it can be frustrating for users and by
 * giving them something fun or whimsical it can alleviate that frustration. I
 * went with the TV show 'LOST' theme, with the idea behind that being that
 * requesting a page that does not exist is a lot like how the island was lost
 * in time and space, as well as with the characters being lost from
 * civilization and/or their normal lives. This was all done for personal
 * learning purposes to gain some experience with using React and TypeScript in
 * a more hands on way (instead of just tutorials) before moving on to my next
 * project that will use these concepts in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the FofPagCom component.
 * @see {@link fofPagComJsx}
 * 
 * @example
 * ```tsx
 * <FofPagCom /> // => fofPagComJsx
 * ```
 *
*/

function FofPagCom ( props : FofPagComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables



    const [ rumbling, setRumbling ] = useState( false );



    const handleWheelClick = () => {


        if ( rumbling === true ) {


            return;


        };



        /** Pixels Container Div             = This custom variable stores the containing HTML element which contains all of the square div HTML elements that are used for the pixelated transition effect animation. */
        const wheSvgEle : HTMLElement | null = document.getElementById( 'wheSvGEle' );

        const wseXcoNum = wheSvgEle?.getBoundingClientRect().left ?? 0;
        const wseYcoNum = wheSvgEle?.getBoundingClientRect().top ?? 0;

        const wseMidXcoNum = wseXcoNum + ( wheSvgEle?.getBoundingClientRect().width ?? 0 ) / 2;
        const wseMidYcoNum = wseYcoNum + ( wheSvgEle?.getBoundingClientRect().height ?? 0 ) / 2;

        const root = document.documentElement;
        root.style.setProperty( '--whe-svg-xco', `${ wseMidXcoNum }px` );
        root.style.setProperty( '--whe-svg-yco', `${ wseMidYcoNum }px` );



        setRumbling( true );



        document.body.classList.add( 'rumble' );


        /** Snowfall Section Element  = This custom variable stores a newly created containing HTML section element to which all snowflake HTML div elements will be attached and whose dimensions will be used to update and contain each snowflake HTML div element's position. */
        const yelGloOve : HTMLElement = document.createElement( 'div' );

        document.body.appendChild( yelGloOve );

        yelGloOve.classList.add( 'yellowGlowOverlay' );


        wheSvgEle?.classList.add( 'wheelSpin' );



        setTimeout( () => {


            setRumbling( false );



            document.body.classList.remove( 'rumble' );

            wheSvgEle?.classList.remove( 'wheelSpin' );

            document.body.removeChild( yelGloOve );

        }, 6000);


    };


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

    useEffect(() => {

        return;


    }, []); /** Empty Aray = This custom dependency array stores the values that define when useEffect should be run, with an empty dependency array ensuring that this hook will run only once when the component mounts. */

    // #endregion useEffect



    // #region Return Statement

    /** 404 Page Component Javascript XML  = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const fofPagComJsx : React.ReactElement = (


        // #region 404 Section Element

        <  section id='fofSecEle' className={ `${ styles.notFoundSection } ${ rumbling ? styles.rumble : "" }` } > { /* 404 Section Element = This custom section element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            {/* Yellow glow overlay */}
        <div className={ styles.yellowGlowOverlay }/>


            { /** Start 404 Header Element */ }

            <  header id='fofHeaEle' className={ styles.notFoundHeader } > { /* 404 Header Element = This custom header element is the container for the h1 heading and the paragraph. */ }


                < h1 id='heaHe1Ele' className={ styles.headerh1 } >< span id='he1SpaEle' className={ ` ${ styles.h1Span } ${ styles.impactFont }` } >404</ span ></ h1 > { /* Header H1 Element = This custom h1 element is the container for the title text of the page. H1 Span Element = This custom span element was added in order to make the CSS spinning and scaling animation work properly. */ }



                < p id='heaParEle' className={ styles.headerParagraph } >The page you're looking for is < span id='hepSpaEle' className={ styles.impactFont } >LOST</ span >... or was it ever really there?</ p > { /* Header Paragraph Element = This custom paragraph element is the container for the custom text of the header. Header Paragraph Span Element = This custom span element was added in order to style the 'LOST' text properly. */ }


            </ header >

            { /** End 404 Header Element */ }



            { /** Start Content Div Element */ }

            <  div id='conDivEle' className={ styles.contentDiv } > { /* Content Div Element = This custom div element is the container for the content of this component, including the paragraph explaining the page and the wheel button SVG. */ }


                { /** Start Content Paragraph Element */ }

                < p id='conParEle' className={ styles.contentParagraph } > { /* Content Paragraph Element = This custom paragraph element is the container for the text instructions on editing the code to test hot module replacement (HMR) functionality. */ }

                    The { appNamStr }'s' scientists are hard at work on the problem and our best theory is that you have fallen into some sort of temporal anomaly. If you wish to leave, you will need to take your chances and turn the wheel below.

                </ p >

                { /** End Content Paragraph Element */ }



                { /** Start Wheel Button Element */ }

                <  button id='wheButEle' className={ styles.wheelButton } onClick={ handleWheelClick } > { /* Wheel Button Element = This custom button element is the container for the wheel SVG and the span element. */ }


                    { /** Start Wheel SVG Element */ }

                    <  svg id='wheSvGEle' className={ styles.wheelSVG } width='110' height='110' viewBox='0 0 110 110' fill='none' xmlns='http://www.w3.org/2000/svg' > { /* Wheel SVG Element = This custom SVG element is the container for the wheel SVG code. */ }


                        { /** Start Outer Ring */ }

                        < circle cx='55' cy='55' r='50' stroke='hsl( 29.034, 46.979%, 46.979% )' strokeWidth='6.854' fill='none' />



                        < circle cx='55' cy='55' r='44' stroke='hsl( 29.034, 46.979%, 29.034% )' strokeWidth='2.618' fill='none' strokeDasharray='4.236 2.618' />

                        { /** End Outer Ring */ }



                        { /** Start Inner Hub */ }

                        < circle cx='55' cy='55' r='10' stroke='hsl( 29.034, 46.979%, 46.979% )' strokeWidth='4.236' fill='hsl( 29.034, 76.013%, 11.090% )' />



                        < circle cx='55' cy='55' r='5' fill='hsl( 29.034, 46.979%, 46.979% )' />

                        { /** End Inner Hub */ }



                        { /** Start Eight Spokes */ }

                        { [ 0, 45, 90, 135, 180, 225, 270, 315 ].map( ( degNum, indNum ) => {


                            const radDegNum = ( degNum * Math.PI ) / 180;
                            const xcoOneNum = 55 + Math.cos( radDegNum ) * 12;
                            const ycoOneNum = 55 + Math.sin( radDegNum ) * 12;
                            const xcoTwoNum = 55 + Math.cos( radDegNum ) * 43;
                            const ycoTwoNum = 55 + Math.sin( radDegNum ) * 43;



                            return < line key={ indNum } x1={ xcoOneNum } y1={ ycoOneNum } x2={ xcoTwoNum } y2={ ycoTwoNum } stroke='hsl( 29.034, 46.979%, 46.979% )' strokeWidth='4.236' strokeLinecap='round' />;


                        } ) }

                        { /** End Eight Spokes */ }



                        { /** Start Grip Pegs on Outer Ring */ }

                        { [ 0, 45, 90, 135, 180, 225, 270, 315 ].map( ( degNum, indNum ) => {


                            const radDegNum = ( degNum * Math.PI ) / 180;
                            const cenXcoNum = 55 + Math.cos( radDegNum ) * 50;
                            const cenYcoNum = 55 + Math.sin( radDegNum ) * 50;



                            return < circle key={ indNum } cx={ cenXcoNum } cy={ cenYcoNum } r='4.236' fill='hsl( 29.034, 46.979%, 46.979% )' stroke='hsl( 29.034, 46.979%, 29.034% )' strokeWidth='1.618' />;


                        } ) }

                        { /** End Grip Pegs on Outer Ring */ }


                    </ svg >

                    { /** End Wheel SVG Element */ }



                    < span id='wheSpaEle' className={ styles.wheelSpan } >Turn the wheel</ span > { /* Wheel Span Element = This custom span element is the container for the text inside of the wheel button. */ }


                </ button >

                { /** End Wheel Button Element */ }


            </ div >

            { /** End Content Div Element */ }


        </ section >

        // #endregion 404 Section Element


    );



    return fofPagComJsx;

    // #endregion Return Statement


};

// #endregion FofPagCom



export default FofPagCom;


