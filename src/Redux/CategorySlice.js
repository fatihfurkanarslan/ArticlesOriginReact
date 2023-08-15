import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanse from "./Axios";
import AxiosErrorHelper from "../Utils/ErrorHelper";



export const GetCategories = createAsyncThunk(
    'Category/GetCategories',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(process.env.REACT_APP_BACKEND_URL, "category/getcategories");
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCategorynotification(errorPayload));
            throw errorPayload;
        }
    }
);


export const CategorySlice = createSlice({
    name: 'Category',
    initialState: {
        list: [],
        selected_record: {},
        errMsg: null,
        notifications: [],
        isLoading: false,
        isDispatching: false,
        isDeletemodalopen: false
    },
    reducers: {
        handleSelectedCategory: (state, action) => {
            state.selected_record = action.payload;
        },
        fillCategorynotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeCategorynotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(GetCategories.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
        }
})
export const {
    handleSelectedCategory,
    fillCategorynotification,
    removeCategorynotification,
    handleDeletemodal
} = CategorySlice.actions;

export default CategorySlice.reducer;