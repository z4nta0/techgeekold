
// #region Imports

import hasKeyFun from '../utilities/hasKeyFun.ts'; /** This import is the custom has key function utility that will perform a type guard check in order to see if an object has a specific key and is required for nested type check narrowing by Typescript. */
import ranNumFun from '../utilities/ranNumFun.ts'; /** This import is the custom random number function utility that will generate a random number between a provided minimum and maximum value. */

// #endregion Imports



// #region File Scoped Variables


// #region const Variables


// #region aniSetObj

/**
 * Animation Settings Object = This custom type stores the types that will be used for the custom {@link aniSetObj} object.
 * 
 * @property sizMaxNum = Size Maximum Number custom property stores the type that will be used for the custom {@link aniSetObj.sizMaxNum} property.
 * @property sizMinNum = Size Minimum Number custom property stores the type that will be used for the custom {@link aniSetObj.sizMinNum} property.
 * @property snoColStr = Snowflake Color String custom property stores the type that will be used for the custom {@link aniSetObj.snoColStr} property.
 * @property snoCouNum = Snowflake Count Number custom property stores the type that will be used for the custom {@link aniSetObj.snoCouNum} property.
 * @property speMaxNum = Speed Maximum Number custom property stores the type that will be used for the custom {@link aniSetObj.speMaxNum} property.
 * @property speMinNum = Speed Minimum Number custom property stores the type that will be used for the custom {@link aniSetObj.speMinNum} property.
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


/**
 * Animation Settings Object = This custom object stores the properties that act as the customizable settings for the snowfall animation.
 * 
 * @property sizMaxNum = Size Maximum Number custom property stores a snowflake HTML div element's maximum size value.
 * @property sizMinNum = Size Minimum Number custom property stores a snowflake HTML div element's minimum size value.
 * @property snoColStr = Snowflake Color String custom property stores a snowflake HTML div element's color value.
 * @property snoCouNum = Snowflake Count Number custom property stores the number of snowflake HTML div elements that will be created.
 * @property speMaxNum = Speed Maximum Number custom property stores a snowflake HTML div element's maximum falling speed value.
 * @property speMinNum = Speed Minimum Number custom property stores a snowflake HTML div element's minimum falling speed value.
 *
*/

const aniSetObj : AniSetObj = {

    sizMaxNum : 8,
    sizMinNum : 1,
    snoColStr : '#FFFFFF',
    snoCouNum : 120,
    speMaxNum : 5,
    speMinNum : 1,

};

// #endregion aniSetObj



/** Position Snowflake Array    = This custom variable stores an array of custom {@link PosSnoObj} objects, with one being created for each snowflake HTML div element inside of the custom {@link creSnoFun} function and once returned by said function they are pushed into this array by the custom {@link iniSnoFun} function. */
const posSnoArr : PosSnoObj[]   = [];
/** Position Snowflake Function = This custom type stores the type that will be used for the custom {@link PosSnoObj.posSnoFun} function that will be defined and returned inside of the custom {@link creSnoFun} function and will handle updating the position of a snowflake HTML div element as well as resetting its properties if it has have moved beyond the containing HTML element's dimensions. */
type PosSnoFun                  = () => void;
/** Position Snowflake Object   = This custom type stores the type that will be created by and returned from the custom {@link creSnoFun} function and then pushed into the custom {@link posSnoArr} array by the custom {@link iniSnoFun} function, which said array will then be looped through and executed on an interval by the custom {@link aniSnoFun} function. */
type PosSnoObj                  = { posSnoFun : PosSnoFun; };

//#endregion const Variables



// #region let Variables

