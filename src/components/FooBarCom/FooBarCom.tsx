
// #region Imports

import React  from 'react';                  /** This import is the React core library for building user interfaces. */
import styles from './FooBarCom.module.css'; /** This import is the custom CSS module for styling the FooBarCom component. */

// #endregion Imports



// #region Props Type Definitions

/**
 * FooBarComPro = Footer Bar Component Props will store all of the props that will be used in the FooBarCom component.
 *
 * @property namStr = Name String will store the site/app name that will be displayed in various parts of the site/app.
 *
*/

type FooBarComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



/**
 * FooBarCom = Footer Bar Component
 *
 * @summary
 * This functional component will be responsible for returning all of the HTML
 * content for the footer bar. This was just for personal learning purposes to
 * gain some experience with using React and TypeScript in a more hands on way
 * (instead of just tutorials) before moving on to my next project that will
 * use these concepts in a more practical, realistic way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link FooBarComPro.namStr}
 * 
 * @returns A React JSX element representing the FooBarCom component.
 * @see {@link fooBarComJsx}
 * 
 * @example
 * ```tsx
 * <FooBarCom /> // => <section id='fooSecEle'> ... </section>
 * ```
 *
*/

function FooBarCom ( props : FooBarComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** Name String  = {@link FooBarComPro.namStr} */
    const { namStr } = props;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement


    /** Footer Bar Component Javascript XML = This stores the HTML-like code that the Footer Bar component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const fooBarComJsx : React.ReactElement = (


        // #region Footer Section Element

        <  section id='fooSecEle' className={ styles.footerSection } > { /* Footer Section Element = This is the component wrapping HTML section element since React requires components to return a single root element. */ }


           < p id='fooParEle' className={ styles.footerParagraph } >{ namStr } © z4nta0 2026</ p > { /** Footer Paragraph Element = This is the paragraph element that displays the site/app name and copyright information. */ }


        </ section >

        // #endregion Footer Section Element


    );


    return fooBarComJsx;


    // #endregion Return Statement


};



export default FooBarCom;


