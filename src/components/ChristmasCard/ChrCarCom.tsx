
// #region Imports

import { cleSnoFun }          from "../../animations/snowfall.tsx"; /** Clear Snowfall Function            = This is the function that will clear and stop the snowfall animation effect. */
import { gsap }               from "gsap";                          /** Green Socks Animation Platform     = This is the Green Socks Animation Platform core library. */
import   iniSnoFun            from "../../animations/snowfall.tsx"; /** Initialize Snowfall Function       = This is the function that will initialize and start the snowfall animation effect. */
import { type ReactElement }  from 'react';                         /** React Element                      = This is the React type definition for a React JSX element. */
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";       /** Scramble Text Plugin               = This is a Green Socks Animation Platform plugin that will handle HTML text scrambling animations. */
import   snowman              from '../../assets/snowman.png';      /** Snowman                            = This is the snowman image asset that will be used in the .snowfallSection HTML element. */
import { SplitText }          from "gsap/SplitText";                /** Split Text                         = This is a Green Socks Animation Platform plugin that will handle HTML text splitting animations (single character, word or line animations). */
import   styles               from './ChrCarCom.module.css';        /** Styles                             = This is the CSS module stylesheet for the ChristmasCard component. */
import { useEffect }          from 'react';                         /** Use Effect                         = This is the React useEffect() hook that will handle side effects in functional components (when certain code should be run and/or re-run based on changes to specific dependencies). */
import { useGSAP }            from "@gsap/react";                   /** Use Green Socks Animation Platform = This is the Green Socks Animation Platform custom React hook that will handle GSAP functionality in React components. */
import { useLocation }        from 'react-router-dom';              /** Use Location                       = This is the React Router DOM useLocation() hook that will provide access to the current URL properties and parameters. */
import   useWinSiz            from "../../hooks/useWinSiz.tsx";     /** Use Window Size                    = This is a custom React hook that will provide the current window viewport dimensions and will also be used to trigger the useEffect() hook on window resize events, as well as altering certain animation settings based on how small or big its dimeions are. */

// #endregion Imports



/** This is a plugin for the GSAP core library that ensures the two work seamlessly together, as well as preventing tree shaking issues in build tools/bundlers. */
gsap.registerPlugin( useGSAP, ScrambleTextPlugin, SplitText );



/**
 * ChrCarCom = Christmas Card Component
 *
 * @summary
 * This functional component will render a digital Christmas card with a
 * snowfall animation effect, as well as various text animations using the
 * Green Socks Animation Platform (GSAP) library and its plugins. It will use
 * a position of fixed with full viewport dimensions in order to overlay the
 * entire application when navigated to via React Router.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props - This component does not take any props, or more accurately it does not use any props.
 * 
 * @returns A React JSX element representing the Christmas Card component.
 * @see {@link chrCarComJsx}
 * 
 * @example
 * ```tsx
 * <ChristmasCard /> // => <section id='comSecEle'> ... </section>
 * ```
 *
*/

