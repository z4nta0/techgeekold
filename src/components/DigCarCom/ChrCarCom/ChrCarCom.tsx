
// #region Imports

import iniSnoFun from '../../../animations/snowfall.ts'; /** This import is the custom function that will initialize and start the snowfall animation effect. */
import React     from 'react';                           /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import snowman   from '../../../assets/snowman.png';     /** This import is the custom snowman image asset that will be used in the .snowfallSection HTML element. */
import styles    from './ChrCarCom.module.css';          /** This import is the custom CSS file that contains all of the styling declarations for this component. */
import useWinSiz from '../../../hooks/useWinSiz.ts';     /** This import is the custom React hook that will provide the current window viewport dimensions and will also be used to trigger the useEffect hook on window resize events, as well as altering certain animation settings based on how small or big its dimensions are. */


import { cleSnoFun          } from '../../../animations/snowfall.ts'; /** This import is the custom function that will clear and stop the snowfall animation effect. */
import { gsap               } from 'gsap';                            /** This import is the standard Green Socks Animation Platform core library. */
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';         /** This import is the standard Green Socks Animation Platform plugin that will handle text scrambling animations. */
import { SplitText          } from 'gsap/SplitText';                  /** This import is the standard Green Socks Animation Platform plugin that will handle text splitting animations (single character, word or line animations). */
import { useEffect          } from 'react';                           /** This import is the standard React hook that enables side effects for components. */
import { useGSAP            } from '@gsap/react';                     /** This import is the standard Green Socks Animation Platform custom React hook that will handle GSAP functionality in React components. */
import { useLocation        } from 'react-router-dom';                /** This import is the standard React Router DOM hook that will provide access to the current URL properties and parameters. */


import { type WinSizObj } from '../../../hooks/useWinSiz.ts'; /** This import is the custom type definition for the custom state variable that is generated from the custom useWinSiz React Hook and stores the current viewport dimensions. */

// #endregion Imports



/** Green Socks Animation Platform Register Plugin = This standard GSAP method executes logic that ensures that the GSAP core and plugins work seamlessly together, as well as preventing tree shaking issues in build tools and bundlers. */
gsap.registerPlugin( useGSAP, ScrambleTextPlugin, SplitText );



// #region ChrCarCom

/**
 * ChrCarCom = Christmas Card Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the Christmas card page. There are a lot of animations contained within
 * its logic, including the snowfall animation, the pixelated transition
 * animation and all of the GSAP text animations. I created this just for fun
 * for family and friends and I plan on making more for other holidays,
 * birthdays and such on my next real project. That is why there is no direct
 * link to this page and must be navigated to manually, with the name parameter
 * customizing the card's contents. It is also different from the other pages
 * in that it will use a position of fixed with full viewport dimensions in
 * order to overlay the entire application.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props - This component does not use any props.
 * 
 * @returns A React JSX element representing the Christmas Card component.
 * @see {@link chrCarComJsx}
 * 
 * @example
 * ```tsx
 * <ChristmasCard /> // => chrCarComJsx
 * ```
 *
*/