/** Container Height Number   = This custom variable stores the height number of the snowfall animation's containing HTML element inside of the custom {@link iniSnoFun} function, which will then be used inside of both it and the custom {@link creSnoFun} function in order to determine a snowflake HTML div element's positioning properties. */
let conHeiNum : number        = 0;
/** Container Section Element = This custom variable stores the snowfall animation's containing HTML element inside of the custom {@link iniSnoFun} function and to which all created snowflake HTML div elements will then be appended inside of the custom {@link creSnoFun} function. Its dimensions will also be used inside of both the custom {@link creSnoFun} and {@link posSnoFun} functions for setting the position properties of all snowflake HTML div elements. */
let conSecEle : HTMLElement;
/** Container Width Number    = This custom variable stores the width number of the snowfall animation's containing HTML element inside of the custom {@link iniSnoFun} function, which will then be used inside of both it and the custom {@link creSnoFun} function in order to determine a snowflake HTML div element's positioning properties. */
let conWidNum : number        = 0;
/** Identifier Counter Number = This custom variable stores an incrementing number that will be used inside of the custom {@link iniSnoFun} function to give each snowflake HTML div element a unique identifier by increasing this number according to the current custom {@link posSnoArr} array length, which will be increased by one for each new snowflake HTML div element that is created. */
let ideCouNum : number        = 0;
/** Set Timeout Function      = This custom variable stores the setTimeout() function that will recursively call the custom {@link aniSnoFun} function, in order to create the snowfall animation effect and it will store a unqiue identifier given by Javascript that will be used to clear the timeout inside of the custom {@link cleSnoFun} function, which itself is called inside of the standard React {@link useEffect} hook when the component is mounted or the window is resized. */
let setTimFun : ReturnType<typeof setTimeout>;

//#endregion let Variables


// #endregion File Scoped Variables



// #region creSnoFun


// #region Function Type Definitions


// #region CreSnoFunPar

/**
 * Create Snowflake Function Parameters = This custom type stores types for the parameters that are provided to the custom {@link creSnoFun} function when it is called via the custom {@link iniSnoFun} function and will contain all the relevant values that are intended to create a single snowflake HTML div element.
 *
 * @property ideNum = Identifier Number custom type stores a unique id number for the to be created snowflake HTML div element.
 * @property sizNum = Size Number custom type stores the type for the to be created snowflake HTML div element.
 * @property speNum = Speed Number custom type stores the type of the falling speed (y position) animation for the to be created snowflake HTML div element.
 * @property xpoNum = X Position Number custom type stores the type of the starting x position for the to be created snowflake HTML div element.
 * @property ypoNum = Y Position Number custom type stores the type of the starting y position for the to be created snowflake HTML div element.
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



/** Create Snowflake Function        = This custom type stores the type that will be used for the custom {@link creSnoFun} function. */
type CreSnoFun                       = ( creSnoFunPar : CreSnoFunPar ) => CreSnoFunRet;
/** Create Snowflake Function Return = This custom type stores the type of the return value for the custom {@link creSnoFun} function. */
type CreSnoFunRet                    = { posSnoFun : PosSnoFun; };

// #endregion Function Type Definitions



/**
 * creSnoFun = Create Snowflake Function
 *
 * @summary
 * This custom function executes the logic for creating a single snowflake HTML
 * div element, applying styling to and appending said element to the DOM and
 * then returning the custom {@link PosSnoObj} object back to the calling
 * custom {@link iniSnoFun} function, where it will then be pushed into the
 * file scoped custom {@link posSnoArr} array. The calling function will then
 * call the custom {@link aniSnoFun} function which will loop over said array
 * and update the positions of all snowflake HTML div elements on a set
 * interval, creating the snowfall animation effect.
 *
 * The original code for the entire snowfall animation came from a very old
 * Codecademy tutorial (minified code linked below) that is no longer available
 * on their site. I have since heavily modified and adapted the code to work
 * inside of a React functional component using Typescript.
 *
 * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
 * @author z4nta0        <https://github.com/z4nta0>
 *
 * @param creSnoFunPar.ideNum - {@link CreSnoFunPar.ideNum}
 * @param creSnoFunPar.sizNum - {@link CreSnoFunPar.sizNum}
 * @param creSnoFunPar.speNum - {@link CreSnoFunPar.speNum}
 * @param creSnoFunPar.xpoNum - {@link CreSnoFunPar.xpoNum}
 * @param creSnoFunPar.ypoNum - {@link CreSnoFunPar.ypoNum}
 *
 * @returns An object containing the position snowflake function.
 * @see {@link creSnoFunRet}
 *
 * @example
 * ```ts
 * creSnoFun( creSnoFunPar ) // => creSnoFunRet
 * ```
 *
*/

