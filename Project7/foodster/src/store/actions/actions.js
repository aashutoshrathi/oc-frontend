import { FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAILURE, ADD_REVIEW } from "./types";
import { API_URL } from "../../config";

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

export const addReview = (rating, name, title, comment, restaurantId) => {
  const review = { name, rating, title, comment, restaurantId };
  return dispatch => {
    dispatch(addReviewAction(review));
    return review;
  };
};

export const addReviewAction = review => ({
  type: ADD_REVIEW,
  payload: { review }
});

export const fetchBegin = () => ({
  type: FETCH_BEGIN
});

export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
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
