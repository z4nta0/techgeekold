import clickCountArrReducer from './components/NavBar/clickCountArrSlice.tsx';
import clickCountObjReducer from './components/NavBar/clickCountObjSlice.tsx';
import counterReducer from './features/counterSlice.tsx';
import { configureStore } from '@reduxjs/toolkit';
import loadDataReducer from './dataSlice.tsx';



export interface State {

    couStaNum : number;

    clickCountObj : {

        logoCount : number;
        homeCount : number;

    };

    clickCountArr : [ number, number ];

    loadData      : {

        data : {
            message : string;
        };

        isLoading : boolean;
        hasError  : boolean;

    };

};



export const store = configureStore(

    {

        reducer : {

            couStaNum     : counterReducer,
            clickCountObj : clickCountObjReducer,
            clickCountArr : clickCountArrReducer,
            loadData      : loadDataReducer

        },

    }

);
