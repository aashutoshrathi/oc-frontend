import { SET_RESTAURANT } from "../actions/types";

export function setRestaurant(restaurant) {
  return {
    type: SET_RESTAURANT,
    restaurant
  };
}
