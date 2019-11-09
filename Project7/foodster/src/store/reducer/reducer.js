import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  ADD_REVIEW,
  ADD_RESTAURANT,
  FILTER_RESTAURANTS
} from "../actions/types";

const initialState = {
  data: [],
  loading: false,
  reviews: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      // const restrauntId = action.payload.review.restrauntId;
      // data.forEach(res => {
      //   if(res.placeId === restrauntId) {

      //   }

      // })
      return {
        ...state,
        reviews: [...state.reviews, action.payload.review]
      };
    case ADD_RESTAURANT:
      return {
        ...state,
        data: [...state.data, action.payload.restaurant]
      };
    case FILTER_RESTAURANTS:
      const { min, max } = action.payload;
      const newRestaurants = state.data.filter(
        restaurant => restaurant.rating >= min && restaurant.rating <= max
      );
      return {
        ...state,
        data: newRestaurants
      };
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