function ChrCarCom () : React.ReactElement {


    // #region Component Scoped Variables


    // #region State Variables

    /** Window Height Number                   = This custom variable stores the current window viewport height and will trigger a rerender via the {@link useEffect} hook when the window is resized and its value changes in order to recalculate the snowfall and the pixelated transition animation parameters. */
    /** Window Width Number                    = This custom variable stores the current window viewport width and will trigger a rerender via the {@link useEffect} hook when the window is resized and its value changes in order to recalculate the snowfall and the pixelated transition animation parameters. */
    const { winHeiNum, winWidNum } : WinSizObj = useWinSiz();
    /** Search                                 = This custom variable stores the search property that is returned from the standard React Router useLocation hook and represents the query parameters in the URL. */
    const { search } : { search : string }     = useLocation();
    /** Search Parameters Instance             = This custom variable stores the standard Web API class instance of URLSearchParams that uses the previously defined {@link search} variable and provides methods for interacting with the query parameters. */
    const seaParIns  : URLSearchParams         = new URLSearchParams( search );
    /** Name Parameter String                  = This custom variable stores the name query parameter (or null) which will be used to customize the Christmas Card component's h1 element that is inside of the {@link chrCarJsx}, and it is acquired using the get method on the previously defined {@link seaParIns} URLSearchParams class instance. */
    const namParStr  : string | null           = seaParIns.get( 'name' );

    // #endregion State Variables


    // #endregion Component Scoped Variables



    // #region useGSAP

    /**
     * useGSAP = Use Green Socks Animation Platform
     * @see {@link useGSAP}
     *
     * @summary
     * This standard GSAP custom React hook executes the standard React
     * {@link useEffect} hook that automatically handles cleanup using the
     * standard GSAP {@link gsap.context} method. This hook solves a few React
     * specific friction points, because cleanup is important in React and this
     * makes that process simple. The custom inner code blocks inside will
     * perform multiple animations in sequence using the standard GSAP
     * {@link gsap.timeline} method. 1) will be a custom pixelated transition
     * animation to reveal the hacked section HTML element, 2) will be the
     * hacked header 1 HTML element GSAP scramble text animation, 3) will be
     * the hacked header 1 HTML element custom glitchy text animation, 4) will
     * be the hacked paragraph HTML element GSAP split text animation, 5) will
     * be another hacked header 1 HTML element custom glitchy text animation
     * that will be executed alongside the exact same animation for the hacked
     * paragraph, 6) will be another custom pixelated transition animation to
     * cover the hacked section, 7) will be a simple fade in animation of the
     * snowfall section HTML element that happens in the background (i.e.
     * unseen), 8) will be another pixelated transition animation to reveal the
     * snowfall section, and 9) will be the snowfall header 1, paragraph and
     * span HTML elements GSAP split text Animation which is the final
     * animation. The empty dependency array ensures this effect runs only once
     * when the component mounts.
     *
     * @author GSAP   <https://gsap.com/resources/React/>
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * This function is not called directly, but rather it is run similar to
     * the React useEffect hook which runs on component mount and on changes to
     * whatever variables are specified in the dependency array.
     * ```
     *
    */

    useGSAP( () => {


        // #region Function Variables

        /** GSAP Timeline Instance      = This custom variable stores the standard GSAP timeline class instance that contains methods for attaching animations to it and then are executed in sequence. */
        const gsaTimIns : GSAPTimeline  = gsap.timeline();
        /** Squares Element Array       = This custom variable stores an array of all HTML elements with the class name pixelatedTransitionSquares, which are the square div HTML elements that are located in the pcoDivEle HTML div element and are responsible for covering the entire viewport in order to create a pixelated transition effect animation between the different parts of the component's entire animation. */
        const squEleArr : HTMLElement[] = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) );

        /** Hacked Header 1 Element          = This custom variable stores the h1 element that is located in the hacSecEle HTML section element and will have two GSAP text animations applied to it, the first being a scramble text animation (applied once) and the second being a gltiched text animation (applied twice). */
        const hacHe1Ele : HTMLElement | null = document.getElementById( 'hacHe1Ele' );
        /** Hacked Paragraph Element         = This custom variable stores the paragraph element that is located in the hacSecEle HTML section element and will have a gltiched text animation applied to it once. */
        const hacParEle : HTMLElement | null = document.getElementById( 'hacParEle' );
        /** Hacked Split Text Instance       = This custom variable stores the standard GSAP split text class instance that splits text elements (by character, word or line) with a class of hackedSplitText (this includes only the {@link hacParEle} HTML paragraphelement) into words and characters which will then be animated individually in a staggered fashion. */
        const hacSplIns : SplitText          = SplitText.create( '.hackedSplitText', { type : 'words, chars' } );
        /** Snowfall Section Element         = This custom variable stores the snowfall section element and will be faded in after the hacked section animations are complete, this is because it sits on top of the hacked section and is set to opacity 0 initially. */
        const snoSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' );
        /** Snowfall Split Text Instance     = This custom variable stores the standard GSAP split text class instance that splits text elements (by character, word or line) with a class of snowfallSplitText (this includes the snoHe1Ele, snoParEle and snoSpaEle HTML elements) into words and characters which will then be animated individually in a staggered fashion. */
        const snoSplIns : SplitText          = SplitText.create( '.snowfallSplitText', { type : 'words, chars' } );
        /** Shuffled Squares Function        = This custom variable stores the standard GSAP shuffle method that will return a shuffled array of the previously defined {@link squEleArr} array and is used for the pixelated transition effect animation in order to randomly select the order in which each pixelatedTransitionSquares HTML div element will be faded in or out. */
        const shuSquFun : HTMLElement[]      = gsap.utils.shuffle( squEleArr );

        // #endregion Function Variables



        // #region 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)

        /** GSAP Timeline Instance To = This custom GSAP method executes a shuffled fade out animation of the pixelatedTransitionSquares HTML div elements that are located in the squSecCon HTML element. It does this in a staggered fashion in order to create a pixelated transition effect from the initial page load to reveal the hacSecEle HTML section element. */
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       /** This standard property stores the target opacity value that each pixelatedTransitionSquares HTML div element animation will end at. */
            duration : 0.00333, /** This standard property stores the duration of each individual pixelatedTransitionSquares HTML div element fade out animation, in seconds. */
            stagger  : {        /** This standard property stores the staggered settings of the animation. */

                each : 0.00333,     /** This standard property stores the time gap between each pixelatedTransitionSquares HTML div element fade out animation, in seconds. */
                from : 'random',    /** This standard property stores the starting point of the staggered animation, in this case it will be random which pixelatedTransitionSquares HTML div element it starts with. */
                grid : 'auto',      /** This standard property stores the grid columns and rows of the pixelatedTransitionSquares HTML div elements to be shuffled, in this case it will automatically determine the grid columns and rows. */
                ease : 'power1.out' /** This standard property stores a built in GSAP ease out animation, this one is best used for UI transitions as they are fast to start which helps the UI feel responsive and then they ease out towards the end giving a natural feeling of friction. */

            },

        });

        // #endregion 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)



        /** GSAP Timeline Instance Add = This custom GSAP method executes the first GSAP timeline pause in seconds, between the first pixelated transition animation (to reveal the hacSecEle HTML section element) and the {@link hacHe1Ele} HTML element's scramble text animation. */
        gsaTimIns.add( () => {}, '+=1' );



        // #region 2nd GSAP Animation - Hacked Header Scramble Text

        /** GSAP Timeline Instance To = This custom GSAP method executes the scramble text animation and places (into the hacHe1Ele HTML h1 element) one character at a time of the target text as a random character until the full target text is revealed. */
        gsaTimIns.to( hacHe1Ele, {

            duration     : 3,                          /** This standard property stores the total duration of the entire scramble text animation, in seconds. */
            scrambleText : `You've Just Been Hacked!!` /** This standard property stores the target text that the animation will end at. */

        });

        // #endregion 2nd GSAP Animation - Hacked Header Scramble Text



        // #region 3rd GSAP Animation - 1st Hacked Header Glitch Effect

        /** GSAP Timeline Instance To = This custom GSAP method executes the distortion effect of the hacHe1Ele HTML h1 element in the horizontal direction to the right using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the undistortion effect of the hacHe1Ele HTML h1 element back to normal using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the flicker out effect of the hacHe1Ele HTML h1 element to an opacity of 0, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the flicker in effect of the hacHe1Ele HTML h1 element to an opacity of 1, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the movement effect of the hacHe1Ele HTML h1 element by 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the movement effect of the hacHe1Ele HTML h1 element back to its original position, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the scale up effect of the hacHe1Ele HTML h1 element in the vertical direction by 1.1 times its original size using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the scale down effect of the hacHe1Ele HTML h1 element back to its original vertical scale using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );

        // #endregion 3rd GSAP Animation - 1st Hacked Header Glitch Effect



        // #region 4th GSAP Animation - Hacked Paragraph Split Character Text Animation

        /** GSAP Timeline Instance From = This custom GSAP method executes the split text animation of the {@link hacParEle} HTML paragraphelement one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in. */
        gsaTimIns.from( hacSplIns.chars, {

            duration  : 3,   /** This standard property stores the total duration of the entire animation, in seconds. */
            x         : 10,  /** This standard property stores the amount to animate right to left, in pixels. */
            autoAlpha : 0,   /** This standard property stores the fade in value from an opacity of 0 and a visibility of hidden. */
            stagger   : 0.05 /** This standard property stores the time gap between each character animation, in seconds. */

        });

        // #endregion 4th GSAP Animation - Hacked Paragraph Split Character Text Animation



        // #region 5th & 6th GSAP Animation - 2nd Hacked Header Glitch Effect & Only Hacked Paragraph Glitch Effect

        /** GSAP Timeline Instance To = This custom GSAP method executes the distortion effect of the hacHe1Ele HTML h1 element in the horizontal direction to the right using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the distortion effect of the hacParEle HTML paragraph element in the horizontal direction to the right using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the undistortion effect of the hacHe1Ele HTML h1 element back to normal using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the undistortion effect of the hacParEle HTML paragraph element back to normal using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the flicker out effect of the hacHe1Ele HTML h1 element to an opacity of 0, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the flicker out effect of the hacParEle HTML paragraph element to an opacity of 0, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 0                              } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the flicker in effect of the hacHe1Ele HTML h1 element to an opacity of 1, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the flicker in effect of the hacParEle HTML paragraph element to an opacity of 1, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 1                              } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the movement effect of the hacHe1Ele HTML h1 element by 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the movement effect of the hacParEle HTML paragraph element by 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : -20                            } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the movement effect of the hacHe1Ele HTML h1 element back to its original position, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the movement effect of the hacParEle HTML paragraph element back to its original position, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : 0                              } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the scale up effect of the hacHe1Ele HTML h1 element in the vertical direction by 1.1 times its original size using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the scale up effect of the hacParEle HTML paragraph element in the vertical direction by 1.1 times its original size using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );

        /** GSAP Timeline Instance To = This custom GSAP method executes the scale down effect of the hacHe1Ele HTML h1 element back to its original vertical scale using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );
        /** GSAP Timeline Instance To = This custom GSAP method executes the scale down effect of the hacParEle HTML paragraph element back to its original vertical scale using a standard GSAP ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );

        // #endregion 5th & 6th GSAP Animation - 2nd Hacked Header Glitch Effect & Only Hacked Paragraph Glitch Effect



        /** GSAP Timeline Instance Add = This custom GSAP method executes the second GSAP timeline pause in seconds, between the {@link hacParEle} and {@link hacParEle} HTML paragraph elements' glitch effect animation and the second pixelated transition animation (to cover the hacSecEle HTML section element). */
        gsaTimIns.add( () => {}, '+=1' );



        // #region 7th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)

        /** GSAP Timeline Instance To = This custom GSAP method executes a shuffled fade in animation of the pixelatedTransitionSquares HTML div elements that are located in the squSecCon HTML element. It does this in a staggered fashion in order to create a pixelated transition effect from the hacSecEle HTML section element to a filled, opaque pcoDivEle HTML div element. */
        gsaTimIns.to( shuSquFun, {

            opacity  : 1,       /** This standard property stores the target opacity value that each pixelatedTransitionSquares HTML div element animation will end at. */
            duration : 0.00333, /** This standard property stores the duration of each individual pixelatedTransitionSquares HTML div element fade out animation, in seconds. */
            stagger  : {        /** This standard property stores the staggered settings of the animation. */

                each : 0.00333,     /** This standard property stores the time gap between each pixelatedTransitionSquares HTML div element fade out animation, in seconds. */
                from : 'random',    /** This standard property stores the starting point of the staggered animation, in this case it will be random which pixelatedTransitionSquares HTML div element it starts with. */
                grid : 'auto',      /** This standard property stores the grid columns and rows of the pixelatedTransitionSquares HTML div elements to be shuffled, in this case it will automatically determine the grid columns and rows. */
                ease : 'power1.out' /** This standard property stores a built in GSAP ease out animation, this one is best used for UI transitions as they are fast to start which helps the UI feel responsive and then they ease out towards the end giving a natural feeling of friction. */

            },

        });

        // #endregion 7th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)



        /** GSAP Timeline Instance Add = This custom GSAP method executes the third GSAP timeline pause in seconds, between the second pixelated transition (to cover the hacSecEle HTML section element) and the snoSecEle HTML section element fade in + the third pixelated transition (to reveal the snoSecEle HTML section element). */
        gsaTimIns.add( () => {}, '+=1' );



        // #region 8th GSAP Animation - Snowfall Section Fade In Animation

        /** GSAP Timeline Instance To = This custom GSAP method executes the fade in animation of the snoSecEle HTML section element. This section is set to opacity 0 on page load so that it does not obscure the hacSecEle HTML section element. */
        gsaTimIns.to( snoSecEle, {

            opacity  : 1,    /** This standard property stores the target opacity value that the animation will end at. */
            duration : 0.01, /** This standard property stores the total duration of the entire animation, in seconds. */
        });

        // #endregion 8th GSAP Animation - Snowfall Section Fade In Animation



        // #region 9th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)

        /** GSAP Timeline Instance To = This custom GSAP method executes a shuffled fade out animation of the pixelatedTransitionSquares HTML div elements that are located in the squSecCon HTML element. It does this in a staggered fashion in order to create a pixelated transition effect from the filled, opaque pcoDivEle HTML div element to reveal the snoSecEle HTML section element. */
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       /** This standard property stores the target opacity value that each pixelatedTransitionSquares HTML div element animation will end at. */
            duration : 0.00333, /** This standard property stores the duration of each individual pixelatedTransitionSquares HTML div element fade out animation, in seconds. */
            stagger  : {        /** This standard property stores the staggered settings of the animation. */

                each : 0.00333,     /** This standard property stores the time gap between each pixelatedTransitionSquares HTML div element fade out animation, in seconds. */
                from : 'random',    /** This standard property stores the starting point of the staggered animation, in this case it will be random which pixelatedTransitionSquares HTML div element it starts with. */
                grid : 'auto',      /** This standard property stores the grid columns and rows of the pixelatedTransitionSquares HTML div elements to be shuffled, in this case it will automatically determine the grid columns and rows. */
                ease : 'power1.out' /** This standard property stores a built in GSAP ease out animation, this one is best used for UI transitions as they are fast to start which helps the UI feel responsive and then they ease out towards the end giving a natural feeling of friction. */

            },

        });

        // #endregion 9th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)



        /** GSAP Timeline Instance Add = This custom GSAP method executes the fourth GSAP timeline pause in seconds, between the third pixelated transition (to reveal the snoSecEle HTML section element) and the split text animation of the HTML text elements with a class of snowfallSplitText. */
        gsaTimIns.add( () => {}, '+=1' );



        // #region 10th GSAP Animation - Snowfall Text Split Character Text Animation

        /** GSAP Timeline Instance From = This custom GSAP method executes the split text animation of the HTML elements with a class of snowfallSplitText (this includes the snoHe1Ele, snoParEle and snoSpaEle HTML elements) one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in. */
        gsaTimIns.from( snoSplIns.chars, {

            duration  : 3,   /** This standard property stores the total duration of the entire animation, in seconds. */
            x         : 10,  /** This standard property stores the amount to animate right to left, in pixels. */
            autoAlpha : 0,   /** This standard property stores the fade in value from an opacity of 0 and a visibility of hidden. */
            stagger   : 0.05 /** This standard property stores the time gap between each character animation, in seconds. */

        });

        // #endregion 10th GSAP Animation - Snowfall Text Split Character Text Animation


    }, [] ); /** Empty Aray = This custom dependency array stores the values that define when useGSAP should be run, with an empty dependency array ensuring that this hook will run only once when the component mounts. */

    // #endregion useGSAP



    // #region useEffect

    /**
     * useEffect Hook
     *
     * @summary
     * This standard React hook executes side effects for functional
     * components, such as data fetching, subscriptions, or manual DOM
     * manipulation. It serves to synchronize a component with external
     * systems. The custom inner code blocks inside will handle two different
     * side effects. The first will be the handling of the pixelated transition
     * animation's grid layout setup. Specifically, it will be calculating the
     * number of grid columns and rows and the size of each square so that the
     * section fully covers (and with no overflow) the entire viewport. The
     * second will be the handling of the snowfall animation setup and then its
     * initialization. The dependency array includes the winHeiNum and
     * winWidNum state variables and ensure that this effect runs whenever the
     * window is resized. This is needed to recalculate both the grid layout
     * for the pixelated transition animation and the snowfall animation
     * properties in order to reinitialize the snowfall animation.
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


        // #region Pixels Container Div Code Block

        /**
         * This custom code block will set up the grid layout for the pixel
         * div elements, which are used to create the pixelated transition
         * effect animation. It calculates the optimum number of columns and
         * rows for the containing pcoDivEle HTML div element and the size of
         * each individual div square so that said element fully covers (and
         * with no overflow) the entire viewport area. This includes covering
         * both the hacSecEle HTML section element and the snoSecEle HTML
         * section element, which are stacked on top of each other.
        */


        // #region Pixels Container Div Variables

        /** Pixels Container Div             = This custom variable stores the containing HTML element which contains all of the square div HTML elements that are used for the pixelated transition effect animation. */
        const pcoDivEle : HTMLElement | null = document.getElementById( 'pcoDivEle' );
        /** Pixels Container Div Array       = This custom variable stores an array of all square div HTML elements that are located inside of the above {@link pcoDivEle} HTML div element which will be faded in or out in a random order for the pixelated transition animation. */
        const squDivArr : HTMLElement[]      = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) );
        /** Squares Div Array Length Number  = This custom variable stores the length of the above squDivArr array, which will be used to calculate both the number of grid columns and rows for the containing {@link pcoDivEle} HTML div element as well as the size of each individual square div HTML element so that the entire {@link pcoDivEle} HTML div element fully covers the entire viewport area with no gaps and no overflow. */
        const sdaLenNum : number             = squDivArr.length;

        // #endregion Pixels Container Div Variables



        // #region Pixels Container Div Size Calculations

        /** This custom conditional statement performs a type narrowing for the pcoDivEle not being null && the {@link squDivArr} having at least one element inside of it so that no error will be thrown when the following code block runs. */
        if ( pcoDivEle !== null && sdaLenNum !== 0 ) {


            /** Pixels Container Div Height Number = This custom variable stores the height of the above pcoDivEle HTML div element. */
            const sseHeiNum : number               = pcoDivEle.offsetHeight;
            /** Pixels Container Div Width Number  = This custom variable stores the width of the above pcoDivEle HTML div element. */
            const sseWidNum : number               = pcoDivEle.clientWidth;
            /** Total Area Number                  = This custom variable stores the total area of the {@link pcoDivEle} HTML div element. This is a simple geometry formula: area = width * height. */
            const totAreNum : number               = sseWidNum * sseHeiNum;
            /** Square Size Number                 = This custom variable stores the size that should be applied to each individual square div HTML element in order to fully cover the {@link pcoDivEle} HTML div element with no gaps and no overflow. Some algebraic manipulation is required to find this number (solve for x): n (number of squares) * x^2 (side of square, squared) = a (total area of containing element), or more simply nx^2 = a, which becomes x^2 = a / n and then x = square root of a / n. This number is then floored to ensure that it is a whole number value which the grid will then slightly upsize via a minmax so that it fully covers the viewport area (if Math.ceil were used it would cause an overflow because of the minimum size which is fixed, whereas the maximum size is flexible). */
            const squSizNum : number               = Math.floor( Math.sqrt( totAreNum / sdaLenNum ) );
            /** Pixels Container Div Column Number = This custom variable stores the number of grid columns of square div HTML elements that can fit in the {@link pcoDivEle} HTML div element. This is simple calculation of the {@link pcoDivEle} HTML div element's width divided by the previously calculated square div HTML element size which is then floored to ensure it is a whole number value. */
            const sseColNum : number               = Math.floor( sseWidNum / squSizNum );
            /** Pixels Container Div Row Number    = This custom variable stores the number of grid rows of square div HTML elements that can fit in the {@link pcoDivEle} HTML div element. This is a simple calculation of the {@link pcoDivEle} HTML div element's height divided by the previously calculated square div HTML element size which is then floored to ensure it is a whole number value. */
            const sseRowNum : number               = Math.floor( sseHeiNum / squSizNum );



            /** Pixels Container Div            = This standard JS DOM API uses custom code to set this element's CSS grid template columns property according to the previously calculated sseColNum value, with each column having a minimum size of the previously calculated squSizNum in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the {@link pcoDivEle} HTML div element. */
            pcoDivEle.style.gridTemplateColumns = `repeat(${ sseColNum }, minmax(${ squSizNum }px, 1fr))`;
            /** Pixels Container Div            = This standard JS DOM API uses custom code to set this element's CSS grid template rows property according to the previously calculated sseRowNum value, with each row having a minimum size of the previously calculated squSizNum in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the {@link pcoDivEle} HTML div element. */
            pcoDivEle.style.gridTemplateRows    = `repeat(${ sseRowNum }, minmax(${ squSizNum }px, 1fr))`;


        }

        // #endregion Pixels Container Div Size Calculations


        // #region Pixels Container Div Size Calculations Error

        /** This custom conditional statement handles all cases that do not match the above conditional statement's type narrowing check. */
        else {


            /** Console Warn = This standard JS Web API function executes the warning about either the {@link pcoDivEle} HTML div element being null or the {@link squDivArr} array being empty. */
            console.warn( `Error: Either the squares section element is null (${ pcoDivEle === null ? 'TRUE' : 'FALSE' }) or the squares div element array is empty (${ sdaLenNum === 0 ? 'TRUE' : 'FALSE' }).` );


        };

        // #endregion Pixels Container Div Size Calculations Error


        // #endregion Pixels Container Div Code Block



        // #region Snowfall Animation Section

        /**
         * This custom code block will determine the settings for and
         * initialize the snowfall animation. It will first make a call to
         * {@link cleSnoFun} to clear the previous animation (if for example
         * {@link useEffect} was called due to a window resize event). It will
         * then perform checks based on the viewport dimensions in order to
         * determine the optimal values to use for the animation's
         * {@link iniSetObj} settings object. Finally, it will make a call
         * (after a small timeout to allow for the page to fully load) to
         * {@link iniSnoFun} in order to initialize the snowfall animation
         * using the determined parameters.
         *
        */


        // #region Clear Previous Snowflake Animation

        /** Clear Snowfall Function = This custom function clears any previous snowfall animations that may have been running before initiating a new one, which is especially important when {@link useEffect} is called due to a window resize event. */
        cleSnoFun();

        // #endregion Clear Previous Snowflake Animation



        // #region Function Variables

        /** Snowfall Section Element         = This custom variable stores the containing HTML section element to which all of the newly created snowflake HTML div elements will be attached, and whose dimensions will be used to update and contain each snowflake HTML div element's position. */
        const snoSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' );
        /** Small Height Boolean             = This custom variable stores a boolean value that indicates whether the winHeiNum state variable is less than 521 pixels, which is used to reduce the falling speed of the snowflake HTML div elements for better asthetics (smaller height means the snowflake HTML div elements fall too quickly since there is less vertical space). */
        const smaHeiBoo : boolean            = winHeiNum < 521;
        /** Small Width Boolean              = This custom variable stores a boolean value that indicates whether the winWidNum state variable is less than 843 pixels, which is used to reduce the number of snowflake HTML div elements for better asthetics (smaller width means too many snowflake HTML div elements can overcrowd the screen). */
        const smaWidBoo : boolean            = winWidNum < 843;


        // #region iniSetObj

        /**
         * Initialization Settings Object = This custom object stores the types that will be used for the custom {@link iniSetObj} object.
         * 
         * @property sizMaxNum = Size Maximum Number custom type stores the type that will be used for the custom {@link iniSetObj.sizMaxNum} property.
         * @property sizMinNum = Size Minimum Number custom type stores the type that will be used for the custom {@link iniSetObj.sizMinNum} property.
         * @property snoColStr = Snowflake Color String custom type stores the type that will be used for the custom {@link iniSetObj.snoColStr} property.
         * @property snoCouNum = Snowflake Count Number custom type stores the type that will be used for the custom {@link iniSetObj.snoCouNum} property.
         * @property speMaxNum = Speed Maximum Number custom type stores the type that will be used for the custom {@link iniSetObj.speMaxNum} property.
         * @property speMinNum = Speed Minimum Number custom type stores the type that will be used for the custom {@link iniSetObj.speMinNum} property.
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


        /**
         * Initialization Settings Object = This custom object stores the properties that are provided to the custom {@link iniSnoFun} function and used as the customizable settings values for the snowfall animation.
         * 
         * @property sizMaxNum = Size Maximum Number custom property stores the number that are used for snowflake HTML div element's maximum size value.
         * @property sizMinNum = Size Minimum Number custom property stores the number that are used for a snowflake HTML div element's minimum size value.
         * @property snoColStr = Snowflake Color String custom property stores the string that are used for a snowflake HTML div element's color value.
         * @property snoCouNum = Snowflake Count Number custom property stores the number that are used for the number of snowflake HTML div elements that will be created.
         * @property speMaxNum = Speed Maximum Number custom property stores the number that are used for a snowflake HTML div element's maximum falling speed value.
         * @property speMinNum = Speed Minimum Number custom property stores the number that are used for a snowflake HTML div element's minimum falling speed value.
         *
        */

        const iniSetObj : IniSetObj = {

            sizMaxNum : 8,
            sizMinNum : 1,
            snoColStr : '#FFFFFF',
            snoCouNum : smaWidBoo === true ? 60 : 120,
            speMaxNum : smaHeiBoo === true ? 2 : 3,
            speMinNum : 1,

        };

        // #endregion iniSetObj


        // #endregion Function Variables



        // #region Initialize Snowfall Function Call

        /** This custom conditional statement performs a type narrowing check for the snoSecEle not being null so that no error will be thrown when the following code block runs. */
        if ( snoSecEle !== null ) {


            /** Set Timeout = This standard JS Window object method executes the custom initialize snowfall function according to the previously calculated parameters, after a small delay of 333ms to allow for the page to fully load. */
            setTimeout( () => { iniSnoFun( { conEle : snoSecEle, setObj : iniSetObj, } ) }, 333);


        }

        // #endregion Initialize Snowfall Function Call


        // #region Create and Append Container then Initialize Snowfall Function Call

        /** This custom conditional statement handles all cases that do not match the above conditional statement's type narrowing check. */
        else {


            /** Snowfall Section Element  = This custom variable stores a newly created containing HTML section element to which all snowflake HTML div elements will be attached and whose dimensions will be used to update and contain each snowflake HTML div element's position. */
            const snoSecEle : HTMLElement = document.createElement( 'section' );



            /** Snowfall Section Element ID = This standard JS DOM API uses custom code to give the newly created containing HTML section element an id of snoSecEle (snowfall section element). */
            snoSecEle.id                    = 'snoSecEle';



            /** Document Body Append Child = This standard JS DOM API method executes the appending of the newly created containing HTML section element to the DOM. */
            document.body.appendChild( snoSecEle );



            /** Set Timeout = This standard JS Window object method executes the custom initialize snowfall function according to the previously calculated parameters, after a small delay of 333ms to allow for the page to fully load. */
            setTimeout( () => { iniSnoFun( { conEle : snoSecEle, setObj : iniSetObj, } ) }, 333);


        };

        // #endregion Create and Append Container then Initialize Snowfall Function Call


        // #endregion Snowfall Animation Section


    }, [ winHeiNum, winWidNum ] ); /** Window Height Number, Window Width Number = These custom state variables are updated every time the window's viewport dimensions change via the useWindowSize custom hook. */

    // #endregion useEffect



    // #region Return Statement

    /** Christmas Card Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const chrCarComJsx : React.ReactElement     = (


        // #region Christmas Card Div Element

        <  div id='chcDivEle' className={ styles.christmasCardDiv } > { /* Christmas Card Div Element = This custom div element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            { /** Start Pixels Container Div Element (Pixelated Transition Effect animation) */ }

            <  div id='pcoDivEle' className={ styles.pixelsContainerDiv } > { /* Pixels Container Div Element = This custom div element is the container for the .pixelDivs div elements that are used for the pixelated transition animation that is defined inside of the standard GSAP useGSAP custom React hook, and its grid columns and rows properties are dynamically set inside of the standard React useEffect hook based on the window size and will be calculated whenever the component mounts and whenever the window is resized. */ }


                { /** Pixelated Transition Squares = These custom div elements combine to make up the grid that is dynamically sized based on the window dimensions inside of the standard React useEffect hook that is run when the component mounts and whenever the window is resized. Each div will be faded in or out in a random order inside of the standard GSAP useGSAP custom React hook in order to create a pixelated transition effect animation between window load -> show the hacked section -> hide the hacked section -> show the snowfall section. */ }
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.pixelDivs } pixelatedTransitionSquares `} ></ div >


            </ div >

            { /* End Pixels Container Div Element (Pixelated Transition Effect) */ }



            { /* Start Hacked Section Element */ }

            <  section id='hacSecEle'  className={ styles.hackedSection } > { /* Hacked Section Element = This custom section element is the container for the hacked h1 heading, the hacked paragraph and has a cartoony pirate skull and crossbones background image that will be shown after the initial pixelated transition effect animation has finished running, and it will then be hidden by another pixelated transition effect animation after which the snowfall section will be overlaid on top of it thereby hiding this section until the page is reloaded. */ }


                <  header id='hacHeaEle'  className={ styles.hackedHeader } > { /* Hacked Header Element = This custom header element is a semantic container for the hacked h1 heading, the hacked paragraph. */ }


                    < h1 id='hacHe1Ele'  className={ styles.hackedH1 } ></ h1 > { /* Hacked Header 1 Element = This custom h1 element is the container for the text that will first have a standard GSAP scramble text animation applied to it, then two more custom glitch text animations applied to it as defined inside of the standard GSAP useGSAP custom React hook. */ }



                    < p  id='hacParEle'  className={ ` ${ styles.hackedParagraph } hackedSplitText ` } >Just kidding! But it just goes to show you that you should never trust a QR code! Christmas present incoming...</ p > { /* Hacked Paragraph Element = This custom paragraph element is the container for text that will first have a standard GSAP split text animation applied to it, then a custom glitch text animation applied to it as defined inside of the standard GSAP useGSAP custom React hook. */ }

                
                </ header >


            </ section >

            { /* End Hacked Section Element */ }



            { /* Start Snowfall Section Element */ }

            <  section id='snoSecEle'  className={ `${ styles.snowfallSection } snowfallSplitText` } > { /* Snowfall Section Element = This custom section element is the container for snowy h1 heading, snowman img, snowy paragraph and has a cartoony snowy cabin with evergreen trees background image that will be shown after the three pixelated transition effect animations have completed and after the hacked section animations have finished running. It will have a custom defined (i.e. not a GSAP animation) snowfall animation overlaid on top of it, and it will continue to be shown until the page is reloaded. */ }


                <  header id='snoHeaEle'  className={ styles.snowfallHeader } > { /* Snowfall Header Element = This custom header element is a semantic container for the snowy h1 heading, the snowman img, and the snowy paragraph. */ }


                    < h1  id='snoHe1Ele'  className={ styles.snowfallH1 } >Merry Christmas, { namParStr }!</ h1 > { /* Snowfall Header 1 Element = This custom h1 element is the container for the text that will have a standard GSAP split text animation applied to it as defined inside of the standard GSAP useGSAP custom React hook. The name text will be dynamically set on page load by grabbing the URL name parameter. */ }



                    < img id='snoImgEle'  className={ styles.snowfallImg } src={ snowman } /> { /* Snowfall Image Element = This custom img element is the container for the cartoony image of the snowman that will be displayed in the lower left corner of this section. */ }



                    < p   id='snoParEle'  className={ styles.snowfallParagraph } >< span id='snoSpaEle' className={ styles.snowfallSpan } >From,</ span > Mr. Awesome</ p > { /* Snowfall Paragraph Element = This custom paragraph element is the container for text that will have a standard GSAP split text animation applied to it as defined inside of the standard GSAP useGSAP custom React hook. */ }

                
                </ header >


            </ section >

            { /* End Snowfall Section Element */ }


        </ div >

        // #endregion Christmas Card Div Element


    );



    return chrCarComJsx;

    // #endregion Return Statement


};

// #endregion ChrCarCom



export default ChrCarCom;


