
// #region Imports

import React  from 'react';                  /** This import is the standard React core library, providing the core functionality for building React components and managing their lifecycle. */
import styles from './ConPagCom.module.css'; /** This import is the custom CSS file that contains all of the styling declarations for this component. */


import { useState } from 'react'; /** This import is the standard React hook that enables state management in functional components. */

// #endregion Imports



// #region Props Type Definitions

/**
 * Contact Page Component Props = This custom type stores the types that will be used for the custom props that are passed into this custom component.
 *
 * @property namStr = Name String custom property stores the type that will be used for the custom {@link appNamStr} variable.
 *
*/

type ConPagComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



// #region ConPagCom

/**
 * ConPagCom = Contact Page Component
 *
 * @summary
 * This custom functional component executes the logic of and renders the JSX
 * of the Contact page. The form functionality and returned JSX act as more of
 * a mock form, as it does not actually send the data offsite anywhere and
 * instead just logs it to the console as well as showing an alert to the user.
 * This was just for personal learning purposes to gain some experience with
 * using React state handling alongside TypeScript in a more hands on way
 * (instead of just tutorials) before moving on to my next project that will
 * use these concepts in a more practical, realistic way.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link appNamStr}
 * 
 * @returns A React JSX element representing the ConPagCom component.
 * @see {@link conPagComJsx}
 * 
 * @example
 * ```tsx
 * <ConPagCom /> // => conPagComJsx
 * ```
 *
*/

