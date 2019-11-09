import {
  FETCH_BEGIN,
  FETCH_SUCCESS,
  FETCH_DETAIL_SUCCESS,
  FETCH_FAILURE,
  ADD_REVIEW,
  ADD_RESTAURANT,
  FILTER_RESTAURANTS
} from "./types";
import { API_URL, DETAIL_URL } from "../../config";

export const fetchRestaurants = (lat, long) => {
  return dispatch => {
    dispatch(fetchBegin());
    const localRestaurants = JSON.parse(
      localStorage.getItem("restaurants") || "[]"
    );
    fetch(`${API_URL}${lat}/${long}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        json = [...localRestaurants, ...json];
        dispatch(fetchSuccess(json));
        return json;
      })
      .catch(err => dispatch(fetchFailure(err)));
  };
};

export const fetchDetail = id => {
  return dispatch => {
    fetch(`${DETAIL_URL}${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(fetchDetailSuccess(json));
        return json;
      })
      .catch(err => console.log(err));
  };
};

export const addRestaurant = restaurant => {
  return dispatch => dispatch(addRestaurantAction(restaurant));
};

export const addReview = review => {
  return dispatch => dispatch(addReviewAction(review));
};

export const filterRestaurants = (min, max) => {
  return dispatch => dispatch(filterRestaurantsAction(min, max));
};



export const addReviewAction = review => ({
  type: ADD_REVIEW,
  payload: { review }
});

export const addRestaurantAction = restaurant => ({
  type: ADD_RESTAURANT,
  payload: { restaurant }
});

export const filterRestaurantsAction = (min, max) => ({
  type: FILTER_RESTAURANTS,
  payload: { min, max }
});

export const fetchBegin = () => ({
  type: FETCH_BEGIN
});

export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  payload: { data }
});

export const fetchDetailSuccess = data => ({
  type: FETCH_DETAIL_SUCCESS,
  payload: { data }
});

export const fetchFailure = err => ({
  type: FETCH_FAILURE,
  payload: { err }
});

const handleErrors = res => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};
