
import { useEffect } from 'react'; // useEffect = this is the React useEffect hook that enables side effects in functional components (when certain code should be run and/or re-run based on changes to specific dependencies)
import { useState }  from 'react'; // use state = this is the React useState hook that enables state management in functional components



const useWindowSize = () => {

    // #region State Variables

    // #region Type Declarations

   // initial state object = this is what will trigger re-renders when its values change; it can also be added to a component's useEffect() dependency array to re-run specific code on window resize events
    type IniStaObj = {

        winHeiNum : number; // window height number = this is the current height of the browser window viewport in pixels
        winWidNum : number; // window width number  = this is the current width of the browser window viewport in pixels

    };

    type WinSizSta    = IniStaObj;                                       // window size state         = this variable shares the exact same object structure as the initial state object, as defined above
    type UseStaFunRet = [ WinSizSta, SetWinSizSta ];                     // use state function return = this is the standard array that is returned by the useState() hook function, which contains the state variable object and the setter function used to update it
    type SetWinSizSta = React.Dispatch<React.SetStateAction<IniStaObj>>; // set window size state     = this custom function is what will be used to update the window size state variable object inside of the useEffect() function whenever the window is resized

    // #endregion Type Declarations



    // #region Function Variables

    const iniStaObj : IniStaObj = {

        winHeiNum : window.innerHeight,
        winWidNum : window.innerWidth,

    };

    // #endregion Function Variables



    const [ winSizSta, setWinSizStat ] : UseStaFunRet = useState( iniStaObj );

    // #endregion State Variables



    // #region useEffect

    /**
     ** Use Effect Hook Function
     **
     ** This is the standard React useEffect() hook function that will set up an event
     ** listener on the window object to listen for 'resize' events, and will call the
     ** handle resize function whenever the window is resized.
     **
     ** The empty dependency array ensures this effect runs only once when the component mounts.
     **
     **/



    useEffect( () => {

        // #region hanResFun

        /**
         ** Handle Resize Function
         **
         ** This function will be responsible for updating the window size state
         ** variable object, and will be passed into the window 'resize' event listener.
         **
         ** @param     void   = this function takes no parameters
         ** @returns { void } = this function does not return anything
         **
         **/

        // #region Type Declarations

        type HanResFun = () => void; // handle resize function = this custom function type defines a function that takes no parameters and returns nothing;

        // #endregion Type Declarations



        const hanResFun : HanResFun = () => {

            setWinSizStat({

                winHeiNum : window.innerHeight,
                winWidNum : window.innerWidth,

            });

        };

        // #endregion hanResFun



        window.addEventListener( 'resize', hanResFun );



        // #region Return Statement

        return () => {

            window.removeEventListener( 'resize', hanResFun ); // Clean up the event listener on component unmount

        };

        // #endregion Return Statement

    }, [] );

    // #endregion useEffect



    // #region Return Statement

    return winSizSta;

    // #endregion Return Statement

};

export default useWindowSize;


