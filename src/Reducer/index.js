import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "../Slices/cartSlice";
import authReducre from '../Slices/authSlice'
import profileSlice from "../Slices/profileSlice";

const rootReducer = combineReducers({
    auth: authReducre,
    profile: profileSlice,
    cart: cartSlice,
})

export default rootReducer