import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

import AddReviewForm from "./AddReviewForm";
import RestaurantDetails from "./RestaurantDetail";
import { addReview, fetchDetail } from "../store/actions/actions.js";
import ReviewList from "./ReviewList";
import { refPic } from "../config";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    minWidth: 275
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const RestaurantCard = props => {
  const classes = useStyles();
  const { restaurant } = props;
  var title = restaurant.name;
  const reviews = props.reviews.filter(
    res => res.restaurantId === restaurant.place_id
  );

  if (restaurant.price_level) {
    title += ` • ${"₹".repeat(restaurant.price_level)}`;
  }
  if (restaurant.rating) {
    title += ` • ${Math.round(restaurant.rating * 100) / 100} Stars `;
  }
  if (restaurant.user_ratings_total) {
    title += `(${restaurant.user_ratings_total} reviews)`;
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {restaurant.name[0]}
          </Avatar>
        }
        title={title}
        subheader={restaurant.vicinity.substring(0, 42)}
      />
      {restaurant.photos ? (
        <CardMedia
          className={classes.media}
          image={refPic(restaurant.photos[0].photo_reference)}
          title={restaurant.name}
        />
      ) : (
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAyirtv.jpg"
          title={restaurant.name}
        />
      )}
      <CardActions disableSpacing>
        <AddReviewForm
          restaurant={restaurant.name}
          stars={restaurant.rating}
          id={restaurant.place_id}
          addReview={props.addReview}
        />
        <RestaurantDetails
          restaurant={restaurant}
          loading={props.loading}
          getDetails={props.fetchDetail}
          details={props.details}
        />
      </CardActions>
      <ReviewList reviews={reviews} />
    </Card>
  );
};

const mapStateToProps = state => ({
  reviews: state.reducer.reviews,
  loading: state.reducer.detailLoading,
  details: state.reducer.details
});

export default connect(
  mapStateToProps,
  { addReview, fetchDetail }
)(RestaurantCard);
