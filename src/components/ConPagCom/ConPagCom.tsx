
// #region Imports

import   React      from 'react';                  /** React is the core library for building user interfaces. */
import   styles     from './ConPagCom.module.css'; /** This imports the custom CSS module for styling the ConPagCom component. */
import { useState } from 'react';                  /** This is the React hook that allows functional components to have state variables. */

// #endregion Imports



// #region Props Type Definitions

/**
 * ConPagComPro = Contact Page Component Props will store all of the props that will be used in the ConPagCom component.
 *
 * @property namStr = Name String will store the site/app name that will be displayed in various parts of the site/app.
 *
*/

type ConPagComPro = {

    namStr : string;

};

// #endregion Props Type Definitions



/**
 * ConPagCom = Contact Page Component
 *
 * @summary
 * This functional component will be responsible for returning all of the HTML
 * content for the Contact page. This form is more of a mock form as it does
 * not actually send the data anywhere and instead just logs it to the console
 * as well as showing an alert. This was just for personal learning purposes to
 * gain some experience with using React state handling alongside TypeScript in
 * a more hands on way (instead of just tutorials) before moving on to my next
 * project that will use these concepts in a more practical, realistic way.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param props.namStr - {@link ConPagComPro.namStr}
 * 
 * @returns A React JSX element representing the ConPagCom component.
 * @see {@link conPagComJsx}
 * 
 * @example
 * ```tsx
 * <ConPagCom /> // => <form id='conForEle'> ... </form>
 * ```
 *
*/

