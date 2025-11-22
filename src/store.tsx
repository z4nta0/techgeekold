import { combineReducers, createStore } from 'redux';
import { clickCountArrReducer } from './components/NavBar/clickCountArrSlice.tsx';
import { clickCountObjReducer } from './components/NavBar/clickCountObjSlice.tsx';
import { counterReducer } from './features/counterSlice.tsx';



export interface State {

    counter : number;

    clickCountObj : {

        logoCount : number;
        homeCount : number;

    };

    clickCountArr : [ number, number ];

};



const reducers = {

    counter : counterReducer,
    clickCountObj : clickCountObjReducer,
    clickCountArr : clickCountArrReducer,

};

export const store = createStore( combineReducers( reducers ) );