function ConPagCom ( props : ConPagComPro ) : React.ReactElement {


    // #region Component Scoped Variables


    // #region Props Variables

    /** App Name String      = This custom variable stores the site/app name that will be displayed in various parts of the site/app. */
    const appNamStr : string = props.namStr;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Form Handling


    // #region State Variables


    // #region Type Definitions


    // #region ForDatObj

    /**
     * Form Data Object = This custom type stores the types that will be used for the custom {@link iniStaObj} and {@link forDatObj} objects.
     * 
     * @property namStr = Name String custom property stores the type that will be used for the custom {@link iniStaObj.namStr} and {@link forDatObj.namStr} properties.
     * @property emaStr = Email String custom property stores the type that will be used for the custom {@link iniStaObj.emaStr} and {@link forDatObj.emaStr} properties.
     * @property mesStr = Message String custom property stores the type that will be used for the custom {@link iniStaObj.mesStr} and {@link forDatObj.mesStr} properties.
     *
    */

    type ForDatObj = {

        namStr : string;
        emaStr : string;
        mesStr : string;

    };


    /** Initial State Object = This custom type stores the custom {@link ForDatObj} type. I mirrored this type here because I wanted to make it clear in the declared types below that this object represents the initial state for the custom {@link forDatObj} state variable. */
    type IniStaObj           = ForDatObj;


    /**
     * Initial State Object = This custom object stores all of the custom input and textarea HTML element values from the contact form.
     *
     * @property namStr = Name String custom property stores the namInpEle HTML input element's value.
     * @property emaStr = Email String custom property stores the emaInpEle HTML input element's value.
     * @property mesStr = Message String custom property stores the mesTeaEle HTML textarea element's value.
     *
    */

    const iniStaObj : IniStaObj = {

        namStr : '',
        emaStr : '',
        mesStr : '',

    };

    // #endregion ForDatObj


    /** Set Form Data Object      = This custom type stores the type that will be used for the custom {@link setForDatObj} state setter function. */
    type SetForDatObj             = React.Dispatch< React.SetStateAction< IniStaObj > >;
    /** Use State Function Return = This custom type stores the types that will be returned from the standard React {@link useState} hook. */
    type UseStaFunRet             = [ ForDatObj, SetForDatObj ];

    // #endregion Type Definitions



    // #region State Initialization

    /** Form Data Object                             = This custom object stores the custom state variable that mirrors the custom {@link iniStaObj} object and is returned by the standard React {@link useState} hook. */
    /** Set Form Data Object                         = This custom variable stores the custom state setter function returned by the standard React {@link useState} hook, and it is used to execute updates to the custom {@link forDatObj} state variable whenever the form inputs change. */
    const [ forDatObj, setForDatObj ] : UseStaFunRet = useState< ForDatObj >( iniStaObj );

    // #endregion Form State Initialization


    // #endregion State Variables



    // #region handleInpChaFun


    // #region Function Type Definitions

    /** Input/Textarea Change Event Class = This custom type stores the type that will be used for the standard event parameter inside of the custom {@link handleInpChaFun} function. */
    type InpTeaChaEveCla                  = React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement >;
    /** Handle Input Change Function      = This custom type stores the type that will be used for the custom {@link handleInpChaFun} function. */
    type HandleInpChaFun                  = ( event : InpTeaChaEveCla ) => void;

    // #endregion Function Type Definitions



    /**
     * handleInpChaFun = Handle Input Change Function
     * @see {@link HandleInpChaFun}
     *
     * @summary
     * This custom function executes the handling of the form's input and
     * textarea on change events for the name input, email input and message
     * textarea HTML elements. It will first grab the id and value property
     * values from the event class instance of whichever input or textarea HTML
     * element triggered the event. Then it will match the id property value to
     * one of the custom {@link forDatObj} state variable's property names, before it
     * then uses said property name to immutably set the correct state variable
     * property value using the previously declared on change event's value
     * variable.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param event - This is the JS event class instance for an input or textarea on change event.
     * @see {@link InpTeaChaEveCla}
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleInpChaFun( event ) // => void
     * ```
     *
    */

    const handleInpChaFun : HandleInpChaFun = ( event ) => {


        // #region Function Variables

        /** Identifier       = This custom variable stores the event class instance's id property value string of the input or textarea HTML element that triggered the on change event. */
        const id    : string = event.target.id;
        /** Value            = This custom variable stores the event class instance's value property value string of the input or textarea HTML element that triggered the on change event. */
        const value : string = event.target.value;



        /** Input Name String    = This custom variable stores the custom {@link forDatObj} state variable's property name that is intended to be updated by matching it to the event class instance's id property value of the input or textarea HTML element that triggered the on change event and that it corresponds to. */
        const inpNamStr : string = id === 'namInpEle' ? 'namStr' : id === 'emaInpEle' ? 'emaStr' : 'mesStr';

        // #endregion Function Variables



        /** Set Form Data Object = This custom function will immutably set the intended state variable property value using the input or textarea HTML element's value. */
        setForDatObj({

            ...forDatObj,         /** ...Form Data Object = This custom property stores the non updated state variable properties and values by using the spread operator on the existing form data object in order to immutably update the state variable. */
            [ inpNamStr ] : value /** Input Name String   = This custom property stores the custom {@link forDatObj} state variable's property that corresponds to the input or textarea HTML element's value that triggered the on change event. */

        });


    };

    // #endregion handleInpChaFun



    // #region handleSubForFun


    // #region Function Type Definitions

    /** Form Submit Event Class     = This custom type stores the type that will be used for the standard event parameter inside of the custom {@link handleSubForFun} function. */
    type ForSubEveCla               = React.FormEvent< HTMLFormElement >;
    /** Handle Submit Form Function = This custom type stores the type that will be used for the custom {@link handleSubForFun} function. */
    type HandleSubForFun            = ( event : ForSubEveCla ) => void;

    // #endregion Function Type Definitions



    /**
     * handleSubForFun = Handle Submit Form Function
     * @see {@link HandleSubForFun}
     *
     * @summary
     * This custom function executes the handling the form's on submit event.
     * Normally, this would involve sending the custom {@link forDatObj} state variable
     * variable's data to a backend service or API, but since this is just for
     * personal learning reasons, it will instead just log said data to the
     * console and show an alert thanking the user for their submission. After
     * which it will then reset the form fields by setting the
     * {@link forDatObj} state variable variable back to its initial state.
     *
     * @author z4nta0 <https://github.com/z4nta0>
     *
     * @param event - This is the JS event class instance for a form on submit event.
     * @see {@link ForSubEveCla}
     *
     * @returns This function does not return anything.
     *
     * @example
     * ```ts
     * handleSubForFun( event ) // => void
     * ```
     *
    */

    const handleSubForFun : HandleSubForFun = ( event ) => {


        /** Event Prevent Default = This standard JS class instance method executes the prevention of the default browser page reload behavior when submitting a form. */
        event.preventDefault();



        /** Console Log = This standard JS Web API function executes the logging of the state variable variable to the console for demonstration purposes, and to check that the data was handled properly. For a real form this would typically involve sending said data to a backend service or API instead of logging it to the console, although logging it to the console would still not be a bad idea just to double check that the process is working correctly. */
        console.log( 'Form data submitted: ', forDatObj );



        /** Alert = This standard JS Window object method executes the pop up modal in order to thank the user for their form submission. For a real form this would instead replace the form with new HTML content instead of using an alert. */
        alert( `Thank you for your message, ${ forDatObj.namStr }!` );



        /** Set Form Data Object = This custom function executes the resetting the form fields by setting the state variable variable back to its initial state. For a real form this should still be done, even if the form is replaced with new HTML content. */
        setForDatObj( iniStaObj );


    };

    // #endregion handleSubForFun


    // #endregion Form Handling



    // #region Return Statement

    /** Contact Page Component Javascript XML = This custom variable stores the HTML like code that this component will render when called by its parent component. I prefer to store this in a variable before being returned so that it can be referenced inside of comments in the other sections of this component. */
    const conPagComJsx : React.ReactElement   = (


        // #region Contact Form Element

       <  form id='conForEle' className={ styles.contactForm } onSubmit={ handleSubForFun } > { /* Contact Form Element = This custom form element is the root HTML element and container for this component since React requires the JSX to return a single root element. */ }


            { /** Start Form Fieldset Element  */ }

            <  fieldset id='forFieEle' className={ styles.formFieldset } > { /* Form Fieldset Element = This custom fieldset element is the container for the legend, name, email, message and submit divs. */ }


                < legend id='fieLegEle' className={ styles.fieldsetLegend } >{ appNamStr } Contact Form</ legend > { /* Fieldset Legend Element = This custom legend element is the container for the main heading (or title) of the form. */ }



                <  div id='forDivEle' className={ styles.formDiv } > { /* Form Div Element = This custom div element is the container for the name, email, message and submit divs. */ }
                

                    { /** Start Name Div Element  */ }

                    <  div id='namDivEle' className={ styles.nameDiv } > { /* Name Div Element = This custom div element is the container for the name's label and input. */ }


                        < label id='namLabEle' className={ `${styles.nameLabel} ${styles.formLabels}` } htmlFor='namInpEle' >Name :</ label > { /* Name Label Element = This custom label element is the container for the name's label text. */ }



                        { /** Start Name Input Element  */ }

                        < input

                            id='namInpEle'
                            className={ `${styles.nameInput} ${styles.formInputs}` }
                            name='name'
                            onChange={ handleInpChaFun }
                            placeholder='John Smith'
                            required
                            type='text'
                            value={ forDatObj.namStr }

                        /> { /* Name Input Element = This custom input element is the container for the name's input field. */ }

                        { /** End Name Input Element  */ }


                    </ div >

                    { /** End Name Div Element  */ }



                    { /** Start Email Div Element  */ }

                    <  div id='emaDivEle' className={ styles.emailDiv } > { /* Email Div Element = This custom div element is the container for the email's label and input. */ }


                        < label id='emaLabEle' className={ `${styles.emailLabel} ${styles.formLabels}` } htmlFor='emaInpEle' >Email :</ label > { /* Email Label Element = This custom label element is the container for the email's label text. */ }



                        { /** Start Email Input Element  */ }

                        < input

                            id='emaInpEle'
                            className={ `${styles.emailInput} ${styles.formInputs}` }
                            name='email'
                            onChange={ handleInpChaFun }
                            placeholder='myemail@email.com'
                            required
                            type='email'
                            value={ forDatObj.emaStr }

                        /> { /* Email Input Element = This custom input element is the container for the email's input field. */ }

                        { /** End Email Input Element  */ }


                    </ div >

                    { /** End Email Div Element  */ }



                    { /** Start Message Div Element  */ }

                    <  div id='mesDivEle' className={ styles.messageDiv } > { /* Message Div Element = This custom div element is the container for the message's label and textarea. */ }


                        < label id='mesLabEle' className={ `${styles.messageLabel} ${styles.formLabels}` } htmlFor='mesTeaEle' >Message :</ label > { /* Message Label Element = This custom label element is the container for the message's label text. */ }



                        { /** Start Message Textarea Element  */ }

                        < textarea

                            id='mesTeaEle'
                            className={ `${styles.messageTextarea} ${styles.formInputs}` }
                            maxLength={ 1000 }
                            name='message'
                            onChange={ handleInpChaFun }
                            placeholder='I just wanted to say...'
                            required
                            spellCheck={ true }
                            value={ forDatObj.mesStr }

                        /> { /* Message Textarea Element = This custom textarea element is the container for the message's textarea field. */ }

                        { /** End Message Textarea Element  */ }


                    </ div >

                    { /** End Message Div Element  */ }



                    { /** Start Submit Div Element  */ }

                    <  div id='subDivEle' className={ styles.submitDiv } > { /* Submit Div Element = This custom div element is the container for the submit button. */ }


                        < button id='subButEle' className={ styles.submitButton } type='submit' >Submit</ button > { /* Submit Button Element = This custom button element is the container for the submit button's text. */ }


                    </ div >

                    { /** End Submit Div Element  */ }


                </ div >


            </ fieldset >

            { /** End Form Fieldset Element  */ }


        </ form >

        // #endregion Contact Form Element


    );




    return conPagComJsx;

    // #endregion Return Statement


};

// #endregion ConPagCom



export default ConPagCom;


