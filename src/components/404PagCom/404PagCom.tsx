
// #region Imports

import React      from 'react';                        /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles     from './404PagCom.module.css';       /** This import is the custom CSS file that contains all of the styling declarations for this component. */
import wheelSound from '../../assets/wheel-sound.mp3'; /** This import is the custom sound effect that is played when the wheel button is clicked. */


import { useEffect } from 'react'; /** This import is the standard React hook that enables side effects for components. */
import { useState  } from 'react'; /** This import is the standard React hook that enables state management in functional components. */

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



    // #region State Variables


    // #region Type Definitions

    /** Wheel Animation Boolean     = This custom type stores the type that will be used for the custom {@link wheAniBoo} state variable. */
    type WheAniBoo                  = boolean;
    /** Set Wheel Animation Boolean = This custom type stores the type that will be used for the custom {@link setWheAniBoo} state setter function. */
    type SetWheAniBoo               = React.Dispatch< React.SetStateAction< WheAniBoo > >;
    /** Use State Function Return   = This custom type stores the types that will be returned from the standard React {@link useState} hook. */
    type UseStaFunRet               = [ WheAniBoo, SetWheAniBoo ];

    // #endregion Type Definitions



    // #region State Initialization

    /** Wheel Animation Boolean                      = This custom variable stores the boolean value that indicates whether the wheel animations are currently active. */
    /** Set Wheel Animation Boolean                  = This custom variable stores the custom state setter function returned by the standard React {@link useState} hook, and it is used to execute updates to the custom {@link wheAniBoo} state variable whenever the wheel animation state changes. */
    const [ wheAniBoo, setWheAniBoo ] : UseStaFunRet = useState< WheAniBoo >( false );

    // #endregion State Initialization


    // #endregion State Variables


    // #endregion Component Scoped Variables



    // #region handleWheCliFun

    /**
     * handleWheCliFun = Handle Wheel Click Function
     * @see {@link handleWheCliFun}
     *
     * @summary
     * This custom function executes the handling the custom wheButEle HTML
     * element's on click event. It first checks if the wheel animation is
     * already active, and if so it returns early to prevent multiple rapid
     * clicks from causing issues. If the animation is not active, it proceeds
     * to execute the logic for the wheel click event. This includes
     * calculating the clocks (one normal clock and one for the page),
     * calculating the position of the custom wheSvgEle HTML element (which is
     * needed for the wheel glow effect CSS animation's custom properties),
     * playing the wheel sound effect, creating HTML elements and adding CSS
     * classes to trigger the aforementioned wheel glow effect animation, wheel
     * SVG spin animation and the body selector's wheel turn rumble CSS
     * animation. Finally, it will set a timeout to reset the custom wheAniBoo
     * state variable, remove any attached classes and created elements, and
     * then lastly redirecting the user to a random page.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleWheCliFun() // => void
     * ```
     *
    */

    const handleWheCliFun = () => {


        // #region Animation Already Running check

        /** This custom conditional statement performs a check to make sure that any animations related to the custom wheButEle HTML element's click event are not already running via checking the state variable value. */
        if ( wheAniBoo === true ) {


            return; /** Return Statement = This standard Javascript return statement will short circuit the function and prevent any further code from running. */


        };

        // #endregion Animation Already Running check



        // #region Function Scoped Variables

        /** Root Document Element     = This custom variable stores the root HTML element which is where any CSS custom properties that need to be accessed or manipulated by Javascript need to reside. */
        const rooDocEle : HTMLElement = document.documentElement;

        /** Wheel SVG Element                           = This custom variable stores the SVG HTML element which contains the image of the frozen donkey wheel from the TV show 'LOST' and whose coordinates and dimensions are used inside of the CSS wheel glow effect animation. This custom element will also have a class attached to it in order to trigger the wheel SVG spin CSS animation. */
        const wheSvgEle : HTMLElement | null            = document.getElementById( 'wheSvGEle' );
        /** Wheel SVG Element Bounding Client Rectangle = This custom variable stores the bounding client rectangle of the wheel SVG element, which provides the element's size and position relative to the viewport for use in determining the values for the wheel glow effect animation's custom properties. */
        const wseBrcNum : DOMRect                       = wheSvgEle !== null ? wheSvgEle.getBoundingClientRect() : { bottom : 1, height : 1, left : 1, right : 1, top : 1, x : 1, width : 1,  y : 1, toJSON : () => { return { bottom : 1, height : 1, left : 1, right : 1, top : 1, x : 1, width : 1, y : 1 } } };

        /** Wheel SVG Element Left Number = This custom variable stores the leftmost X coordinate of the wheel SVG element's bounding client rectangle, which is used to calculate the center position for the radial gradient that is used inside of the wheel glow effect CSS animation. */
        const wseLefNum : number          = wseBrcNum.left;
        /** Wheel SVG Element Top Number  = This custom variable stores the topmost Y coordinate of the wheel SVG element's bounding client rectangle, which is used to calculate the center position for the radial gradient that is used inside of the wheel glow effect CSS animation. */
        const wseTopNum : number          = wseBrcNum.top;

        /** Wheel SVG Element Center X Coordinate = This custom variable stores the X coordinate of the center of the wheel SVG element, which is used to calculate the value for the --whe-svg-xco CSS custom property that is used inside of the wheel glow effect CSS animation. */
        const wheSvgXco : number = wseLefNum + ( wseBrcNum.width  / 2 );
        /** Wheel SVG Element Center Y Coordinate = This custom variable stores the Y coordinate of the center of the wheel SVG element, which is used to calculate the value for the --whe-svg-yco CSS custom property that is used inside of the wheel glow effect CSS animation. */
        const wheSvgYco : number = wseTopNum + ( wseBrcNum.height / 2 );

        // #endregion Function Scoped Variables



        // #region Set CSS Custom Properties

        /** Root Document Element = This standard Javascript DOM API will set the CSS custom property that is used inside of the wheel glow effect CSS animation, which will center the radial gradient horizontally in the center of the wheel SVG element in order to radiate the glow effect outwards and eventually cover the entire viewport. */
        rooDocEle.style.setProperty( '--whe-svg-xco', `${ wheSvgXco }px` );
        /** Root Document Element = This standard Javascript DOM API will set the CSS custom property that is used inside of the wheel glow effect CSS animation, which will center the radial gradient vertically in the center of the wheel SVG element in order to radiate the glow effect outwards and eventually cover the entire viewport. */
        rooDocEle.style.setProperty( '--whe-svg-yco', `${ wheSvgYco }px` );

        // #endregion Set CSS Custom Properties



        /** Set Wheel Animation Boolean = This custom state setter function is used to control the state of the wheel animations, indicating whether said animations are currently animating or not in order to prevent repeated button presses from accidentally triggering the animations multiple times. */
        setWheAniBoo( true );



        // #region Play Audio Effects

        /** Wheel Sound Audio              = This custom variable stores a standard class instance of the HTMLAudioElement for the wheel-sound.mp3 file that will play the frozen donkey wheel sound effect from the TV show 'LOST'. */
        const wheSouAud : HTMLAudioElement = new Audio( wheelSound );

        /** Wheel Sound Audio = This standard Javascript Audio class instance method will play the frozen donkey wheel sound effect from the TV show 'LOST'. */
        wheSouAud.play();

        // #endregion Play Audio Effects



        // #region Create HTML Elements and Add Animation Classes

        /** Wheel Turn Rumble = This standard Javascript DOM API will add the custom .wheelTurnRumble class to the standard body element, which will trigger the custom whe-tur-rum CSS animation cuasing the entire page to shake. */
        document.body.classList.add( 'wheelTurnRumble' );

        /** Wheel SVG Spin = This standard Javascript DOM API will add the custom .wheelSpin class to the wheel SVG element as long as it is not null, which will trigger the custom whe-svg-spi CSS animation causing the SVG wheel image to spin. */
        if ( wheSvgEle !== null ) wheSvgEle.classList.add( 'wheelSVGSpin' );


        /** Glow Div Element          = This custom variable stores a newly created containing HTML div element, which will be attached to the body in order to overlay the entire viewport and create a glow effect via a custom CSS radial gradient animation that is centered on the wheel SVG element. */
        const gloDivEle : HTMLElement = document.createElement( 'div' );

        /** Glow Div Element = This standard Javascript DOM API will append the newly created glow div element to the body, allowing the custom .wheelGlowEffect selector to be applied to it and triggering the custom CSS radial gradient animation that will overlay the entire viewport. */
        document.body.appendChild( gloDivEle );

        /** Glow Div Element = This standard Javascript DOM API will add the custom .wheelGlowEffect class to the newly created glow div element, triggering the custom whe-glo-eff CSS radial gradient animation that will emanate from the center of the wheel SVG element and overlay the entire viewport. */
        gloDivEle.classList.add( 'wheelGlowEffect' );

        // #endregion Create HTML Elements and Add Animation Classes



        // #region Set Timeout for Removing Elements and Classes

        setTimeout( () => {


            /** Wheel Turn Rumble = This standard Javascript DOM API will remove the custom .wheelTurnRumble class from the body element, stopping the custom whe-tur-rum CSS animation that causes the entire page to shake. */
            document.body.classList.remove( 'wheelTurnRumble' );

            /** Wheel SVG Spin = This standard Javascript DOM API will remove the custom .wheelSpin class from the wheel SVG element as long as it is not null, stopping the custom whe-svg-spi CSS animation that causes the SVG wheel image to spin. */
            if ( wheSvgEle !== null ) wheSvgEle.classList.remove( 'wheelSVGSpin' );

            /** Glow Div Element = This standard Javascript DOM API will remove the newly created glow div element from the body, stopping the custom whe-glo-eff CSS radial gradient animation that overlays the entire viewport. */
            document.body.removeChild( gloDivEle );



            /** Set Wheel Animation Boolean = This custom state setter function is used to control the state of the wheel animations, indicating whether said animations are currently animating or not in order to prevent repeated button presses from accidentally triggering the animations multiple times. */
            setWheAniBoo( false );


        }, 6854); /** 6854 Milliseconds = This custom timeout duration is the same value used for all custom CSS animations that are not infinite, is equal to the golden ratio to the 4th power, and it defines how long the wheel animations will run before being stopped, cleaned up and then redirecting the user to a random page. */

        // #endregion Set Timeout for Removing Elements and Classes



        return; /** Return Statement = This standard Javascript return statement is used to exit the current function, ensuring that no further code is executed after the wheel animations have been handled. */


    };


    // #endregion handleWheCliFun



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

        <  section id='fofSecEle' className={ `${ styles.notFoundSection } ${ wheAniBoo ? styles.rumble : "" }` } > { /* 404 Section Element = This custom section element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


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

                    The { appNamStr }'s' scientists are hard at work on the problem but our working theory is that you have fallen into some sort of temporal anomaly from either before or after the page originally existed. If you wish to escape this anomaly, you will need to take your chances and turn the wheel below.

                </ p >

                { /** End Content Paragraph Element */ }



                { /** Start Wheel Button Element */ }

                <  button id='wheButEle' className={ styles.wheelButton } onClick={ handleWheCliFun } > { /* Wheel Button Element = This custom button element is the container for the wheel SVG and the span element. */ }


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


