// #region Imports

import { gsap }               from "gsap";                          // this is the Green Socks Animation Platform core library
import { hasKeyFun }          from '../../utilities/hasKeyFun.tsx'; // this is a custom utility function that performs a type guard check to see if an object has a specific key
import { ranNumFun }          from '../../utilities/ranNumFun.tsx'; // this is a custom utility function that generates a random number between a provided minimum and maximum value
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";       // this is a Green Socks Animation Platform plugin that enables text scrambling animations
import   snowman              from '../../assets/snowman.png';      // this is the snowman image asset that is used in the .snowflakeSection element
import { SplitText }          from "gsap/SplitText";                // this is a Green Socks Animation Platform plugin that enables text splitting animations
import   styles               from './ChristmasCard.module.css';    // this is the CSS module stylesheet for the ChristmasCard component
import { useEffect }          from 'react';                         // this is the React useEffect hook that enables side effects in functional components (when certain code should be run and/or re-run based on changes to specific dependencies)
import { useGSAP }            from "@gsap/react";                   // this is the Green Socks Animation Platform custom React hook that enables GSAP functionality in React components
import { useLocation }        from 'react-router-dom';              // this is the React Router DOM useLocation hook that provides access to the current URL properties and parameters
import   useWindowSize        from "../../hooks/useWindowSize.tsx"; // this is a custom React hook that provides the current window dimensions and is used to trigger the useEffect() hook on window resize events

gsap.registerPlugin( useGSAP, ScrambleTextPlugin, SplitText );      // this is a plugin for the GSAP core that ensures the two work seamlessly together and also prevents tree shaking issues in build tools/bundlers

// #endregion Imports



