import { combineReducers } from "@reduxjs/toolkit";
import  CategorySlice  from "./CategorySlice";


const Slices = combineReducers({
    Categories: CategorySlice,
    
});

export default Slices;