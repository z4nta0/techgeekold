
// #region Imports

import   About            from './components/About.tsx';                   /** This is the component that will return the About component when navigated to by React Router. */
import   styles           from './App.module.css';                         /** This is CSS file that contains all styling for this component. */
import { BrowserRouter  } from 'react-router-dom';                         /** This is the standard import for React Router DOM's routing components, it uses the HTML5 history API (pushState, replaceState, etc.) to keep the UI in sync with the URL resulting in clean, standard URLs. */
import   ChristmasCard    from './components/ChristmasCard/ChrCarCom.tsx'; /** This is the component that will return the Christmas Card component when navigated to by React Router. */
import   Contact          from './components/Contact.tsx';                 /** This is the component that will return the Contact component when navigated to by React Router. */
import   FooBarCom        from './components/FooBarCom/FooBarCom.tsx';     /** This is the component that will return the Footer component, which is rendered on every page and contains the copyright information. */
import   Home             from './components/Home.tsx';                    /** This is the component that will return the Home component when navigated to by React Router. */
import   NavBarComCon     from './components/NavBar/NavBarComCon';         /** This is the component that will return the Navigation Bar component, which is rendered on every page and contains the links to navigate between pages. */
import { type RooStaObj } from './store.tsx';                              /** This is the custom Typescript type definition for the entire state object of the Redux store, which is inferred by the store's getState method inside of store.tsx. This type is used to properly type the state object that is passed as a prop to components and will also be imported on said components that have use of the state object but do not need to use the useSelector hook. */
import { Route          } from 'react-router-dom';                         /** This is a React Router fundamental element used to declaratively render specific UI components when the application's current URL matches a defined path. It acts as a bridge between the URL and the user interface. */
import { Routes         } from 'react-router-dom';                         /** This is a React Router element that acts as a container for all route definitions, ensuring only one route is rendered at a time. */
import { type UseAppDis } from './hooks/useAppDis.ts';                     /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing, specifically for working with thunk actions. */
import { type UseAppThu } from './hooks/useAppThu.ts';                     /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing. */

// #endregion Imports



// #region AppProObj

/**
 * ProObj = Props Object will store the properties and values that are passed into the App component from main.tsx.
 * 
 * @property staObj = State Object will store all the entire state of the application as inferred by the Redux store's getState method inside of store.tsx. It is best practice to use the useSelector hook from React Redux to access specific slices of the state object within components but this is preferrable in some, select use cases.
 * @property disFun = Dispatch Function will store the custom hook from the utilities directory that wraps the standard dispatch function of the Redux store.
 * @property thuFun = Thunk Function will store the custom hook from the utilities directory that wraps the standard dispatch function of the Redux store, but with proper TypeScript typing for thunk actions.
 * 
*/

interface ProObj {

    staObj : RooStaObj;
    disFun : UseAppDis;
    thuFun : UseAppThu;

};

// #endregion AppProObj



/**
 * AppRooCom = App Root Component
 *
 * @summary
 * This functional component is the root component of the entire site/app where
 * the core routing structure is setup. It acts as the container for the
 * router, footer, navigation links and the components that are rendered based
 * on the current URL.
 *
 * @author React Router <https://reactrouter.com/>
 * @author z4ntao       <https://github.com/z4nta0>
 * 
 * @param props.staObj - {@link ProObj.staObj}
 * @param props.disFun - {@link ProObj.disFun}
 * @param props.thuFun - {@link ProObj.thuFun}
 * 
 * @returns A React JSX element representing the App component.
 * @see {@link appRooComJsx}
 * 
 * @example
 * ```tsx
 * <App /> // => <Router> ... </Router>
 * ```
 *
*/

function AppRooCom( props : ProObj ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** Dispatch Function = This stores the custom hook from the utilities directory that wraps the standard dispatch function of the Redux store. */
    const { disFun }      = props;
    /** State Object      = This stores the entire state of the application as inferred by the Redux store's getState method inside of store.tsx. */
    const { staObj }      = props;
    /** Thunk Function    = This stores the custom hook from the utilities directory that wraps the standard dispatch function of the Redux store, but with proper TypeScript typing for thunk actions. */
    const { thuFun }      = props;

    // #region Props Variables


    // #endregion Component Scoped Variables



    // #region Return Statement


    /** App Root Component Javascript XML = This stores the HTML like code that the App Root Component will render when called by main.tsx. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const appRooComJsx                    = (


        // #region BrowserRouter Component

        < BrowserRouter > { /** The BrowserRouter is a core component of React Router that enables client side routing in React applications using clean URLs, manages browser history using the HTML5 history API, and provides routing context by making all the routing functionality (like the useParams, useNavigate hooks, and <Link> components) available to the entire site/app. */ }


            { /* Start NavBarComCon Component */ }

            < NavBarComCon namStr='Tech Geek' staObj={ staObj } disFun={ disFun } /> { /* Navigation Bar Component Container = This is the component container for the Navigation Bar Component and contains all of the handler and other such logic for said component. In addition to handling said logic, it will also return the Navigation Bar Component JSX element. */ }

            { /* End NavBarComCon Component */ }


            { /* Start Main Element */ }

            <  main id='appMaiEle' className={ styles.appMain } > { /* App Main Element = This is the main content section of the app where the components that correspond to the current URL will be rendered by React Router. */ }


                { /* Start Routes Component */ }

                <  Routes > { /** The Routes component is a React Router container for all Route components, ensuring that only the first matching route is rendered. It manages the rendering of different components based on the current URL path. */ }

                    < Route path='/'              element={ < Home staObj={ staObj } disFun={ disFun } thuFun={ thuFun } /> } /> { /** This is the React Router path to the Home page component. */ }
                    < Route path='/about'         element={ < About         /> } /> { /** This is the React Router path to the About page component.          */ }
                    < Route path='/contact'       element={ < Contact       /> } /> { /** This is the React Router path to the Contact page component.        */ }
                    < Route path='/christmascard' element={ < ChristmasCard /> } /> { /** This is the React Router path to the Christmas Card page component. */ }

                </ Routes >

                { /* End Routes Component */ }


            </ main >

            { /* End Main Element */ }


            { /* Start FooBarCom Component */ }

            < FooBarCom namStr='Tech Geek' /> { /* Footer Bar Component = This is the component container for the Footer Bar Component and will return the Footer Bar JSX element. */ }

            { /* End FooBarCom Component */ }


        </  BrowserRouter >

        // #endregion BrowserRouter Component


    );


    return appRooComJsx;


    // #endregion Return Statement

};



export default AppRooCom;


