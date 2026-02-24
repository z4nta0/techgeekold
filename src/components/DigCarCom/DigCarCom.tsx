
// #region Imports

import React  from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles from './DigCarCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { Link } from 'react-router-dom'; /** This import is the standard React Router element for navigation links without all of the extras from the standard react Router NavLink element. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Digital Cards Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type DigCarComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region DigCarCom

/**
 * DigCarCom = Digital Cards Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the Digital Cards component. There is no complex logic or functionality
 * for this component, it will simply contain a list of links to all digital
 * cards. This was all done for personal learning purposes to gain some
 * experience with using React and TypeScript in a more hands on way (instead
 * of just tutorials) before moving on to my next project that will use these
 * concepts in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the DigCarCom component.
 * @see {@link digCarComJsx}
 * 
 * @example
 * ```tsx
 * <DigCarCom /> // => digCarComJsx
 * ```
 *
*/

function DigCarCom ( props : DigCarComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement

    /** Digital Cards Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const digCarComJsx : React.ReactElement = (


        // #region Digital Cards Section Element

        <  section id='dicSecEle' className={ styles.digitalCardsSection } > { /* Digital Cards Section Element = This custom section element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            <  header id='dicHeaEle' className={ styles.digitalCardsHeader } > { /* Digital Cards Header Element = This custom header element is a semantic container and will define the root grid for this component. */ }


                < h1 id='dicHe1Ele' className={ styles.digitalCardsH1 } >{ appNamStr } Digital Cards</ h1 > { /* Digital Cards H1 Element = This custom h1 element is the container for the title text of the page. */ }



                <  p id='dicParEle' className={ styles.digitalCardsParagraph } > { /* Digital Cards Paragraph Element = This custom paragraph element is the container for the paragraph text of the page. */ }

                    This is a list of all of the { appNamStr }'s digital cards. Click on any of the links below to view the corresponding digital card.

                </ p >



                { /** Start Digital Cards Unordered List Element */ }

                < ul id='dicUliEle' className={ styles.digitalCardsUl } > { /* Digital Cards Unordered List Element = This custom ul element is the container for the custom li and anchor elements for all of the digital cards. */ }


                    < li id='chrLisEle' className={ `${ styles.navbarListItems } ${ styles.christmasCardLi }` } >< Link to='ChristmasCard' id='chcNalEle' className={ `${ styles.navbarNavLinks } ${ styles.christmasCardNavLink }` } >Christmas Card</ Link ></ li > { /* Christmas Card List Element & Christmas Card Link Element = These custom li and standard React Router Link elements are the containers for the Christmas Card page link. */ }


                </ ul >

                { /** End Digital Cards Unordered List Element */ }


            </ header >


        </ section >

        // #endregion Digital Cards Section Element


    );



    return digCarComJsx;

    // #endregion Return Statement


};

// #endregion DigCarCom



export default DigCarCom;


