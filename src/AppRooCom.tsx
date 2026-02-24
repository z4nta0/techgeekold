
// #region Imports

import About         from './components/AboPagCom/AboPagCom.tsx';    /** This import is the custom component that will return the About page when navigated to by React Router. */
import Cards         from './components/DigCarCom/DigCarCom.tsx';    /** This import is the custom component that will return the Cards page when navigated to by React Router. */
import Contact       from './components/ConPagCom/ConPagCom.tsx';    /** This import is the custom component that will return the Contact page when navigated to by React Router. */
import ChristmasCard from './components/DigCarCom/ChrCarCom/ChrCarCom.tsx';    /** This import is the custom component that will return a dynamic digital card when navigated to by React Router via the Cards page. */
import FooBarCom     from './components/FooBarCom/FooBarCom.tsx';    /** This import is the custom component that will return the Footer Bar, which is rendered on every page and contains the copyright information. */
import Home          from './components/HomPagCom/HomPagCom.tsx';    /** This import is the custom component that will return the Home page when navigated to by React Router. */
import NavBarComCon  from './components/NavBarCom/NavBarComCon.tsx'; /** This import is the custom component that will return the Navigation Bar, which is rendered on every page and contains the links to navigate between pages. */
import SidOneCom     from './components/SidOneCom/SidOneCom.tsx'; /** This import is the custom component that will return the Navigation Bar, which is rendered on every page and contains the links to navigate between pages. */
import styles        from './AppRooCom.module.css';                  /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { BrowserRouter } from 'react-router-dom'; /** This import is the standard React Router element for the DOM's routing components, using the HTML5 history API (pushState, replaceState, etc.) to keep the UI in sync with the URL resulting in clean, standard URLs. */
import { Route         } from 'react-router-dom'; /** This import is the standard React Router element that is used to declaratively render specific UI components when the application's current URL matches a defined path, acting as a bridge between the URL and the user interface. */
import { Routes        } from 'react-router-dom'; /** This import is the standard React Router element that acts as a container for all route definitions, ensuring only one route is rendered at a time. */

// #endregion Imports



// #region AppRooComPro

/**
 * App Root Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link namStr} variable.
 *
*/

type AppRooComPro = {

    namStr : string;

};

// #endregion AppRooComPro



// #region AppRooCom

/**
 * AppRooCom = App Root Component
 *
 * @summary
 * This custom functional component executes the root logic of and renders the
 * root JSX of the site/app. The React Router structure is set up here, and
 * acts as the core of the site/app for routing all requested paths to the
 * specified custom components. Said custom components will then be rendered
 * inside of the <main> HTML element. In addition, this component will render
 * any custom components that should always be displayed on all pages. For this
 * site/app, that includes the navigation and footer bars.
 *
 * @author React Router <https://reactrouter.com/>
 * @author z4nta0       <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link namStr}
 * 
 * @returns A React JSX element representing the App component.
 * @see {@link appRooComJsx}
 * 
 * @example
 * ```tsx
 * <App /> // => appRooComJsx
 * ```
 *
*/

function AppRooCom( props : AppRooComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement

    /** App Root Component Javascript XML   = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const appRooComJsx : React.ReactElement = (


        // #region BrowserRouter Element

        <  BrowserRouter > { /** BrowserRouter = This standard React Router element is the root HTML element and container for this component since React requires the JSX to return a single root element. It enables client side routing in React applications using clean URLs, manages browser history using the HTML5 history API, and provides routing context by making all the routing functionality (like the useParams, useNavigate hooks, and <Link> components) available to the entire site/app. */ }


            { /* Start NavBarComCon Element */ }

            < NavBarComCon namStr={ appNamStr } /> { /* Navigation Bar Component Container = This custom element is the container for the Navigation Bar Component and contains all of the logic and JSX for said component. */ }

            { /* End NavBarComCon Element */ }



            < SidOneCom namStr={ appNamStr } />



            { /* Start Main Element */ }

            <  main id='appMaiEle' className={ styles.appMain } > { /* App Main Element = This custom main element is the container for the main element, and it is where the components that correspond to the current URL will be rendered by React Router. */ }


                { /* Start Routes Element */ }

                <  Routes > { /** Routes = This standard React Router element is the container for all of the Route elements, and it ensures only the first matching route is rendered based on the current URL path. */ }


                    < Route path='/'                element={ < Home    namStr={ appNamStr } /> } /> { /** Route -> Home        = This standard React Router element will render the Home page component. */ }
                    < Route path='/about'           element={ < About   namStr={ appNamStr } /> } /> { /** Route -> About       = This standard React Router element will render the About page component. */ }
                    < Route path='/contact'         element={ < Contact namStr={ appNamStr } /> } /> { /** Route -> Contact     = This standard React Router element will render the Contact page component. */ }
                    < Route path='/cards'           element={ < Cards   namStr={ appNamStr } /> } /> { /** Route -> Cards       = This standard React Router element will render the Cards page component. */ }
                    < Route path='/cards/ChristmasCard' element={ < ChristmasCard                  /> } /> { /** Route -> DynamicCard = This standard React Router element will render the DynamicCard page component based on the cardName parameter. */ }


                </ Routes >

                { /* End Routes Element */ }


            </ main >

            { /* End Main Element */ }



            { /* Start FooBarCom Element */ }

            < FooBarCom namStr={ appNamStr } /> { /* Footer Bar Component = This custom element is the container for all of the logic and JSX of the Footer Bar Component. */ }

            { /* End FooBarCom Element */ }


        </ BrowserRouter >

        // #endregion BrowserRouter Element


    );



    return appRooComJsx;

    // #endregion Return Statement


};

// #endregion AppRooCom



export default AppRooCom;