const creSnoFun : CreSnoFun = ( creSnoFunPar ) => {


    // #region Function Variables


    // #region SnoSetObj

    /**
     * Snowflake Settings Object = This custom type stores the types that will be used for the custom {@link snoSetObj} object.
     * 
     * @property oscSteNum = Oscillation Step Number custom property stores the type that will be used for the custom {@link snoSetObj.oscSteNum} property.
     * @property snoDivEle = Snowflake Div Element custom property stores the type that will be used for the custom {@link snoSetObj.snoDivEle} property.
     * @property snoIdeNum = Snowflake Identifier Number custom property stores the type that will be used for the custom {@link snoSetObj.snoIdeNum} property.
     * @property snoOscNum = Snowflake Oscillation Number custom property stores the type that will be used for the custom {@link snoSetObj.snoOscNum} property.
     * @property snoSizNum = Snowflake Size Number custom property stores the type that will be used for the custom {@link snoSetObj.snoSizNum} property.
     * @property snoSpeNum = Snowflake Speed Number custom property stores the type that will be used for the custom {@link snoSetObj.snoSpeNum} property.
     * @property snoXpoNum = Snowflake X Position Number custom property stores the type that will be used for the custom {@link snoSetObj.snoXpoNum} property.
     * @property snoYpoNum = Snowflake Y Position Number custom property stores the type that will be used for the custom {@link snoSetObj.snoYpoNum} property.
     * 
     * @property snoResFun = Snowflake Reset Function custom property stores the type that will be used for the custom {@link snoSetObj.snoResFun} property.
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


    /**
     * Snowflake Settings Object = This custom object stores the properties and methods for creating and positioning a single snowflake HTML div element.
     *
     * @property oscSteNum = Oscillation Step Number custom property stores a randomized number between 0.01 and 1 that is used to modify the custom {@link snoSetObj.snoOscNum} property value for each snowflake HTML div element position update.
     * @property snoDivEle = Snowflake Div Element custom property stores the snowflake HTML div element that is created for the snowflake.
     * @property snoIdeNum = Snowflake Identifier Number custom property stores a unique id number for the snowflake HTML div element that is created and is provided by the custom {@link CreSnoFunPar} object. It will be equal to length of the custom {@link posSnoArr} array at the time that it was calculated by the custom calling {@link iniSnoFun} function.
     * @property snoOscNum = Snowflake Oscillation Number custom property stores a number that is updated by the custom {@link snoSetObj.oscSteNum} property value and then used to modify the custom {@link snoSetObj.snoXpoNum} property for each snowflake HTML div element position update.
     * @property snoSizNum = Snowflake Size Number custom property stores the size number for the snowflake HTML div element and is provided by the custom {@link CreSnoFunPar} object. Its value is randomly calculated between a minimum and maximum (affected by the window viewport's width dimension) by the custom calling {@link iniSnoFun} function.
     * @property snoSpeNum = Snowflake Speed Number custom property stores the number that is used to update the custom {@link snoSetObj.snoYpoNum} property value for each snowflake HTML div element position update and is provided by the custom {@link CreSnoFunPar} object. Its value is randomly calculated between a minimum and maximum (affected by the window viewport's height dimension) by the custom calling {@link iniSnoFun} function.
     * @property snoXpoNum = Snowflake X Position Number custom property stores a number that is updated by the custom {@link snoSetObj.snoOscNum} property value and is responsible for the oscillating (x position) animation for the snowflake HTML div element. This value is increased by using the custom {@link snoSetObj.oscSteNum} property value as a parameter for the standard JS {@link Math.cos} function, so that as the custom {@link snoSetObj.oscSteNum} property value is increased the x position value will drift back and forth between -1 and 1 (i.e. oscillate) in the horizontal (x) direction, with its original, starting x position value as its central point. This, combined with the vertical (y) position updates, is what creates the natural falling effect for the animation. The original, starting value is provided by the custom {@link CreSnoFunPar} object, and its value will be randomly calculated between a minimum (0) and maximum (window viewport width) by the custom calling {@link iniSnoFun} function.
     * @property snoYpoNum = Snowflake Y Position Number custom property stores a number that is updated by the custom {@link snoSetObj.snoSizNum} property value and is responsible for the falling (y position) animation for the snowflake HTML div element. This value will be increased by the custom {@link snoSetObj.snoSpeNum} property value with each snowflake HTML div element position update. This, combined with the horizontal (x) position updates, is what creates the natural falling effect for the animation. The original, starting value is provided by the custom {@link CreSnoFunPar} object, and its value will be randomly calculated between a minimum (0) and maximum (window viewport height) by the custom calling {@link iniSnoFun} function.
     * 
     * @property snoResFun = Snowflake Reset Function custom property stores the custom function for that is responsible for resetting each snowflake HTML div element's position and other related properties when they progress beyond the containing HTML element's dimensions.
     *
    */

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

            snoSetObj.oscSteNum = ranNumFun( { maxNum : 10,                              minNum : 1,                   } ) / 100; /** This will reset the oscillation step size to a new random value between 0.01 and 0.1 */
            snoSetObj.snoSizNum = ranNumFun( { maxNum : aniSetObj.sizMaxNum,             minNum : aniSetObj.sizMinNum, } );       /** This will reset the snowflake size to a new random value between the animation settings object's defined maximum (affected by the window viewport's width dimension) and minimum sizes. */
            snoSetObj.snoSpeNum = ranNumFun( { maxNum : aniSetObj.speMaxNum,             minNum : aniSetObj.speMinNum, } );       /** This will reset the snowflake falling speed to a new random value between the animation settings object's defined maximum (affected by the window viewport's height dimension) and minimum speeds. */
            snoSetObj.snoXpoNum = ranNumFun( { maxNum : conWidNum - snoSetObj.snoSizNum, minNum : 0,                   } );       /** This will reset the snowflake x (horizontal) position to a new random value between 0 and the containing HTML element's width minus the snowflake HTML div element's size. */
            snoSetObj.snoYpoNum = 0;                                                                                              /** This will reset the snowflake y (vertical) position to 0. */

        },

    };

    // #endregion SnoSetObj


    // #endregion Function Variables



    // #region DOM Manipulation and CSS Styling

    /** Class Name                            = This standard JS DOM API sets the class name for each snowflake HTML div element, which will enable the custom {@link cleSnoFun} function to more easily grab all snowflake HTML div elements and then clear them from the DOM should the animation need to be reset (on a window resize event, for example). This could also enable CSS styling to be applied to all snowflake HTML div elements, though that is not currently utilized. */
    snoSetObj.snoDivEle.className             = 'snowflakes';
    /** Background Color                      = This standard JS DOM API sets the snowflake HTML div element's color. */
    snoSetObj.snoDivEle.style.backgroundColor = aniSetObj.snoColStr;
    /** Border Radius                         = This standard JS DOM API makes the snowflake HTML div element circular. */
    snoSetObj.snoDivEle.style.borderRadius    = `${aniSetObj.sizMaxNum}px`;
    /** Font Size                             = This standard JS DOM API ensures that no text properties affect the snowflake HTML div element's size. */
    snoSetObj.snoDivEle.style.fontSize        = '0px';
    /** Height                                = This standard JS DOM API sets the snowflake HTML div element's height. */
    snoSetObj.snoDivEle.style.height          = `${snoSetObj.snoSizNum}px`;
    /** Left                                  = This standard JS DOM API sets the snowflake HTML div element's starting x (horizontal) position. */
    snoSetObj.snoDivEle.style.left            = `${snoSetObj.snoXpoNum}px`;
    /** Position                              = This standard JS DOM API sets the snowflake HTML div element's position to absolute. */
    snoSetObj.snoDivEle.style.position        = 'absolute';
    /** Top                                   = This standard JS DOM API sets the snowflake HTML div element's starting y (vertical) position. */
    snoSetObj.snoDivEle.style.top             = `${snoSetObj.snoYpoNum}px`;
    /** Width                                 = This standard JS DOM API sets the snowflake HTML div element's width. */
    snoSetObj.snoDivEle.style.width           = `${snoSetObj.snoSizNum}px`;



    /** Set Attribute = This standard JS DOM API sets a unique id attribute for each snowflake HTML div element by using the length of the custom {@link posSnoArr} array, which should equal the index number of this snowflake HTML div element's custom object that contains its own custom {@link posSnoFun} function that was pushed into said array. */
    snoSetObj.snoDivEle.setAttribute( 'id', `snowflake${ snoSetObj.snoIdeNum }` );
    /** Append Child  = This standard JS DOM API appends the snowflake HTML div element to the DOM. */
    conSecEle.appendChild( snoSetObj.snoDivEle );

    // #endregion DOM Manipulation and CSS Styling



    // #region Return Statement

    const creSnoFunRet : CreSnoFunRet = {


        // #region posSnoFun

        /**
         * posSnoFun = Position Snowflake Function
         *
         * @summary
         * This custom function executes the logic for updating the newly
         * created snowflake HTML div element's position, as well as resetting
         * said position if its position moves beyond the containing HTML
         * element's dimensions. This object and function will be returned to
         * the custom calling {@link iniSnoFun} function where it will then be
         * pushed into the custom file scoped {@link posSnoArr} array. Said
         * calling function will then call the custom {@link aniSnoFun}
         * function which will loop over said array and update the positions of
         * all snowflake HTML div elements.
         *
         * The original code for the entire snowfall animation came from a very
         * old Codecademy tutorial (minified code linked below) that is no
         * longer available on their site. I have since heavily modified and
         * adapted the code to work inside of a React functional component
         * using Typescript.
         *
         * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
         * @author z4nta0        <https://github.com/z4nta0>
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


            // #region DOM Manipulation and CSS Styling

            /** Left                         = This standard JS DOM API updates the horizontal (x) position. */
            snoSetObj.snoDivEle.style.left   =  `${snoSetObj.snoXpoNum}px`;
            /** Top                          = This standard JS DOM API updates the vertical (y) position. */
            snoSetObj.snoDivEle.style.top    =  `${snoSetObj.snoYpoNum}px`;
            /** Snowflake Oscillation Number = This custom object property updates the oscillation number that is responsible for updating the x (horizontal) position. */
            snoSetObj.snoOscNum             += snoSetObj.oscSteNum;
            /** Snowflake X Position Number  = This custom object property updates the x (horizontal) position and creates the oscillation (horizontal, back and forth) animation because the standard JS {@link Math.cos} function will always return a value between -1 and 1. */
            snoSetObj.snoXpoNum             += Math.cos( snoSetObj.snoOscNum );
            /** Snowflake Y Position Number  = This custom object property updates the y (vertical) position and creates the falling animation. */
            snoSetObj.snoYpoNum             += snoSetObj.snoSpeNum;

            // #endregion DOM Manipulation and CSS Styling



            // #region Reset Positions

            /** This custom conditional statement performs a check to determine whether a reset is required for the horizontal (x) position if the snowflake HTML div element's current x position is greater than the width of its containing HTML element minus the snowflake HTML div element's size (beyond the right edge) OR if the snowflake HTML div element's position is less than 0 (beyond the left edge, which can happen due to the oscillation effect). */
            if ( snoSetObj.snoXpoNum > ( conWidNum - snoSetObj.snoSizNum)  || snoSetObj.snoXpoNum < 0 ) {


                /** Snowflake Reset Function = This custom function executes the logic that is responsible for resetting each snowflake HTML div element's position and other related properties when they progress beyond the containing HTML element's dimensions. */
                snoSetObj.snoResFun();


            };



            /** This custom conditional statement performs a check to determine whether a reset is required for the vertical (y) position if the snowflake HTML div element's current y position is greater than the height of its containing HTML element minus the snowflake HTML div element's size (beyond the bottom edge). */
            if ( snoSetObj.snoYpoNum > ( conHeiNum - snoSetObj.snoSizNum ) ) {


                /** Snowflake Reset Function = This custom function executes the logic that is responsible for resetting each snowflake HTML div element's position and other related properties when they progress beyond the containing HTML element's dimensions. */
                snoSetObj.snoResFun();


            };

            // #endregion Reset Positions


        },

        // #endregion posSnoFun


    };



    return creSnoFunRet;

    // #endregion Return Statement


};

