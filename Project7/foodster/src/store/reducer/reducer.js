import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  ADD_REVIEW,
  ADD_RESTAURANT,
  FETCH_DETAIL_BEGIN,
  FETCH_DETAIL_SUCCESS,
  FILTER_RESTAURANTS
} from "../actions/types";

const initialState = {
  data: [],
  loading: false,
  reviews: [],
  error: null,
  detailLoading: false,
  filteredData: [],
  details: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      const restrauntId = action.payload.review.restrauntId;
      const rating = action.payload.review.rating;
      const newData = state.data.map(res => {
        if (res.placeId === restrauntId) {
          const newNumber = res.user_ratings_total + 1;
          const newRating =
            (res.rating * res.user_ratings_total + rating) / newNumber;
          return { ...res, rating: newRating, user_ratings_total: newNumber };
        }
        return res;
      });

      const newFilteredData = state.filteredData.map(res => {
        if (res.placeId === restrauntId) {
          const newNumber = res.user_ratings_total + 1;
          const newRating =
            (res.rating * res.user_ratings_total + rating) / newNumber;
          return { ...res, rating: newRating, user_ratings_total: newNumber };
        }
        return res;
      });
      return {
        ...state,
        data: newData,
        filteredData: newFilteredData,
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
        filteredData: newRestaurants
      };
    case FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_DETAIL_BEGIN:
      return {
        ...state,
        detailLoading: true,
        error: null
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        details: action.payload.data
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        filteredData: action.payload.data
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
        data: [],
        filteredData: []
      };
    default:
      return state;
  }
};

export default reducer;
