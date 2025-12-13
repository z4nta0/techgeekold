// #region Imports

import { hasKeyFun } from '../../utilities/hasKeyFun.tsx';
import { ranNumFun } from '../../utilities/ranNumFun.tsx';
import   snowman     from '../../assets/snowman.png';
import   styles      from './ChristmasCard.module.css';
import { useEffect } from 'react';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
    
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP,ScrambleTextPlugin,SplitText,TextPlugin,RoughEase,ExpoScaleEase,SlowMo);

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
     ** array. Lastly it will call aniSnoFun(), which will loop over said array
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



    // #region useEffect

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
     ** animation effect. The empty dependency array ([]) ensures this effect
     ** runs only once when the component mounts.
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

        // #region GSAP Text Animation

        const split = SplitText.create( '.split', { type: 'words, chars' } ); // split elements with the class 'split' into words and characters

        // animate the characters in a staggered fashion
        gsap.from( split.chars, {

            duration  : 3,   // animation duration in seconds
            x         : 10,  // animate from 10px to the left
            autoAlpha : 0,   // fade in from opacity : 0 and visibility : hidden
            stagger   : 0.05 // 0.05 seconds between each character

        });

        // #endregion GSAP Text Animation

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

        const conSecEle : HTMLElement | null = document.getElementById( 'conSecEle' ); // containing section element = the containing HTML Seciton element to which all snowflake elements will be attached and whose dimensions will be used to update and contain each snowflake element's position

        // #endregion Function Variables



        // #region conSecEle Null Checks and iniSnoFun() Calls

        // type narrowing check for conSecEle
        if ( conSecEle !== null ) {

            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333); // initialize the snowflake animation according to the provided parameters, after a delay of 333ms

        }

        // type narrowing check for conSecEle failed
        else {

            const conSecEle = document.createElement( 'section' ); // containing section element = conSecEle did not exist, so create a new containing HTML Section element

            conSecEle.id = 'conSecEle'; // give the newly created containing section element an id of conSecEle (containing section element)

            document.body.appendChild( conSecEle ); // append the newly created containing section element to the DOM



            setTimeout( () => { iniSnoFun( { conEle : conSecEle, setObj : iniSetObj, } ) }, 333); // initialize the snowflake animation according to the provided parameters, after a delay of 333ms

        };

        // #endregion conSecEle Null Checks and iniSnoFun() Calls

        // #endregion Snowflake Animation Section

    }, []);

    // #endregion Function Body

    // #endregion useEffect



    // #region Return Statement

    return (

        // #region Section Element

        < section id='conSecEle' className={ `${ styles.container } split` } >

            < h1  id='conHe1Ele' className={ styles.header1 }>Merry Christmas, Mom!</ h1 >

            < img id='conImgEle' className={ styles.snowmanImg } src={ snowman } />

            < p   id='conParEle' className={ styles.paragraph } >< span id='conSpaEle' className={ styles.span } >From,</ span > Mr. Awesome</ p >

        </ section >

        // #endregion Section Element

    );

    // #endregion Return Statement

}

export default ChristmasCard;