// #endregion creSnoFun



// #region aniSnoFun


// #region Function Type Definitions

/** Animate Snowflake Function = This custom type stores the type that will be used for the custom {@link aniSnoFun} function. */
type AniSnoFun                 = () => void;

// #endregion Function Type Definitions



/**
 * aniSnoFun = Animate Snowflake Function
 *
 * @summary
 * This custom function executes the logic for creating the animation effect by
 * executing the custom {@link PosSnoFun} function for each snowflake HTML div
 * element and then recursively calling itself at a set interval (16.7 ms ~= 60
 * FPS), which creates both the falling and oscillating motions. This function
 * is called by the custom {@link iniSnoFun} function after creating the
 * desired number of snowflake HTML div elements and then pushing said elements
 * into the custom file scoped {@link posSnoArr} array.
 *
 * The original code for the entire snowfall animation came from a very
 * old Codecademy tutorial (minified code linked below) that is no longer
 * available on their site. I have since heavily modified and adapted the
 * code to work inside of a React functional component using Typescript.
 *
 * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
 * @author z4nta0        <https://github.com/z4nta0>
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


    // #region Update Position Array Loop

    /** This custom loop steps through each snowflake HTML div element that is stored in the custom file scoped {@link posSnoArr} array. */
    for ( let indNum : number = 0; indNum < posSnoArr.length; indNum += 1 ) {


        /** Position Snow Array Index Number Position Snowflake Function = This custom function executes the position update function for each snowflake HTML div element. The custom {@link PosSnoObj} objects are pushed into the custom file scoped {@link posSnoArr} array by the custom {@link iniSnoFun} function as they are returned from the custom {@link creSnoFun} function. */
        posSnoArr[ indNum ].posSnoFun();


    };

    // #endregion Update Position Array Loop



    /** Set Timeout Function = This custom file scoped variable stores the standard JS timeout function and will recursively call this custom function every 16.7 ms (~60 FPS), thereby updating each snowflake HTML div element's position with each call and creating the desired animation effect. This custom file scoped variable stores a unique identifier given to it by Javascript that will be used to clear the timeout inside of the custom {@link cleSnoFun} function, which itself is called inside of the standard React {@link useEffect} hook when the component is first loaded or the window is resized. */
    setTimFun                = setTimeout( function () { aniSnoFun(); }, 16.7 );


};

