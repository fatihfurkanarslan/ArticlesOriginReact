import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanse from "./Axios";
import AxiosErrorHelper from "../Utils/ErrorHelper";


export const GetCategory = createAsyncThunk(
    'Category/GetCategory',
    async (id, { dispatch }) => {
        try {
            const response = await instanse.get(process.env.REACT_APP_BACKEND_URL, "category/getcategory/" + id);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCategorynotification(errorPayload));
            throw errorPayload;
        }
    }
);

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

export const RemoveCategory = createAsyncThunk(
    'Category/RemoveCategory',
    async (categoryId, { dispatch }) => {
        try {
            const response = await instanse.post(process.env.REACT_APP_BACKEND_URL, "category/delete/" + categoryId);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCategorynotification(errorPayload));
            throw errorPayload;
        }
    }
);


export const UpdateCategory = createAsyncThunk(
    'Category/UpdateCategory',
    async ({data,history},  { dispatch }) => {
        try {
            const response = await instanse.post(process.env.REACT_APP_BACKEND_URL, "category/update", data);
            dispatch(fillCategorynotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Kategori başarı ile güncellendi',
            }));
            history.push('/AllCategories')
            return response.data;
        } catch (error) {
            console.log('error: ', error);
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
            .addCase(RemoveCategory.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                //state.list = [];
            })
            .addCase(RemoveCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(RemoveCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(UpdateCategory.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                //state.list = [];
            })
            .addCase(UpdateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(UpdateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCategory.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record={}
            })
            .addCase(GetCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetCategory.rejected, (state, action) => {
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