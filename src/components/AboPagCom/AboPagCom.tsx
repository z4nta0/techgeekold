
// #region Imports

import   React  from 'react';                  /** React is the core library for building user interfaces. */
import   styles from './AboPagCom.module.css'; /** This imports the custom CSS module for styling the AboPagCom component. */

// #endregion Imports



// #region Props Type Definitions

/**
 * AboPagComPro = About Page Component Props will store all of the props that will be used in the AboPagCom component.
 *
 * @property namStr = Name String will store the site/app name that will be displayed in various parts of the site/app.
 *
 */

type AboPagComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



/**
 * NavBarCom = Navigation Bar Component
 *
 * @summary
 * This functional component will be responsible for returning all of the HTML
 * content for the About page. This was just for personal learning purposes to
 * gain some experience with using React and TypeScript in a more hands on way
 * (instead of just tutorials) before moving on to my next project that will
 * use these concepts in a more practical, realistic way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link AboPagComPro.namStr}
 * 
 * @returns A React JSX element representing the AboPagCom component.
 * @see {@link aboPagComJsx}
 * 
 * @example
 * ```tsx
 * <AboPagCom /> // => <section id='comSecEle'> ... </section>
 * ```
 *
*/

function AboPagCom ( props : AboPagComPro ) : React.ReactElement {



    // #region Component Scoped Variables


    // #region Props Variables

    /** Name String  = {@link AboPagComPro.namStr} */
    const { namStr } = props;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement


    /** About Page Component Javascript XML = This stores the HTML-like code that the About Page component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const aboPagComJsx                      = (


        // #region Component Section Element

        <  section id='comSecEle' className={ styles.componentSection } > { /* Component Section Element = This is the component wrapping HTML element since React requires components to return a single root element. */ }


            < h1 id='comHe1Ele' className={ styles.componentH1 } >{ namStr } About Page</ h1 > { /* Component H1 Element = This is the main heading for the component. */ }


            { /** Start Component Paragraph Element */ }

            < p  id='comParEle' className={ styles.componentParagraph } > { /* Component Paragraph Element = This is the paragraph element that contains the main content for the component. */ }

                This is the { namStr }'s About page. This is more of a test site/app project more than an actual, useful site/app. I followed along with some Codecademy tutorials about React, React Router, Redux and Typescript to create the skeleton. Then after finishing said tutorials I went through and customized all of the resulting code in order to get a feel for how I wanted to handle all of the various parts (structure, commenting, formatting, variable names, CSS styling, etc...) before moving on to the real, production ready site/app that I will be building next.

            </ p >

            { /** End Component Paragraph Element */ }


        </ section >

        // #endregion Component Section Element


    );


    return aboPagComJsx;


    // #endregion Return Statement

};



export default AboPagCom;