// #endregion aniSnoFun



// #region iniSnoFun


// #region Function Type Definitions

/**
 *
 * Initialize Snowfall Function Parameters = This custom type stores types for the parameters that are provided to the custom {@link iniSnoFun} function when it is called inside of the standard React {@link useEffect} hook and will contain the values that are responsible for setting the file scoped variables {@link conSecEle} and {@link aniSetObj}.
 *
 * @property conEle = Container Element custom type stores the containing HTML element to which all of the created snowflake HTML div elements will be appended to inside of the custom {@link creSnoFun} function.
 * @property setObj = Settings Object custom types stores the settings object that will be used inside of the custom {@link iniSnoFun} function in order to override the default animation settings stored inside of the custom file scoped {@link aniSetObj} object.
 *
*/

type IniSnoFunPar = {

    conEle : HTMLElement;
    setObj : SetObj;

};


/** Initialize Snowfall Function = This custom type stores the type that will be used for the custom {@link iniSnoFun} function. */
type IniSnoFun                   = ( iniSnoFunPar : IniSnoFunPar ) => void;
/** Settings Object              = This custom type stores the the same type as the custom {@link AniSetObj} type and is provided as a parameter to the custom {@link iniSnoFun} function. */
type SetObj                      = AniSetObj;

// #endregion Function Type Definitions



