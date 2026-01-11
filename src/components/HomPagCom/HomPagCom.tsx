
// #region Imports

import { decNumRed }    from '../../features/counterSlice.tsx'; /** This is the named export for the counter state number reducer's action creator function that will be used to dispatch an action to decrement the counter number state in the HomPagCom component. */
import { getMocDatJso } from '../../api/dataSlice.tsx';         /** This is the named export for the mock data JSON reducer's thunk action creator function that will be used to dispatch an action to retrieve the mock data JSON state in the HomPagCom component. */
import { incNumRed }    from '../../features/counterSlice.tsx'; /** This is the named export for the counter state number reducer's action creator function that will be used to dispatch an action to increment the counter number state in the HomPagCom component. */
import   React          from 'react';                           /** This is the default export from the React library, which is necessary to use JSX syntax in this file. It provides the core functionality for building React components and managing their lifecycle. */
import   reactLogo      from '../../assets/react.svg';          /** This is the React logo image that is imported and used in the HomPagCom component to display the React logo. */
import   styles         from './HomPagCom.module.css';          /** This is the CSS module file that contains all styling for the HomPagCom component. */
import   viteLogo       from '../../assets/vite.svg';           /** This is the Vite logo image that is imported and used in the HomPagCom component to display the Vite logo. */
import { useEffect }    from 'react';                           /** This is a React hook that allows you to perform side effects in function components. It is used in the HomPagCom component to dispatch an action to retrieve the mock data JSON state when the component mounts. */
import   useAppSel      from '../../hooks/useAppSel.ts';        /** This is the custom React hook that provides access to the Redux store's state with proper TypeScript typing. */

import { type JSX }       from 'react/jsx-runtime';        /** This is the standard TypeScript type definition for the JSX namespace, which includes types for JSX elements and attributes. It is used to properly type the JSX code in the return statement of components. */
import { type RooStaObj } from '../../store.tsx';          /** This is the custom Typescript type definition for the entire state object of the Redux store, which is inferred by the store's getState method inside of store.tsx. This type is used to properly type the state object that is passed as a prop to components and will also be imported on said components that have use of the state object but do not need to use the useSelector hook. */
import { type UseAppDis } from '../../hooks/useAppDis.ts'; /** This is the custom Typescript type definition for the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing, specifically for working with thunk actions. */
import { type UseAppThu } from '../../hooks/useAppThu.ts'; /** This is the custom Typescript type definition for the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing. */

// #endregion Imports



// #region Props Type Definitions

/**
 * HomPagComPro = Home Page Component Props will store all of the props that will be used in the HomPagCom component.
 *
 * @property staObj = State Object will store the entire Redux store's state object tree for use in the component.
 * @property disFun = Dispatch Function will store the custom React Hook that wraps the React Redux store's dispatch function for use in the component.
 * @property thuFun = Thunk Function will store the custom React Hook that wraps the React Redux store's dispatch function for use in the component.
 *
*/

type HomPagComPro = {

    staObj : RooStaObj;
    disFun : UseAppDis;
    thuFun : UseAppThu;

};

// #endregion Props Type Definitions



/**
 * HomPagCom = Home Page Component
 *
 * @summary
 * This functional component will be responsible for returning all of the HTML
 * content for the Home page. The mock data stuff is completely unnecessary,
 * but this was just for personal learning purposes to gain some experience
 * with using Redux Toolkit alongside React and TypeScript in a more hands on
 * way (instead of just tutorials) before moving on to my next project that
 * will use these concepts in a more practical, realistic way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props.staObj - {@link HomPagComPro.staObj}
 * @param props.disFun - {@link HomPagComPro.disFun}
 * @param props.thuFun - {@link HomPagComPro.thuFun}
 * 
 * @returns A React JSX element representing the Home component.
 * @see {@link homPagComJsx}
 * 
 * @example
 * ```tsx
 * <Home /> // => <section className={styles.homeSection}> ... </section>
 * ```
 *
*/

