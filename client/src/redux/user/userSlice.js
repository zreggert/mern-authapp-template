import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.eroor = action.payload
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } 
    }
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
 } = userSlice.actions;

export default userSlice.reducer;