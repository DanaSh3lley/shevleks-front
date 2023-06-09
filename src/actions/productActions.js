import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";

export const GET_CATALOG_REQUEST = "GET_CATALOG_REQUEST";
export const GET_CATALOG_SUCCESS = "GET_CATALOG_SUCCESS";
export const GET_CATALOG_ERROR = "GET_CATALOG_ERROR";

export const getCatalogRequest = () => ({
  type: GET_CATALOG_REQUEST,
});

export const getCatalogSuccess = (data) => ({
  type: GET_CATALOG_SUCCESS,
  payload: data,
});

export const getCatalogError = (error) => ({
  type: GET_CATALOG_ERROR,
  payload: error,
});

export const getCatalog = (data) => (dispatch, getState) => {
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      data[key] = value.join(",");
    }
    if (!data[key]) delete data[key];
  });

  const newParams = Object(data)
  if (!getState().product.isLoading) {
    dispatch(getCatalogRequest());
    axios
      .get(`${config[process.env.NODE_ENV].apiEndpoint}/products/catalog`, {
        params: newParams,
      })
      .then((response) => {
        dispatch(getCatalogSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getCatalogError(error));
      });
  }
};
export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";
export const ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_ERROR = "ADD_REVIEW_ERROR";

export const getProductRequest = () => ({
  type: GET_PRODUCT_REQUEST,
});

export const getProductSuccess = (data) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductError = (error) => ({
  type: GET_PRODUCT_ERROR,
  payload: error,
});

export const addReviewRequest = () => ({
  type: ADD_REVIEW_REQUEST,
});

export const addReviewSuccess = (data) => ({
  type: ADD_REVIEW_SUCCESS,
  payload: data,
});

export const addReviewError = (error) => ({
  type: ADD_REVIEW_ERROR,
  payload: error,
});

export const getProduct = (productId) => (dispatch, getState) => {
  if (!getState().product.isLoading) {
    dispatch(getProductRequest());
    axios
      .get(`${config[process.env.NODE_ENV].apiEndpoint}/products/${productId}`)
      .then((response) => {
        dispatch(getProductSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getProductError(error));
      });
  }
};

export const addReview = (data) => (dispatch, getState) => {
  const token = Cookies.get("token");
  const { product } = getState();
  const { isLoading } = product;
  if (!isLoading) {
    dispatch(addReviewRequest());
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${config[process.env.NODE_ENV].apiEndpoint}/reviews`, data, {
        headers,
      })
      .then(() => {
        dispatch(addReviewSuccess());
        dispatch(getProduct(product.product.id));
      })
      .catch((error) => {
        dispatch(addReviewError(error));
      });
  }
};
