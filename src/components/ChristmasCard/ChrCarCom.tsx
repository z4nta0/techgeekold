
// #region Imports

import { gsap }               from "gsap";                          // Green Socks Animation Platform     = This is the Green Socks Animation Platform core library.
import { hasKeyFun }          from '../../utilities/hasKeyFun.tsx'; // Has Key Function                   = This is a custom utility function that will perform a type guard check in order to see if an object has a specific key, and is required for nested type check narrowing by Typescript.
import { ranNumFun }          from '../../utilities/ranNumFun.tsx'; // Random Number Function             = This is a custom utility function that will generate a random number between a provided minimum and maximum value.
import { type ReactElement }  from 'react';                         // React Element                      = This is the React type definition for a React JSX element.
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";       // Scramble Text Plugin               = This is a Green Socks Animation Platform plugin that will handle HTML text scrambling animations.
import   snowman              from '../../assets/snowman.png';      // Snowman                            = This is the snowman image asset that will be used in the .snowfallSection HTML element.
import { SplitText }          from "gsap/SplitText";                // Split Text                         = This is a Green Socks Animation Platform plugin that will handle HTML text splitting animations (single character, word or line animations).
import   styles               from './ChrCarCom.module.css';        // Styles                             = This is the CSS module stylesheet for the ChristmasCard component.
import { useEffect }          from 'react';                         // Use Effect                         = This is the React useEffect() hook that will handle side effects in functional components (when certain code should be run and/or re-run based on changes to specific dependencies).
import { useGSAP }            from "@gsap/react";                   // Use Green Socks Animation Platform = This is the Green Socks Animation Platform custom React hook that will handle GSAP functionality in React components.
import { useLocation }        from 'react-router-dom';              // Use Location                       = This is the React Router DOM useLocation() hook that will provide access to the current URL properties and parameters.
import   useWindowSize        from "../../hooks/useWindowSize.tsx"; // Use Window Size                    = This is a custom React hook that will provide the current window viewport dimensions and will also be used to trigger the useEffect() hook on window resize events, as well as altering certain animation settings based on how small or big its dimeions are.

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
 * @param props - This component does not take any props, or more accurately it does not use any props
 * 
 * @returns A React JSX element representing the Christmas Card component
 * @see {@link chrCarJsx}
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
    const { winHeiNum, winWidNum }                = useWindowSize();

    /** Search                             = This value is the search property that is returned from the useLocation() React Router hook. It is a string value representing the query parameters in the URL. */
    const { search } : { search : string } = useLocation();
    /** Search Parameters Instance         = This value is an instance of the URLSearchParams class that uses the previously defined {@link search} variable and provides methods for interacting with the query parameters. This is a web standard API and not React specific. */
    const seaParIns  : URLSearchParams     = new URLSearchParams( search );
    /** Name Parameter String              = This value is the name query parameter (or null) which will be used to customize the Christmas Card component's h1 element that is inside of {@link chrCarJsx}. It is acquired using the get() method on the previously defined {@link seaParIns} URLSearchParams class instance. */
    const namParStr  : string | null       = seaParIns.get( 'name' );

    // #endregion State Variables


    // #region const Variables


    // #region aniSetObj

    /**
     * AniSetObj = Animation Settings Object will store the customizable settings values for the snowfall animation.
     * @see {@link aniSetObj}
     * 
     * @property sizMaxNum = Size Maximum Number will store a snowflake HTML element's maximum size value.
     * @property sizMinNum = Size Minimum Number will store a snowflake HTML element's minimum size value.
     * @property snoColStr = Snowflake Color String will store a snowflake HTML element's color value.
     * @property snoCouNum = Snowflake Count Number will store the number of snowflake HTML elements that will be created.
     * @property speMaxNum = Speed Maximum Number will store a snowflake HTML element's maximum falling speed value.
     * @property speMinNum = Speed Minimum Number will store a snowflake HTML element's minimum falling speed value.
     *
    */

    type AniSetObj = {

        sizMaxNum : number;
        sizMinNum : number;
        snoColStr : string;
        snoCouNum : number;
        speMaxNum : number;
        speMinNum : number;

    };

    /** @see {@link AniSetObj} */
    const aniSetObj : AniSetObj = {

        sizMaxNum : 8,
        sizMinNum : 1,
        snoColStr : '#FFFFFF',
        snoCouNum : 120,
        speMaxNum : 5,
        speMinNum : 1,

    };

    // #endregion aniSetObj


    /** Position Snowflake Array    = This will store an array of {@link PosSnoObj} objects, with one being created for each snowflake HTML element. Said objects are push into this array by {@link iniSnoFun}, after they are created by and returned from {@link creSnoFun}. */
    const posSnoArr : PosSnoObj[]   = [];
    /** Position Snowflake Function = This function will be defined inside of {@link creSnoFun} and will handle updating the position of a snowflake HTML element as well as resetting its properties if it has have moved beyond the containing HTML element's dimensions. */
    type PosSnoFun                  = () => void;
    /** Position Snowflake Object   = This object will be created by and returned from {@link creSnoFun}, and then pushed into the {@link posSnoArr} array inside of {@link iniSnoFun} which will then be looped through and executed on an interval by {@link aniSnoFun}. */
    type PosSnoObj                  = { posSnoFun : PosSnoFun; };

    //#endregion const Variables


    // #region let Variables

    /** Container Height Number   = This will store the height value of the snowfall animation's containing HTML element inside of {@link iniSnoFun}, which will then be used inside of both it and {@link creSnoFun} in order to determine a snowflake HTML element's positioning properties. */
    let conHeiNum : number        = 0;
    /** Container Section Element = This will store the snowfall animation's containing HTML Section element inside of {@link iniSnoFun}. All created snowflake HTML elements will then be appended to this element inside of {@link creSnoFun}. Its dimensions will also be used inside of both {@link creSnoFun} and {@link posSnoFun} for setting the position properties of all snowflake HTML elements. */
    let conSecEle : HTMLElement;
    /** Container Width Number    = This will store the width value of the snowfall animation's containing HTML element inside of {@link iniSnoFun}, which will then be used inside of both it and {@link creSnoFun} in order to determine a snowflake HTML element's positioning properties. */
    let conWidNum : number        = 0;
    /** Identifier Counter Number = This will store an incrementing value that will be used inside of {@link iniSnoFun} to give each snowflake HTML element a unique identifier by increasing this number according to the current {@link posSnoArr} array length, which will be increased by one for each new snowflake HTML element that is created. */
    let ideCouNum : number        = 0;
    /** Set Timeout Function      = This will store the setTimeout() function that will recursively call {@link aniSnoFun}, in order to create the snowfall animation effect. This variable will store a unqiue identifier given by Javascript that will be used to clear the timeout inside of {@link cleSnoFun}, which itself is called inside of {@link useEffect} when the window is mounted or resized. */
    let setTimFun : ReturnType<typeof setTimeout>;

    //#endregion let Variables


    // #endregion Component Scoped Variables



    // #region creSnoFun


    // #region Function Type Definitions


    // #region CreSnoFunPar

    /**
     * CreSnoFunPar = Create Snowflake Function Parameter will store the parameters that were provided to {@link creSnoFun} when it was called via {@link iniSnoFun}, and it will contain values intended to create a single snowflake HTML element.
     *
     * @property ideNum = Identifier Number will store a unique id number for the to be created snowflake HTML element.
     * @property sizNum = Size Number will store the size for the to be created snowflake HTML element.
     * @property speNum = Speed Number will store the speed for the falling (y position) animation for the to be created snowflake HTML element.
     * @property xpoNum = X Position Number will store the starting x position for the to be created snowflake HTML element.
     * @property ypoNum = Y Position Number will store the starting y position for the to be created snowflake HTML element.
     *
    */

     type CreSnoFunPar = {

        ideNum : number;
        sizNum : number;
        speNum : number;
        xpoNum : number;
        ypoNum : number;

    };

    // #endregion CreSnoFunPar


    /** Create Snowflake Function        = This function will create snowflake HTML div element, apply styling via both the static component scoped variable {@link aniSetObj} and the dynamically provided parameters {@link CreSnoFunPar}, and then return the {@link CreSnoFunRet} object containing the snowflake positioning function */
    type CreSnoFun    = ( creSnoFunPar : CreSnoFunPar ) => CreSnoFunRet;
    /** Create Snowflake Function Return = This function will return the {@link PosSnoObj} object containing the position snowflake function, which will be pushed into the component scoped {@link posSnoArr} array by {@link iniSnoFun} which will then call {@link aniSnoFun} that will loop over said array and update the positions of all snowflakes on a set interval, thereby creating the snowfall animation effect. */
    type CreSnoFunRet = { posSnoFun : PosSnoFun; };

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * creSnoFun = Creat Snowflake Function
     * @see {@link CreSnoFun}
     * @see {@link CreSnoFunRet}
     *
     * @summary
     * This will create a single snowflake HTML element, apply styling to and
     * append said elements to the DOM and return the {@link PosSnoObj} object
     * back to the calling function {@link iniSnoFun}, where it will be pushed
     * into the component scoped {@link posSnoArr} array. The calling function
     * will then call {@link aniSnoFun} which will loop over said array and
     * update the positions of all snowflake HTML elements on a set interval,
     * creating the snowfall animation effect.
     *
     * The original code for the entire snowfall animation came from a very
     * old Codecademy tutorial (minified code linked below) that is no longer
     * available on their site. I have since heavily modified and adapted the
     * code to work inside of a React functional component using Typescript.
     *
     * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
     * @author z4ntao        <https://github.com/z4nta0>
     *
     * @param creSnoFunPar - This is an object containing the parameters required to create a single snowflake HTML element.
     * @see {@link CreSnoFunPar}
     *
     * @returns An object containing the position snowflake function.
     * @see {@link CreSnoFunRet}
     * @see {@link PosSnoFun}
     * @see {@link PosSnoObj}
     *
     * @example
     * ```ts
     * creSnoFun( creSnoFunPar ) // => { posSnoFun : posSnoFun }
     * ```
     *
    */

    const creSnoFun : CreSnoFun = ( creSnoFunPar ) => {


        // #region Function Variables


        // #region SnoSetObj

        /**
         * SnoSetObj = Snowflake Settings Object will store all properties and methods related to creating and positioning a single snowflake HTML element.
         *
         * @property oscSteNum = Oscillation Step Number will store a randomized number between 0.01 and 1 that will be used to modify the snoOscNum property value with each snowflake HTML element position update.
         * @property snoDivEle = Snowflake Div Element will store the snowflake HTML div element that will be created for the snowflake.
         * @property snoIdeNum = Snowflake Identifier Number will store a unique id number for the snowflake HTML element that is created. This value is provided by the {@link CreSnoFunPar} object, and it will be equal to length of the {@link posSnoArr} at the time that it was calculated by the calling function {@link iniSnoFun}.
         * @property snoOscNum = Snowflake Oscillation Number will store a number that will be updated by the oscSteNum property value and then used to modify the snoXpoNum property with each snowflake HTML element position update.
         * @property snoSizNum = Snowflake Size Number will store the size number for the snowflake HTML element. This value is provided by the {@link CreSnoFunPar} object, and its value will be randomly calculated between a minimum and maximum (affected by window viewport's width dimension) by the calling function {@link iniSnoFun}.
         * @property snoSpeNum = Snowflake Speed Number will store the number that will be used to update the snoYpoNum property with each snowflake HTML element position update. This value is provided by the {@link CreSnoFunPar} object, and its value will be randomly calculated between a minimum and maximum (affected by window viewport's height dimension) by the calling function {@link iniSnoFun}.
         * @property snoXpoNum = Snowflake X Position Number will store a number that will be updated by the snoOscNum property value and is responsible for the oscillating (x position) animation for the snowflake HTML element. This value is increased by using the oscSteNum property value as a parameter for the {@link Math.cos} function, so that as the oscSteNum value is increased the x position value will drift back and forth between -1 and 1 (i.e. oscillate) in the horizontal (x) direction, with its original, starting x position value as its central point. This, combined with the vertical (y) position updates, is what creates the natural falling effect for the animation. The original, starting value is provided by the {@link CreSnoFunPar} object, and its value will be randomly calculated between a minimum (0) and maximum (window viewport width) by the calling function {@link iniSnoFun}.
         * @property snoYpoNum = Snowflake Y Position Number will store a number that will be updated by the snoSizNum property value and is responsible for the falling (y position) animation for the snowflake HTML element. This value will be increased by the snoYpoNumrty value with each snowflake HTML element position update. This, combined with the horizontal (x) position updates, is what creates the natural falling effect for the animation. The original, starting value is provided by the {@link CreSnoFunPar} object, and its value will be randomly calculated between a minimum (0) and maximum (window viewport height) by the calling function {@link iniSnoFun}.
         * 
         * @property snoResFun = Snowflake Reset Function will store the function for that is responsible for resetting each snowflake HTML element's position and other related properties when they progress beyond the containing HTML element's dimensions.
         *
        */

        type SnoSetObj = {

            oscSteNum : number;
            snoDivEle : HTMLDivElement;
            snoIdeNum : number;
            snoOscNum : number;
            snoSizNum : number;
            snoSpeNum : number;
            snoXpoNum : number;
            snoYpoNum : number;

            snoResFun : () => void;

        };

        /** @see {@link SnoSetObj} */
        const snoSetObj : SnoSetObj = {

            oscSteNum : ranNumFun( { maxNum : 10, minNum : 1 } ) / 100,
            snoDivEle : document.createElement( 'div' ),
            snoIdeNum : creSnoFunPar.ideNum,
            snoOscNum : 0,
            snoSizNum : creSnoFunPar.sizNum,
            snoSpeNum : creSnoFunPar.speNum,
            snoXpoNum : creSnoFunPar.xpoNum,
            snoYpoNum : creSnoFunPar.ypoNum,

            snoResFun : function () {

                snoSetObj.oscSteNum = ranNumFun( { maxNum : 10,                         minNum : 1,                   } ) / 100; /** This will reset the oscillation step size to a new random value between 0.01 and 0.1 */
                snoSetObj.snoSizNum = ranNumFun( { maxNum : aniSetObj.sizMaxNum,        minNum : aniSetObj.sizMinNum, } );       /** This will reset the snowflake size to a new random value between the animation settings object's defined maximum (affected by window viewport's width dimension) and minimum sizes. */
                snoSetObj.snoSpeNum = ranNumFun( { maxNum : aniSetObj.speMaxNum,        minNum : aniSetObj.speMinNum, } );       /** This will reset the snowflake falling speed to a new random value between the animation settings object's defined maximum (affected by window viewport's height dimension) and minimum speeds. */
                snoSetObj.snoXpoNum = ranNumFun( { maxNum : conWidNum - snoSetObj.snoSizNum, minNum : 0,                   } );  /** This will reset the snowflake x (horizontal) position to a new random value between 0 and the containing HTML element's width minus the snowflake HTML element's size. */
                snoSetObj.snoYpoNum = 0;                                                                                         /** This will reset the snowflake y (vertical) position to 0. */

            },

        };

        // #endregion SnoSetObj


        // #endregion Function Variables


        // #region DOM Manipulation and CSS Styling

        snoSetObj.snoDivEle.className = 'snowflakes';                                  /** This sets the class name for each snowflake HTML element, which will enable the {@link cleSnoFun} to more easily grab all snowflake HTML elements and clear them from the DOM should the animation need to be reset (on a window resize event, for example). This could also allow CSS styling to be applied to all snowflake HTML elements, though that is not currently utilized. */

        snoSetObj.snoDivEle.setAttribute( 'id', `snowflake${ snoSetObj.snoIdeNum }` ); /** This sets a unique id for each snowflake HTML element by using the length of the {@link posSnoArr} array, which should equal the index number of this snowflake HTML element's {@link posSnoFun} that was pushed into said array. */

        snoSetObj.snoDivEle.style.backgroundColor = aniSetObj.snoColStr;               /** This sets the snowflake HTML element's color. */
        snoSetObj.snoDivEle.style.borderRadius    = `${aniSetObj.sizMaxNum}px`;        /** This makes the snowflake HTML element circular. */
        snoSetObj.snoDivEle.style.fontSize        = '0px';                             /** This ensures that no text affects the snowflake HTML element's size. */
        snoSetObj.snoDivEle.style.height          = `${snoSetObj.snoSizNum}px`;        /** This sets the snowflake HTML element's height. */
        snoSetObj.snoDivEle.style.left            = `${snoSetObj.snoXpoNum}px`;        /** This sets the snowflake HTML element's starting x (horizontal) position. */
        snoSetObj.snoDivEle.style.position        = 'absolute';                        /** This sets the snowflake HTML element's position to absolute. */
        snoSetObj.snoDivEle.style.top             = `${snoSetObj.snoYpoNum}px`;        /** This sets the snowflake HTML element's starting y (vertical) position. */
        snoSetObj.snoDivEle.style.width           = `${snoSetObj.snoSizNum}px`;        /** This sets the snowflake HTML element's width. */

        conSecEle.appendChild( snoSetObj.snoDivEle );                                  /** This appends the snowflake HTML element to the DOM. */

        // #endregion DOM Manipulation and CSS Styling


        // #region Return Statement

        const creSnoFunRet : CreSnoFunRet = {

            // #region posSnoFun

            /**
             * posSnoFun = Position Snowflake Function
             * @see {@link PosSnoFun}
             *
             * @summary
             * This will handle updating the newly created snowflake HTML
             * element's position, as well as handle resetting said position if
             * its position moves beyond the containing HTML element's
             * dimensions. It will be returned to the calling function
             * {@link iniSnoFun} where it will be pushed into the component
             * scoped {@link posSnoArr} array. The calling function will then
             * call {@link aniSnoFun} which will loop over said array and
             * update the positions of all snowflake HTML elements.
             *
             * The original code for the entire snowfall animation came from a very
             * old Codecademy tutorial (minified code linked below) that is no longer
             * available on their site. I have since heavily modified and adapted the
             * code to work inside of a React functional component using Typescript.
             *
             * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
             * @author z4ntao        <https://github.com/z4nta0>
             *
             * @param void - This function takes no parameters.
             *
             * @returns This function does not return anything.
             *
             * @example
             * ```ts
             * creSnoFunRet.posSnoFun() // => void
             * ```
             *
            */

            posSnoFun : () => {

                snoSetObj.snoDivEle.style.left =  `${snoSetObj.snoXpoNum}px`;      /** This updates the horizontal (x) position. */
                snoSetObj.snoDivEle.style.top  =  `${snoSetObj.snoYpoNum}px`;      /** This updates the vertical (y) position. */
                snoSetObj.snoOscNum            += snoSetObj.oscSteNum;             /** This updates the oscillation number that is responsible for updating the x (horizontal) position. */
                snoSetObj.snoXpoNum            += Math.cos( snoSetObj.snoOscNum ); /** This updates the x (horizontal) position and creates the oscillation (horizontal, back and forth) animation because {@link Math.cos} will always return a value between -1 and 1. */
                snoSetObj.snoYpoNum            += snoSetObj.snoSpeNum;             /** This updates the y (vertical) position and creates the falling animation. */

                /** This check is responsible for the resetting the horizontal (x) position if the snowflake HTML element's current x position is greater than the width of its containing HTML element minus the snowflake HTML element's size (beyond the right edge) OR if the snowflake HTML element's position is less than 0 (beyond the left edge, which can happen due to oscillation effect). */
                if ( snoSetObj.snoXpoNum > ( conWidNum - snoSetObj.snoSizNum)  || snoSetObj.snoXpoNum < 0 ) {

                    snoSetObj.snoResFun();

                };


                /** This check is responsible for the resetting the vertical (y) position if the snowflake HTML element's current y position is greater than the height of its containing HTML element minus the snowflake HTML element's size (beyond the bottom edge). */
                if ( snoSetObj.snoYpoNum > ( conHeiNum - snoSetObj.snoSizNum ) ) {

                    snoSetObj.snoResFun();

                };

            },

            // #endregion posSnoFun

        };


        /** @see {@link creSnoFunRet} */
        return creSnoFunRet;

        // #endregion Return Statement

    };

    // #endregion Function Body


    // #endregion creSnoFun



    // #region aniSnoFun


    // #region Function Type Definitions

    /** Animate Snowflake Function = This function will execute each snowflake HTML element's position update function that is stored in the component scoped {@link posSnoArr} array and then recursively call itself at a set interval, thereby creating the snowfall animation effect. */
    type AniSnoFun = () => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * aniSnoFun = Animate Snowflake Function
     * @see {@link AniSnoFun}
     *
     * @summary
     * This will create the animation effect by executing the position update
     * function of each snowflake HTML element and then recursively calling
     * itself at a set interval (16.7 ms ~= 60 FPS), which creates both the
     * falling and oscillating motions. This function is called by
     * {@link iniSnoFun} after creating the desired number of snowflake HTML
     * elements, and then pushing said elements into the component scoped
     * {@link posSnoArr} array.
     *
     * The original code for the entire snowfall animation came from a very
     * old Codecademy tutorial (minified code linked below) that is no longer
     * available on their site. I have since heavily modified and adapted the
     * code to work inside of a React functional component using Typescript.
     *
     * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
     * @author z4ntao        <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * aniSnoFun() // => void
     * ```
     *
     *
    */

    const aniSnoFun : AniSnoFun = () => {

        /** This loop will step through each snowflake HTML element's update function that is stored in the component scoped {@link posSnoArr} array. */
        for ( let indNum : number = 0; indNum < posSnoArr.length; indNum += 1 ) {

            /** This will execute the position update function for each snowflake HTML element. The {@link PosSnoObj} objects are pushed into the component scoped {@link posSnoArr} array by {@link iniSnoFun} as they are returned via executing {@link creSnoFun}. */
            posSnoArr[ indNum ].posSnoFun();

        };


        /** This will recursively call this function every 16.7 ms (~60 FPS), thereby updating each snowflake HTML element's position with each call and creating the desired animation effect. This variable stores a unique identifier given to it by Javascript and will be used to clear the timeout inside of {@link cleSnoFun}, which itself is called inside of {@link useEffect} when the component is first loaded or the window is resized. */
        setTimFun = setTimeout( function () { aniSnoFun(); }, 16.7 );

    };

    // #endregion Function Body


    // #endregion aniSnoFun



    // #region iniSnoFun


    // #region Function Type Definitions

    /**
     * IniSnoFunPar = Initialize Snowfall Function Parameters will store the parameters provided to {@link iniSnoFun} when it was called inside of {@link useEffect}, and it will contain the values that are responsible for setting the component scoped variables {@link conSecEle} and {@link aniSetObj}.
     *
     * @property conEle = Container Element will store the containing HTML element to which all of the created snowflake HTML elements will be appended inside of {@link creSnoFun}.
     * @property setObj = Settings Object will store the settings object that will be used inside of {@link iniSnoFun} to override the default animation settings stored inside of the component scoped {@link aniSetObj} object.
     *
    */
    
    type IniSnoFunPar = {

        conEle : HTMLElement;
        setObj : SetObj;

    };

    /** Initialize Snowfall Function = This function will check the provided {@link IniSnoFunPar} parameters for valid matching keys, set the component scoped variables accordingly, make the indicated number of calls to {@link creSnoFun} for each snowflake HTML element, push the returned {@link PosSnoObj} object into the component scoped {@link posSnoArr} array, and finally initialize the animation by making a call to {@link aniSnoFun} to loop over said array and update each snowflake HTML element's positions. */
    type IniSnoFun = ( iniSnoFunPar : IniSnoFunPar ) => void;
    /** Settings Object              = This will store the {@link AniSetObj} object that is declared for the {@link useEffect} function block, where {@link iniSnoFun} is called from, and will contain the values that will be used to override the component scoped {@link aniSetObj} object. */
    type SetObj    = AniSetObj;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * iniSnoFun = Initialize Snowfall Function
     * @see {@link IniSnoFun}
     *
     * @summary
     * This will initialize the snowfall animation. It will first perform a
     * check to make sure that the provided {@link SetObj} object contains
     * valid keys that match the component scoped {@link aniSetObj} object's
     * keys, and then override the default values of said object with the
     * provided values. It will then grab the containing HTML element from the
     * {@link conEle} parameter and assign it to the component scoped variable
     * {@link conSecEle} before then setting the component scoped variables
     * {@link conHeiNum} and {@link conWidNum} according to its dimensions. A
     * loop will then be initiated to create the desired number of snowflake
     * HTML elements as specified in the {@link aniSetObj} object's snoCouNum
     * property by making calls to {@link creSnoFun} for each and then pushing
     * the returned {@link PosSnoObj} object from each call into the component
     * scoped {@link posSnoArr} array. Lastly, it will call {@link aniSnoFun}
     * which will loop over said array and call each of the snowflake HTML
     * element {@link PosSnoFun} functions on a set interval thus creating the
     * animation effect.
     *
     * The original code for the entire snowfall animation came from a very
     * old Codecademy tutorial (minified code linked below) that is no longer
     * available on their site. I have since heavily modified and adapted the
     * code to work inside of a React functional component using Typescript.
     *
     * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
     * @author z4ntao        <https://github.com/z4nta0>
     *
     * @param conEle - This is the containing HTML element parameter to which all of the created snowflake HTML elements will be appended and whose dimensions will be used to determine the animation boundaries.
     * @param setObj - This is the settings object parameter that will be used to override the default animation settings that are stored in the component scoped {@link aniSetObj} object.
     * @see {@link SetObj}
     * @see {@link IniSnoFunPar}
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * iniSnoFun( { conEle : containingHTMLElement, setObj : iniSetObj, } ) // => void
     * ```
     *
    */

    const iniSnoFun : IniSnoFun = ( { conEle, setObj } ) => {

        // #region setObj Keys Loop

        /** This loops through each key in the provided {@link SetObj} parameter. */
        for ( const key in setObj ) {

            /** Settings Objecy Key = This stores the loop's current {@link SetObj} property key and will help to type narrow said key so that Typescript does not throw an error when indexing into the {@link SetObj} parameter inside of the next 'if' code block. */
            const setObjKey = key as keyof SetObj;


            /** This performs a custom type guard check to ensure that only valid keys are used to override the default animation settings that are stored in the component scoped {@link aniSetObj} object. The custom type guard check is required because of the nested nature of the key variable (the key variable is actually from the {@link SetObj} parameter but will be used to index into the component scoped {@link aniSetObj} object) and Typescript does not allow indexing into an object with a string key without a type assertion or a type guard. */
            if ( hasKeyFun( aniSetObj, key ) === true ) {

                /** This overrides the default animation settings property values inside of the component scoped {@link aniSetObj} object with the provided {@link SetObj} parameter values. */
                aniSetObj[ key ] = setObj[ setObjKey ];

            }

            /** This handlea the case where the custom type guard check failed. */
            else {

                /** This issues a console warning if invalid keys were provided in the {@link SetObj} parameter. */
                console.warn( `Snowfall Effect: Invalid setting key '${ key }' provided in the setObj parameter for the iniSnoFun function.` );

            };

        };

        // #endregion setObj Keys Loop


        // #region Set Container Element and Dimensions

        /** This sets the component scoped {@link conSecEle} variable equal to the containing HTML element {@link conEle} that was provided in the function parameters. */
        conSecEle = conEle;
        /** This sets the component scoped {@link conHeiNum} variable equal to the component scoped {@link conSecEle}'s height value. */
        conHeiNum = conSecEle.clientHeight;
        /** This sets the component scoped {@link conWidNum} variable equal to the component scoped {@link conSecEle}'s width value. */
        conWidNum = conSecEle.offsetWidth;

        // #endregion Set Container Element and Dimensions


        // #region Create Snowflake Loop

        /** This loop creates the desired number of snowflake HTML elements and their related {@link PosSnoFun} functions according to the component scoped {@link aniSetObj}'s snoCouNum property value, which was provided by and set according to the {@link SetObj} parameter. */
        for ( let incNum : number = 0; incNum < aniSetObj.snoCouNum; incNum += 1 ) {

            /** This sets the component scoped {@link ideCouNum} variable equal to the current length of the component scoped {@link posSnoArr} array, representing the number of snowflake HTML elements created so far from calling {@link creSnoFun}. This number will then be used inside of {@link creSnoFun} as part of the id value for the newly created snowflake HTML element. */
           ideCouNum = posSnoArr.length;


           /** @see {@link CreSnoFunPar} */
           const creSnoFunPar : CreSnoFunPar = {

                ideNum : ideCouNum,                                                                    /** Identifier Number is set equal to the component scoped ideCouNum, which itself was just previously set according to the component scoped posSnoArr's length at this point in the loop. */
                sizNum : ranNumFun( { maxNum : aniSetObj.sizMaxNum, minNum : aniSetObj.sizMinNum, } ), /** Size Number is set to a randomly generated number between the component scoped aniSetObj's sizMaxNum and sizMinNum property values. */
                speNum : ranNumFun( { maxNum : aniSetObj.speMaxNum, minNum : aniSetObj.speMinNum, } ), /** Speed Number is set to a randomly generated number between the component scoped aniSetObj's speMaxNum and speMinNum property values. */
                xpoNum : ranNumFun( { maxNum : conWidNum,           minNum : 0, } ),                   /** X (horizontal) Position Number is set to a randomly generated number between 0 and the component scoped conWidNum's value. */
                ypoNum : ranNumFun( { maxNum : conHeiNum,           minNum : 0, } ),                   /** Y (vertical) Position Number is set to a randomly generated number between 0 and the component scoped conHeiNum's value. */

            };


            /** This pushes the {@link PosSnoObj} that is return from calling {@link creSnoFun} into the component scoped {@link posSnoArr} array. After the current loop is finished, {@link aniSnoFun} will be called and this array will be looped over in order to update each snowflake HTML element's position in order to create the snowfall animation effect. */
            posSnoArr.push( creSnoFun( creSnoFunPar ) );

        };

        // #endregion Create Snowflake Loop


        /** This will loop through the component scoped {@link posSnoArr} array, execute each snowflake HTML element's {@link PosSnoFun}, and then recursively call itself on a set interval in order to create the snowfall animation effect. */
        aniSnoFun();

    };

    // #endregion Function Body


    // #endregion iniSnoFun



    // #region cleSnoFun


    // #region Function Type Definitions

    /** Clear Snowfall Function = This function will grab and turn into an array all snowflake HTML elements there were created from the previous snowfall animation, remove each of them from the DOM, empty the component scoped {@link posSnoArr} array, and then clear the previous animation's interval timeout that is stored in the component scoped {@link setTimFun}. */
    type CleSnoFun = () => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * cleSnoFun = Clear Snowfall Function
     * @see {@link CleSnoFun}
     *
     * @summary
     * This will remove all snowflake HTML elements from the DOM that were
     * created from the previous snowfall animation, empty the component scoped
     * {@link posSnoArr} array and then clear the previous animation's timeout
     * interval that is stored in the component scoped {@link setTimFun}. This
     * function is called inside of {@link useEffect}, which itself is called
     * when the component is first mounted and whenever the window is resized.
     *
     * The original code for the entire snowfall animation came from a very
     * old Codecademy tutorial (minified code linked below) that is no longer
     * available on their site. I have since heavily modified and adapted the
     * code to work inside of a React functional component using Typescript.
     *
     * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
     * @author z4ntao        <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * cleaSnoFun() // => void
     * ```
     *
    */

    const cleSnoFun : CleSnoFun = () => {

        /** Snowflake Element Array = This stores an array of all snowflake HTML elements grabbed from the DOM via their shared class name of snowflakes. These snowflake HTML elements were previously created by and attached to the DOM via {@link creSnoFun} when the snowfall animation was initialized by calling {@link iniSnoFun}. */
        const snoEleArr : Element[] = Array.from( document.getElementsByClassName( 'snowflakes' ) );


        /** This check is needed to prevent errors in case this function is called before any snowflake HTML elements have been created, typically when the component is first mounted. */
        if ( snoEleArr.length === 0 ) {

            return;

        };


        /** This loops through each snowflake HTML element from the above defined {@link snoEleArr} array. */
        for ( let indNum : number = 0; indNum < snoEleArr.length; indNum++ ) {

            /** This removes the loop's current snowflake HTML element that is stored in the {@link snoEleArr} array from the DOM. */
            snoEleArr[ indNum ].remove();

        };


        /** This empties the component scoped {@link posSnoArr} array that contains each snowflake HTML element's {@link PosSnoFun}. */
        posSnoArr.length = 0;

        
        /** This clears the setTimeout function stored in the component scoped {@link setTimFun} that is used for recursively calling the {@link aniSnoFun} function in order to update all snowflake HTML elements' positions which creates the snowfall animation effect. */
        clearTimeout( setTimFun );

    };

    // #endregion Function Body


    // #endregion cleSnoFun



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


        // #region 5th GSAP Animation - 2nd Hacked Header Glitch Effect

        /** This distorts the hacHe1Ele HTML element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );
        /** This undistorts the hacHe1Ele HTML element back to normal using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );
        /** This quickly makes the hacHe1Ele HTML element invisible, creating a flicker effect when used with the below opacity animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } );
        /** This quickly makes the hacHe1Ele HTML element visible, creating a flicker effect when used with the above opacity animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } );
        /** This moves the hacHe1Ele HTML element 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } );
        /** This undoes the previous move of the hacHe1Ele HTML element back to its original position, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } );
        /** This scales the hacHe1Ele HTML element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );
        /** This scales the hacHe1Ele HTML element back to its original vertical scale with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );

        // #endregion 5th GSAP Animation - 2nd Hacked Header Glitch Effect


        // #region 6th GSAP Animation - Hacked Paragraph Glitch Effect

        /** This distorts the hacParEle HTML element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } );
        /** This undistorts the hacParEle HTML element back to normal using a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } );
        /** This quickly makes the hacParEle HTML element invisible, creating a flicker effect when used with the below opacity animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 0                              } );
        /** This quickly makes the hacParEle HTML element visible, creating a flicker effect when used with the above opacity animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 1                              } );
        /** This moves the hacParEle HTML element 20 pixels in the horizontal direction to the left, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : -20                            } );
        /** This undoes the previous move of the hacParEle HTML element back to its original position, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : 0                              } );
        /** This scales the hacParEle HTML element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } );
        /** This scales the hacParEle HTML element back to its original vertical scale with a GSAP built in ease in out animation, in seconds. */
        gsaTimIns.to( hacParEle, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } );

        // #endregion 6th GSAP Animation - Hacked Paragraph Glitch Effect


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

        /** @see {@link AniSetObj} */
        const iniSetObj : AniSetObj = {

            sizMaxNum : 8,
            sizMinNum : 1,
            snoColStr : '#FFFFFF',
            snoCouNum : smaWidBoo === true ? 60 : 120,
            speMaxNum : smaHeiBoo === true ? 2 : 5,
            speMinNum : 1,

        };

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


    /** Christmas Card Javascript XML = This stores the HTML-like code that the Christmas Card component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const chrCarJsx : ReactElement    = (


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


    return chrCarJsx;


    // #endregion Return Statement

}

export default ChrCarCom;


