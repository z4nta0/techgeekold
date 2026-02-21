
// #region Imports

import React  from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles from './AboPagCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */

// #endregion Imports



// #region Props Type Definitions

/**
 * About Page Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type AboPagComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region AboPagCom

/**
 * AboPagCom = About Page Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the About page. There is no complex logic or functionality for this page.
 * This was all done for personal learning purposes to gain some experience
 * with using React and TypeScript in a more hands on way (instead of just
 * tutorials) before moving on to my next project that will use these concepts
 * in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the AboPagCom component.
 * @see {@link aboPagComJsx}
 * 
 * @example
 * ```tsx
 * <AboPagCom /> // => aboPagComJsx
 * ```
 *
*/

function AboPagCom ( props : AboPagComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement

    /** About Page Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const aboPagComJsx : React.ReactElement = (


        // #region About Section Element

        <  section id='aboSecEle' className={ styles.aboutSection } > { /* About Section Element = This custom section element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            < h1 id='aboHe1Ele' className={ styles.aboutH1 } >{ appNamStr } About Page</ h1 > { /* About H1 Element = This custom h1 element is the container for the title text of the page. */ }



            { /** Start About Paragraph Element */ }

            < p  id='aboParEle' className={ styles.aboutParagraph } > { /* About Paragraph Element = This custom paragraph element is the container for the text explaining the purpose and background of this site/app. */ }

                This is the { appNamStr }'s About page. This is more of a test site/app project more than an actual, useful site/app. I followed along with some Codecademy tutorials about React, React Router, Redux and Typescript to create the skeleton. Then after finishing said tutorials I went through and customized all of the resulting code in order to get a feel for how I wanted to handle all of the various parts (structure, commenting, formatting, variable names, CSS styling, etc...) before moving on to the real, production ready site/app that I will be building next.

            </ p >

            { /** End About Paragraph Element */ }


        </ section >

        // #endregion About Section Element


    );



    return aboPagComJsx;

    // #endregion Return Statement


};

// #endregion AboPagCom



export default AboPagCom;


