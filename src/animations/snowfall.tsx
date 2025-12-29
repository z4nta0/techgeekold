
// #region Imports

import   hasKeyFun   from '../utilities/hasKeyFun.tsx'; /** Has Key Function       = This is a custom utility function that will perform a type guard check in order to see if an object has a specific key, and is required for nested type check narrowing by Typescript. */
import { ranNumFun } from '../utilities/ranNumFun.tsx'; /** Random Number Function = This is a custom utility function that will generate a random number between a provided minimum and maximum value. */

// #endregion Imports



// #region Component Scoped Variables

/**
 * Component Scoped Variables
 *
 * @summary
 * These values are all scoped to the ChristmasCard component function,
 * and are meant to be set and shared between the various functions.
 *
*/


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

export const cleSnoFun : CleSnoFun = () => {

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



export default iniSnoFun;
