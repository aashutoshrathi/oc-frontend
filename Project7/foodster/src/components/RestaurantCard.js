import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import AddReviewForm from "./AddReviewForm";
import ReviewList from "./ReviewList";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
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

export default function RestaurantCard(props) {
  const classes = useStyles();
  const [state, setState] = useState(0);
  const { restaurant } = props;
  var title = restaurant.name;
  const reviews = JSON.parse(localStorage.getItem(restaurant.place_id) || "[]");
  // console.log(reviews);

  const refresh = () => {
    console.log(state);
    setState(1);
  };

  if (restaurant.price_level) {
    title += ` • ${"₹".repeat(restaurant.price_level)}`;
  }
  if (restaurant.rating) {
    title += ` • ${restaurant.rating} Stars `;
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
        ""
      )}
      <CardActions disableSpacing>
        <AddReviewForm
          refresh={refresh}
          restaurant={restaurant.name}
          stars={restaurant.rating}
          id={restaurant.place_id}
        />
      </CardActions>
      <ReviewList reviews={reviews} />
    </Card>
  );
}
