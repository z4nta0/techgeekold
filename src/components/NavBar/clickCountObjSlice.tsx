interface ClickCountObj {

    logoCount : number;
    homeCount : number;

};

const initialClickCountObj : ClickCountObj = {

    logoCount : 0,
    homeCount : 0,

};

interface ClickCountObjAction {

    type : string;

};

const defaultClickCountObjAction : ClickCountObjAction = {

    type : '',

};

export const clickCountObjIncrement = ( type : string ) : ClickCountObjAction => {

    return { type : type };

};

export const clickCountObjReducer = ( clickCountObj : ClickCountObj = initialClickCountObj, action : ClickCountObjAction = defaultClickCountObjAction) : ClickCountObj => {

    switch ( action.type ) {

        case 'clickCountObj/logoCount' :
            return {
                ...clickCountObj,
                logoCount : clickCountObj.logoCount + 1,
            };

        case 'clickCountObj/homeCount' :
            return {
                ...clickCountObj,
                homeCount : clickCountObj.homeCount + 1,
            };

        default :
            return clickCountObj;

    };

};
