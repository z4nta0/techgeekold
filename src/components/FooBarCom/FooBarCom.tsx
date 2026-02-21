
// #region Imports

import React  from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles from './FooBarCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Footer Bar Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type FooBarComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region FooBarCom

/**
 * FooBarCom = Footer Bar Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the footer. This was just for personal learning purposes to gain some
 * experience with using React and TypeScript in a more hands on way (instead
 * of just tutorials) before moving on to my next project that will use these
 * concepts in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the FooBarCom component.
 * @see {@link fooBarComJsx}
 * 
 * @example
 * ```tsx
 * <FooBarCom /> // => fooBarComJsx
 * ```
 *
*/

function FooBarCom ( props : FooBarComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement

    /** Footer Bar Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const fooBarComJsx : React.ReactElement = (


        // #region Footer Div Element

        <  div id='fooDivEle' className={ styles.footerDiv } > { /* Footer Div Element = This custom div element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


           < p id='fooParEle' className={ styles.footerParagraph } >{ appNamStr } © z4nta0 2026</ p > { /** Footer Paragraph Element = This custom paragraph element is the container for the text of the site/app name and copyright information. */ }


        </ div >

        // #endregion Footer Div Element


    );



    return fooBarComJsx;

    // #endregion Return Statement


};

// #endregion FooBarCom



export default FooBarCom;


