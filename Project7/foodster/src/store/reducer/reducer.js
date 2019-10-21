import { FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAILURE } from "../actions/types";

const initialState = {
  data: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
        data: []
      };
    default:
      return state;
  }
};

export default reducer;