/**
 * iniSnoFun = Initialize Snowfall Function
 *
 * @summary
 * This custom function executes the logic that will initialize the snowfall
 * animation. It will first perform a check to make sure that the provided
 * custom {@link setObj} parameter object object contains valid keys that match
 * the custom file scoped {@link aniSetObj} object's keys and then override the
 * default values of said object with the provided values. It will then grab
 * the containing HTML element from the custom {@link conEle} parameter and
 * assign it to the custom file scoped {@link conSecEle} variable before then
 * setting the custom file scoped {@link conHeiNum} and {@link conWidNum}
 * variables according to its dimensions. A loop will then be initiated in
 * order to create the desired number of snowflake HTML div elements as
 * specified in the custom file scoped {@link aniSetObj} object's snoCouNum
 * property by making calls to the custom {@link creSnoFun} function for each
 * snowflake and then pushing the returned custom {@link PosSnoObj} object from
 * each call into the custom file scoped {@link posSnoArr} array. Lastly, it
 * will call the custom {@link aniSnoFun} function which will loop over said
 * array and call each of the snowflake HTML div element's custom
 * {@link PosSnoFun} functions on a set interval thus creating the animation
 * effect.
 *
 * The original code for the entire snowfall animation came from a very
 * old Codecademy tutorial (minified code linked below) that is no longer
 * available on their site. I have since heavily modified and adapted the
 * code to work inside of a React functional component using Typescript.
 *
 * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
 * @author z4nta0        <https://github.com/z4nta0>
 *
 * @param conEle - This is the containing HTML element parameter to which all of the created snowflake HTML div elements will be appended and whose dimensions will be used to determine the animation settings' boundaries.
 * @param setObj - This is the settings object parameter that will be used to override the default animation settings that are stored in the custom file scoped {@link aniSetObj} object.
 *
 * @returns This function does not return anything.
 *
 * @example
 * ```ts
 * iniSnoFun( { conEle, setObj } ) // => void
 * ```
 *
*/

