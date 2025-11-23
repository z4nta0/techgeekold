import { createAsyncThunk, createSlice, type ActionReducerMapBuilder } from "@reduxjs/toolkit";



export const loadData = createAsyncThunk(

  "data/getData",

  async () => {

    const data = await fetch('../../mock-backend/data.json');
    const json = await data.json();

    return json;

  },

);



interface Data {

    message : string;
};

const data = {

    message : 'Fetching data from API...',

};

interface State {

    data      : Data;
    isLoading : boolean;
    hasError  : boolean;

};

const initialState : State = {

    data      : data,
    isLoading : false,
    hasError  : false,

};

interface Action {

    payload : {

        message : string;

    };

};



interface Options {

    name          : string;
    initialState  : State;
    reducers      : {};
    extraReducers : ( builder : ActionReducerMapBuilder<State> ) => void;
    /*extraReducers : {

        [loadData.pending]    : ( state : State )                  => void;
        [loadData.fulfilled]  : ( state : State, action : Action ) => void;
        [loadData.rejected]   : ( state : State )                  => void;

    };*/

};

const sliceOptions : Options = {

  name          : 'data',

  initialState  : initialState,

  reducers      : {},

  extraReducers : ( builder ) => {

        builder

            .addCase(loadData.pending, ( state : State ) => {

                state.isLoading = true;
                state.hasError  = false;

            })

            .addCase(loadData.fulfilled, ( state : State, action : Action ) => {

                state.isLoading = false;
                state.hasError  = false;
                state.data      = action.payload;

            })

            .addCase(loadData.rejected, ( state : State ) => {

                state.isLoading = false;
                state.hasError  = true;

            });

    /*[loadData.pending]   : ( state ) => {
      state.isLoading = true;
      state.hasError  = false;
    },

    [loadData.fulfilled] : ( state, action ) => {
      state.isLoading = false;
      state.hasError  = false;
      state.data      = action.payload;
    },

    [loadData.rejected]  : ( state ) => {
      state.isLoading = false;
      state.hasError  = true;
    },*/

  },

};

export const loadDataSlice = createSlice(sliceOptions);

export default loadDataSlice.reducer;