function ChristmasCard () {

    const { winHeiNum, winWidNum } = useWindowSize();



    // #region Shared Variables

    /** 
     ** These will be scoped to the ChristmasCard component function,
     ** and are meant to be shared between the various animation functions.
     **/

    // #region Type Declarations

    // animation options object = this will store the customizable options for the snowfall animation
    type AniOptObj = {

        sizMaxNum : number; // size maximum number    = this will store the snowflake maximum size
        sizMinNum : number; // size minimum number    = this will store the snowflake minimum size
        snoColStr : string; // snowflake color string = this will store the snowflake color
        snoCouNum : number; // snowflake count number = this will store the number of snowflakes
        speMaxNum : number; // speed maximum number   = this will store the snowflake maximum falling speed
        speMinNum : number; // speed minimum number   = this will store the snowflake minimum falling speed

    };

    // #endregion Type Declarations



    // #region constant variables

    const aniOptObj : AniOptObj = {

        sizMaxNum : 8,
        sizMinNum : 1,
        snoColStr : '#FFFFFF',
        snoCouNum : 120,
        speMaxNum : 5,
        speMinNum : 1,

    };

    const posSnoArr : CreSnoFunRet[] = []; // update position array = this will store an array of { posSnoFun : posSnoFun() } objects; said objects are created by and returned from creSnoFun(), pushed into this array inside of iniSnoFun(), then looped through and executed on an interval by aniSnoFun()
    


    //#endregion constant variables



    // #region let variables

    let conHeiNum : number = 0;                    // container height number   = this will store the height of the containing element
    let conSecEle : HTMLElement;                   // container section element = this will store the containing HTML Section element to which the created snowflakes will be appended and whose dimensions will be used for positioning the snowflakes
    let conWidNum : number = 0;                    // container width number    = this will store the width of the containing element
    let ideCouNum : number = 0;                    // identifier counter number = this will be used to give each snowflake a unique identifier by increasing this number according to the current posSnoArr array length, which increases by one for each new snowflake created
    let setTimFun : ReturnType<typeof setTimeout>; // set timeout function      = this will be used to store the setTimeout function that recursively calls aniSnoFun() to create the snowfall animation effect; this variable will store a unqiue identifier given by javascript that will be used to clear the timeout inside of cleSnoFun() which itself is called inside of useEffect(), typically when the window is resized

    //#endregion let variables



    // #region URL Parameters

    const { search } : { search : string } = useLocation();                 // search                    = this will store the search property value returned from useLocation(), a string representing the query parameters in the URL

    const queParIns  : URLSearchParams     = new URLSearchParams( search ); // query parameters instance = this will store an instance of the URLSearchParams class using the previously defined search variable that will provide methods for interacting with the query parameters; this is a web standard API and not React specific
    const namParStr  : string | null       = queParIns.get( 'name' );       // name parameter string     = this will store the value of the 'name' query parameter (or null) which will be used to customize the Christmas Card component's h1 element, that is acquired using the get() method on the previously defined queryParams URLSearchParams object instance

    // #endregion URL Parameters

    // #endregion Shared Variables



    // #region creSnoFun

    /**
     ** This will create the snowflake elements, apply styling to and append said
     ** elements to the DOM and return the closure function, { posSnoFun : posSnoFun() },
     ** back to the calling function, iniSnoFun(), where it will be pushed into the
     ** shared posSnoArr array. The calling function, iniSnoFun(), will then call
     ** aniSnoFun() which will loop over said array and update the positions of all snowflakes
     ** on a set interval, creating the snowfall animation effect.
     ** 
     ** @param ideNum                        = this will store the identifier number for the snowflake
     ** @param sizNum                        = this will store the size number for the snowflake
     ** @param speNum                        = this will store the speed number for the snowflake
     ** @param xpoNum                        = this will store the x position number for the snowflake
     ** @param ypoNum                        = this will store the y position number for the snowflake
     ** @returns { posSnoFun : posSnoFun() } = this function will return an object containing the position snowflake function
     **
     **/

    // #region Type Declarations

    // create snowflake function parameters = this will store the parameters provided to this function when it was called
    type CreSnoFunPar = {

        ideNum : number; // identifier number = this will store a unique id number for each snowflake
        sizNum : number; // size number       = this will store the size for each snowflake
        speNum : number; // speed number      = this will store the speed for the falling (y position) animation for each snowflake
        xpoNum : number; // x position number = this will store the starting x position for each snowflake
        ypoNum : number; // y position number = this will store the starting y position for each snowflake
    };

    type CreSnoFun    = ( creSnoFunPar : CreSnoFunPar ) => CreSnoFunRet; // create snowflake function          = this function will create snowflake div element, apply styling via both static shared variables and dynamically provided parameters and then return an object containing the snowflake positioning function
    type CreSnoFunRet = { posSnoFun : PosSnoFun; };                      // create snowflake function return   = this function will return an object containing the position snowflake function
    type PosSnoFun    = () => PosSnoFunRet;                              // position snowflake function        = this function will update the position of the snowflakes and handle resetting their properties if they have moved beyond the containing elements dimensions
    type PosSnoFunRet = void;                                            // position snowflake function return = this function will not return anything

    // #endregion Type Declarations



    // #region Function Body

    const creSnoFun : CreSnoFun = ( creSnoFunPar ) => {

        // #region Type Declarations

        // snowflake settings object = this will store all properties and methods related to creating and positioning a single snowflake
        type SnoSetObj = {

            oscSteNum : number;         // oscillation step number      = this will store a number for increasing snoOscNum with each update
            snoDivEle : HTMLDivElement; // snowflake div element        = this will store the snowflake HTML div element created for each snowflake
            snoIdeNum : number;         // snowflake identifier number  = this will store a unique id number for each snowflake
            snoOscNum : number;         // snowflake oscillation number = this will store an updatable number for the oscillating (x position) animation for each snowflake
            snoSizNum : number;         // snowflake size               = this will store the size for each snowflake
            snoSpeNum : number;         // snowflake speed number       = this will store the speed for the falling (y position) animmation for each snowflake
            snoXpoNum : number;         // snowflake x position         = this will store the starting x position for each snowflake
            snoYpoNum : number;         // snowflake y position         = this will store the starting y position for each snowflake

            snoResFun : () => void;     // snowflake reset function     = this will store the function for resetting each snowflake position and its properties when they move beyond the containing element's dimensions

        };

        // #endregion Type Declarations



        // #region Function Variables

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

                this.oscSteNum = ranNumFun( { maxNum : 10,                         minNum : 1,                   } ) / 100; // this will reset the oscillation step size
                this.snoSizNum = ranNumFun( { maxNum : aniOptObj.sizMaxNum,        minNum : aniOptObj.sizMinNum, } );       // this will reset the snowflake size
                this.snoSpeNum = ranNumFun( { maxNum : aniOptObj.speMaxNum,        minNum : aniOptObj.speMinNum, } );       // this will reset the snowflake falling speed
                this.snoXpoNum = ranNumFun( { maxNum : conWidNum - this.snoSizNum, minNum : 0,                   } );       // this will reset the snowflake x (horizontal) position
                this.snoYpoNum = 0;                                                                                         // this will reset the snowflake y (vertical) position

            },

        };

        // #endregion Function Variables



        // #region DOM Manipulation and CSS Styling

        snoSetObj.snoDivEle.className = 'snowflakes';                                  // this will set the class name for each snowflake element, enabling CSS styling that would need to be applied to all snowflake elements

        snoSetObj.snoDivEle.setAttribute( 'id', `snowflake${ snoSetObj.snoIdeNum }` ); // this will set a unique id for each snowflake element by using the length of the posSnoArr array at the time of the snowflake elements creation

        snoSetObj.snoDivEle.style.backgroundColor = aniOptObj.snoColStr;               // this will set the snowflake color
        snoSetObj.snoDivEle.style.borderRadius    = `${aniOptObj.sizMaxNum}px`;        // this will make the snowflake element circular
        snoSetObj.snoDivEle.style.fontSize        = '0px';                             // this will ensure no text affects the snowflake element size
        snoSetObj.snoDivEle.style.height          = `${snoSetObj.snoSizNum}px`;        // this will set the snowflake height
        snoSetObj.snoDivEle.style.left            = `${snoSetObj.snoXpoNum}px`;        // this will set the snowflake starting x (horizontal) position
        snoSetObj.snoDivEle.style.position        = 'absolute';                        // this will set the snowflake position to absolute
        snoSetObj.snoDivEle.style.top             = `${snoSetObj.snoYpoNum}px`;        // this will set the snowflake starting y (vertical) position
        snoSetObj.snoDivEle.style.width           = `${snoSetObj.snoSizNum}px`;        // this will set the snowflake width

        conSecEle.appendChild( snoSetObj.snoDivEle );                                  // this will append the snowflake element to the DOM

        // #endregion DOM Manipulation and CSS Styling



        // #region Return Statement

        return {

            // #region posSnoFun

            /* 
            * This will handle updating the snowflake element's position, as well as handle
            * resetting said position if its position moves beyond the containing element's dimensions.
            * It will be returned to the calling function, iniSnoFun(), where it will be pushed into the
            * shared posSnoArr array. The calling function, iniSnoFun(), will then call
            * aniSnoFun() which will loop over said array and update the positions of all snowflakes.
            */

            posSnoFun : () => {

                snoSetObj.snoDivEle.style.left =  `${snoSetObj.snoXpoNum}px`;      // this will update the left (horizontal) position
                snoSetObj.snoDivEle.style.top  =  `${snoSetObj.snoYpoNum}px`;      // this will update the top (vertical) position
                snoSetObj.snoOscNum            += snoSetObj.oscSteNum;             // this will update the oscillation size for horizontal movement
                snoSetObj.snoXpoNum            += Math.cos( snoSetObj.snoOscNum ); // this will update the x (horizontal) position and create the oscillation animation
                snoSetObj.snoYpoNum            += snoSetObj.snoSpeNum;             // this will update the y (vertical) position and create the falling animation


                // this will handle the horizontal reset if the snowflake's current x position is greater than the width of its containing element minus the snowflake's size (beyond the right edge) OR if the snowflake's position is less than 0 (beyond the left edge)
                if ( snoSetObj.snoXpoNum > ( conWidNum - snoSetObj.snoSizNum)  || snoSetObj.snoXpoNum < 0 ) {

                    snoSetObj.snoResFun();

                };



                // this will handle the vertical reset if the snowflake's current y position is greater than the height of its containing element minus the snowflake's size (beyond the bottom edge)
                if ( snoSetObj.snoYpoNum > ( conHeiNum - snoSetObj.snoSizNum ) ) {

                    snoSetObj.snoResFun();

                };

            },

            // #endregion posSnoFun

        };

        // #endregion Return Statement

    };

    // #endregion Function Body

    // #endregion creSnoFun



    // #region aniSnoFun

    /**
     ** This will create the animation effect by executing the update function
     ** of each snowflake element and then recursively calling itself at a
     ** set interval (16.7 ms ~= 60 FPS), which creates both the falling and
     ** oscillating motions. This function is called by iniSnoFun() after
     ** initializing the desired number of snowflake elements.
     ** 
     ** @param   = this function takes no parameters
     ** @returns = this function does not return anything
     **
     **/

    // #region Type Declarations

    type AniSnoFun    = () => AniSnoFunRet; // animate snowflake function        = this function will execute each snowflake update function stored in the shared posSnoArr array and then recursively call itself at a set interval
    type AniSnoFunRet = void;               // animate snowflake function return = this function will not return anything

    // #endregion Type Declarations



    // #region Function Body

    const aniSnoFun : AniSnoFun = () => {

        // this will loop through each snowflake element's update function stored in the shared posSnoArr array
        for ( let indNum : number = 0; indNum < posSnoArr.length; indNum += 1 ) {

            posSnoArr[ indNum ].posSnoFun(); // this will execute the update function for each snowflake element; the posSnoFun() functions are pushed into the shared posSnoArr array by iniSnoFun() as the returned object via executing creSnoFun()

        };



        setTimFun = setTimeout( function () { aniSnoFun(); }, 16.7 ); // this will recursively call this function every 16.7 ms (~60 FPS), updating each snowflake's position and thus creating an animation effect; this variable will store a unqiue identifier given by javascript that will be used to clear the timeout inside of cleSnoFun() which itself is called inside of useEffect(), typically when the window is resized

    };

    // #endregion Function Body

    // #endregion aniSnoFun



    // #region iniSnoFun

    /**
     ** This will initiate the snowfall animation. It will first perform
     ** a check to make sure the provided settings object contains valid keys
     ** that match the shared aniOptObj's keys and then override the default
     ** animation options with the provided values. It will then grab the
     ** containing element and set the other shared variables according to its
     ** dimensions before creating the number of snowflakes specified in
     ** the settings object's snoCouNum by making calls to creSnoFun() for
     ** each snowflake. After which it will push the returned object from each
     ** creSnoFun() call containing the posSnoFun() into the shared posSnoArr
     ** array. Lastly it will call aniSnoFun(), which will loop over said array
     ** and call each of those functions on a set interval thus creating the
     ** animation effect.
     ** 
     ** @param conEle = this will store the container element for the snowflakes
     ** @param setObj = this will store the settings object to override default animation options
     ** @returns      = this function will not return anything
     **
     **/

    // #region Type Declarations

    // initialize snowflake function parameters = this will store the parameters provided to this function when it was called
    type IniSnoFunPar = {

        conEle : HTMLElement; // container element = this will store the containing HTML element for all of the snowflake elements
        setObj : SetObj;      // settings object   = this will store the settings object which will be used to override the default animation options stored inside of the shared aniOptObj

    };

    type IniSnoFun    = ( iniSnoFunPar : IniSnoFunPar ) => IniSnoFunRet; // initialize snowflake function        = this function will check the provided parameters for valid keys, set the shared variables, make calls to creSnoFun() for each snowflake, push the returned object into the shared posSnoArr array, and start the animation by making a call to aniSnoFun() to loop over said array
    type IniSnoFunRet = void;                                            // initialize snowflake function return = this function will not return anything
    type SetObj       = IniSetObj;                                       // settings object                      = this will store the initialize settings object that is declared inside for the useEffect() function block, where iniSnoFun() is called from

    // #endregion Type Declarations



    // #region Function Body

    const iniSnoFun : IniSnoFun = ( { conEle, setObj } ) => {

        // #region setObj Keys Loop

        // this will loop through each key in the params settings object
        for ( const key in setObj ) {

            const setObjKey = key as keyof SetObj; // settingsObjecyKey = this will help to type narrow the key variable to be used to index into the setObj parameter



            // this will apply a custom type guard to ensure only valid keys are used to override the default animation options
            if ( hasKeyFun( aniOptObj, key ) === true ) {

                aniOptObj[ key ] = setObj[ setObjKey ]; // this will override the default animation option with the provided setting value

            }

            // this will handle the case where the custom type guard check failed
            else {

                console.warn( `Snowfall Effect: Invalid setting key '${ key }' provided in setObj parameter.` ); // this will issue a console warning about invalid keys provided in the params settings object

            };

        };

        // #endregion setObj Keys Loop



        // #region Set Container Element and Dimensions

        conSecEle = conEle;                 // this will set the shared container section element variable equal to the containing element provided in the functions parameters
        conHeiNum = conSecEle.clientHeight; // this will set the shared container height number variable equal to the above containing element's height value
        conWidNum = conSecEle.offsetWidth;  // this will set the shared container width number variable equal to the above containing element's width value

        // #endregion Set Container Element and Dimensions



        // #region Create Snowflake Loop

        // this loop will create the number of snowflake elements (and their related functions) according to the count number setting
        for ( let incNum : number = 0; incNum < aniOptObj.snoCouNum; incNum += 1 ) {

           ideCouNum = posSnoArr.length; // this will set the ideCouNum shared variable equal to the number of snowflake elements created so far from calling creSnoFun(), which will return a { posSnoFun : posSnoFun() } object for each snowflake which is then pushed into the posSnoArr array


           // create snowflake function parameters = this will store the parameters that are required for the creSnoFun()
            const creSnoFunPar : CreSnoFunPar = {

                ideNum : ideCouNum,                                                                    // identifier number              = this will store the posSnoArr.length at this point in the loop
                sizNum : ranNumFun( { maxNum : aniOptObj.sizMaxNum, minNum : aniOptObj.sizMinNum, } ), // size number                    = this will store the size for snowflake generated randomly between aniOptObj.sizMaxNum and aniOptObj.sizMinNum
                speNum : ranNumFun( { maxNum : aniOptObj.speMaxNum, minNum : aniOptObj.speMinNum, } ), // speed number                   = this will store the speed for snowflake falling animation generated randomly between aniOptObj.speMaxNum and aniOptObj.speMinNum
                xpoNum : ranNumFun( { maxNum : conWidNum,           minNum : 0, } ),                   // x (horizontal) position number = this will store the starting x position (horizontal) for snowflake generated randomly between 0 and the container's width
                ypoNum : ranNumFun( { maxNum : conHeiNum,           minNum : 0, } ),                   // y (vertical) position number   = this will store the starting y position (vertical) for snowflake generated randomly between 0 and the container's height

            };

            posSnoArr.push( creSnoFun( creSnoFunPar ) ); // this will create a snowflake element, style it, attach it to the DOM, and push the creSnoFun()'s returned { posSnoFun : posSnoFun() } object into the shared posSnoArr array

        };

        // #endregion Create Snowflake Loop



        aniSnoFun(); // this will loop through each snowflake's { posSnoFun : posSnoFun() } stored in the shared posSnoArr array for execution, update the snowflake's position, then recursively call itself on a set interval which creates the snowfall animation effect

    };

    // #endregion Function Body

    // #endregion iniSnoFun



    // #region cleSnoFun

    /**
     ** This will remove all snowflake elements from the DOM, empty the shared posSnoArr
     ** array (position update functions for each snowflake element) and then clear the
     ** timeout used for recursively calling the aniSnoFun(). This function is called
     ** inside of useEffect(), which itself is called when the component is first mounted
     ** and whenever the window is resized.
     ** 
     ** @param   = this function takes no parameters
     ** @returns = this function does not return anything
     **
     **/

     // #region Type Declarations

    type CleSnoFun    = () => CleSnoFunRet; // clear snowflake function        = this function will grab and turn into an array all snowflake elements, remove each from the DOM, clear each animation interval timeout, and empty both the shared posSnoArr and setTimFun arrays
    type CleSnoFunRet = void;               // clear snowflake function return = this function will not return anything

    // #endregion Type Declarations



    const cleSnoFun : CleSnoFun = () => {

        const snoEleArr : Element[] = Array.from( document.getElementsByClassName( 'snowflakes' ) ); // snowflake element array = this will store an array of all snowflake HTML elements grabbed from the DOM via their shared class name of 'snowflakes'



        // this check is needed to prevent errors in case this function is called before any snowflakes have been created, typically when the component is first mounted
        if ( snoEleArr.length === 0 ) {

            return;

        };



        // this will loop through each snowflake element from the above defined array
        for ( let indNum : number = 0; indNum < snoEleArr.length; indNum++ ) {

            snoEleArr[indNum].remove(); // this will remove each snowflake element from the DOM

        };



        posSnoArr.length = 0;      // this will empty the shared posSnoArr array containing each snowflake's position update function

        clearTimeout( setTimFun ); // this will clear the setTimeout function that is used for recursively calling the aniSnoFun() function

    };

    // #endregion cleSnoFun



    // #region useGSAP

    /**
     ** This is a drop in replacement for useEffect() or useLayoutEffect() that
     ** automatically handles cleanup using gsap.context(). This hook solves a
     ** few React-specific friction points, because cleanup is important in React
     ** and gsap.context() makes it simple.
     **
     ** @param   = this function takes no parameters
     ** @returns = this function does not return anything
     **
     **/

    // #region Function Body

    useGSAP(() => {

        // #region GSAP Animation Variables

        const gsaTimIns : GSAPTimeline       = gsap.timeline();                                                          // gsap timeline instance       = this will store a GSAP timeline instance with methods that custom GSAP animations will be attached to and then executed in sequence
        const squEleArr : HTMLElement[]      = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) ); // squares element array        = this will store an array of all elements with the class name 'pixelatedTransitionSquares', which are the square div elements that cover the screen and will be animated to create a pixelated transition effect

        const hacHe1Ele : HTMLElement | null = document.getElementById( 'hacHe1Ele' );                                   // hacked header 1 element      = this will store the h1 element with the 'hacHe1Ele' id that will have two text animations applied to it, the first being a scramble text animation and the second being a gltiched text animation
        const hacParEle : HTMLElement | null = document.getElementById( 'hacParEle' );                                   // hacked paragraph element     = this will store the paragraph element with the 'hacParEle' id that will have a gltiched text animation applied to it
        const hacSplIns : SplitText          = SplitText.create( '.hackedSplitText', { type : 'words, chars' } );        // hacked split text instance   = this will store a GSAP Split Text instance that splits elements with the class 'hackedSplitText' into words and characters which will then be animated individually in a staggered fashion
        const snoSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' );                                   // snowfall section element     = this will store the section element with the 'snoSecEle' id that will be faded in after the hacked section animations are complete and whose text will have a split text fade in animation applied to it
        const snoSplIns : SplitText          = SplitText.create( '.snowfallSplitText', { type : 'words, chars' } );      // snowfall split text instance = this will store a GSAP Split Text instance that splits all text elements inside of the snowfall section element (this includes the snowfall header 1 text, the snowfall paragraph text and the snowfall span text) into words and characters which will then be animated individually in a staggered fashion
        const shuSquFun : HTMLElement[]      = gsap.utils.shuffle( squEleArr );                                          // shuffled squares function    = this will store a GSAP generic function that will returned a shuffled array of the previously defined squEleArr array

        // #endregion GSAP Animation Variables



        // #region 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)

        // this will perform a shuffle animation of the square div elements in a staggered fashion to create a pixelated transition effect from the initial page load in order to reveal to the hacked message section
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       // this will store the target opacity that the animation will end at
            duration : 0.00333, // this will store the duration of each individual square fade out in seconds
            stagger  : {        // this will store the staggered animation settings

                each : 0.00333,     // this will store the time gap between each square fade out animation in seconds
                from : 'random',    // this will store the starting point of the staggered animation
                grid : 'auto',      // this will store the grid columns and rows of the elements to be shuffled, in this case it will automatically determine the grid columns and rows
                ease : 'power1.out' // this will store a built in GSAP ease out animation which are best for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction; start fast and end slower, like a rolling ball slowly coming to a stop

            }

        });

        // #endregion 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)



        gsaTimIns.add( () => {}, '+=1' ); // this is the 1st GSAP timeline 'pause', between the first pixelated transition animation (to reveal the hacked section) and the hacked header scramble text animation



        // #region 2nd GSAP Animation - Hacked Header Scramble Text

        // this will animate and place (into the hacked header 1 element) one character of the target text as a random character at a time until the full target text is revealed
        gsaTimIns.to( hacHe1Ele, {

            duration     : 3,                          // this will store the total duration of the entire scramble text animation
            scrambleText : `You've Just Been Hacked!!` // this will store the target text that the animation will end at

        });

        // #endregion 2nd GSAP Animation - Hacked Header Scramble Text



        // #region 3rd GSAP Animation - 1st Hacked Header Glitch Effect

        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } ); // this will distort the hacked section h1 element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } ); // this will undistort the hacked section h1 element back to normal using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } ); // this will quickly make the hacked section h1 element invisible, creating a flicker effect when used with the below opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } ); // this will quickly make the hacked section h1 element visible, creating a flicker effect when used with the above opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } ); // this will move the hacked section h1 element 20 pixels in the horizontal direction to the left, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } ); // this will undo the previous move of the hacked section h1 element back to its original position, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element back to its original vertical scale with a GSAP built in ease in out animation, in seconds

        // #endregion 3rd GSAP Animation - 1st Hacked Header Glitch Effect



        // #region 4th GSAP Animation - Hacked Paragraph Split Character Text Animation

        // this will animate the characters of the hacked section's paragraph element one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in
        gsaTimIns.from( hacSplIns.chars, {

            duration  : 3,   // this will store the total duration of the entire animation in seconds
            x         : 10,  // this will store the amount to animate right to left
            autoAlpha : 0,   // this will store the fade in value from opacity : 0 and visibility : hidden
            stagger   : 0.05 // this will store the time gap between each character animation in seconds

        }, '<');

        // #endregion 4th GSAP Animation - Hacked Paragraph Split Character Text Animation



        // #region 5th GSAP Animation - 2nd Hacked Header Glitch Effect

        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } ); // this will distort the hacked section h1 element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } ); // this will undistort the hacked section h1 element back to normal using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } ); // this will quickly make the hacked section h1 element invisible, creating a flicker effect when used with the below opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } ); // this will quickly make the hacked section h1 element visible, creating a flicker effect when used with the above opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } ); // this will move the hacked section h1 element 20 pixels in the horizontal direction to the left, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } ); // this will undo the previous move of the hacked section h1 element back to its original position, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element back to its original vertical scale with a GSAP built in ease in out animation, in seconds

        // #endregion 5th GSAP Animation - 2nd Hacked Header Glitch Effect



        // #region 6th GSAP Animation - Hacked Paragraph Glitch Effect

        gsaTimIns.to( hacParEle, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } ); // this will distort the hacked section paragraph element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } ); // this will undistort the hacked section paragraph element back to normal using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 0                              } ); // this will quickly make the hacked section paragraph element invisible, creating a flicker effect when used with the below opacity animation, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.04, opacity : 1                              } ); // this will quickly make the hacked section paragraph element visible, creating a flicker effect when used with the above opacity animation, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : -20                            } ); // this will move the hacked section paragraph element 20 pixels in the horizontal direction to the left, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.04, x       : 0                              } ); // this will undo the previous move of the hacked section paragraph element back to its original position, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } ); // this will scale the hacked section paragraph element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacParEle, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } ); // this will scale the hacked section paragraph element back to its original vertical scale with a GSAP built in ease in out animation, in seconds

        // #endregion 6th GSAP Animation - Hacked Paragraph Glitch Effect



        gsaTimIns.add( () => {}, '+=1' ); // this is the 2nd GSAP timeline 'pause', between the hacked paragraph glitch effect animation and the second pixelated transition animation (to cover the hacked section)



        // #region 7th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)

        // this will perform a shuffle animation of the square div elements in a staggered fashion to create a fade in pixelated transition effect to cover the hacked message section in order to then perform a pixelated fade out animation before revealing the snowfall section
        gsaTimIns.to( shuSquFun, {

            opacity  : 1,       // this will store the target opacity that the animation will end at
            duration : 0.00333, // this will store the duration of each individual square fade out in seconds
            stagger  : {        // this will store the staggered animation settings

                each : 0.00333,     // this will store the time gap between each square fade out animation in seconds
                from : 'random',    // this will store the starting point of the staggered animation
                grid : 'auto',      // this will store the grid columns and rows of the elements to be shuffled, in this case it will automatically determine the grid columns and rows
                ease : 'power1.out' // this will store a built in GSAP ease out animation which are best for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction; start fast and end slower, like a rolling ball slowly coming to a stop

            }

        });

        // #endregion 7th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)



        gsaTimIns.add( () => {}, '+=1' ); // this is the 3rd GSAP timeline 'pause', between the second pixelated transition (to cover the hacked section) and the snowfall section fade in +  the third pixelated transition (to reveal the snowfall section)



        // #region 8th GSAP Animation - Snowfall Section Fade In Animation

        // this will fade in the snowfall section element after the previous pixelated transition (to snowfall section) is complete; this is section is set to opacity 0 on page load so that it does not obscure the hacked section element
        gsaTimIns.to( snoSecEle, {

            opacity  : 1,    // this will store the target opacity that the animation will end at
            duration : 0.01, // this will store the total duration of the entire animation in seconds

        });

        // #endregion 8th GSAP Animation - Snowfall Section Fade In Animation



        // #region 9th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)

        // this will perform a shuffle animation of the square div elements in a staggered fashion to create a fade out pixelated transition effect from the previous pixelated fade in animation in order to reveal the snowfall section
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       // this will store the target opacity that the animation will end at
            duration : 0.00333, // this will store the duration of each individual square fade out in seconds
            stagger  : {        // this will store the staggered animation settings

                each : 0.00333,     // this will store the time gap between each square fade out animation in seconds
                from : 'random',    // this will store the starting point of the staggered animation
                grid : 'auto',      // this will store the grid columns and rows of the elements to be shuffled, in this case it will automatically determine the grid columns and rows
                ease : 'power1.out' // this will store a built in GSAP ease out animation which are best for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction; start fast and end slower, like a rolling ball slowly coming to a stop

            }

        });

        // #endregion 9th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)



        gsaTimIns.add( () => {}, '+=1' ); // this is the 4th GSAP timeline 'pause', between the third pixelated transition (to reveal snowfall section) and the snowfall section text elements split text character animation



        // #region 10th GSAP Animation - Snowfall Text Split Character Text Animation

        // this will animate the characters of the snowfall section element (this includes the snowfall header 1 element, the snowfall paragraph element and the snowfall span element) one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in
        gsaTimIns.from( snoSplIns.chars, {

            duration  : 3,   // this will store the total duration of the entire animation in seconds
            x         : 10,  // this will store the amount to animate right to left
            autoAlpha : 0,   // this will store the fade in value from opacity : 0 and visibility : hidden
            stagger   : 0.05 // this will store the time gap between each character animation in seconds

        });

        // #endregion 10th GSAP Animation - Snowfall Text Split Character Text Animation

    }, [] ); // this will define when useGSAP should be run, an empty dependency array ensures this effect runs only once when the component mounts; unlike the snowfall animation inside of useEffect(), this animation does not need to be re-run on window resize

    // #endregion Function Body

    // #endregion useGSAP



    // #region useEffect

    /**
     ** 1) This will set up the grid layout for the square div elements, which are
     ** used to create the pixelated transition effect. More specifically, it
     ** calculates the size of each square so that the squares fully cover (and with
     ** no overflow) the entire section areas. This includes both the hacked message
     ** section and the snowfall section, which are stacked on top of each other.
     **
     ** 2) This will initiate the snowfall animation. It will first make a call to
     ** cleSnoFun() to clear the previous animation (if useEffect() was called due to
     ** a window resize). It will then perform a check to make sure the provided
     ** settings object contains valid keys that match the shared aniOptObj's keys and
     ** override the default animation options with the provided values. Then it will
     ** grab the containing element and set the other shared variables according to its
     ** dimensions before creating the number of snowflakes specified in the settings
     ** object's snoCouNum by making calls to creSnoFun() for each snowflake. After which
     ** it will push the returned object from each creSnoFun() call containing the
     ** posSnoFun() into the shared posSnoArr array. Lastly it will call aniSnoFun(),
     ** which will loop over said array and call each of those functions on a set interval
     ** thus creating the animation effect.
     **
     ** The empty dependency array ([ winHeiNum, winWidNum ]) ensures this effect runs
     ** whenever the window is resized and also once when the component mounts.
     ** 
     ** @param   = this function takes no parameters
     ** @returns = this function does not return anything
     **
     **/

    // #region Type Declarations

    // initialize settings object = this will store the snowfall animation settings object provided to iniSnoFun() and used to override the default animation settings stored inside of the shared aniOptObj
    type IniSetObj = {

        sizMaxNum : number; // size maximum number    = this will store the snowflake maximum size
        sizMinNum : number; // size minimum number    = this will store the snowflake minimum size
        snoColStr : string; // snowflake color string = this will store the snowflake color
        snoCouNum : number; // snowflake count number = this will store the number of snowflakes
        speMaxNum : number; // speed maximum number   = this will store the snowflake maximum falling speed
        speMinNum : number; // speed minimum number   = this will store the snowflake minimum falling speed

    };

    // #endregion Type Declarations



    // #region Function Body

    useEffect( () => {

        // #region Square Div Elements Size Calculations

        const squSecEle : HTMLElement | null = document.getElementById( 'squSecEle' );                                   // squares section element         = this will store the containing HTML Seciton element to which contains all of the square div elements used for the pixelated transition effect
        const squDivArr : HTMLElement[]      = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) ); // squares div element array       = this will store an array of all square div elements inside of the above squares section element
        const sdaLenNum : number             = squDivArr.length;                                                         // squares div array length number = this will store the length of the above squares div element array, which will be used to calculate the size of each square div element so that they fully cover the squares section element with no gaps and no overflow



        // this will perform a type narrowing check for squSecEle not being null && the squDivArr having elements inside of it
        if ( squSecEle !== null && sdaLenNum !== 0 ) {

            const sseWidNum : number = squSecEle.clientWidth;                            // squares section element width number  = this will store the width of the above squares section element
            const sseHeiNum : number = squSecEle.clientHeight;                           // squares section element height number = this will store this the height of the above squares section element
            const totAreNum : number = sseWidNum * sseHeiNum;                            // total area number                     = this will store the total area of the squares section element; simple geometry formula: area = width * height
            const squSizNum : number = Math.floor( Math.sqrt( totAreNum / sdaLenNum ) ); // square size number                    = this will store the size that should be applied to each square element in order to fully cover the squares section element with no gaps and no overflow; some algebraic manipulation is used: side^2 * number of squares = total area, or to simply nx^2 = a and solve for x which resolves to x^2 = a / n then x = the square root of a / n where x is the size of the squares, a is the total area of the containing element and n = the squDivArr array length number; this number is then floored to ensure it is a whole number value and the grid will then slightly upsize via a minmax so that it fully covers the containing element (if Math.ceil() were used it would cause an overflow because of the minimum size which is fixed, whereas the maximum size is flexible)
            const sseColNum : number = Math.floor( sseWidNum / squSizNum );              // squares section element column number = this will store the number of columns of square elements that can fit in the squares section element; a simple calculation of the containing element's width divided by the previously calculated square size which is floored to ensure it is a whole number value
            const sseRowNum : number = Math.floor( sseHeiNum / squSizNum );              // squares section element row number    = this will store the number of rows of square elements that can fit in the squares section element; a simple calculation of the containing element's height divided by the previously calculated square size which is floored to ensure it is a whole number value



            squSecEle.style.gridTemplateColumns = `repeat(${ sseColNum }, minmax(${ squSizNum }px, 1fr))`; // this will set the squares section element's CSS grid template columns property to create the calculated number of columns with each column having a minimum size of the previously calculated square size in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the containing element
            squSecEle.style.gridTemplateRows    = `repeat(${ sseRowNum }, minmax(${ squSizNum }px, 1fr))`; // this will set the squares section element's CSS grid template rows property to create the calculated number of rows with each row having a minimum size of the previously calculated square size in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the containing element

        }

        // this will handle the case where the type narrowing check failed
        else {

            console.warn( `Error: Either the squares section element is null (${ squSecEle === null ? 'TRUE' : 'FALSE' }) or the squares div element array is empty (${ sdaLenNum === 0 ? 'TRUE' : 'FALSE' }).` ); // this will issue a console warning about the squares section element being null or the squares div element array being empty

        };

        // #endregion Square Div Elements Size Calculations



        // #region Snowflake Animation Section

        cleSnoFun(); // this will clear any previous snowfall animations that may have been running before initiating a new one, this is especially important when the useEffect() is called due to a window resize



        // #region Function Variables

        const smaHeiBoo : boolean = winHeiNum < 550; // small height boolean = this will store a boolean value that indicates whether the window height number is less than 550 pixels, which is used to reduce the speed of the snowflakes falling for better asthetics (smaller height means the snowflakes fall too quickly since there is less vertical space)
        const smaWidBoo : boolean = winWidNum < 550; // small width boolean  = this will store a boolean value that indicates whether the window width number is less than 550 pixels, which is used to reduce the number of snowflakes for better asthetics (smaller width means too many snowflakes can overcrowd the screen)

        const iniSetObj : IniSetObj = {

            sizMaxNum : 8,
            sizMinNum : 1,
            snoColStr : '#FFFFFF',
            snoCouNum : smaWidBoo === true ? 60 : 120,
            speMaxNum : smaHeiBoo === true ? 2 : 5,
            speMinNum : 1,

        };

        const conSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' ); // containing section element = this will store the containing HTML Seciton element to which all snowflake elements will be attached and whose dimensions will be used to update and contain each snowflake element's position

        // #endregion Function Variables



        // #region conSecEle Null Checks and iniSnoFun() Calls

        // this will perform a type narrowing check for conSecEle
        if ( conSecEle !== null ) {

            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333); // this will initialize the snowflake animation according to the provided parameters, after a delay of 333ms

        }

        // this will handle the case where the type narrowing check failed
        else {

            const conSecEle = document.createElement( 'section' ); // containing section element = this will create a new containing HTML Section element

            conSecEle.id = 'snoSecEle';                            // this will give the newly created containing section element an id of snoSecEle (snowfall section element)

            document.body.appendChild( conSecEle );                // this will append the newly created containing section element to the DOM



            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333); // this will initialize the snowflake animation according to the provided parameters, after a delay of 333ms
        };

        // #endregion conSecEle Null Checks and iniSnoFun() Calls

        // #endregion Snowflake Animation Section

    }, [ winHeiNum, winWidNum ] ); // this will utilize the state variables used for the window height and width numbers as dependencies so that the useEffect() is called whenever the window is resized

    // #endregion Function Body

    // #endregion useEffect



    // #region Return Statement

    return (

        // #region Component Section Element

        <  section id='comSecEle' className={ styles.componentSection } >



            { /* Start Squares Section Element (Pixelated Transition Effect) */ }

            <  section id='squSecEle' className={ styles.squaresSection } >

                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
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

            <  section id='hacSecEle'  className={ styles.hackedSection } >

                < h1   id='hacHe1Ele'  className={ styles.hackedHeader1 } ></ h1 >

                < p    id='hacParEle'  className={ ` ${ styles.hackedParagraph } hackedSplitText ` } >Just kidding! But it just goes to show you that you should never trust a QR code! Christmas present incoming...</ p >

            </ section >

            { /* End Hacked Section Element */ }



            { /* Start Snowfall Section Element */ }

            <  section id='snoSecEle'  className={ `${ styles.snowfallSection } snowfallSplitText` } >

                < h1   id='snoHe1Ele'  className={ styles.snowfallHeader1 } >Merry Christmas, { namParStr }!</ h1 >

                < img  id='snoImgEle'  className={ styles.snowfallImage } src={ snowman } />

                < p    id='snoParEle'  className={ styles.snowfallParagraph } >< span id='snoSpaEle' className={ styles.snowfallSpan } >From,</ span > Mr. Awesome</ p >

            </ section >

            { /* End Snowfall Section Element */ }



        </ section >

        // #endregion Component Section Element

    );

    // #endregion Return Statement

}

export default ChristmasCard;