const iniSnoFun : IniSnoFun = ( { conEle, setObj } ) => {


    // #region setObj Keys Loop

    /** This custom loop steps through each key in the provided custom {@link setObj} parameter. */
    for ( const key in setObj ) {


        /** Settings Objecy Key = This custom variable stores the loop's current custom {@link setObj} parameter property key and will help to type narrow said key so that Typescript does not throw an error when indexing into the custom {@link setObj} parameter inside of the next 'if' code block. */
        const setObjKey         = key as keyof SetObj;



        /** This custom conditional statement performs a type guard check to ensure that only valid keys from the custom {@link setObj} parameter are used to override the default animation settings that are stored in the custom file scoped {@link aniSetObj} object. The custom type guard {@link hasKeyFun} function is required because of the nested nature of the key variable (the key variable is actually from the custom {@link setObj} parameter but will be used to index into the custom file scoped {@link aniSetObj} object) and Typescript does not allow indexing into an object with a string key without a type assertion or a type guard. */
        if ( hasKeyFun( aniSetObj, key ) === true ) {


            /** Animation Settings Object = This overrides the default animation settings property values inside of the custom file scoped {@link aniSetObj} object with the provided custom {@link setObj} parameter values. */
            aniSetObj[ key ]              = setObj[ setObjKey ];


        }


        /** This custom conditional statement handles all cases that do not match the above conditional statement's type guard check. */
        else {


            /** Console Warn = This standard JS Web API issues a console warning if an invalid key was provided in the custom {@link setObj} parameter. */
            console.warn( `Snowfall Effect: Invalid setting key '${ key }' provided in the setObj parameter for the iniSnoFun function.` );


        };


    };

    // #endregion setObj Keys Loop



    // #region Set Container Element and Dimensions

    /** Container Section Element = This sets the custom file scoped {@link conSecEle} variable equal to the containing HTML element {@link conEle} parameter that was provided to this function. */
    conSecEle                     = conEle;
    /** Container Height Number   = This sets the custom file scoped {@link conHeiNum} variable equal to the containing HTML element {@link conEle} parameter' height value that was provided to this function. */
    conHeiNum                     = conSecEle.clientHeight;
    /** Container Width Number    = This sets the custom file scoped {@link conWidNum} variable equal to the containing HTML element {@link conEle} parameter's width value that was provided to this function. */
    conWidNum                     = conSecEle.offsetWidth;

    // #endregion Set Container Element and Dimensions



    // #region Create Snowflake Loop

    /** This custom loop steps through the newly set custom {@link aniSetObj.snoCouNum} property in order to create the desired number of snowflake HTML div elements and their related custom {@link PosSnoFun} functions. */
    for ( let incNum : number = 0; incNum < aniSetObj.snoCouNum; incNum += 1 ) {


        /** Identifier Count Number = This sets the custom file scoped {@link ideCouNum} variable equal to the current length of the custom file scoped {@link posSnoArr} array, representing the number of snowflake HTML div elements that have been created so far from calling the custom {@link creSnoFun} function. This number will then be used inside of the custom {@link creSnoFun} function as part of the HTML id value for the newly created snowflake HTML div element. */
        ideCouNum                   = posSnoArr.length;



        // #region creSnoFunPar

        /** @see {@link CreSnoFunPar} */
        const creSnoFunPar : CreSnoFunPar = {


            /** Identifier Number = This custom property is set equal to the custom file scoped {@link ideCouNum} variable which was just previously set according to the length of the custom file scoped {@link posSnoArr} array at this point in the loop. */
            ideNum                : ideCouNum,
            /** Size Number       = This custom property is set equal to a randomly generated number between the custom file scoped {@link aniSetObj} object's custom {@link aniSetObj.sizMaxNum} and {@link aniSetObj.sizMinNum} property values. */
            sizNum                : ranNumFun( { maxNum : aniSetObj.sizMaxNum, minNum : aniSetObj.sizMinNum, } ),
            /** Speed Number      = This custom property is set equal to a randomly generated number between the custom file scoped {@link aniSetObj} object's custom {@link aniSetObj.speMaxNum} and {@link aniSetObj.speMinNum} property values. */
            speNum                : ranNumFun( { maxNum : aniSetObj.speMaxNum, minNum : aniSetObj.speMinNum, } ),
            /** X Position Number = This custom property is set equal to a randomly generated number between 0 and the custom file scoped {@link conWidNum} variable's value. */
            xpoNum                : ranNumFun( { maxNum : conWidNum,           minNum : 0, } ),
            /** Y Position Number = This custom property is set equal to a randomly generated number between 0 and the custom file scoped {@link conHeiNum} variable's value. */
            ypoNum                : ranNumFun( { maxNum : conHeiNum,           minNum : 0, } ),


        };

        // #endregion creSnoFunPar



        /** Position Snowflake Array = This standard JS array method pushes the custom {@link PosSnoObj} object that is returned from calling the custom {@link creSnoFun} function, into the custom file scoped {@link posSnoArr} array. After the current loop is finished, the custom {@link aniSnoFun} function will be called and this array will be looped over in order to update each snowflake HTML div element's position which will create the snowfall animation effect. */
        posSnoArr.push( creSnoFun( creSnoFunPar ) );


    };

    // #endregion Create Snowflake Loop



    /** Animate Snowflake Function = This custom function will loop through the custom file scoped {@link posSnoArr} array, execute each snowflake HTML div element's custom {@link PosSnoFun} function, and then recursively call itself on a set interval in order to create the snowfall animation effect. */
    aniSnoFun();


};

