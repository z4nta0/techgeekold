
// #region Imports

import { StrictMode } from 'react';                /** This is a development only tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants, rendering no visible UI and has no impact on the production build acting solely as a passive debugging aid during development. */
import { createRoot } from 'react-dom/client';     /** This is the new React 18 API for creating a root DOM node to render the application. It replaces the older ReactDOM.render method and provides better performance and support for concurrent features. */
import                     './index.css';          /** This is the root CSS file where all non module CSS is placed, typically used for global styles that apply throughout the entire application such as body margins, default fonts, and utility classes. */
import   App          from './App.tsx';            /** This is the root App component that contains the core routing structure of the application and acts as the container for the router, footer, navigation links and the components that are rendered based on the current URL via React Router. */
import   store        from './store.tsx';          /** This is the Redux store that is created using Redux Toolkit's configureStore function, which simplifies the state management setup process by abstracting away all of the boilerplate code that is required by Redux (without Toolkit) to handle state management. */
import { Provider }   from 'react-redux';          /** This is a React component from the React Redux library that makes the Redux store available to any nested components that need to access the Redux store. It is typically used at the root of the component tree to provide the store to all components in the application. */
import { type Root }  from 'react-dom/client';     /** This is the standard TypeScript type definition for the root DOM node created by React's createRoot function. */
import   useAppDis    from './hooks/useAppDis.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing. */
import   useAppThu    from './hooks/useAppThu.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing, specifically for working with thunk actions. */

// #endregion Imports



/** Root DOM Node      = This creates a root DOM node using the new React 18 API for rendering the application. It targets the HTML element with the id of root, which is typically defined in the public/index.html file of a React application. */
const rooDomNod : Root = createRoot( document.getElementById( 'rooSecEle' ) as HTMLElement );



// #region Function Type Definitions

/** Root DOM Node Render = This function will be responsible for rendering the entire site/app to the root DOM node using the render() method of React's {@link createRoot} function. */
type RooDomNodRender     = () => void;

// #endregion Function Type Definitions


/**
 * rooDomNodRender = Root DOM Node Render
 * 
 * @summary
 * This renders the entire React application to the root DOM node using the
 * render() method of React's {@link createRoot} function. It wraps the App
 * component with the Provider component from React Redux to make the Redux
 * store available to all components in the application, and also wraps
 * everything in StrictMode for development only checks and warnings. This
 * function is called once to render the application initially, and then it is
 * subscribed to the Redux store so that it will re-render the application
 * whenever the state changes.
 *
 *
 * @author React Create Root <https://react.dev/reference/react-dom/client/createRoot>
 * @author z4nta0            <https://github.com/z4nta0>
 * 
 * @param void - This function takes no parameters.
 * 
 * @returns This function does not return anything.
 * 
 * @example
 * ```ts
 * rooDomNodRender() // => void
 * ```
 *
*/

const rooDomNodRender : RooDomNodRender = () => {


    /** The calls the render() method to display a piece of JSX into the rooDomNod’s browser DOM node. */
    rooDomNod.render(


        // #region StrictMode Component

        <  StrictMode > { /** The StrictMode component is a development only tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants, rendering no visible UI and has no impact on the production build acting solely as a passive debugging aid during development. */ }


            { /** Start Provider Component */ }

            <  Provider store={ store } > { /** The Provider component is a React component from the React Redux library that makes the Redux store available to any nested components that need to access the Redux store. It is typically used at the root of the component tree to provide the store to all components in the application. */ }


                { /** Start App Component */ }

                { /** The App component is the root component that contains the core routing structure of the application and acts as the container for the router, footer, navigation links and the components that are rendered based on the current URL via React Router. */ }
                < App
                    disFun={ useAppDis }
                    namStr='Tech Geek'
                    staObj={ store.getState() }
                    thuFun={ useAppThu }
                />

                { /** End App Component */ }


            </ Provider >

            { /** End Provider Component */ }


        </ StrictMode >

        // #endregion StrictMode Component


  );


};



/** This registers a React Redux listener function that is called every time an action is dispatched and the store's state has potentially changed. It allows the site/app to react to state changes and update the UI or perform side effects. */
store.subscribe( rooDomNodRender );



rooDomNodRender();


