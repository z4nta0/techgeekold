
// #region Imports

import { NavLink }    from 'react-router-dom';       /** NavLink is used for navigation links that can apply an active class when the link matches the current URL. */
import   React        from 'react';                  /** React is the core library for building user interfaces. */
import   reactLogo    from '../../assets/react.svg'; /** This is the React logo from the default installation that I have reused as the navigation bar's logo Home page link. */
import   styles       from './NavBarCom.module.css'; /** This imports the custom CSS module for styling the NavBarCom component. */

// #endregion Imports



// #region Props Type Definitions

/**
 * NavBarComPro = Navigation Bar Component Props will store all of the props that will be used in the NavBarCom component.
 *
 * @property namStr = Name String will store the site/app name that will be displayed in the navigation bar.
 *
 * @property onClickAbo = On Click About will store the event handler function that is called when the About page link is clicked. 
 * @property onClickCon = On Click Contact will store the event handler function that is called when the Contact page link is clicked.
 * @property onClickHom = On Click Home will store the event handler function that is called when the Home page link is clicked.
 * @property onClickLog = On Click Logo will store the event handler function that is called when the logo Home page link is clicked.
*/

interface NavBarComPro {

    namStr : string;

    onClickAbo : ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
    onClickCon : ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
    onClickHom : ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
    onClickLog : ( e : React.MouseEvent<HTMLAnchorElement> ) => void;

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
 * @param props.namStr     - {@link NavBarComConPro.namStr}
 * @param props.onClickAbo - {@link NavBarComConPro.onClickAbo}
 * @param props.onClickCon - {@link NavBarComConPro.onClickCon}
 * @param props.onClickHom - {@link NavBarComConPro.onClickHom}
 * @param props.onClickLog - {@link NavBarComConPro.onClickLog}
 * 
 * @returns A React JSX element representing the NavBarCom component.
 * @see {@link navBarComJsx}
 * 
 * @example
 * ```tsx
 * <NavBarCom /> // => <section id='navSecEle'> ... </section>
 * ```
 *
*/

function NavBarCom ( props : NavBarComPro ) : React.ReactElement {



    // #region Component Scoped Variables


    // #region Props Variables

    /** Name String  = {@link NavBarComPro.namStr} */
    const { namStr } = props;

    /** On Click About   = {@link NavBarComPro.onClickAbo} */
    const { onClickAbo } = props;
    /** On Click Contact = {@link NavBarComPro.onClickCon} */
    const { onClickCon } = props;
    /** On Click Home    = {@link NavBarComPro.onClickHom} */
    const { onClickHom } = props;
    /** On Click Logo    = {@link NavBarComPro.onClickLog} */
    const { onClickLog } = props;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement


    /** Navigation Bar Component Javascript XML = This stores the HTML-like code that the Navigation Bar component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const navBarComJsx : React.ReactElement     = (


        // #region Navigation Section Element

        < section id='navSecEle' className={ styles.navSection } > { /* Navigation Section Element = This is the component wrapping HTML element since React requires components to return a single root element. */ }



            { /** Start Navigation Nav Element */ }

            < nav id='navNavEle' className={ styles.nav } > { /* Navigation Nav Element = This is the nav HTML element within the navigation section that contains all React Router <NavLink> components for navigation. */ }


                { /** Start Logo Navigation Element */ }

                < NavLink to='/' id='logNavEle' className={ `${ styles.logoNavLink } ${ styles.navLink}` } onClick={ onClickLog } > { /* Logo NavLink Element = This is the React Router <NavLink> HTML element for the logo home page link. */ }

                    < img id='logImgEle_NavBarEle' className={ styles.logoImg } src={ reactLogo } alt='React logo' /> { /* Logo Image Element for Navigation Bar Element = This is the site/app logo image HTML element for the logo home page link. The id property uses a modifier in order to distinguish it from any other logo image elements that may be placed across the site/app. */ }

                    < p   id='logParEle'           className={ styles.logoParagraph } >{ namStr }</ p > { /* Logo Paragraph Element = This is the paragraph HTML element that contains the text for the logo home page link. It uses the nameStr prop as the text, which stores the site/app's name. */ }

                </ NavLink >

                { /** End Logo Navigation Element */ }



                { /** Start Navigation Unordered List Element */ }

                < ul id='navUliEle' className={ styles.unorderedList } > { /* Navigation Unordered List Element = This is the unordered list HTML element within the nav HTML element that contains the Home, About and Contact React Router <NavLink> components for navigation. */ }

                    < li id='homLisEle' className={ styles.listItem } >< NavLink to='/'       id='homNavEle' className={ styles.navLink } onClick={ onClickHom } >Home</    NavLink ></ li > { /* Home List Element    & Home NavLink Element    = This is the list HTML element and the React Router <NavLink> HTML element for the home page link.    These links will automatically have an .active class (properties and their values are defined in the main App.css file) applied to them by React Router when the current route matches the 'to' attribute. */ }
                    < li id='aboLisEle' className={ styles.listItem } >< NavLink to='about'   id='aboNavEle' className={ styles.navLink } onClick={ onClickAbo } >About</   NavLink ></ li > { /* About List Element   & About NavLink Element   = This is the list HTML element and the React Router <NavLink> HTML element for the about page link.   These links will automatically have an .active class (properties and their values are defined in the main App.css file) applied to them by React Router when the current route matches the 'to' attribute. */ }
                    < li id='conLisEle' className={ styles.listItem } >< NavLink to='contact' id='conNavEle' className={ styles.navLink } onClick={ onClickCon } >Contact</ NavLink ></ li > { /* Contact List Element & Contact NavLink Element = This is the list HTML element and the React Router <NavLink> HTML element for the contact page link. These links will automatically have an .active class (properties and their values are defined in the main App.css file) applied to them by React Router when the current route matches the 'to' attribute. */ }

                </ ul >

                { /** End Navigation Unordered List Element */ }


            </ nav >

            { /** End Navigation Nav Element */ }



        </ section >

        // #endregion Navigation Section Element


    );


    return navBarComJsx;


    // #endregion Return Statement

};



export default NavBarCom;


