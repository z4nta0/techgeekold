
// #region Imports

import ranNumFun  from '../../utilities/ranNumFun.ts'; /** This import is the custom random number function utility that will generate a random number between a provided minimum and maximum value. */
import React      from 'react';                        /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles     from './404PagCom.module.css';       /** This import is the custom CSS file that contains all of the styling declarations for this component. */
import wheelSound from '../../assets/wheel-sound.mp3'; /** This import is the custom sound effect that is played when the wheel button is clicked. */


import { useEffect   } from 'react';            /** This import is the standard React hook that enables side effects for components. */
import { useNavigate } from 'react-router-dom'; /** This is import is the standard React Router hook for handking a redirect after a user action. */
import { useState    } from 'react';            /** This import is the standard React hook that enables state management in functional components. */

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

    /** Use Navigate Function = This custom variable stores the standard React Router hook for redirecting the user to a different page after taking an action, which is needed for when the user clicks the custom wheButEle HTML element, triggers the wheel animation cycle and then redirects when said animation is finished. */
    const useNavFun           = useNavigate();


    // #region Local & Page Time Objects


    // #region Type Definitions


    // #region IniTimObj

    /**
     * Initial Time Object = This custom type stores the types that will be used for the custom {@link iniTimObj} object.
     * 
     * @property datTimStr = Date Time String custom property stores the type that will be used for the custom {@link iniTimObj.datTimStr} property.
     * @property dayTimNum = Day Time Number custom property stores the type that will be used for the custom {@link iniTimObj.dayTimNum} property.
     * @property houTimNum = Hour Time Number custom property stores the type that will be used for the custom {@link iniTimObj.houTimNum} property.
     * @property minTimNum = Minute Time Number custom property stores the type that will be used for the custom {@link iniTimObj.minTimNum} property.
     * @property monTimNum = Month Time Number custom property stores the type that will be used for the custom {@link iniTimObj.monTimNum} property.
     * @property secTimNum = Second Time Number custom property stores the type that will be used for the custom {@link iniTimObj.secTimNum} property.
     * @property setIntNum = Set Interval Number custom property stores the type that will be used for the custom {@link iniTimObj.setIntNum} property.
     * @property yeaTimNum = Year Time Number custom property stores the type that will be used for the custom {@link iniTimObj.yeaTimNum} property.
     *
    */

    type IniTimObj = {

        datTimStr : string;
        dayTimNum : number;
        houTimNum : number;
        minTimNum : number;
        monTimNum : number;
        secTimNum : number;
        setIntNum : number;
        yeaTimNum : number;

    };

    // #endregion IniTimObj


    // #endregion Type Definitions


    // #region State Initialization


    // #region iniTimObj

    /**
     * Initial Time Object = This custom object stores all of the custom property values for both the local and page time objects.
     *
     * @property datTimStr = Date Time String custom property stores the local date and time as a string that will be shown in the UI when the component first loads and then updated with the new time during each interval.
     * @property dayTimNum = Day Time Number custom property stores the local day of the month as a number that will only be updated for the page time object during the wheel animation cycle.
     * @property houTimNum = Hour Time Number custom property stores the local hour of the day as a number that will only be updated for the page time object during each interval.
     * @property minTimNum = Minute Time Number custom property stores the local minute as a number that will only be updated for the page time object during each interval.
     * @property monTimNum = Month Time Number custom property stores the local month as a number that will only be updated for the page time object during the wheel animation cycle.
     * @property secTimNum = Second Time Number custom property stores the local second as a number that will be updated for both the local and page time objects during each interval.
     * @property setIntNum = Set Interval Number custom property stores the interval for updating the time that will be updated for the page time object when the wheel animation cycle begins so that it updates all values and at a much faster cadence.
     * @property yeaTimNum = Year Time Number custom property stores the local year as a number that will only be updated for the page time object during the wheel animation cycle.
     *
    */

    const iniTimObj : IniTimObj = {

        datTimStr : new Date().toLocaleString(),
        dayTimNum : new Date().getDate(),
        houTimNum : new Date().getHours(),
        minTimNum : new Date().getMinutes(),
        monTimNum : new Date().getMonth() + 1,
        secTimNum : new Date().getSeconds(),
        setIntNum : 1000,
        yeaTimNum : new Date().getFullYear(),

    };

    // #endregion iniTimObj


    // #region locTimObj

    /** Local Time Object             = This custom variable stores the object that is responsible for tracking the user's local time and date, which will be updated each second. */
    /** Set Local Time Object         = This custom variable stores the custom state setter function returned by the standard React {@link useState} hook, and it is used to execute updates to the custom {@link locTimObj} state variable inside of the custom {@link locTimFun} function each second via an interval function. */
    const [ locTimObj, setLocTimObj ] = useState< IniTimObj >( iniTimObj );

    // #endregion locTimObj



    // #region pagTimObj

    /** Page Time Object              = This custom variable stores the object that is responsible for tracking the page's time and date, which will be updated each second and then each 100ms during the wheel animation cycle. */
    /** Set Page Time Object          = This custom variable stores the custom state setter function returned by the standard React {@link useState} hook, and it is used to execute updates to the custom {@link pagTimObj} state variable inside of the custom {@link pagTimFun} function each second (100ms for the wheel animation cycle) via an interval function. */
    const [ pagTimObj, setPagTimObj ] = useState< IniTimObj >( iniTimObj );

    // #endregion pagTimObj


    // #endregion State Initialization


    // #endregion Local & Page Time Objects



    // #region Wheel Animation


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


    // #endregion Wheel Animation


    // #endregion State Variables


    // #endregion Component Scoped Variables



    // #region locTimFun


    // #region Function Type Definitions

    /** Local Time Function = This custom type stores the type that will be used for the custom {@link locTimFun} function. */
    type LocTimFun          = () => void;

    // #endregion Function Type Definitions



    /**
     * locTimFun = Local Time Function
     * @see {@link LocTimFun}
     *
     * @summary
     * This custom function executes the logic for updating the local time
     * object state variable with the user's current local time. This function
     * will be executed inside of a standard JavaScript interval function that
     * is set to execute every second via the standard React {@link useEffect}
     * hook, which will ensure that the local time is updated every second. The
     * new values are then converted into a string that mimics the Javascript
     * Date instance's .toLocaleString method's output but with some minor
     * modifications to make it slightly more human readable. This string is
     * what will then be shown in the custom #wheButEle HTML element's inner
     * .wheSpaEle element directly above/before the custom {@link pagTimObj}
     * state variable's value.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * locTimFun() // => void
     * ```
     *
    */

    const locTimFun : LocTimFun = () => {


        // #region Function Variables

        /** New Time Object         = @see {@link iniTimObj} */
        const newTimObj : IniTimObj = {

            datTimStr : new Date().toLocaleString(),
            dayTimNum : new Date().getDate(),
            houTimNum : new Date().getHours(),
            minTimNum : new Date().getMinutes(),
            monTimNum : new Date().getMonth() + 1,
            secTimNum : new Date().getSeconds(),
            setIntNum : 1000,
            yeaTimNum : new Date().getFullYear(),

        };



        /** Ante Post (Meridiem) String = This custom variable stores either AM or PM based on the custom newTimObj object's houTimNum property, which must be done before the 12 hour time conversion inside of the custom {@link locHouNum} variable. */
        const antPosStr : string        = newTimObj.houTimNum >= 12 ? 'PM' : 'AM';
        /** Local Hour Number           = This custom variable stores the conversion of the custom newTimObj object's houTimNum property into a standard 12 hours format, which must be done after the AM or PM calculation inside of the custom {@link antPosStr} variable. */
        const locHouNum : number        = newTimObj.houTimNum % 12 === 0 ? 12 : newTimObj.houTimNum > 12 ? newTimObj.houTimNum % 12 : newTimObj.houTimNum;
        /** Local Hour String           = This custom variable stores the conversion of the custom locHouNum variable's value into a string that will add a 0 if the number is below 10, so that the final output will remain consistent and prevent the UI from twitching or jumping around. */
        const locHouStr : string        = locHouNum < 10 ? `0${ locHouNum }` : `${ locHouNum }`;
        /** Local Minute String         = This custom variable stores the conversion of the custom newTimObj object's minTimNum property into a string that will add a 0 if the number is below 10, so that the final output will remain consistent and prevent the UI from twitching or jumping around. */
        const locMinStr : string        = newTimObj.minTimNum < 10 ? `0${ newTimObj.minTimNum }` : `${ newTimObj.minTimNum }`;
        /** Local Second String         = This custom variable stores the conversion of the custom newTimObj object's secTimNum property into a string that will add a 0 if the number is below 10, so that the final output will remain consistent and prevent the UI from twitching or jumping around. */
        const locSecStr : string        = newTimObj.secTimNum < 10 ? `0${ newTimObj.secTimNum }` : `${ newTimObj.secTimNum }`;

        /** Local Date String    = This custom variable stores the formatted date and time string which mimics the standard Javascript Date instance's .toLocaleString() method but with the modifications that were calculated above and stored via the local variables. */
        const locDatStr : string = `${ newTimObj.monTimNum }/${ newTimObj.dayTimNum }/${ newTimObj.yeaTimNum } CE, ${ locHouStr }:${ locMinStr }:${ locSecStr } ${ antPosStr }`;

        // #endregion Function Variables



        // #region setLocTimObj

        /** Set Local Time Object = This custom state setter function updates the custom {@link locTimObj} state object with the newly calculated date and time values. */
        setLocTimObj(


            /** Local Time Object = @see {@link iniTimObj} */
            {

                datTimStr : locDatStr,
                dayTimNum : newTimObj.dayTimNum,
                houTimNum : newTimObj.houTimNum,
                minTimNum : newTimObj.minTimNum,
                monTimNum : newTimObj.monTimNum,
                secTimNum : newTimObj.secTimNum,
                setIntNum : 1000,
                yeaTimNum : newTimObj.yeaTimNum,

            }


        );

        // #endregion setLocTimObj



        /** Return Statement = This standard Javascript return statement will explicitly return undefined, which is the expected return value for a function that does not return anything. */
        return void 0;


    };

    // #endregion locTimFun



    // #region pagTimFun


    // #region Function Type Definitions

    /** Page Time Function = This custom type stores the type that will be used for the custom {@link pagTimFun} function. */
    type PagTimFun         = () => void;

    // #endregion Function Type Definitions



    /**
     * pagTimFun = Page Time Function
     * @see {@link PagTimFun}
     *
     * @summary
     * This custom function executes the logic for updating the page time
     * object state variable based on the user's current local time but with
     * modifications using random values. This function will be executed inside
     * of a standard JavaScript interval function that is set to execute every
     * second (this is modified to every 100ms during the wheel animation
     * cycle) via the standard React {@link useEffect} hook, which will ensure
     * that the page time is updated every second (again, this is modified to
     * every 100ms during the wheel animation cycle). During a normal update
     * (i.e., NOT a wheel animation cycle), the hour, minute and second values
     * have a chance to be modified using random values. Said chance is based
     * on an arbitrary threshold of the newly calculated random number value,
     * the reason being that having the number be random for every single
     * update is too jarring. The second, minute and hour values have different
     * thresholds for a random value insertion, with the second value having a
     * higher chance than the minute value which has a higher chance than the
     * hour value. During a wheel animation cycle, not only are all other
     * values also updated (with no thresholds), but the custom
     * {@link pagTimObj.setIntNum} state variable's value is updated via the
     * custom {@link handleWheCliFun} so that this function will run every
     * 100ms instead of every second. All of this is done to fit the 404's page
     * theme from the TV show 'LOST', with the lost page emulating the island
     * and being out of sync with the normal time and then even more so when
     * the frozen donkey wheel is turned. Regardless of which update is
     * executed, the new values are then converted into a string that mimics
     * the Javascript Date instance's .toLocaleString method's output but with
     * some minor modifications to make it slightly more human readable. This
     * string is what will then be shown in the custom #wheButEle HTML
     * element's inner .wheSpaEle element directly below/after the custom
     * {@link locTimObj} state variable's value.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * locTimFun() // => void
     * ```
     *
    */

    const pagTimFun : PagTimFun = () => {


        // #region Function Variables

        /** New Time Object         = @see {@link iniTimObj} */
        const newTimObj : IniTimObj = {

            datTimStr : new Date().toLocaleString(),
            dayTimNum : new Date().getDate(),
            houTimNum : pagTimObj.houTimNum,
            minTimNum : pagTimObj.minTimNum,
            monTimNum : new Date().getMonth() + 1,
            secTimNum : pagTimObj.secTimNum,
            setIntNum : pagTimObj.setIntNum,
            yeaTimNum : new Date().getFullYear(),

        };

        // #endregion Function Variables



        // #region Calculate Seconds Value

        /** Random Second Number = This custom variable stores a randomly generated number between 1 and 30, which will be used to determine if the second value should be modified and by how much. */
        const ranSecNum : number = ranNumFun( { minNum : 1, maxNum : 30 } );



        /** This custom conditional statement performs a check according to an arbitrary threshold (30% seemed reasonable for the seconds value), which will determine if the seconds value should be modified using the randomly generated number. */
        if ( ranSecNum <= 10 ) {


            /** Second Time Number = This custom statement updates the seconds value based on the randomly generated number, which subtracts the randomly generated number if it would cause it to equal or go over 60 or adds the randomly generated number if it would not. */
            newTimObj.secTimNum    = newTimObj.secTimNum + ranSecNum >= 60 ? newTimObj.secTimNum - ranSecNum : newTimObj.secTimNum + ranSecNum;


        }


        /** This custom conditional statement handles the case where the randomly generated number does not meet the threshold, which will determine if the seconds value should be incremented normally by 1. */
        else {


            /** Second Time Number = This custom statement updates the seconds value normally by 1, resetting it to 0 if it would cause it to equal 60. */
            newTimObj.secTimNum    = newTimObj.secTimNum + 1 >= 60 ? 0 : newTimObj.secTimNum + 1;



            /** Hour Time Number = This custom statement updates the minutes value normally by 1 if the seconds value equals 60, which is needed since this value is updated manually and will not automatically increment itself. */
            newTimObj.houTimNum  = newTimObj.secTimNum + 1 === 60 ? newTimObj.houTimNum + 1 >= 60 ? 0 : newTimObj.houTimNum + 1 : newTimObj.houTimNum;


        };



        /** Page Second String   = This custom variable stores the formatted seconds value as a string by adding a leading zero if the value is less than 10, which will be incorporated into the final date string that will be displayed to the user. */
        const pagSecStr : string = newTimObj.secTimNum < 10 ? `0${ newTimObj.secTimNum }` : `${ newTimObj.secTimNum }`;

        // #endregion Calculate Seconds Value



        // #region Calculate Minutes Value

        /** Random Minute Number = This custom variable stores a randomly generated number between 1 and 30, which will be used to determine if the minute value should be modified and by how much. */
        const ranMinNum : number = ranNumFun( { minNum : 1, maxNum : 30 } );



        /** This custom conditional statement performs a check according to an arbitrary threshold (20% seemed reasonable for the minutes value), which will determine if the minutes value should be modified using the randomly generated number. */
        if ( ranMinNum <= 6 ) {


            /** Minute Time Number = This custom statement updates the minutes value based on the randomly generated number, which subtracts the randomly generated number if it would cause it to equal or go over 60 or adds the randomly generated number if it would not. */
            newTimObj.minTimNum    = newTimObj.minTimNum + ranMinNum >= 60 ? newTimObj.minTimNum - ranMinNum : newTimObj.minTimNum + ranMinNum;


        };



        /** Page Minute String   = This custom variable stores the formatted minutes value as a string by adding a leading zero if the value is less than 10, which will be incorporated into the final date string that will be displayed to the user. */
        const pagMinStr : string = newTimObj.minTimNum < 10 ? `0${ newTimObj.minTimNum }` : `${ newTimObj.minTimNum }`;

        // #endregion Calculate Minutes Value



        // #region Calculate Hours Value

        /** Random Hour Number   = This custom variable stores a randomly generated number between 1 and 6, which will be used to determine if the hour value should be modified and by how much. */
        const ranHouNum : number = ranNumFun( { minNum : 1, maxNum : 6 } );



        /** This custom conditional statement performs a check according to an arbitrary threshold (~16% seemed reasonable for the hours value), which will determine if the hours value should be modified using the randomly generated number. */
        if ( ranHouNum <= 1 ) {


            /** Hour Time Number = This custom statement updates the hours value based on the randomly generated number, which subtracts the randomly generated number if it would cause it to go over 12 or adds the randomly generated number if it would not. */
            newTimObj.houTimNum  = newTimObj.houTimNum + ranHouNum > 12 ? newTimObj.houTimNum - ranHouNum : newTimObj.houTimNum + ranHouNum;


        };



        /** Ante Post (Meridiem) String = This custom variable stores either AM or PM based on the custom newTimObj object's houTimNum property, which must be done before the 12 hour time conversion inside of the custom {@link pagHouNum} variable. */
        const antPosStr : string        = newTimObj.houTimNum >= 12 ? 'PM' : 'AM';
        /** Page Hour Number            = This custom variable stores the conversion of the custom newTimObj object's houTimNum property into a standard 12 hours format, which must be done after the AM or PM calculation inside of the custom {@link antPosStr} variable. */
        const pagHouNum : number        = newTimObj.houTimNum % 12 === 0 ? 12 : newTimObj.houTimNum > 12 ? newTimObj.houTimNum % 12 : newTimObj.houTimNum;
        /** Page Hour String           = This custom variable stores the conversion of the custom pagHouNum variable's value into a string that will add a 0 if the number is below 10, so that the final output will remain consistent and prevent the UI from twitching or jumping around. */
        const pagHouStr : string        = pagHouNum < 10 ? `0${ pagHouNum }` : `${ pagHouNum }`;

        // #endregion Calculate Hours Value




        // #region Calculate Months, Days, and Years Values


        // #region Wheel Animation Running check

        /** This custom conditional statement performs a check if the animation triggered by the custom wheButEle HTML element's click event are running via checking the custom {@link wheAniBoo} state variable value. */
        if ( wheAniBoo === true ) {


            // #region Calculate Months Value

            /** Random Month Number  = This custom variable stores a randomly generated number between 1 and 6, which will be used to determine how much the month value should be modified. */
            const ranMonNum : number = ranNumFun( { minNum : 1, maxNum : 6 } );



            /** Month Time Number = This custom statement updates the month value based on the randomly generated number, which subtracts the randomly generated number if it would cause it to go over 12 or adds the randomly generated number if it would not. */
            newTimObj.monTimNum   = newTimObj.monTimNum + ranMonNum > 12 ? newTimObj.monTimNum - ranMonNum : newTimObj.monTimNum + ranMonNum;

            // #endregion Calculate Months Value



            // #region Calculate Days Value

            /** Random Day Number    = This custom variable stores a randomly generated number between 1 and 15, which will be used to determine how much the day value should be modified. */
            const ranDayNum : number = ranNumFun( { minNum : 1, maxNum : 15 } );


            /** Day Time Number = This custom statement updates the day value based on the randomly generated number, which subtracts the randomly generated number if it would cause it to go over 28 or adds the randomly generated number if it would not. Since this calculation is only during the wheel animation tt did not seem worthwhile to do a bunch of month checks to determine that maximum value (30, 31, 29 or 28), so I just used the shortest month of 28 days. */
            newTimObj.dayTimNum = newTimObj.dayTimNum + ranDayNum > 28 ? newTimObj.dayTimNum - ranDayNum : newTimObj.dayTimNum + ranDayNum;

            // #endregion Calculate Days Value



            // #region Calculate Years Value

            /** Random Year Number   = This custom variable stores a randomly generated number between 1 and 3000, which will be used to determine how much the year value should be modified. */
            const ranYeaNum : number = ranNumFun( { minNum : 1, maxNum : 3000 } );



            /** Years Time Number = This custom statement updates the year value based on the randomly generated number, which subtracts the randomly generated number no matter the value. I did this because in the TV show 'LOST' they never went in the future as far as I can recall, except for maybe a few days at most. */
            newTimObj.yeaTimNum   = newTimObj.yeaTimNum - ranYeaNum;

            // #endregion Calculate Years Value


        };

        // #endregion Wheel Animation Running check



        /** Page Years String = This custom variable stores the conversion of the custom {@link newTimObj.yeaTimNum} variable's value into a string that will determine if said value is a negative number, which will convert it to a positive value and add ' BCE' if so and will simply add ' CE' if not. */
        const pagYeaStr       = newTimObj.yeaTimNum < 0 ? `${ -newTimObj.yeaTimNum } BCE` : `${ newTimObj.yeaTimNum } CE`;

        // #endregion Calculate Months, Days, and Years Values



        /** Page Date String     = This custom variable stores the formatted date and time string which mimics the standard Javascript Date instance's .toLocaleString() method but with the modifications that were calculated above and stored via the local variables. */
        const pagDatStr : string = `${ newTimObj.monTimNum }/${ newTimObj.dayTimNum }/${ pagYeaStr }, ${ pagHouStr }:${ pagMinStr }:${ pagSecStr } ${ antPosStr }`;



        // #region setPagTimObj

        /** Set Page Time Object = This custom state setter function updates the custom {@link pagTimObj} state object with the newly calculated date and time values. */
        setPagTimObj(


            /** Page Time Object = @see {@link iniTimObj} */
            {

                datTimStr : pagDatStr,
                dayTimNum : newTimObj.dayTimNum,
                houTimNum : newTimObj.houTimNum,
                minTimNum : newTimObj.minTimNum,
                monTimNum : newTimObj.monTimNum,
                secTimNum : newTimObj.secTimNum,
                setIntNum : pagTimObj.setIntNum,
                yeaTimNum : newTimObj.yeaTimNum,

            }


        );

        // #endregion setPagTimObj



        /** Return Statement = This standard Javascript return statement will explicitly return undefined, which is the expected return value for a function that does not return anything. */
        return void 0;


    };

    // #endregion pagTimFun



    // #region handleWheCliFun


    // #region Function Type Definitions

    /** Handle Wheel Click Function = This custom type stores the type that will be used for the custom {@link handleWheCliFun} function. */
    type HandleWheCliFun            = () => void;

    // #endregion Function Type Definitions



    /**
     * handleWheCliFun = Handle Wheel Click Function
     * @see {@link HandleWheCliFun}
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

    const handleWheCliFun : HandleWheCliFun = () => {


        // #region Animation Already Running check

        /** This custom conditional statement performs a check to make sure that any animations related to the custom wheButEle HTML element's click event are not already running via checking the state variable value. */
        if ( wheAniBoo === true ) {


            /** Return Statement = This standard Javascript return statement will explicitly return undefined, which is the expected return value for a function that does not return anything. */
            return void 0;


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



        /** Set Page Timeout Object = This custom state setter function is used to update the custom {@link pagTimObj.setIntNum} state variable, specifically setting the interval number to a much faster cadence of 100 milliseconds for the duration of the wheel animation cycle. */
        setPagTimObj( { ...pagTimObj, setIntNum : 100 } );



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


            // #region Remove Animation Classes and Elements

            /** Wheel Turn Rumble = This standard Javascript DOM API will remove the custom .wheelTurnRumble class from the body element, stopping the custom whe-tur-rum CSS animation that causes the entire page to shake. */
            document.body.classList.remove( 'wheelTurnRumble' );



            /** Wheel SVG Spin = This standard Javascript DOM API will remove the custom .wheelSpin class from the wheel SVG element as long as it is not null, stopping the custom whe-svg-spi CSS animation that causes the SVG wheel image to spin. */
            if ( wheSvgEle !== null ) wheSvgEle.classList.remove( 'wheelSVGSpin' );



            /** Glow Div Element = This standard Javascript DOM API will remove the newly created glow div element from the body, stopping the custom whe-glo-eff CSS radial gradient animation that overlays the entire viewport. */
            document.body.removeChild( gloDivEle );

            // #endregion Remove Animation Classes and Elements



            /** Set Page Timeout Object = This custom state setter function is used to update the custom {@link pagTimObj.setIntNum} state variable, specifically setting the interval number back to its original value of 1000 milliseconds. */
            setPagTimObj( { ...pagTimObj, setIntNum : 1000 } );



            /** Set Wheel Animation Boolean = This custom state setter function is used to control the state of the wheel animations, indicating whether said animations are currently animating or not in order to prevent repeated button presses from accidentally triggering the animations multiple times. */
            setWheAniBoo( false );



            // #region Redirect to Random Page

            /** Redirect Link Array    = This custom variable stores an array of viable links for redirecting the user after the wheel animation cycle finishes. */
            const redLinArr : string[] = [ '/', '/about', '/contact', '/cards' ];



            /** Random Index Number  = This custom variable stores a randomly generated number between 0 and the length of the custom {@link redLinArr} array, which will be used to determine which page tat the user will be redirected to after the wheel animation cycle finishes. */
            const ranIndNum : number = ranNumFun( { minNum : 0, maxNum : redLinArr.length } );



            /** Use Navigate Function = This standard React Router hook will redirect the user to a random page while not replacing the 404 not found page in the uers' browser history. */
            useNavFun( redLinArr[ ranIndNum ], { replace: false } );

            // #endregion Redirect to Random Page



            /** Return Statement = This standard Javascript return statement will explicitly return undefined, which is the expected return value for a function that does not return anything. */
            return void 0;


        }, 6854); /** 6854 MillisecTimNum = This custom timeout duration is the same value used for all custom CSS animations that are not infinite, is equal to the golden ratio to the 4th power, and it defines how long the wheel animations will run before being stopped, cleaned up and then redirecting the user to a random page. */

        // #endregion Set Timeout for Removing Elements and Classes



        /** Return Statement = This standard Javascript return statement will explicitly return undefined, which is the expected return value for a function that does not return anything. */
        return void 0;


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


        setInterval( locTimFun, 1000 );



        setInterval( pagTimFun, pagTimObj.setIntNum );



        /** Return Statement = This standard Javascript return statement will explicitly return undefined, which is the expected return value for a function that does not return anything. */
        return void 0;


    }, [ pagTimObj ]); /** Empty Aray = This custom dependency array stores the values that define when useEffect should be run, with an empty dependency array ensuring that this hook will run only once when the component mounts. */

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



                    < span id='wheSpaEle' className={ styles.wheelSpan } >Local Time: { locTimObj.datTimStr }<br />Page Time: { pagTimObj.datTimStr }</ span > { /* Wheel Span Element = This custom span element is the container for the text inside of the wheel button. */ }


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


