type ClickCountArr = [ number, number ];

const initialClickCountArr : ClickCountArr = [ 0, 0 ];

interface ClickCountArrAction {

    type : string;

};

const defaultClickCountArrAction : ClickCountArrAction = {

    type : '',

};

export const clickCountArrIncrement = ( type : string ) : ClickCountArrAction => {

    return { type : type };

};

export const clickCountArrReducer = ( clickCountArr : ClickCountArr = initialClickCountArr, action : ClickCountArrAction = defaultClickCountArrAction) : ClickCountArr => {

    switch ( action.type ) {

        case 'clickCountArr/aboutCount' :
            return [ clickCountArr[0] + 1, clickCountArr[1] ];

        case 'clickCountArr/contactCount' :
            return [ clickCountArr[0], clickCountArr[1] + 1 ];

        default :
            return clickCountArr;

    }

};
