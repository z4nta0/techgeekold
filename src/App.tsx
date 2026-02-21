
// #region Imports

import About         from './components/AboPagCom/AboPagCom.tsx';     /** This import is the custom component that will return the About page when navigated to by React Router. */
import ChristmasCard from './components/ChristmasCard/ChrCarCom.tsx'; /** This import is the custom component that will return the Christmas Card page when navigated to by React Router. */
import Contact       from './components/ConPagCom/ConPagCom.tsx';     /** This import is the custom component that will return the Contact page when navigated to by React Router. */
import FooBarCom     from './components/FooBarCom/FooBarCom.tsx';     /** This import is the custom component that will return the Footer Bar, which is rendered on every page and contains the copyright information. */
import Home          from './components/HomPagCom/HomPagCom.tsx';     /** This import is the custom component that will return the Home page when navigated to by React Router. */
import NavBarComCon  from './components/NavBar/NavBarComCon.tsx';     /** This import is the custom component that will return the Navigation Bar, which is rendered on every page and contains the links to navigate between pages. */
import styles        from './App.module.css';                         /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { BrowserRouter } from 'react-router-dom'; /** This import is the standard React Router element for the DOM's routing components, using the HTML5 history API (pushState, replaceState, etc.) to keep the UI in sync with the URL resulting in clean, standard URLs. */
import { Route         } from 'react-router-dom'; /** This import is the standard React Router element that is used to declaratively render specific UI components when the application's current URL matches a defined path, acting as a bridge between the URL and the user interface. */
import { Routes        } from 'react-router-dom'; /** This import is the standard React Router element that acts as a container for all route definitions, ensuring only one route is rendered at a time. */


import { type RooStaObj } from './store.tsx';          /** This import is the custom type definition for the entire state object of the custom React Redux Toolkit store, which is inferred by the store's standard getState method. */
import { type UseAppDis } from './hooks/useAppDis.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function. */
import { type UseAppThu } from './hooks/useAppThu.ts'; /** This import is the custom type definition for the custom React hook that acts as a wrapper around the standard React Redux store dispatch function, this one designed specifically for working with thunk actions. */

// #endregion Imports



// #region AppRooComPro

/**
 * App Root Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property disFun = Dispatch Function custom property stores the type that will be used for the custom {@link disFun} variable.
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link namStr} variable.
 * @property staObj = State Object custom property stores the type that will be used for the custom {@link staObj} variable.
 * @property thuFun = Thunk Function custom property stores the type that will be used for the custom {@link thuFun} variable.
 *
*/

type AppRooComPro = {

    disFun : UseAppDis;
    namStr : string;
    staObj : RooStaObj;
    thuFun : UseAppThu;

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
 * @param props.disFun - {@link disFun}
 * @param props.namStr - {@link namStr}
 * @param props.staObj - {@link staObj}
 * @param props.thuFun - {@link thuFun}
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

    /** Dispatch Function    = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function. */
    const disFun : UseAppDis = props.disFun;
    /** Name String          = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const namStr : string    = props.namStr;
    /** State Object         = This custom variable stores the entire state object of the site/app as inferred by the standard React Redux store getState method. */
    const staObj : RooStaObj = props.staObj;
    /** Thunk Function       = This custom variable stores the custom React hook from the utilities directory that wraps the standard React Redux store dispatch function but with proper typing specifically for thunk actions. */
    const thuFun : UseAppThu = props.thuFun;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement

    /** App Root Component Javascript XML   = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const appRooComJsx : React.ReactElement = (


        // #region BrowserRouter Element

        <  BrowserRouter > { /** BrowserRouter = This standard React Router element is the root HTML element and container for this component since React requires the JSX to return a single root element. It enables client side routing in React applications using clean URLs, manages browser history using the HTML5 history API, and provides routing context by making all the routing functionality (like the useParams, useNavigate hooks, and <Link> components) available to the entire site/app. */ }


            { /* Start NavBarComCon Element */ }

            < NavBarComCon namStr={ namStr } disFun={ disFun } /> { /* Navigation Bar Component Container = This custom element is the container for the Navigation Bar Component and contains all of the logic and JSX for said component. */ }

            { /* End NavBarComCon Element */ }



            { /* Start Main Element */ }

            <  main id='appMaiEle' className={ styles.appMain } > { /* App Main Element = This custom main element is the container for the main element, and it is where the components that correspond to the current URL will be rendered by React Router. */ }


                { /* Start Routes Element */ }

                <  Routes > { /** Routes = This standard React Router element is the container for all of the Route elements, and it ensures only the first matching route is rendered based on the current URL path. */ }


                    < Route path='/'              element={ < Home    namStr={ namStr } staObj={ staObj } disFun={ disFun } thuFun={ thuFun } /> } /> { /** Route -> Home = This standard React Router element will render the Home page component. */ }
                    < Route path='/about'         element={ < About   namStr={ namStr } /> } /> { /** Route -> About         = This standard React Router element will render the About page component.          */ }
                    < Route path='/contact'       element={ < Contact namStr={ namStr } /> } /> { /** Route -> Contact       = This standard React Router element will render the Contact page component.        */ }
                    < Route path='/christmascard' element={ < ChristmasCard             /> } /> { /** Route -> ChristmasCard = This standard React Router element will render the Christmas Card page component. */ }


                </ Routes >

                { /* End Routes Element */ }


            </ main >

            { /* End Main Element */ }



            { /* Start FooBarCom Element */ }

            < FooBarCom namStr='Tech Geek' /> { /* Footer Bar Component = This custom element is the container for all of the logic and JSX of the Footer Bar Component. */ }

            { /* End FooBarCom Element */ }


        </ BrowserRouter >

        // #endregion BrowserRouter Element


    );



    return appRooComJsx;

    // #endregion Return Statement


};

// #endregion AppRooCom



export default AppRooCom;


