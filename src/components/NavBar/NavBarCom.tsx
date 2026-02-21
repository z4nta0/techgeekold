
// #region Imports

import React     from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import reactLogo from '../../assets/react.svg'; /** This import is the React logo image that has been repurposed in the this component to display the official React logo in the navigation bar. */
import styles    from './NavBarCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { Link    } from 'react-router-dom'; /** This import is the standard React Router element for navigation links that adds an .active CSS styling class as well as aria atributes when the link matches the current URL. */
import { NavLink } from 'react-router-dom'; /** This import is the standard React Router element for navigation links without all of the extras from the standard react Router NavLink element. */

// #endregion Imports



// #region Props Type Definitions

/** On Click Function = This custom type stores the types that will be used for the custom {@link onClickAbo}, {@link onClickCon}, {@link onClickHom} and {@link onClickLog} variables. */
type OnClickFun       = ( e : React.MouseEvent< HTMLAnchorElement > ) => void; 



/**
 * Navigation Bar Component Props = This custom type stores the types that will store the properties and values that will be passed into this component.
 * 
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
 * @property onClickAbo = On Click About custom property stores the type that will be used for the custom {@link onClickAbo} variable.
 * @property onClickCon = On Click Contact custom property stores the type that will be used for the custom {@link onClickCon} variable.
 * @property onClickHom = On Click Home custom property stores the type that will be used for the custom {@link onClickHom} variable.
 * @property onClickLog = On Click Logo custom property stores the type that will be used for the custom {@link onClickLog} variable.
 *
*/

interface NavBarComPro {

    namStr : string;

    onClickAbo : OnClickFun;
    onClickCon : OnClickFun;
    onClickHom : OnClickFun;
    onClickLog : OnClickFun;

};

// #endregion Props Type Definitions



// #region NavBarCom

/**
 * NavBarCom = Navigation Bar Component
 *
 * @summary
 * This custom functional component executes and renders the JSX of the
 * navigation bar. Most of the logic for this component is defined in the
 * NavBarComCon component and then passed as props into this component as on
 * click handlers. This is then the presentational component and it is
 * responsible for returning all of the HTML content for the navigation bar
 * back to the NavBarComCon component. All of the click event handlers and
 * state management logic is completely unnecessary for a simple navigation
 * bar, but this was just for personal learning purposes to gain some
 * experience with using React Redux Toolkit alongside React and TypeScript in
 * a more hands on way (instead of just tutorials) before moving on to my next
 * project that will use these concepts in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr     - {@link appNamStr}
 * @param props.onClickAbo - {@link onClickAbo}
 * @param props.onClickCon - {@link onClickCon}
 * @param props.onClickHom - {@link onClickHom}
 * @param props.onClickLog - {@link onClickLog}
 * 
 * @returns A React JSX element representing the NavBarCom component.
 * @see {@link navBarComJsx}
 * 
 * @example
 * ```tsx
 * <NavBarCom /> // => navBarComJsx
 * ```
 *
*/

function NavBarCom ( props : NavBarComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String           = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string      = props.namStr;
    /** On Click About            = On Click About stores the type of the custom event handler function that will be executed when the About page link is clicked. */
    const onClickAbo : OnClickFun = props.onClickAbo;
    /** On Click Contact          = On Click Contact stores the type of the custom event handler function that will be executed when the Contact page link is clicked. */
    const onClickCon : OnClickFun = props.onClickCon;
    /** On Click Home             = On Click Home stores the type of the custom event handler function that will be executed when the Home page link is clicked. */
    const onClickHom : OnClickFun = props.onClickHom;
    /** On Click Logo             = On Click Logo stores the type of the custom event handler function that will be executed when the logo Home page link is clicked. */
    const onClickLog : OnClickFun = props.onClickLog;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement

    /** Navigation Bar Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const navBarComJsx : React.ReactElement     = (


        // #region Navbar Nav Element

        < nav id='navNavEle' className={ styles.navbarNav } > { /* Navbar Nav Element = This custom nav element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            { /** Start Navbar Div Element */ }

            < div id='navDivEle' className={ styles.navbarDiv } > { /* Navbar Div Element = This custom div element is the container for the logo Home page NavLink and for the ul that contains all of the other navbar NavLinks. */ }


                { /** Start Logo Link Element */ }

                < Link to='/' id='logLinEle' className={ styles.logoLink } onClick={ onClickLog } > { /* Logo Link Element = This standard React Router element is the container for the logo image and text. */ }


                    < img id='logImgEle_NavBarCom' className={ styles.logoImg } src={ reactLogo } alt='React logo' /> { /* Logo Image Element for Navigation Bar Component = This custom img element is the container for the official React logo image that acts as a link to the Home page. The id property uses a modifier in order to distinguish it from any other logo image elements that may be placed across the site/app, such as the one on the Home page. */ }



                    < p   id='logParEle'           className={ styles.logoParagraph } >{ appNamStr }</ p > { /* Logo Paragraph Element = This custom paragraph element is the container for the text of the site/app name that acts as a link to the Home page. */ }


                </ Link >

                { /** End Logo Link Element */ }



                { /** Start Navbar Unordered List Element */ }

                < ul id='navUliEle' className={ styles.navbarUl } > { /* Navbar Unordered List Element = This custom ul element is the container for the li and anchors of the Home, About and Contact pages. */ }


                    < li id='homLisEle' className={ `${ styles.navbarListItems } ${ styles.homeLi    }` } >< NavLink to='/'       id='homNalEle' className={ `${ styles.navbarNavLinks } ${ styles.homeNavLink    }` } onClick={ onClickHom } >Home</    NavLink ></ li > { /* Home List Element    & Home NavLink Element    = These custom li and standard React Router NavLink elements are the containers for the Home page link. These links will automatically have an .active class (properties and their values are defined in the main App.css file) applied to them by React Router when the current route matches the 'to' attribute. */ }
                    < li id='aboLisEle' className={ `${ styles.navbarListItems } ${ styles.aboutLi   }` } >< NavLink to='about'   id='aboNalEle' className={ `${ styles.navbarNavLinks } ${ styles.aboutNavLink   }` } onClick={ onClickAbo } >About</   NavLink ></ li > { /* About List Element   & About NavLink Element   = These custom li and standard React Router NavLink elements are the containers for the About page link. These links will automatically have an .active class (properties and their values are defined in the main App.css file) applied to them by React Router when the current route matches the 'to' attribute. */ }
                    < li id='conLisEle' className={ `${ styles.navbarListItems } ${ styles.contactLi }` } >< NavLink to='contact' id='conNalEle' className={ `${ styles.navbarNavLinks } ${ styles.contactNavLink }` } onClick={ onClickCon } >Contact</ NavLink ></ li > { /* Contact List Element & Contact NavLink Element = These custom li and standard React Router NavLink elements are the containers for the Contact page link. These links will automatically have an .active class (properties and their values are defined in the main App.css file) applied to them by React Router when the current route matches the 'to' attribute. */ }


                </ ul >

                { /** End Navbar Unordered List Element */ }


            </ div >

            { /** End Navbar Div Element */ }


        </ nav >

        // #endregion Navbat Nav Element


    );



    return navBarComJsx;

    // #endregion Return Statement


};

// #endregion NavBarCom



export default NavBarCom;