function ConPagCom ( props : ConPagComPro ) : React.ReactElement {



    // #region Component Scoped Variables


    // #region Props Variables

    /** Name String  = {@link ConPagComPro.namStr} */
    const { namStr } = props;

    // #endregion Props Variables


    // #endregion Component Scoped Variables



    // #region Form Handling


    // #region State Variables


    // #region Type Definitions

    /**
     * ForDatObj = Form Data Object will store all of the input and textarea HTML element values from the contact form.
     *
     * @property namStr = Name String will store the namInpEle input's value.
     * @property emaStr = Email String will store the emaInpEle input's value.
     * @property mesStr = Message String will store the mesTeaEle textarea's value.
     *
    */

    type ForDatObj = {

        namStr : string;
        emaStr : string;
        mesStr : string;

    };

    /** Set Form Data Object = This is the type definition for the set state function that will be used to update the {@link forDatObj} state variable. */
    type SetForDatObj        = React.Dispatch< React.SetStateAction< ForDatObj > >;

    // #endregion Type Definitions


    // #region State Initialization

    /** Form Data Object              = This state variable will storea the current values of the contact form's inputs and textarea HTML elements. */
    /** Set Form Data Object          = This stores the set state function that will be used to update the {@link forDatObj} state variable. */
    const [ forDatObj, setForDatObj ] = useState< ForDatObj >({

        namStr : '',
        emaStr : '',
        mesStr : '',

    }) as [ ForDatObj, SetForDatObj ];

    // #endregion State Initialization


    // #endregion State Variables



    // #region handleInpChaFun


    // #region Function Type Definitions

    /** Input/Textarea Change Event Class = This will store an event class instance for either an input or textarea HTML element that will be passed to the {@link handleInpChaFun} function. */
    type InpTeaChaEveCla                  = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    /** Handle Input Change Function      = This function will handle input and textarea change events and set the {@link forDatObj} state variable accordingly. */
    type HandleInpChaFun                  = ( event : InpTeaChaEveCla ) => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * handleInpChaFun = Handle Input Change Function
     * @see {@link HandleInpChaFun}
     *
     * @summary
     * This will handle the contact form's input change events from the form's
     * name input, email input and message textarea HTML elements. It will
     * first grab the id and value property values from the event class
     * instance of whichever input or textarea HTML element triggered the
     * event. Then it will match the id value to one of the state object's
     * property names before it then uses said value to immutably set the
     * correct state object property value using the previously declared
     * event's value variable.
     *
     * @author z4ntao <https://github.com/z4nta0>
     *
     * @param event - This is the JS event class instance for an input or textarea change event.
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


        /** Identifier      = This stores id property's value string of the input or textarea HTML element that triggered the change event. */
        /** Value           = This stores value property's value string of the input or textarea HTML element that triggered the change event. */
        const { id, value } = event.target as { id : string; value : string; };

        /** Input Name String    = This stores the state property name that needs to be updated by matching it to the name of the input or textarea HTML element that it corresponds to. */
        const inpNamStr : string = id === 'namInpEle' ? 'namStr' : id === 'emaInpEle' ? 'emaStr' : 'mesStr';


        /** Set Form Data Object will immutably set the {@link forDatObj} state variable using the input or textarea HTML element's value. */
        setForDatObj({

            ...forDatObj,
            [inpNamStr] : value

        });


    };

    // #endregion Function Body


    // #endregion handleInpChaFun



    // #region handleSubForFun


    // #region Function Type Definitions

    /** Form Submit Event Class     = This will store the event class instance that is triggered when submitting an HTML form element. */
    type ForSubEveCla               = React.FormEvent<HTMLFormElement>;
    /** Handle Submit Form Function = This function will handle the form submission event and process the form data accordingly. This would normally handle sending the form's data to a backend service or API, but is instead just logged to the console along with sending an alert because this is just a demonstration. */
    type HandleSubForFun            = ( event : ForSubEveCla ) => void;

    // #endregion Function Type Definitions


    // #region Function Body

    /**
     * handleSubForFun = Handle Submit Form Function
     * @see {@link HandleSubForFun}
     *
     * @summary
     * This will handle the contact form's submission event from the ConPagCom
     * component's HTML form element.Normally, this would involve sending the
     * {@link forDatObj} state variable's data to a backend service or API, but
     * since this is just a demonstration, it will instead just log said data
     * to the console and show an alert thanking the user for their submission.
     * After which it will then reset the form fields by setting the
     * {@link forDatObj} state variable back to its initial state.
     *
     * @author z4ntao <https://github.com/z4nta0>
     *
     * @param event - This is the JS event class instance for submitting an HTML form element.
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


        /** This will prevent the default browser page reload behavior when submitting the form. */
        event.preventDefault();


        /** This will log the form data to the console for demonstration purposes, and to check that the data was handled properly. For a real contact form this would typically involve sending the data to a backend service or API instead of logging it to the console, although logging it to the console would still not be a bad idea just to double check that the process is working correctly. */
        console.log( 'Form data submitted: ', forDatObj );


        /** This will show an alert thanking the user for their submission. For a real contact form this would probably instead replace the form with new HTML content instead of using an alert. */
        alert( `Thank you for your message, ${ forDatObj.namStr }!` );


        /** Set Form Data Object will reset the form fields by setting the {@link forDatObj} state variable back to its initial state. For a real contact form this should still be done. */
        setForDatObj({

            namStr : '',
            emaStr : '',
            mesStr : '',

        });


    };

    // #region Function Body


    // #endregion handleSubForEve


    // #endregion Form Handling



    // #region Return Statement


    /** Contact Page Component Javascript XML = This stores the HTML-like code that the Contact Page component will render when called. I prefer to store this in a variable so that the variable can be referenced inside of comments in the other sections of the component. */
    const conPagComJsx : React.ReactElement   = (


        // #region Component Form Element

       <  form id='comForEle' className={ styles.componentForm } onSubmit={ handleSubForFun } > { /* Component Form Element = This is the main form for the Contact Page Component, and it is the component wrapping HTML element since React requires components to return a single root element. */ }


            { /** Start Form Fieldset Element  */ }

            <  fieldset id='forFieEle' className={ styles.formFieldset } > { /* Form Fieldset Element = This is the main fieldset for the Contact Page Component form, containing the legend, all form inputs and the submit button. */ }


                < legend id='fieLegEle' className={ styles.fieldsetLegend } >{ namStr } Contact Form</ legend > { /* Fieldset Legend Element = This is the legend for the main (and only) fieldset of the Contact Page Component form, serving as a sort of main heading but with special placement on the form's top left border. */ }


                { /** Start Name Div Element  */ }

                <  div id='namDivEle' className={ styles.nameDiv } > { /* Name Div Element = This is the div containing the name label and input for the Contact Page Component form. */ }


                    < label id='namLabEle' className={ styles.nameLabel } htmlFor='namInpEle' >Name : </ label > { /* Name Label Element = This is the label for the name input in the Contact Page Component form. */ }


                    { /** Start Name Input Element  */ }

                    < input

                        id='namInpEle'
                        className={ styles.nameInput }
                        name='name'
                        onChange={ handleInpChaFun }
                        required
                        type='text'
                        value={ forDatObj.namStr }

                    /> { /* Name Input Element = This is the input for the name in the Contact Page Component form. */ }

                    { /** End Name Input Element  */ }


                </ div >

                { /** End Name Div Element  */ }



                { /** Start Email Div Element  */ }

                <  div id='emaDivEle' className={ styles.emailDiv } > { /* Email Div Element = This is the div containing the email label and input for the Contact Page Component form. */ }


                    < label id='emaLabEle' className={ styles.emailLabel } htmlFor='emaInpEle' >Email : </ label > { /* Email Label Element = This is the label for the email input in the Contact Page Component form. */ }


                    { /** Start Email Input Element  */ }

                    < input

                        id='emaInpEle'
                        className={ styles.emailInput }
                        name='email'
                        onChange={ handleInpChaFun }
                        required
                        type='email'
                        value={ forDatObj.emaStr }

                    /> { /* Email Input Element = This is the input for the email in the Contact Page Component form. */ }

                    { /** End Email Input Element  */ }


                </ div >

                { /** End Email Div Element  */ }



                { /** Start Message Div Element  */ }

                <  div id='mesDivEle' className={ styles.messageDiv } > { /* Message Div Element = This is the div containing the message label and textarea for the Contact Page Component form. */ }


                    < label id='mesLabEle' className={ styles.messageLabel } htmlFor='mesTeaEle' >Message : </ label > { /* Message Label Element = This is the label for the message textarea in the Contact Page Component form. */ }


                    { /** Start Message Textarea Element  */ }

                    < textarea

                        id='mesTeaEle'
                        className={ styles.messageTextarea }
                        name='message'
                        onChange={ handleInpChaFun }
                        required
                        rows={ 4 }
                        value={ forDatObj.mesStr }

                    /> { /* Message Textarea Element = This is the textarea for the message in the Contact Page Component form. */ }

                    { /** End Message Textarea Element  */ }


                </ div >

                { /** End Message Div Element  */ }



                < button id='subButEle' className={ styles.submitButton } type='submit' >Submit</ button > { /* Submit Button Element = This is the submit button for the Contact Page Component form. */ }


            </ fieldset >

            { /** End Form Fieldset Element  */ }


        </ form >

        // #endregion Component Form Element


    );


    return conPagComJsx;


    // #endregion Return Statement


};



export default ConPagCom;


