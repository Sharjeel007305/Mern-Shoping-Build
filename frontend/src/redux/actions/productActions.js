import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST});

        const { data } = await axios.get("/api/products");
        dispatch ({
            type: actionTypes.GET_PRODUCTS_SUCCESS,
            payload: data,
        });
    }
    catch(error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.message,
        });
    }
};

export const getProductsDetails = (id) => async (dispatch) => {
    try{
        console.log(id)
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch ({
            type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch(error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message 
            : error.message,
        });
    }
};

export const createProduct = (productData) => async (dispatch) => {
    try {
        const isFormData = typeof FormData !== "undefined" && productData instanceof FormData;
        const { data } = await axios.post("/api/products", productData, isFormData ? {
            headers: { "Content-Type": "multipart/form-data" },
        } : undefined);
        await dispatch(getProducts());
        return data;
    } catch (error) {
        throw new Error(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/products/${id}`);
        await dispatch(getProducts());
    } catch (error) {
        throw new Error(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_RESET
    });
};