function HomPagCom ( props : HomPagComPro ) : React.ReactElement {



    // #region Component Scoped Variables


    // #region Props Variables

    /** App Dispatch Function   = {@link HomPagComPro.disFun}. This must be executed as a function to obtain the actual dispatch function. This is a side effect of wrapping the React Redux store's useDispatch function in a custom React Hook. */
    const appDisFun             = props.disFun();
    /** Thunk Dispatch Function = {@link HomPagComPro.thuFun}. This must be executed as a function to obtain the actual dispatch function. This is a side effect of wrapping the React Redux store's useDispatch function in a custom React Hook. */
    const thuDisFun             = props.thuFun();

    // #endregion Props Variables


    // #region State Variables

    /** Currently Loading Boolean = This state variable stores the boolean value that indicates whether the mock data JSON is currently being fetched from the API. This is used to conditionally render a loading message in the component while the data is being fetched. */
    const { curLoaBoo }           = useAppSel( ( state : RooStaObj ) => state.mocDatJso );
    /** Encountered Error Boolean = This state variable stores the boolean value that indicates whether an error was encountered while fetching the mock data JSON from the API. This is used to conditionally render an error message in the component if an error occurs during data fetching. */
    const { encErrBoo }           = useAppSel( ( state : RooStaObj ) => state.mocDatJso );
    /** Mock Data String          = This state variable stores the actual mock data JSON string fetched from the API. This data is used to display some of the content on the Home page. */
    const { mocDatStr }           = useAppSel( ( state : RooStaObj ) => state.mocDatJso.mocDatObj );

    /* Data Paragraph Content = This stores the string that will be displayed in the component's .dataParagraph Paragraph HTML element based on the current state of the mock data fetching process. If the data is currently being fetched, it will display a loading message. If an error was encountered during fetching, it will display an error message. Otherwise, it will display the actual mock back end JSON data string. */
    const datParCon           = curLoaBoo ? 'Fetching data from API...' : encErrBoo ? 'Error fetching data' : mocDatStr;

    // #endregion State Variables


    // #endregion Component Scoped Variables



    // #region useEffect


    // #region Function Body

    /**
     * useEffect
     *
     * @summary
     * The useEffect hook in React allows you to perform side effects in
     * functional components, such as data fetching, subscriptions, or manual
     * DOM manipulation. It serves to synchronize a component with external
     * systems. The custom inner code block inside of useEffect handles the
     * fetching of the mock back end JSON data by dispatching the appropriate
     * Redux Toolkit thunk action when the component mounts. The empty
     * dependency array ensures that this effect only runs once when the
     * component is first rendered.
     *
     * @author React  <https://react.dev/reference/react/useEffect>
     * @author z4ntao <https://github.com/z4nta0>
     *
     * @param void - This function takes no parameters.
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * This function is not called directly, but rather it is run on component
     * mount and on changes to whatever state variables are specified in the
     * dependency array.
     * ```
     *
    */

    useEffect( () => {


        /**Thunk Dispatch Function = This function will use the custom hook that wraps Redux Toolkit's useDispatch hook in order to execute the async thunk action which fetches the mock back end JSON data. */
        thuDisFun( getMocDatJso() );


    }, []);


    // #region useEffect


    // #region Function Body



    // #region Return Statement


    /** Home Page Component Javascript XML = This stores the HTML-like code that the Home Page component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const homPagComJsx : JSX.Element       = (


        // #region Component Section Element

        < section id='comSecEle' className={ styles.componentSection } > { /* Component Section Element = This is the component wrapping HTML element since React requires components to return a single root element. */ }


            { /** Start Component Header Element */ }

            <  header id='comHeaEle' className={ styles.componentHeader } > { /* Component Header Element = This is the header element for the component which contains the main heading and the logos. */ }


                < h1 id='heaHe1Ele' className={ styles.headerH1 } >Vite + React</ h1 > { /* Header H1 Element = This is the main heading for the component. */ }



                { /** Start Header Div Element */ }

                < div id='heaDivEle' className={ styles.headerDiv } > { /* Header Div Element = This is the Header div element that contains the logos for the header. */ }


                    { /** Start Vite Anchor Element */ }

                    <  a id='vitAncEle' className={ styles.headerAnchors } href='https://vite.dev' target='_blank' > { /* Vite Anchor Element = This is the anchor element for the Vite logo which links to the Vite website. */ }

                        < img id='vitImgEle' className={ styles.headerImgs } src={ viteLogo  } alt='Vite logo' /> { /* Vite Image Element = This is the image element for the Vite logo. */ }

                    </ a >

                    { /** End Vite Anchor Element */ }


                    { /** Start React Anchor Element */ }

                    <  a id='reaAncEle' className={ styles.headerAnchors } href='https://react.dev' target='_blank' > { /* React Anchor Element = This is the anchor element for the React logo which links to the React website. */ }

                        < img id='reaImgEle' className={ styles.headerImgs } src={ reactLogo } alt='React logo' /> { /* React Image Element = This is the image element for the React logo. */ }

                    </ a >

                    { /** End React Anchor Element */ }


                </ div >

                { /** End Header Div Element */ }

            </ header>

            { /** End Component Header Element */ }



            { /** Start Content Div Element */ }

            <  div id='conDivEle' className={ styles.contentDiv } > { /* Content Div Element = This is the div element that contains the main content of the Home page, including the buttons to increment and decrement the counter state, the paragraph that display instructions and the mock backend JSON data. */ }


                { /** Start Button Div Element */ }

                <  div id='butDivEle' className={ styles.buttonDiv } > { /* Button Div Element = This is the div element that contains the buttons for incrementing and decrementing the counter state. */ }


                    { /** Start Increment Button Element */ }

                    <  button id='incButEle' className={ styles.contentButtons } onClick={ () => { appDisFun( incNumRed( 2 ) ) } } > { /* Increment Button Element = This is the button element that will dispatch an action to increment the counter state by 2 when clicked. The current value of the counter state is also displayed in the button. */ }

                        Count = { useAppSel( ( state : RooStaObj ) => state.couStaNum ) }

                    </ button >

                    { /** End Increment Button Element */ }


                    { /** Start Decrement Button Element */ }

                    <  button id='decButEle' className={ styles.contentButtons } onClick={ () => { appDisFun( decNumRed( 3 ) ) } } > { /* Decrement Button Element = This is the button element that will dispatch an action to decrement the counter state by 3 when clicked. The current value of the counter state is also displayed in the button. */ }

                        Count = { useAppSel( ( state : RooStaObj ) => state.couStaNum ) }

                    </ button >

                    { /** End Decrement Button Element */ }


                </ div >

                { /** End Button Div Element */ }



                { /** Start Edit Paragraph Element */ }

                <  p id='ediParEle' className={ styles.editParagraph } > { /* Edit Paragraph Element = This is the paragraph element that contains instructions for editing the code to test hot module replacement (HMR). */ }

                    Edit < code id='ediCodEle' className={ styles.editCode } >src/App.tsx</ code > and save to test HMR

                    { /** TEMPORARY */ } <a href='https://react.dev' target='_blank' >Learn React</ a >

                </ p >

                { /** End Edit Paragraph Element */ }



                { /** Start Learn Paragraph Element */ }

                <  p id='leaParEle' className={ styles.learnParagraph } > { /* Learn Paragraph Element = This is the paragraph element that contains instructions for learning more about Vite and React. */ }

                    Click on the Vite and React logos to learn more.

                </ p >

                { /** End Learn Paragraph Element */ }



                { /** Start Data Paragraph Element */ }

                <  p id='datParEle' className={ styles.dataParagraph } > { /* Data Paragraph Element = This is the paragraph element that contains the mock backend JSON data or a placeholder text if the data is undefined. */ }

                    { datParCon === undefined ? 'Data should go here' : datParCon }

                </ p >

                { /** End Data Paragraph Element */ }


            </ div >

            { /** End Content Div Element */ }


        </ section >

        // #endregion Component Section Element


    );


    return homPagComJsx;


    // #endregion Return Statement



}



export default HomPagCom;


