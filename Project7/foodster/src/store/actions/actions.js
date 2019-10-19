import { setRestaurant } from "../reducer/reducer.js";
import { API_URL } from "../../config.js";

export function getRestaurants(lat, long) {
  return dispatch =>
    fetch(`${API_URL}${lat}/${long}`)
      .then(res => res.json())
      .then(restaurant => dispatch(setRestaurant(restaurant)));
}
