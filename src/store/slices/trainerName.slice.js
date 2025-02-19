import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
    name:'trainerName',
    initialState:'',
    reducers: {
        setTrainerName: (currenValue, action) => action.payload,
        }
});

export const { setTrainerName } = trainerNameSlice.actions;

export default trainerNameSlice.reducer; 