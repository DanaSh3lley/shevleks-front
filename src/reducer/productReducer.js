import {
  ADD_REVIEW_ERROR,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  GET_CATALOG_ERROR,
  GET_CATALOG_REQUEST,
  GET_CATALOG_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from "../actions/productActions";

const initialState = {
  catalog: [],
  volumes: [],
  categories: [],
  product: null,
  maxPrice: 999999,
  minPrice: 0,
  error: null,
  isLoading: false,
  totalPages: 0,
  currentPage: 1,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATALOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_CATALOG_SUCCESS:
      return {
        ...state,
        catalog: action.payload.data.data,
        categories: action.payload.data.categories,
        volumes: action.payload.data.volumes,
        maxPrice: action.payload.data.maxPrice,
        minPrice: action.payload.data.minPrice,
        isLoading: false,
        error: null,
        totalPages: action.payload.data.total,
        currentPage: action.payload.data.page,
      };
    case GET_CATALOG_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        product: null,
        isLoading: true,
        error: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload.data.data,
        isLoading: false,
        error: null,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_REVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default productReducer;
