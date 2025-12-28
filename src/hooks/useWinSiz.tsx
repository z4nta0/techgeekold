
// #region Imports

import { useEffect } from 'react'; /** Use Effect = This is the React useEffect() hook that will handle side effects in functional components (when certain code should be run and/or re-run based on changes to specific dependencies). */
import { useState }  from 'react'; /** Use state  = This is the React useState() hook that enables state management in functional components. */

// #endregion Imports


//CHANGES
/**
 * useWinSiz = Use Window Size Hook Function
 *
 * @summary
 * This custom React hook function is designed to provide the current window
 * viewport dimensions (height and width) and to update these values whenever
 * the window is resized. It utilizes the {@link useState} hook to manage the
 * state of the window dimensions and the {@link useEffect} hook to set up an
 * event listener for window resize events.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param void - This function takes no parameters.
 * 
 * @returns The winSizSta state object containing the current window height and width in pixels.
 * @see {@link winSizSta}
 * 
 * @example
 * ```tsx
 * const { winHeiNum, winWidNum } = useWinSiz();
 * ```
 *
*/

const useWinSiz = () => {



    // #region Function Scoped Variables


    // #region iniStaObj

    /**
     * IniSetObj = Initial State Object will store the values that will trigger rerenders when their values change. They can also be added to a component's useEffect() dependency array in order to re-run specific code on window resize events.
     * @see {@link iniStaObj}
     * 
     * @property winHeiNum = Window Height Number will store the current height of the browser window viewport in pixels.
     * @property winWidNum = Window Width Number will store the current width of the browser window viewport in pixels.
     *
    */

    type IniStaObj = {

        winHeiNum : number;
        winWidNum : number;

    };

    /** @see {@link IniStaObj} */
    const iniStaObj : IniStaObj = {

        winHeiNum : window.innerHeight,
        winWidNum : window.innerWidth,

    };

    // #endregion iniStaObj


    /** Window Size State         = This will store the winHeiNum and winWidNum property values and this object shares the exact same structure as the {@link iniStaObj} object. */
    type WinSizSta                = IniStaObj;
    /** Use State Function Return = This will store the standard array that is returned by the {@link useState} hook, and it will contain the {@link winSizSta} state variable object and the setter function used to update said state variable object. */
    type UseStaFunRet             = [ WinSizSta, SetWinSizSta ];
    /** Set Window Size State     = This custom state setter function will be used to update the {@link winSizSta} state variable object inside of the {@link useEffect} hook whenever the window is resized. */
    type SetWinSizSta             = React.Dispatch<React.SetStateAction<IniStaObj>>;

    /** These are the state object variable and setter function returned by the useState() hook. The setter is used inside of the {@link useEffect} hook to update the state variable object whenever the window is resized, and the state variable object is what is returned by this custom hook function. */
    const [ winSizSta, setWinSizSta ] : UseStaFunRet = useState( iniStaObj );


    // #endregion Function Scoped Variables



    // #region useEffect

    /**
     * useEffect Hook
     *
     * @summary
     * The useEffect hook in React allows you to perform side effects in
     * functional components, such as data fetching, subscriptions, or manual
     * DOM manipulation. It serves to synchronize a component with external
     * systems. The custom inner code blocks inside of useEffect will handle
     * setting the {@link winSizSta} state object values via the
     * {@link setWinSizSta} setter function by attaching an event listener to
     * the window's resize event. A function will then be returned by useEffect
     * so that said listener can be removed whenever the component unmounts.
     * The empty dependency array ensures this effect runs only once when the
     * component mounts.
     *
     * @author React  <https://react.dev/reference/react/useEffect>
     * @author z4ntao <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns A cleanup function that removes the event listener.
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


        // #region hanResFun


        // #region Function Type Declarations

        /** Handle Resize Function = This function will handle updating the {@link winSizSta} state object by calling the {@link setWinSizSta} setter function whenever the window is resized. */
        type HanResFun = () => void;

        // #endregion Function Type Declarations


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
         * hanResFun() // => void
         * ```
         *
        */

        const hanResFun : HanResFun = () => {

            /** This is the custom state setter function that will set the {@link winSizSta} state object values. */
            setWinSizSta({

                winHeiNum : window.innerHeight, /** This sets the Window Height Number state variable equal to the window viewport's inner height value. */
                winWidNum : window.innerWidth,  /** This sets the Window Width Number state variable equal to the window viewport's inner width value. */

            });

        };

        // #endregion Function Body


        // #endregion hanResFun



        /** This attaches the handle resize function as an event listener to the window's resize event so that the {@link winSizSta} state object is updated whenever the window is resized. */
        window.addEventListener( 'resize', hanResFun );



        // #region Return Statement

        /** This cleanup function removes the handle resize event listener from the window when the component unmounts in order to prevent memory leaks. */
        return () => {

            /** This will remove the previously attached event listener whenever the component unmounts in order to prevent memory leaks. */
            window.removeEventListener( 'resize', hanResFun );

        };

        // #endregion Return Statement



    }, [] ); /** This defines when useEffect() should be run. An empty dependency array ensures this hook will run only once when the component mounts. */

    // #endregion useEffect



    // #region Return Statement

    /** This returns the current window size state object wherever this custom hook is called, and it can be destructured to access the individual width and height values like so const { winHeiNum, winWidNum } = useWinSiz(). */
    return winSizSta;

    // #endregion Return Statement

};



export default useWinSiz;