function ChrCarCom () : ReactElement {



    // #region Component Scoped Variables

    /**
     * Component Scoped Variables
     *
     * @summary
     * These values are all scoped to the ChristmasCard component function,
     * and are meant to be set and shared between the various functions.
     *
    */


    // #region State Variables

    /** Window Height Number, Window Width Number = These values come from a custom defined hook that provides the current window viewport height and width numbers and will trigger re-renders when the window is resized and their corresponding state variables change. They are also used to trigger the {@link useEffect} hook for window resize events in order to recalculate the snowfall and the pixelated transitional animation parameters. */
    const { winHeiNum, winWidNum }                = useWinSiz();

    /** Search                             = This value is the search property that is returned from the useLocation() React Router hook. It is a string value representing the query parameters in the URL. */
    const { search } : { search : string } = useLocation();
    /** Search Parameters Instance         = This value is an instance of the URLSearchParams class that uses the previously defined {@link search} variable and provides methods for interacting with the query parameters. This is a web standard API and not React specific. */
    const seaParIns  : URLSearchParams     = new URLSearchParams( search );
    /** Name Parameter String              = This value is the name query parameter (or null) which will be used to customize the Christmas Card component's h1 element that is inside of {@link chrCarJsx}. It is acquired using the get() method on the previously defined {@link seaParIns} URLSearchParams class instance. */
    const namParStr  : string | null       = seaParIns.get( 'name' );

    // #endregion State Variables


    // #endregion Component Scoped Variables



    // #region useGSAP


    // #region Function Body

    /**
     * cleSnoFun = Clear Snowfall Function
     * @see {@link CleSnoFun}
     *
     * @summary
     * This is a drop in replacement for the {@link useEffect} or
     * {@link useLayoutEffect} React hooks and automatically handles cleanup
     * using {@link gsap.context}. This hook solves a few React specific
     * friction points, because cleanup is important in React and this makes it
     * simple. The custom inner code blocks inside of useGSAP will perform
     * multiple animations in sequence using a GSAP Timeline class instance. 1)
     * will be a custom pixelated transition animation to reveal the hacked
     * section HTML element, 2) will be the hacked header 1 HTML element GSAP
     * Scramble text animation, 3) will be the hacked header 1 HTML element
     * custom glitchy text animation, 4) will be the hacked paragraph HTML
     * element GSAP Split Text animation, 5) will be another hacked header 1
     * HTML element custom glitchy text animation, 6) will the hacked paragraph
     * HTML element custom glitchy text animation, 7) will be another custom
     * pixelated transition animation to cover the hacked section, 8) will be a
     * simple fade in animation of the snowfall section HTML element, 9) will
     * be another pixelated transition animation to reveal the snowfall
     * section, and 10) will be the snowfall header 1, paragraph and span HTML
     * elements GSAP Split Text Animation which is the final animation. The
     * empty dependency array ensures this effect runs only once when the
     * component mounts.
     *
     * @author GSAP <https://gsap.com/resources/React/>
     * @author z4ntao        <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * This function is not called directly, but rather it is run similar to
     * the React useEffect() hook which runs on component mount and on changes
     * to whatever state variables are specified in the dependency array.
     * ```
     *
    */

    useGSAP( () => {

        // #region Function Variables

        /** GSAP Timeline Instance      = This stores an instance of the GSAP timeline class with methods that custom GSAP animations will be attached to and then executed in sequence. */
        const gsaTimIns : GSAPTimeline  = gsap.timeline();
        /** Squares Element Array       = This stores an array of all HTML elements with the class name pixelatedTransitionSquares, which are the square div HTML elements that are located in the squSecEle HTML element and cover the entire viewport in order to create a pixelated transition effect animation between the different parts of the component's entire animation. */
        const squEleArr : HTMLElement[] = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) );

        /** Hacked Header 1 Element          = This stores the h1 element with the id hacHe1Ele that is located in the hacSecEle HTML element. This element will have two GSAP text animations applied to it, the first being a scramble text animation (applied once) and the second being a gltiched text animation (applied twice). */
        const hacHe1Ele : HTMLElement | null = document.getElementById( 'hacHe1Ele' );
        /** Hacked Paragraph Element         = This stores the paragraph element with the id hacParEle that is located in the hacSecEle HTML element. This element will have a gltiched text animation applied to it once. */
        const hacParEle : HTMLElement | null = document.getElementById( 'hacParEle' );
        /** Hacked Split Text Instance       = This stores a GSAP Split Text class instance that splits elements with the class hackedSplitText (this includes only the {@link hacParEle} HTML element) into words and characters which will then be animated individually in a staggered fashion. */
        const hacSplIns : SplitText          = SplitText.create( '.hackedSplitText', { type : 'words, chars' } );
        /** Snowfall Section Element         = This stores the section element with the id snoSecEle that is located in the snoSecEle HTML element. This element will be faded in after the hacked section animations are complete and whose text will have a GSAP split text animation applied to it. */
        const snoSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' );
        /** Snowfall Split Text Instance     = This stores a GSAP Split Text class instance that splits all text elements with the class snowfallSplitText (this includes the snoHe1Ele, snoParEle and snoSpaEle HTML elements) into words and characters which will then be animated individually in a staggered fashion. */
        const snoSplIns : SplitText          = SplitText.create( '.snowfallSplitText', { type : 'words, chars' } );
        /** Shuffled Squares Function        = This stores a GSAP generic function that will return a shuffled array of the previously defined {@link squEleArr} array. This is used in the pixelated transition effect animation in order to randomly select the order in which each pixelatedTransitionSquares HTML element will be faded in or out. */
        const shuSquFun : HTMLElement[]      = gsap.utils.shuffle( squEleArr );

        // #endregion Function Variables


        // #region 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)

        /** This performs a shuffled fade out animation of the pixelatedTransitionSquares HTML elements located in the squSecCon HTML element in a staggered fashion in order to create a pixelated transition effect from the initial page load to reveal the hacSecEle HTML element. */
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       /** This stores the target opacity that each pixelatedTransitionSquares HTML element animation will end at. */
            duration : 0.00333, /** This stores the duration of each individual pixelatedTransitionSquares HTML element fade out animation, in seconds. */
            stagger  : {        /** This stores the staggered animation's settings. */

                each : 0.00333,     /** This stores the time gap between each pixelatedTransitionSquares HTML element fade out animation, in seconds. */
                from : 'random',    /** This stores the starting point of the staggered animation, in this case it will be random. */
                grid : 'auto',      /** This stores the grid columns and rows of the pixelatedTransitionSquares HTML elements to be shuffled, in this case it will automatically determine the grid columns and rows. */
                ease : 'power1.out' /** This stores a built in GSAP ease out animation which are best used for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction. */

            },

        });

        // #endregion 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)


        /** This is the 1st GSAP timeline pause, between the first pixelated transition animation (to reveal the hacSecEle HTML element) and the {@link hacHe1Ele} HTML element scramble text animation. */
        gsaTimIns.add( () => {}, '+=1' );


        // #region 2nd GSAP Animation - Hacked Header Scramble Text

        /** This will animate and place (into the hacHe1Ele HTML element) one character at a time of the target text as a random character until the full target text is revealed. */
        gsaTimIns.to( hacHe1Ele, {

            duration     : 3,                          /** This stores the total duration of the entire scramble text animation, in seconds. */
            scrambleText : `You've Just Been Hacked!!` /** This stores the target text that the animation will end at. */

        });

        // #endregion 2nd GSAP Animation - Hacked Header Scramble Text


        // #region 3rd GSAP Animation - 1st Hacked Header Glitch Effect

        /** This distorts the hacHe1Ele HTML element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );
        /** This undistorts the hacHe1Ele HTML element back to normal using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );
        /** This quickly makes the hacHe1Ele HTML element invisible, creating a flicker effect when used with the below opacity animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } );
        /** This quickly makes the hacHe1Ele  HTML element visible, creating a flicker effect when used with the above opacity animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } );
        /** This moves the hacHe1Ele HTML element 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } );
        /** This undoes the previous move of the hacHe1Ele HTML element back to its original position, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } );
        /** This scales the hacHe1Ele HTML element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );
        /** This scales the hacHe1Ele HTML element back to its original vertical scale with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );

        // #endregion 3rd GSAP Animation - 1st Hacked Header Glitch Effect


        // #region 4th GSAP Animation - Hacked Paragraph Split Character Text Animation

        /** This animates the characters of the {@link hacParEle} HTML element one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in. */
        gsaTimIns.from( hacSplIns.chars, {

            duration  : 3,   /** This stores the total duration of the entire animation, in seconds. */
            x         : 10,  /** This stores the amount to animate right to left, in pixels. */
            autoAlpha : 0,   /** This stores the fade in value from opacity : 0 and visibility : hidden. */
            stagger   : 0.05 /** This stores the time gap between each character animation, in seconds. */

        });

        // #endregion 4th GSAP Animation - Hacked Paragraph Split Character Text Animation


        // #region 5th & 6th GSAP Animation - 2nd Hacked Header Glitch Effect & Hacked Paragraph Glitch Effect

        /** This distorts the hacHe1Ele HTML element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );
        /** This distorts the hacParEle HTML element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );

        /** This undistorts the hacHe1Ele HTML element back to normal using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );
        /** This undistorts the hacParEle HTML element back to normal using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );

        /** This quickly makes the hacHe1Ele HTML element invisible, creating a flicker effect when used with the below opacity animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } );
        /** This quickly makes the hacParEle HTML element invisible, creating a flicker effect when used with the below opacity animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 0                              } );

        /** This quickly makes the hacHe1Ele HTML element visible, creating a flicker effect when used with the above opacity animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } );
        /** This quickly makes the hacParEle HTML element visible, creating a flicker effect when used with the above opacity animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 1                              } );

        /** This moves the hacHe1Ele HTML element 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } );
        /** This moves the hacParEle HTML element 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : -20                            } );

        /** This undoes the previous move of the hacHe1Ele HTML element back to its original position, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } );
        /** This undoes the previous move of the hacParEle HTML element back to its original position, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : 0                              } );

        /** This scales the hacHe1Ele HTML element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );
        /** This scales the hacParEle HTML element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );

        /** This scales the hacHe1Ele HTML element back to its original vertical scale with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );
        /** This scales the hacParEle HTML element back to its original vertical scale with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );

        // #endregion 5th & 6th GSAP Animation - 2nd Hacked Header Glitch Effect & Hacked Paragraph Glitch Effect


        /** This is the 2nd GSAP timeline pause, between the {@link hacParEle} HTML element glitch effect animation and the second pixelated transition animation (to cover the hacSecEle HTML element). */
        gsaTimIns.add( () => {}, '+=1' );


        // #region 7th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)

        /** This performs a shuffled fade in animation of the pixelatedTransitionSquares HTML elements located in the squSecCon HTML element in a staggered fashion in order to create a pixelated transition effect from the hacSecEle HTML element to a filled, opaque squSecEle HTML element. */
        gsaTimIns.to( shuSquFun, {

            opacity  : 1,       /** This stores the target opacity that each pixelatedTransitionSquares HTML element animation will end at. */
            duration : 0.00333, /** This stores the duration of each individual pixelatedTransitionSquares HTML element fade out animation, in seconds. */
            stagger  : {        /** This stores the staggered animation's settings. */

                each : 0.00333,     /** This stores the time gap between each pixelatedTransitionSquares HTML element fade out animation, in seconds. */
                from : 'random',    /** This stores the starting point of the staggered animation, in this case it will be random. */
                grid : 'auto',      /** This stores the grid columns and rows of the pixelatedTransitionSquares HTML elements to be shuffled, in this case it will automatically determine the grid columns and rows. */
                ease : 'power1.out' /** This stores a built in GSAP ease out animation which are best used for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction. */

            },

        });

        // #endregion 7th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)


        /** This is the 3rd GSAP timeline pause, between the second pixelated transition (to cover the hacSecEle HTML element) and the snoSecEle HTML element fade in + the third pixelated transition (to reveal the snoSecEle HTML element). */
        gsaTimIns.add( () => {}, '+=1' );


        // #region 8th GSAP Animation - Snowfall Section Fade In Animation

        /** This fades in the snoSecEle HTML element after the previous pixelated transition (to cover the hacSecEle HTML element) is complete. This section is set to opacity 0 on page load so that it does not obscure the hacSecEle HTML element. */
        gsaTimIns.to( snoSecEle, {

            opacity  : 1,    /** This stores the target opacity that the animation will end at. */
            duration : 0.01, /** This stores the total duration of the entire animation, in seconds. */

        });

        // #endregion 8th GSAP Animation - Snowfall Section Fade In Animation


        // #region 9th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)

        /** This performs a shuffled fade out animation of the pixelatedTransitionSquares HTML elements located in the squSecCon HTML element in a staggered fashion in order to create a pixelated transition effect from the filled, opaque squSecEle HTML element to reveal the snoSecEle HTML element. */
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       /** This stores the target opacity that each pixelatedTransitionSquares HTML element animation will end at. */
            duration : 0.00333, /** This stores the duration of each individual pixelatedTransitionSquares HTML element fade out animation, in seconds. */
            stagger  : {        /** This stores the staggered animation's settings. */

                each : 0.00333,     /** This stores the time gap between each pixelatedTransitionSquares HTML element fade out animation, in seconds. */
                from : 'random',    /** This stores the starting point of the staggered animation, in this case it will be random. */
                grid : 'auto',      /** This stores the grid columns and rows of the pixelatedTransitionSquares HTML elements to be shuffled, in this case it will automatically determine the grid columns and rows. */
                ease : 'power1.out' /** This stores a built in GSAP ease out animation which are best used for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction. */

            },

        });

        // #endregion 9th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)


        /** This is the 4th GSAP timeline pause, between the third pixelated transition (to reveal the snoSecEle HTML element) and the snowfallSplitText HTML text element's {@link snoSplIns} animation. */
        gsaTimIns.add( () => {}, '+=1' );


        // #region 10th GSAP Animation - Snowfall Text Split Character Text Animation

        /** This animates the characters of the snowfallSplitText HTML text elements (this includes the snoHe1Ele, snoParEle and snoSpaEle HTML elements) one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in. */
        gsaTimIns.from( snoSplIns.chars, {

            duration  : 3,   /** This stores the total duration of the entire animation, in seconds. */
            x         : 10,  /** This stores the amount to animate right to left, in pixels. */
            autoAlpha : 0,   /** This stores the fade in value from opacity : 0 and visibility : hidden. */
            stagger   : 0.05 /** This stores the time gap between each character animation, in seconds. */

        });

        // #endregion 10th GSAP Animation - Snowfall Text Split Character Text Animation

    }, [] ); /** This defines when useGSAP() should be run. An empty dependency array ensures this hook will run only once when the component mounts. */

    // #endregion Function Body


    // #endregion useGSAP



    // #region useEffect


    // #region Function Body

    /**
     * useEffect Hook
     *
     * @summary
     * The useEffect hook in React allows you to perform side effects in
     * functional components, such as data fetching, subscriptions, or manual
     * DOM manipulation. It serves to synchronize a component with external
     * systems. The custom inner code blocks inside of useEffect handle two
     * different side effects. The first side effect will be the handling of
     * the pixelated transition grid layout setup. Specifically it will be
     * calculating the number of grid columns and rows and the size of each
     * square so that the section fully covers (and with no overflow) the
     * entire viewport. The second side effect will be the handling of the
     * snowfall animation setup. The empty dependency array ensures this effect
     * runs only once when the component mounts. In this case, the winHeiNum
     * and winWidNum state variables are added to the dependency array to
     * ensure that this effect runs whenever the window is resized. This is
     * needed to recalculate both the grid layout for the pixelated transition
     * effect and the snowfall animation properties and so that the snowfall
     * animation can be reinitialized.
     *
     * @author React  <https://react.dev/reference/react/useEffect>
     * @author z4ntao <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * This function is not called directly, but rather it is run on component
     * mount and on changes to whatever state variables are specified in the
     * dependency array.
     * ```
     *
    */

    useEffect( () => {

        // #region Square Div Elements Code Block

        /**
         * This will set up the grid layout for the square div elements, which
         * are used to create the pixelated transition effect animation. More
         * specifically, it calculates the optimum number of columns and rows
         * for the containing squSecEle HTML element and the size of each
         * individual square so that the squSecEle HTML element fully covers
         * (and with no overflow) the entire viewport area. This includes
         * covering both the hacSecEle HTML element and the snoSecEle HTML
         * element, which are stacked on top of each other.
        */


        // #region Square Div Elements Variables

        /** Squares Section Element          = This stores the containing HTML element which contains all of the square div HTML elements that are used for the pixelated transition effect animation. */
        const squSecEle : HTMLElement | null = document.getElementById( 'squSecEle' );
        /** Squares Div Element Array        = This stores an array of all square div HTML elements that are located inside of the above {@link squSecEle} HTML element. */
        const squDivArr : HTMLElement[]      = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) );
        /** Squares Div Array Length Number  = This stores the length of the above squDivArr array, which will be used to calculate both the number of grid columns and rows for the containing {@link squSecEle} HTML element as well as the size of each individual square div HTML element so that the entire {@link squSecEle} HTML element fully covers the entire viewport area with no gaps and no overflow. */
        const sdaLenNum : number             = squDivArr.length;

        // #endregion Square Div Elements Variables


        // #region Square Div Elements Size Calculations

        /** This performs a type narrowing check for the squSecEle not being null && the {@link squDivArr} having at least one element inside of it. */
        if ( squSecEle !== null && sdaLenNum !== 0 ) {

            /** Squares Section Element Width Number  = This stores the width of the above squSecEle HTML element. */
            const sseWidNum : number                  = squSecEle.clientWidth;
            /** Squares Section Element Height Number = This stores the height of the above squSecEle HTML element. */
            const sseHeiNum : number                  = squSecEle.clientHeight;
            /** Total Area Number                     = This stores the total area of the {@link squSecEle} HTML element. This is a simple geometry formula: area = width * height. */
            const totAreNum : number                  = sseWidNum * sseHeiNum;
            /** Square Size Number                    = This stores the size that should be applied to each individual square div HTML element in order to fully cover the {@link squSecEle} HTML element with no gaps and no overflow. Some algebraic manipulation is required to find this number (solve for x): n (number of squares) * x^2 (side of square, squared) = a (total area of containing element), or more simply nx^2 = a, which becomes x^2 = a / n and then x = square root of a / n. This number is then floored to ensure that it is a whole number value which the grid will then slightly upsize via a minmax so that it fully covers the viewport area (if Math.ceil() were used it would cause an overflow because of the minimum size which is fixed, whereas the maximum size is flexible). */
            const squSizNum : number                  = Math.floor( Math.sqrt( totAreNum / sdaLenNum ) );
            /** Squares Section Element Column Number = This stores the number of columns of square div HTML elements that can fit in the {@link squSecEle} HTML element. This is simple calculation of the {@link squSecEle} HTML element's width divided by the previously calculated square div HTML element size which is then floored to ensure it is a whole number value. */
            const sseColNum : number                  = Math.floor( sseWidNum / squSizNum );
            /** Squares Section Element Row Number    = This stores the number of rows of square div HTML elements that can fit in the {@link squSecEle} HTML element. This is a simple calculation of the {@link squSecEle} HTML element's height divided by the previously calculated square div HTML element size which is then floored to ensure it is a whole number value. */
            const sseRowNum : number                  = Math.floor( sseHeiNum / squSizNum );


            /** This sets the squSecEle HTML element's CSS grid template columns property according to the previously calculated sseColNum value, with each column having a minimum size of the previously calculated squSizNum in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the {@link squSecEle} HTML element. */
            squSecEle.style.gridTemplateColumns = `repeat(${ sseColNum }, minmax(${ squSizNum }px, 1fr))`;
            /** This sets the squSecEle HTML element's CSS grid template rows property according to the previously calculated sseRowNum value, with each row having a minimum size of the previously calculated squSizNum in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the {@link squSecEle} HTML element. */
            squSecEle.style.gridTemplateRows    = `repeat(${ sseRowNum }, minmax(${ squSizNum }px, 1fr))`;

        }

        /** This handles the case where the type narrowing check failed. */
        else {

            /** This issues a console warning about the squSecEle HTML element being null or the {@link squDivArr} array being empty. */
            console.warn( `Error: Either the squares section element is null (${ squSecEle === null ? 'TRUE' : 'FALSE' }) or the squares div element array is empty (${ sdaLenNum === 0 ? 'TRUE' : 'FALSE' }).` );

        };

        // #endregion Square Div Elements Size Calculations


        // #endregion Square Div Elements Code Block



        // #region Snowflake Animation Section

        /**
         * This will begin the snowfall animation. It will first make a call to
         * {@link cleSnoFun} to clear the previous animation (if
         * {@link useEffect} was called due to a window resize event). It will
         * then perform checks based on the viewport dimensions in order to
         * determine the optimal values to use for the {@link iniSetObj}
         * object. Finally it will make a call (after a small timeout to allow
         * for the page to fully load) to {@link iniSnoFun} in order to
         * initialize the snowfall animation with the determined parameters.
         *
        */


        // #region Clear Previous Snowflake Animation

        /** This clears any previous snowfall animations that may have been running before initiating a new one. This is especially important when {@link useEffect} is called due to a window resize event. */
        cleSnoFun();

        // #endregion Clear Previous Snowflake Animation



        // #region Function Variables

        /** Containing Section Element       = This stores the containing HTML element to which all snowflake HTML elements will be attached and whose dimensions will be used to update and contain each snowflake HTML element's position. */
        const conSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' );
        /** Small Height Boolean             = This stores a boolean value that indicates whether the winHeiNum state variable is less than 550 pixels, which is used to reduce the speed of the snowflake HTML elements falling for better asthetics (smaller height means the snowflake HTML elements fall too quickly since there is less vertical space). */
        const smaHeiBoo : boolean            = winHeiNum < 550;
        /** Small Width Boolean              = This stores a boolean value that indicates whether the winWidNum state variable is less than 550 pixels, which is used to reduce the number of snowflake HTML elements for better asthetics (smaller width means too many snowflake HTML elements can overcrowd the screen). */
        const smaWidBoo : boolean            = winWidNum < 550;

        // #region aniSetObj

        /**
         * IniSetObj = Inimation Settings Object will store the customizable settings values for the snowfall animation.
         * @see {@link iniSetObj}
         * 
         * @property sizMaxNum = Size Maximum Number will store a snowflake HTML element's maximum size value.
         * @property sizMinNum = Size Minimum Number will store a snowflake HTML element's minimum size value.
         * @property snoColStr = Snowflake Color String will store a snowflake HTML element's color value.
         * @property snoCouNum = Snowflake Count Number will store the number of snowflake HTML elements that will be created.
         * @property speMaxNum = Speed Maximum Number will store a snowflake HTML element's maximum falling speed value.
         * @property speMinNum = Speed Minimum Number will store a snowflake HTML element's minimum falling speed value.
         *
        */

        type IniSetObj = {

            sizMaxNum : number;
            sizMinNum : number;
            snoColStr : string;
            snoCouNum : number;
            speMaxNum : number;
            speMinNum : number;

        };

        /** @see {@link IniSetObj} */
        const iniSetObj : IniSetObj = {

            sizMaxNum : 8,
            sizMinNum : 1,
            snoColStr : '#FFFFFF',
            snoCouNum : smaWidBoo === true ? 60 : 120,
            speMaxNum : smaHeiBoo === true ? 2 : 5,
            speMinNum : 1,

        };

        // #endregion aniSetObj


        // #endregion Function Variables


        // #region conSecEle Null Checks and iniSnoFun() Calls

        /** This performs a type narrowing check for the conSecEle not being null. */
        if ( conSecEle !== null ) {

            /** This initializes the snowfall animation according to the previously calculated parameters, after a small delay of 333ms to allow for the page to fully load. */
            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333);

        }

        /** This handles the case where the type narrowing check failed. */
        else {

            /** Containing Section Element = This creates and stores a containing HTML element to which all snowflake HTML elements will be attached and whose dimensions will be used to update and contain each snowflake HTML element's position. */
            const conSecEle                = document.createElement( 'section' );

            /** This gives the newly created containing HTML element an id of snoSecEle (snowfall section element). */
            conSecEle.id = 'snoSecEle';

            /** This appends the newly created containing HTML element to the DOM. */
            document.body.appendChild( conSecEle );


            /** This initializes the snowfall animation according to the previously calculated parameters, after a small delay of 333ms to allow for the page to fully load. */
            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333);

        };

        // #endregion conSecEle Null Checks and iniSnoFun() Calls


        // #endregion Snowflake Animation Section



    }, [ winHeiNum, winWidNum ] ); /** This defines when useEffect() should be run, in this case it is when the window height number or window width number state variables from the useWindowSize() custom hook change due to a window resize event. */

    // #endregion Function Body


    // #endregion useEffect



    // #region Return Statement


    /** Christmas Card Component Javascript XML    = This stores the HTML-like code that the Christmas Card component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const chrCarComJsx : React.ReactElement = (


        // #region Component Section Element

        <  section id='comSecEle' className={ styles.componentSection } > { /* Component Section Element = This is the component wrapping HTML element since React requires components to return a single root element. */ }



            { /** Start Squares Section Element (Pixelated Transition Effect animation) */ }

            <  section id='squSecEle' className={ styles.squaresSection } > { /* Squares Section Element = This is the section that creates the pixelated transition animation that is defined inside of the useGSAP() function. Its grid columns and rows properties are dynamically set inside of useEffect() based on the window size and will be calculated whenever the component mounts and whenever the window is resized. */ }

                { /** This is the grid of square div HTML elements that are dynamically sized based on the window dimensions inside of useEffect() that will run when the component mounts and whenever the window is resized. Each div will be faded in or out in a random order inside of useGSAP() in order to create a pixelated transition effect animation between window load -> show the hacked section -> hide the hacked section -> show the snowfall section. */ }
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >

            </ section >

            { /* End Squares Section Element (Pixelated Transition Effect) */ }



            { /* Start Hacked Section Element */ }

            <  section id='hacSecEle'  className={ styles.hackedSection } > { /* Hacked Section Element = This is the section with the cartoony pirate skull and crossbones background image that will be shown after the initial pixelated transition effect animation has finished running, and it will then be hidden by another pixelated transition effect animation after which the snowfall section will be overlaid on top of it thereby hiding this section until the page is reloaded. */ }

                < h1   id='hacHe1Ele'  className={ styles.hackedHeader1 } ></ h1 > { /* Hacked Header 1 Element = This is the text that will first have a GSAP scramble text animation applied to it, then two more custom glitch text animations applied to it as defined inside of useGSAP(). */ }

                < p    id='hacParEle'  className={ ` ${ styles.hackedParagraph } hackedSplitText ` } >Just kidding! But it just goes to show you that you should never trust a QR code! Christmas present incoming...</ p > { /* Hacked Paragraph Element = This is the text that will first have a GSAP split text animation applied to it, then a custom glitch text animation applied to it as defined inside of useGSAP(). */ }

            </ section >

            { /* End Hacked Section Element */ }



            { /* Start Snowfall Section Element */ }

            <  section id='snoSecEle'  className={ `${ styles.snowfallSection } snowfallSplitText` } > { /* Snowfall Section Element = This is the section with the cartoony snowy cabin and evergreen trees background image that will be shown after the three pixelated transition effect animations have completed and after the hacked section animations have finished running. It will have a custom defined (i.e. not a GSAP animation) snowfall animation overlaid on top of it, and it will continue to be shown until the page is reloaded. */ }

                < h1   id='snoHe1Ele'  className={ styles.snowfallHeader1 } >Merry Christmas, { namParStr }!</ h1 > { /* Snowfall Header 1 Element = This is the text that will have a GSAP split text animation applied to it as defined inside of useGSAP(). The name text will be dynamically set on page load by grabbing the URL name parameter. */ }

                < img  id='snoImgEle'  className={ styles.snowfallImage } src={ snowman } /> { /* Snowfall Image Element = This is the cartoony image of the snowman that will be displayed in the lower left corner of this section. */ }

                < p    id='snoParEle'  className={ styles.snowfallParagraph } >< span id='snoSpaEle' className={ styles.snowfallSpan } >From,</ span > Mr. Awesome</ p > { /* Snowfall Paragraph Element = This is the text that will have a GSAP split text animation applied to it as defined inside of useGSAP(). */ }

            </ section >

            { /* End Snowfall Section Element */ }



        </ section >

        // #endregion Component Section Element


    );


    return chrCarComJsx;


    // #endregion Return Statement

}



export default ChrCarCom;


