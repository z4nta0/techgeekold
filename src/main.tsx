
// #region Imports

import                './index.css';     /** This import is the root CSS file where all non module CSS is placed, typically used for global styles that apply throughout the entire application. */
import AppRooCom from './AppRooCom.tsx'; /** This import is the root App component that contains the core routing structure of the application, acting as the container for the route, routes, footer, navigation links and the components that are rendered based on the current URL via React Router. */
import store     from './store.ts';      /** This import is the custom React Redux store that is created using the standard React Redux Toolkit configureStore function. */


import { createRoot } from 'react-dom/client'; /** This import is the new standard React DOM 18 API for creating a root DOM node to render the application, replacing the older ReactDOM.render method and provides better performance and support for concurrent features. */
import { Provider   } from 'react-redux';      /** This import is the standard React component from the React Redux library that makes the React Redux store available to any nested components that need to access the React Redux store. */
import { StrictMode } from 'react';            /** This import is the standard React development only tool for highlighting potential problems in an application, activating additional checks and warnings for its descendants and rendering no visible UI with no impact on the production build acting solely as a passive debugging aid during development. */


import { type Root } from 'react-dom/client'; /** This import is the standard TypeScript type definition for the root DOM node created by the standard React DOM createRoot function. */

// #endregion Imports



/** Root DOM Node      = This custom variable stores the root DOM node using the new React DOM 18 API for rendering the application, targeting the HTML element with the id of rooSecEle which is typically defined in the index.html file of a React application to which all React components will be attached to. */
const rooDomNod : Root = createRoot( document.getElementById( 'rooSecEle' ) as HTMLElement );



// #region Function Type Definitions

/** Root DOM Node Render = This custom type stores the type that will be used for the custom {@link rooDomNodRender} function. */
type RooDomNodRender     = () => void;

// #endregion Function Type Definitions



// #region rooDomNodRender

/**
 * rooDomNodRender = Root DOM Node Render
 * 
 * @summary
 * This custom function executes the render of the entire React application to
 * the root DOM node using the standard React DOM {@link createRoot} function.
 * It wraps the App component with the standard React Redux Provider component
 * to make the React Redux store available to all components in the
 * application, and it also wraps everything in the standard React StrictMode
 * component for development only checks and warnings. This function is called
 * once to render the application initially, and then it is subscribed to the
 * React Redux store so that it will re-render the application whenever the
 * site/app state changes.
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


    // #region Render

    /** Root DOM Node Render = This standard React React DOM method executes the attaching of the following JSX to the rooSecEle node in the browser's DOM. */
    rooDomNod.render(


        // #region StrictMode Element

        <  StrictMode > { /** Strict Mode = This element is the standard React development only component for highlighting potential problems in an application by activating additional checks and warnings for its descendants, rendering no visible UI with no impact on the production build acting solely as a passive debugging aid during development. */ }


            { /** Start Provider Element */ }

            <  Provider store={ store } > { /** Provider = This element is the standard React Redux component that makes the Redux store available to any nested components that need to access the React Redux store. */ }


                { /** Start AppRooCom Element */ }

                < AppRooCom namStr='Tech Geek' /> { /** App Root Component = This element is the standard root component that contains the core routing structure of the application, acting as the container for the routes, route, footer, navigation links and the components that are rendered based on the current URL via React Router. */ }

                { /** End AppRooCom Element */ }


            </ Provider >

            { /** End Provider Element */ }


        </ StrictMode >

        // #endregion StrictMode Element


  );

  // #endregion Render


};

// #endregion rooDomNodRender



/** Store Subscribe = This standard React Redux method executes the listener function that attaches itself to the root DOM node, and it will subsequently be called every time an action is dispatched and the store's state has potentially changed, allowing the site/app to react to state changes and update the UI or perform side effects. */
store.subscribe( rooDomNodRender );



rooDomNodRender();


