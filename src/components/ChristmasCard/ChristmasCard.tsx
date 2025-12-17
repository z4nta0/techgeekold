// #region Imports

import { ExpoScaleEase }      from "gsap/EasePack";
import { gsap }               from "gsap";
import { hasKeyFun }          from '../../utilities/hasKeyFun.tsx';
import { ranNumFun }          from '../../utilities/ranNumFun.tsx';
import { RoughEase }          from "gsap/EasePack";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SlowMo }             from "gsap/EasePack";
import   snowman              from '../../assets/snowman.png';
import { SplitText }          from "gsap/SplitText";
import   styles               from './ChristmasCard.module.css';
import { TextPlugin }         from "gsap/TextPlugin";
import { useEffect }          from 'react';
import { useGSAP }            from "@gsap/react";
import { useLocation }        from 'react-router-dom';

gsap.registerPlugin( useGSAP, ScrambleTextPlugin, SplitText, TextPlugin, RoughEase, ExpoScaleEase, SlowMo );

// #endregion Imports



function ChristmasCard () {

    // #region Shared Variables

    /** 
     ** These will be scoped to the ChristmasCard component function,
     ** and are meant to be shared between the various animation functions.
     **/

    // #region Type Declarations

    // animation options object = customizable options for the snowfall animation
    type AniOptObj = {

        sizMaxNum : number; // size maximum number      = snowflake maximum size
        sizMinNum : number; // size minimum number      = snowflake minimum size
        snoColStr : string; // snowflake color string   = snowflake color
        snoCouNum : number; // snowflake count number   = number of snowflakes
        speMaxNum : number; // speed maximum number     = snowflake maximum falling speed
        speMinNum : number; // speed minimum number     = snowflake minimum falling speed

    };

    // #endregion Type Declarations



    // #region constant variables

    const aniOptObj : AniOptObj = {

        sizMaxNum : 2,
        sizMinNum : 1,
        snoColStr : '#FFFFFF',
        snoCouNum : 35,
        speMaxNum : 5,
        speMinNum : 1,

    };

    const posSnoArr : CreSnoFunRet[] = []; // update position array = array of { posSnoFun : posSnoFun() }; said object is created by and returned from creSnoFun(), pushed into this array inside of iniSnoFun(), then looped through and executed on an interval by aniSnoFun()

    //#endregion constant variables



    // #region let variables

    let conHeiNum : number = 0;  // container height number   = height of the containing element
    let conSecEle : HTMLElement; // container section element = containing HTML Section element to which the created snowflakes will be appended and whose dimensions will be used for positioning the snowflakes
    let conWidNum : number = 0;  // container width number    = width of the containing element
    let ideCouNum : number = 0;  // identifier counter number = used to give each snowflake a unique identifier by increasing this number according to the current posSnoArr array length, which increases by one for each new snowflake created

    //#endregion let variables



    // #region URL Parameters

    const { search } : { search : string }  = useLocation();                 // search                    = one of the properties returned from useLocation(), a string representing the query parameters in the URL

    const queParIns  : URLSearchParams      = new URLSearchParams( search ); // query parameters instance = an instance of the URLSearchParams class using the previously defined search variable that will provide methods for interacting with the query parameters; this is a web standard API and not React specific
    const namParStr  : string | null        = queParIns.get( 'name' );       // name parameter string     = the value of the 'name' query parameter (or null) which will be used to customize the Christmas Card component's h1 element, that is acquired using the get() method on the previously defined queryParams URLSearchParams object instance

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
     ** @param ideNum = The identifier number for the snowflake
     ** @param sizNum = The size number for the snowflake
     ** @param speNum = The speed number for the snowflake
     ** @param xpoNum = The x position number for the snowflake
     ** @param ypoNum = The y position number for the snowflake
     ** @returns      = An object containing the position snowflake function
     **
     **/

    // #region Type Declarations

    // create snowflake function parameters = parameters provided to this function when called
    type CreSnoFunPar = {

        ideNum : number; // identifier number = unique id number for each snowflake
        sizNum : number; // size number       = size for each snowflake
        speNum : number; // speed number      = speed for the falling (y position) animation for each snowflake
        xpoNum : number; // x position number = starting x position for each snowflake
        ypoNum : number; // y position number = starting y position for each snowflake

    };

    type CreSnoFun    = ( creSnoFunPar : CreSnoFunPar ) => CreSnoFunRet; // create snowflake function          = create snowflake div element, apply styling via both static shared variables and dynamically provided parameters and then return an object containing the snowflake positioning function
    type CreSnoFunRet = { posSnoFun : PosSnoFun; };                      // create snowflake function return   = object containing the position snowflake function
    type PosSnoFun    = () => PosSnoFunRet;                              // position snowflake function        = update the position of the snowflakes and handle resetting their properties if they have moved beyond the containing elements dimensions
    type PosSnoFunRet = void;                                            // position snowflake function return = nothing returned by this function

    // #endregion Type Declarations



    // #region Function Body

    const creSnoFun : CreSnoFun = ( creSnoFunPar ) => {

        // #region Type Declarations

        // snowflake settings object = all properties and methods related to creating and positioning a single snowflake
        type SnoSetObj = {

            oscSteNum : number;         // oscillation step number      = number for increasing snoOscNum with each update
            snoDivEle : HTMLDivElement; // snowflake div element        = the snowflake HTML div element created for each snowflake
            snoIdeNum : number;         // snowflake identifier number  = unique id number for each snowflake
            snoOscNum : number;         // snowflake oscillation number = updatable number for the oscillating (x position) animation for each snowflake
            snoSizNum : number;         // snowflake size               = size for each snowflake
            snoSpeNum : number;         // snowflake speed number       = speed for the falling (y position) animmation for each snowflake
            snoXpoNum : number;         // snowflake x position         = starting x position for each snowflake
            snoYpoNum : number;         // snowflake y position         = starting y position for each snowflake

            snoResFun : () => void;     // snowflake reset function     = reset each snowflake position and properties when they move beyond the containing element's dimensions

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

                this.oscSteNum = ranNumFun( { maxNum : 10,                         minNum : 1,                   } ) / 100; // this resets the oscillation step size
                this.snoSizNum = ranNumFun( { maxNum : aniOptObj.sizMaxNum,        minNum : aniOptObj.sizMinNum, } );       // this resets the snowflake size
                this.snoSpeNum = ranNumFun( { maxNum : aniOptObj.speMaxNum,        minNum : aniOptObj.speMinNum, } );       // this resets the snowflake falling speed
                this.snoXpoNum = ranNumFun( { maxNum : conWidNum - this.snoSizNum, minNum : 0,                   } );       // this resets the snowflake x (horizontal) position
                this.snoYpoNum = 0;                                                                                         // this resets the snowflake y (vertical) position

            },

        };

        // #endregion Function Variables



        // #region DOM Manipulation and CSS Styling

        snoSetObj.snoDivEle.className = 'snowfall-flakes';                             // this sets the class name for each snowflake element, enabling CSS styling that would need to be applied to all snowflake elements

        snoSetObj.snoDivEle.setAttribute( 'id', `snowflake${ snoSetObj.snoIdeNum }` ); // this sets a unique id for each snowflake element by using the length of the posSnoArr array at the time of the snowflake elements creation

        snoSetObj.snoDivEle.style.backgroundColor = aniOptObj.snoColStr;               // this sets the snowflake color
        snoSetObj.snoDivEle.style.borderRadius    = `${aniOptObj.sizMaxNum}px`;        // this makes the snowflake element circular
        snoSetObj.snoDivEle.style.fontSize        = '0px';                             // this ensures no text affects the snowflake element size
        snoSetObj.snoDivEle.style.height          = `${snoSetObj.snoSizNum}px`;        // this sets the snowflake height
        snoSetObj.snoDivEle.style.left            = `${snoSetObj.snoXpoNum}px`;        // this sets the snowflake starting x (horizontal) position
        snoSetObj.snoDivEle.style.position        = 'absolute';                        // this sets the snowflake position to absolute
        snoSetObj.snoDivEle.style.top             = `${snoSetObj.snoYpoNum}px`;        // this sets the snowflake starting y (vertical) position
        snoSetObj.snoDivEle.style.width           = `${snoSetObj.snoSizNum}px`;        // this sets the snowflake width

        conSecEle.appendChild( snoSetObj.snoDivEle );                                  // this appends the snowflake element to the DOM

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

                snoSetObj.snoDivEle.style.left =  `${snoSetObj.snoXpoNum}px`;      // this updates the left (horizontal) position
                snoSetObj.snoDivEle.style.top  =  `${snoSetObj.snoYpoNum}px`;      // this updates the top (vertical) position
                snoSetObj.snoOscNum            += snoSetObj.oscSteNum;             // this updates the oscillation size for horizontal movement
                snoSetObj.snoXpoNum            += Math.cos( snoSetObj.snoOscNum ); // this updates the x (horizontal) position and creates the oscillation animation
                snoSetObj.snoYpoNum            += snoSetObj.snoSpeNum;             // this updates the y (vertical) position and creates the falling animation



                // horizontal reset = if the snowflake's current x position is greater than the width of its containing element minus the snowflake's size (beyond the right edge) OR if the snowflake's position is less than 0 (beyond the left edge)
                if ( snoSetObj.snoXpoNum > ( conWidNum - snoSetObj.snoSizNum)  || snoSetObj.snoXpoNum < 0 ) {

                    snoSetObj.snoResFun();

                };



                // vertical reset = if the snowflake's current y position is greater than the height of its containing element minus the snowflake's size (beyond the bottom edge)
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
     ** @param   = No params
     ** @returns = No return
     **
     **/

    // #region Type Declarations

    type AniSnoFun    = () => AniSnoFunRet; // animate snowflake function        = execute each snowflake update function stored in the shared posSnoArr array and then recursively call itself at a set interval
    type AniSnoFunRet = void;               // animate snowflake function return = nothing returned by this function

    // #endregion Type Declarations



    // #region Function Body

    const aniSnoFun : AniSnoFun = () => {

        // this loops through each snowflake element's update function stored in the shared posSnoArr array
        for ( let indNum : number = 0; indNum < posSnoArr.length; indNum += 1 ) {

            posSnoArr[ indNum ].posSnoFun(); // execute the update function for each snowflake element; the posSnoFun() functions are pushed into the shared posSnoArr array by iniSnoFun() as the returned object via executing creSnoFun()

        };



        setTimeout( function () { aniSnoFun(); }, 16.7 ); // this will recursively call itself every 16.7 ms (~60 FPS), updating each snowflake's position and thus creating an animation effect

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
     ** array. LasgsaTimInsy it will call aniSnoFun(), which will loop over said array
     ** and call each of those functions on a set interval thus creating the
     ** animation effect.
     ** 
     ** @param conEle = The container element for the snowflakes
     ** @param setObj = The settings object to override default animation options
     ** @returns      = No return
     **
     **/

    // #region Type Declarations

    // initialize snowflake function parameters = parameters provided to this function when called
    type IniSnoFunPar = {

        conEle : HTMLElement; // container element = containing HTML element for all of the snowflake elements
        setObj : SetObj;      // settings object   = used to override the default animation options stored inside of the shared aniOptObj

    };

    type IniSnoFun    = ( iniSnoFunPar : IniSnoFunPar ) => IniSnoFunRet; // initialize snowflake function        = check the provided paramters for valid keys, set the shared variables, make calls to creSnoFun() for each snowflake, push the returned object into the shared posSnoArr array, and start the animation by making a call to aniSnoFun() to loop over said array
    type IniSnoFunRet = void;                                            // initialize snowflake function return = nothing returned by this function
    type SetObj       = IniSetObj;                                       // settings object = initialize settings object that is declared inside for the useEffect() function block, where iniSnoFun() is called from

    // #endregion Type Declarations



    // #region Function Body

    const iniSnoFun : IniSnoFun = ( { conEle, setObj } ) => {

        // #region setObj Keys Loop

        // this loops through each key in the params settings object
        for ( const key in setObj ) {

            const setObjKey = key as keyof SetObj; // type narrowing



            // apply a custom type guard to ensure only valid keys are used to override the default animation options
            if ( hasKeyFun( aniOptObj, key ) === true ) {

                aniOptObj[ key ] = setObj[ setObjKey ]; // this overrides the default animation option with the provided setting value

            }

            // custom type guard check failed
            else {

                console.warn( `Snowfall Effect: Invalid setting key '${ key }' provided in setObj parameter.` ); // issue a console warning about invalid keys provided in the params settings object

            };

        };

        // #endregion setObj Keys Loop



        // #region Set Container Element and Dimensions

        conSecEle = conEle;                 // this sets the shared container section element variable equal to the containing element provided in the functions parameters
        conHeiNum = conSecEle.clientHeight; // this sets the shared container height number variable equal to the above containing element's height value
        conWidNum = conSecEle.offsetWidth;  // this sets the shared container width number variable equal to the above containing element's width value



        // this updates the containing element dimensions if the window is resized
        window.onresize = function() {

            conHeiNum = conSecEle.clientHeight; // this sets the shared container height number variable equal to the containing element's new height value
            conWidNum = conSecEle.offsetWidth;  // this sets the shared container width number variable equal to the containing element's new width value

        };

        // #endregion Set Container Element and Dimensions



        // #region Create Snowflake Loop

        // this creates the number of snowflake elements and their related functions based on the count number setting
        for ( let incNum : number = 0; incNum < aniOptObj.snoCouNum; incNum += 1 ) {

           ideCouNum = posSnoArr.length; // this sets the ideCouNum shared variable equal to the number of snowflake elements created so far from calling creSnoFun(), which will return a { posSnoFun : posSnoFun() } object for each snowflake which is then pushed into the posSnoArr array



           // create snowflake function parameters = parameters provided to the creSnoFun()
            const creSnoFunPar : CreSnoFunPar = {

                ideNum : ideCouNum,                                                                    // identifier number              = posSnoArr.length at this point in the loop
                sizNum : ranNumFun( { maxNum : aniOptObj.sizMaxNum, minNum : aniOptObj.sizMinNum, } ), // size number                    = size for snowflake generated randomly between aniOptObj.sizMaxNum and aniOptObj.sizMinNum
                speNum : ranNumFun( { maxNum : aniOptObj.speMaxNum, minNum : aniOptObj.speMinNum, } ), // speed number                   = speed for snowflake falling animation generated randomly between aniOptObj.speMaxNum and aniOptObj.speMinNum
                xpoNum : ranNumFun( { maxNum : conWidNum,           minNum : 0, } ),                   // x (horizontal) position number = starting x position (horizontal) for snowflake generated randomly between 0 and the container's width
                ypoNum : ranNumFun( { maxNum : conHeiNum,           minNum : 0, } ),                   // y (vertical) position number   = starting y position (vertical) for snowflake generated randomly between 0 and the container's height

            };

            posSnoArr.push( creSnoFun( creSnoFunPar ) ); // this creates a snowflake element, styles it, attaches it to the DOM, and pushes the creSnoFun()'s returned { posSnoFun : posSnoFun() } object into the shared posSnoArr array

        };

        // #endregion Create Snowflake Loop



        aniSnoFun(); // this will loop through each snowflake's { posSnoFun : posSnoFun() } stored in the shared posSnoArr array for execution, update the snowflake's position, then recursively call itself on a set interval which creates the snowfall animation effect

    };

    // #endregion Function Body

    // #endregion iniSnoFun



    // #region useGSAP

    /**
     ** This is a drop in replacement for useEffect() or useLayoutEffect() that
     ** automatically handles cleanup using gsap.context(). This hook solves a
     ** few React-specific friction points, because cleanup is important in React
     ** and gsap.context() makes it simple.
     **/

    // #region Function Body

    useGSAP(() => {

        // #region GSAP Animation Variables

        const gsaTimIns : GSAPTimeline       = gsap.timeline();                                                          // gsap timeline instance           = GSAP timeline instance with methods that custom GSAP animations will be attached to and then executed in sequence
        const squEleArr : HTMLElement[]      = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) ); // squares element array            = array of all elements with the class name 'pixelatedTransitionSquares', which are the square div elements that cover the screen and will be animated to create a pixelated transition effect

        const hacHe1Ele : HTMLElement | null = document.getElementById( 'hacHe1Ele' );                                   // hacked header 1 element          = the h1 element with the 'hacHe1Ele' id that will have two text animations applied to it, the first being a scramble text animation and the second being a gltiched text animation
        const hacSplIns : SplitText          = SplitText.create( '.hackedSplitText', { type : 'words, chars' } );        // hacked split text instance       = GSAP Split Text instance that splits elements with the class 'hackedSplitText' into words and characters which will then be animated individually in a staggered fashion
        const snoSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' );                                   // snowfall section element         = the section element with the 'snoSecEle' id that will be faded in after the hacked section animations are complete and whose text will have a split text fade in animation applied to it
        const snoSplIns : SplitText          = SplitText.create( '.snowfallSplitText', { type : 'words, chars' } );      // snowfall split text instance     = GSAP Split Text instance that splits all text elements inside of the snowfall section element (this includes the snowfall header 1 text, the snowfall paragraph text and the snowfall span text) into words and characters which will then be animated individually in a staggered fashion
        const shuSquFun : HTMLElement[]      = gsap.utils.shuffle( squEleArr );                                          // shuffled squares function        = GSAP generic function that will returned a shuffled array of the previously defined squEleArr array

        // #endregion GSAP Animation Variables



        // #region 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)

        // this will perform a shuffle animation of the square div elements in a staggered fashion to create a pixelated transition effect from the initial page load in order to reveal to the hacked message section
        gsaTimIns.to( shuSquFun, {

            opacity  : 0,       // target opacity that the animation will end at
            duration : 0.00333, // duration of each individual square fade out in seconds
            stagger  : {        // stagger object to define the staggered animation properties

                each : 0.00333,     // time gap between each square fade out animation in seconds
                from : 'random',    // stagger from a random point in the list
                grid : 'auto',      // automatically determine grid if necessary
                ease : 'power1.out' // built in GSAP ease out animation which are best for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction; start fast and end slower, like a rolling ball slowly coming to a stop

            }

        });

        // #endregion 1st GSAP Animation - 1st Pixelated Transition (Fade Out to Reveal Hacked Section)



        gsaTimIns.add( () => {}, '+=1' ); // 1st GSAP timeline 'pause', between the first pixelated transition animation (to reveal the hacked section) and the hacked message scramble text animation



        // #region 2nd GSAP Animation - Hacked Message Scramble Text

        // this will animate and place (into the hacked header 1 element) one character of the target text as a random character at a time until the full target text is revealed
        gsaTimIns.to( hacHe1Ele, {

            duration     : 3,                          // total duration of the entire scramble text animation
            scrambleText : `You've Just Been Hacked!!` // target text that the animation will end at

        });

        // #endregion 2nd GSAP Animation - Hacked Message Scramble Text



        // #region 3rd GSAP Animation - 1st Hacked Message Glitch Effect

        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } ); // this will distort the hacked section h1 element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } ); // this will undistort the hacked section h1 element back to normal using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } ); // this will quickly make the hacked section h1 element invisible, creating a flicker effect when used with the below opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } ); // this will quickly make the hacked section h1 element visible, creating a flicker effect when used with the above opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } ); // this will move the hacked section h1 element 20 pixels in the horizontal direction to the left, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } ); // this will undo the previous move of the hacked section h1 element back to its original position, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element back to its original vertical scale with a GSAP built in ease in out animation, in seconds

        // #endregion 3rd GSAP Animation - 1st Hacked Message Glitch Effect



        gsaTimIns.add( () => {}, '+=1' ); // 2nd GSAP timeline 'pause', between the first hacked message glitch effect animation and the just kidding split character text animation



        // #region 4th GSAP Animation - Just Kidding Message Split Character Text Animation

        // this will animate the characters of the just kidding paragraph element one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in
        gsaTimIns.from( hacSplIns.chars, {

            duration  : 3,   // total duration of the entire animation in seconds
            x         : 10,  // animate by 10px right to left
            autoAlpha : 0,   // fade in from opacity : 0 and visibility : hidden
            stagger   : 0.05 // time gap between each character animation in seconds

        });

        // #endregion 4th GSAP Animation - Just Kidding Message Split Character Text Animation



        // #region 5th GSAP Animation - 2nd Hacked Message Glitch Effect

        gsaTimIns.to( hacHe1Ele, { duration : 0.1,  skewX   : 70,  ease : 'Power4.easeInOut' } ); // this will distort the hacked section h1 element in the horizontal direction to the right using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, skewX   : 0,   ease : 'Power4.easeInOut' } ); // this will undistort the hacked section h1 element back to normal using a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 0                              } ); // this will quickly make the hacked section h1 element invisible, creating a flicker effect when used with the below opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, opacity : 1                              } ); // this will quickly make the hacked section h1 element visible, creating a flicker effect when used with the above opacity animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : -20                            } ); // this will move the hacked section h1 element 20 pixels in the horizontal direction to the left, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, x       : 0                              } ); // this will undo the previous move of the hacked section h1 element back to its original position, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.02, scaleY  : 1.1, ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element in the vertical direction by 1.1 times its original size with a GSAP built in ease in out animation, in seconds
        gsaTimIns.to( hacHe1Ele, { duration : 0.04, scaleY  : 1,   ease : 'Power4.easeInOut' } ); // this will scale the hacked section h1 element back to its original vertical scale with a GSAP built in ease in out animation, in seconds

        // #endregion 5th GSAP Animation - 2nd Hacked Message Glitch Effect



        gsaTimIns.add( () => {}, '+=1' ); // 3rd GSAP timeline 'pause', between the second hacked message glitch effect animation and the second pixelated transition animation (to cover the hacked section)



        // #region 6th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)

        // this will perform a shuffle animation of the square div elements in a staggered fashion to create a fade in pixelated transition effect to cover the hacked message section in order to then perform a pixelated fade out animation before revealing the snowfall section
        gsaTimIns.to( shuSquFun, {

            opacity  : 1,       // target opacity that the animation will end at
            duration : 0.00333, // duration of each individual square fade out in seconds
            stagger  : {        // stagger object to define the staggered animation properties

                each : 0.00333,     // time gap between each square fade out animation in seconds
                from : 'random',    // stagger from a random point in the list
                grid : 'auto',      // automatically determine grid if necessary
                ease : 'power1.out' // built in GSAP ease out animation which are best for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction; start fast and end slower, like a rolling ball slowly coming to a stop

            }

        });

        // #endregion 6th GSAP Animation - 2nd Pixelated Transition (Fade In to Cover Hacked Section)



        gsaTimIns.add( () => {}, '+=1' ); // 4th GSAP timeline 'pause', between the second pixelated transition (to cover the hacked section) and the snowfall section fade in +  the third pixelated transition (to reveal the snowfall section)



        // #region 7th GSAP Animation - Snowfall Section Fade In Animation

        // this will fade in the snowfall section element after the previous pixelated transition (to snowfall section) is complete; this is section is set to opacity 0 on page load so that it does not obscure the hacked section element
        gsaTimIns.to( snoSecEle, {

            opacity  : 1,    // target opacity that the animation will end at
            duration : 0.01, // total duration of the entire animation in seconds

        });

        // #endregion 7th GSAP Animation - Snowfall Section Fade In Animation



        // #region 8th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)

        // this will perform a shuffle animation of the square div elements in a staggered fashion to create a fade out pixelated transition effect from the previous pixelated fade in animation in order to reveal the snowfall section
       gsaTimIns.to( shuSquFun, {

            opacity  : 0,       // target opacity that the animation will end at
            duration : 0.00333, // duration of each individual square fade out in second
            stagger  : {        // stagger object to define the staggered animation properties

                each : 0.00333,     // time gap between each square fade out animation in seconds
                from : 'random',    // stagger from a random point in the list
                grid : 'auto',      // automatically determine grid if necessary
                ease : 'power1.out' // built in GSAP ease out animation which are best for UI transitions as they are fast to start which helps the UI feel responsive, and then they ease out towards the end giving a natural feeling of friction; start fast and end slower, like a rolling ball slowly coming to a stop

            }

        });

        // #endregion 8th GSAP Animation - 3rd Pixelated Transition (Fade Out to Reveal Snowfall Section)



        gsaTimIns.add( () => {}, '+=1' ); // 5th GSAP timeline 'pause', between the third pixelated transition (to reveal snowfall section) and the snowfall section text elements split text character animation



        // #region 9th GSAP Animation - Snowfall Text Split Character Text Animation

        // this will animate the characters of the snowfall section element (this includes the snowfall header 1 element, the snowfall paragraph element and the snowfall span element) one character at a time in a staggered fashion, moving a small amount in the right to left direction while also fading in
        gsaTimIns.from( snoSplIns.chars, {

            duration  : 3,   // total duration of the entire animation in seconds
            x         : 10,  // animate by 10px right to left
            autoAlpha : 0,   // fade in from opacity : 0 and visibility : hidden
            stagger   : 0.05 // time gap between each character animation in seconds

        });

        // #endregion 9th GSAP Animation - Snowfall Text Split Character Text Animation

    }, [] ); // empty dependency array ensures this effect runs only once when the component mounts

    // #endregion Function Body

    // #endregion useGSAP



    // #region useEffect

    /**
     ** The first part of this effect sets up the grid layout for the square
     ** div elements, which are used to create the pixelated transition effect.
     ** More specifically, it calculates the size of each square so that the
     ** squares fully cover (and with no overflow) the entire section areas. This
     ** includes both the hacked message section and the snowfall section, which
     ** are stacked on top of each other.
     **
     ** This will initiate the snowfall animation. It will first perform
     ** a check to make sure the provided settings object contains valid keys
     ** that match the shared aniOptObj's keys and then override the default
     ** animation options with the provided values. It will then grab the
     ** containing element and set the other shared variables according to its
     ** dimensions before creating the number of snowflakes specified in
     ** the settings object's snoCouNum by making calls to creSnoFun() for
     ** each snowflake. After which it will push the returned object from each
     ** creSnoFun() call containing the posSnoFun() into the shared posSnoArr
     ** array. LasgsaTimInsy it will call aniSnoFun(), which will loop over said array
     ** and call each of those functions on a set interval thus creating the
     ** animation effect.
     **
     ** The empty dependency array ([]) ensures this effect runs only once when the
     ** component mounts.
     ** 
     ** @param   = No params
     ** @returns = No return
     **
     **/

    // #region Type Declarations

    // initialize settings object = snowfall animation settings object provided to iniSnoFun() and used to override the default animation settings stored inside of the shared aniOptObj
    type IniSetObj = {

        sizMaxNum : number; // size maximum number    = snowflake maximum size
        sizMinNum : number; // size minimum number    = snowflake minimum size
        snoColStr : string; // snowflake color string = snowflake color
        snoCouNum : number; // snowflake count number = number of snowflakes
        speMaxNum : number; // speed maximum number   = snowflake maximum falling speed
        speMinNum : number; // speed minimum number   = snowflake minimum falling speed

    };

    // #endregion Type Declarations



    // #region Function Body

    useEffect( () => {

        // #region Square Div Elements Size Calculations

        const squSecEle : HTMLElement | null = document.getElementById( 'squSecEle' );                                   // squares section element = the containing HTML Seciton element to which contains all of the square div elements used for the pixelated transition effect
        const squDivArr : HTMLElement[]      = Array.from( document.querySelectorAll( '.pixelatedTransitionSquares' ) ); // squares div element array = an array of all square div elements inside of the above squares section element
        const sdaLenNum : number             = squDivArr.length;                                                         // squares div array length number = the length of the above squares div element array, which will be used to calculate the size of each square div element so that they fully cover the squares section element with no gaps and no overflow



        // type narrowing check for squSecEle not being null && the squDivArr having elements inside of it
        if ( squSecEle !== null && sdaLenNum !== 0 ) {

            const sseWidNum : number = squSecEle.clientWidth;                            // squares section element width number = the width of the above squares section element
            const sseHeiNum : number = squSecEle.clientHeight;                           // squares section element height number = the height of the above squares section element
            const totAreNum : number = sseWidNum * sseHeiNum;                            // total area number = the total area of the squares section element; simple geometry formula: area = width * height
            const squSizNum : number = Math.floor( Math.sqrt( totAreNum / sdaLenNum ) ); // square size number = the size that should be applied to each square element in order to fully cover the squares section element with no gaps and no overflow; some algebraic manipulation is used: side^2 * number of squares = total area, or to simply nx^2 = a and solve for x which resolves to x^2 = a / n then x = the square root of a / n where x is the size of the squares, a is the total area of the containing element and n = the squDivArr array length number; this number is then floored to ensure it is a whole number value and the grid will then slightly upsize via a minmax so that it fully covers the containing element (if Math.ceil() were used it would cause an overflow because of the minimum size which is fixed, whereas the maximum size is flexible)
            const sseColNum : number = Math.floor( sseWidNum / squSizNum );              // squares section element column number = the number of columns of square elements that can fit in the squares section element; a simple calculation of the containing element's width divided by the previously calculated square size which is floored to ensure it is a whole number value
            const sseRowNum : number = Math.floor( sseHeiNum / squSizNum );              // squares section element row number = the number of rows of square elements that can fit in the squares section element; a simple calculation of the containing element's height divided by the previously calculated square size which is floored to ensure it is a whole number value



            squSecEle.style.gridTemplateColumns = `repeat(${ sseColNum }, minmax(${ squSizNum }px, 1fr))`; // set the squares section element's CSS grid template columns property to create the calculated number of columns with each column having a minimum size of the previously calculated square size in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the containing element
            squSecEle.style.gridTemplateRows    = `repeat(${ sseRowNum }, minmax(${ squSizNum }px, 1fr))`; // set the squares section element's CSS grid template rows property to create the calculated number of rows with each row having a minimum size of the previously calculated square size in pixels and a maximum size of 1 fraction unit so that it will slightly upsize to fully cover the containing element

        }

        else {

            console.warn( `Error: Either the squares section element is null (${ squSecEle === null ? 'TRUE' : 'FALSE' }) or the squares div element array is empty (${ sdaLenNum === 0 ? 'TRUE' : 'FALSE' }).` ); // issue a console warning about the squares section element being null or the squares div element array being empty

        };

        // #endregion Square Div Elements Size Calculations



        // #region Snowflake Animation Section

        // #region Function Variables

        const iniSetObj : IniSetObj = {

            sizMaxNum : 8,
            sizMinNum : 1,
            snoColStr : '#FFFFFF',
            snoCouNum : 120,
            speMaxNum : 2,
            speMinNum : 1,

        };

        const conSecEle : HTMLElement | null = document.getElementById( 'snoSecEle' ); // containing section element = the containing HTML Seciton element to which all snowflake elements will be attached and whose dimensions will be used to update and contain each snowflake element's position

        // #endregion Function Variables



        // #region conSecEle Null Checks and iniSnoFun() Calls

        // type narrowing check for conSecEle
        if ( conSecEle !== null ) {

            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333); // initialize the snowflake animation according to the provided parameters, after a delay of 333ms

        }

        // type narrowing check for conSecEle failed
        else {

            const conSecEle = document.createElement( 'section' ); // containing section element = conSecEle did not exist, so create a new containing HTML Section element

            conSecEle.id = 'snoSecEle'; // give the newly created containing section element an id of snoSecEle (snowfall section element)

            document.body.appendChild( conSecEle ); // append the newly created containing section element to the DOM



            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333); // initialize the snowflake animation according to the provided parameters, after a delay of 333ms

        };

        // #endregion conSecEle Null Checks and iniSnoFun() Calls

        // #endregion Snowflake Animation Section

    }, [] );

    // #endregion Function Body

    // #endregion useEffect



    // #region Return Statement

    return (

        < section id='comSecEle' className={ styles.componentSection } >

            { /* Start Squares Section Element (Pixelated Transition Effect) */}

            < section id='squSecEle' className={ styles.squaresSection } >

                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
                < div className={ `${ styles.squares } pixelatedTransitionSquares `} ></ div >
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

            { /* End Squares Section Element (Pixelated Transition Effect) */}



            { /* Start Hacked Section Element */}

            < section id='hacSecEle' className={ styles.hackedSection } >

                < h1  id='hacHe1Ele' className={ styles.hackedHeader1 }></ h1 >

                < p   id='hacParEle' className={ ` ${ styles.hackedParagraph } hackedSplitText ` } >Just kidding! But it just goes to show you that you should never trust a QR code! Christmas present incoming...</ p >

            </ section >

            { /* End Hacked Section Element */}



            { /* Start Snowfall Section Element */}

            < section id='snoSecEle' className={ `${ styles.snowfallSection } snowfallSplitText` } >

                < h1  id='snoHe1Ele' className={ styles.snowfallHeader1 }>Merry Christmas, { namParStr }!</ h1 >

                < img id='snoImgEle' className={ styles.snowfallImage } src={ snowman } />

                < p   id='snoParEle' className={ styles.snowfallParagraph } >< span id='snoSpaEle' className={ styles.snowfallSpan } >From,</ span > Mr. Awesome</ p >

            </ section >

            { /* End Snowfall Section Element */}

        </ section >

    );

    // #endregion Return Statement

}

export default ChristmasCard;


