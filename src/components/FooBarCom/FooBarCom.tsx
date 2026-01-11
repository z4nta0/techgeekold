
// #region Imports

import   React        from 'react';                  /** React is the core library for building user interfaces. */
import   styles       from './FooBarCom.module.css'; /** This imports the custom CSS module for styling the NavBarCom component. */

// #endregion Imports



// #region Props Type Definitions

/**
 * NavBarComPro = Navigation Bar Component Props will store all of the props that will be used in the NavBarComC component.
 *
 * @property namStr = Name String will store the site/app name that will be displayed in the navigation bar.
 *
 * @property onClickAbo = On Click About will store the event handler function that is called when the About page link is clicked. 
 * @property onClickCon = On Click Contact will store the event handler function that is called when the Contact page link is clicked.
 * @property onClickHom = On Click Home will store the event handler function that is called when the Home page link is clicked.
 * @property onClickLog = On Click Logo will store the event handler function that is called when the logo Home page link is clicked.
 */

type FooBarComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



/**
 * NavBarCom = Navigation Bar Component
 *
 * @summary
 * This functional component will be responsible for returning all of the HTML
 * content for the navigation bar. All of the click event handlers and state
 * management stuff is completely unnecessary for a simple navigation bar, but
 * this was just for personal learning purposes to gain some experience with
 * using Redux Toolkit alongside React and TypeScript in a more hands on way
 * (instead of just tutorials) before moving on to my next project that will
 * use these concepts in a more practical, realistic way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link FooBarComPro.namStr}
 * 
 * @returns A React JSX element representing the NavBarCom component.
 * @see {@link fooBarComJsx}
 * 
 * @example
 * ```tsx
 * <NavBarCom /> // => <section id='navSecEle'> ... </section>
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


    /** Navigation Bar Component Javascript XML = This stores the HTML-like code that the Navigation Bar component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const fooBarComJsx                          = (


        // #region Footer Section Element

        < section id='fooSecEle' className={ styles.footerSection } > { /* Footer Section Element = This is the component wrapping HTML element since React requires components to return a single root element. */ }

           < p    id='fooParEle' className={ styles.footerParagraph } >{ namStr } © z4nta0 2025</ p >

        </ section >

        // #endregion Footer Section Element


    );


    return fooBarComJsx;


    // #endregion Return Statement

};



export default FooBarCom;