// #endregion iniSnoFun



// #region cleSnoFun


// #region Function Type Definitions

/** Clear Snowfall Function = This custom type stores the type that will be used for the custom {@link cleSnoFun} function. */
type CleSnoFun = () => void;

// #endregion Function Type Definitions



/**
 * cleSnoFun = Clear Snowfall Function
 *
 * @summary
 * This custom function executes the logic that will remove all snowflake HTML
 * div elements from the DOM that were created from the previous snowfall
 * animation, empty the custom file scoped {@link posSnoArr} array and then
 * clear the previous animation's timeout interval that is stored in the custom
 * file scoped {@link setTimFun} variable. This function is called inside of
 * the standard React {@link useEffect} hook, which itself is called when the
 * component is first mounted and whenever the window is resized.
 *
 * The original code for the entire snowfall animation came from a very
 * old Codecademy tutorial (minified code linked below) that is no longer
 * available on their site. I have since heavily modified and adapted the
 * code to work inside of a React functional component using Typescript.
 *
 * @author Original Code <https://s3.amazonaws.com/codecademy-content/courses/holiday-cards/snowfall.min.js>
 * @author z4nta0        <https://github.com/z4nta0>
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


    /** Snowflake Element Array = This custom variable stores an array of all snowflake HTML div elements contained in the DOM via their shared class name of snowflakes, which were previously created by and attached to the DOM via the custom {@link creSnoFun} function when the snowfall animation was initialized by calling the custom {@link iniSnoFun} function. */
    const snoEleArr : Element[] = Array.from( document.getElementsByClassName( 'snowflakes' ) );



    /** This custom conditional statement performs a check that is needed to prevent errors in case this function is called before any snowflake HTML div elements have been created, typically when the component is first mounted. */
    if ( snoEleArr.length === 0 ) {


        return;


    };



    // #region Remove Snowflake Divs Loop

    /** This custom loop steps through each snowflake HTML div element from the above defined custom {@link snoEleArr} array. */
    for ( let indNum : number = 0; indNum < snoEleArr.length; indNum++ ) {


        /** Snowflake Element Array = This standard JS array method removes the loop's current snowflake HTML div element that is stored in the custom {@link snoEleArr} array from the DOM. */
        snoEleArr[ indNum ].remove();


    };

    // #endregion Remove Snowflake Divs Loop



    /** Position Snowflake Array = This standard JS array property empties the custom file scoped {@link posSnoArr} array that contains each snowflake HTML div element's custom {@link PosSnoFun} function. */
    posSnoArr.length = 0;


    
    /** Clear Timeout = This standard JS function clears the setTimeout function that is stored in the custom file scoped {@link setTimFun} variable that is used for recursively calling the custom {@link aniSnoFun} function in order to update all snowflake HTML div elements' positions which creates the snowfall animation effect. */
    clearTimeout( setTimFun );


};

// #endregion cleSnoFun



export default iniSnoFun;


