import clickCountArrReducer from './components/NavBar/clickCountArrSlice.tsx';
import clickCountObjReducer from './components/NavBar/clickCountObjSlice.tsx';
import counterReducer from './features/counterSlice.tsx';
import { configureStore } from '@reduxjs/toolkit';



export interface State {

    counter : number;

    clickCountObj : {

        logoCount : number;
        homeCount : number;

    };

    clickCountArr : [ number, number ];

};



export const store = configureStore(

    {

        reducer : {

            counter : counterReducer,
            clickCountObj: clickCountObjReducer,
            clickCountArr: clickCountArrReducer,

        },

    }

);
