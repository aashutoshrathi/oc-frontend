import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { refPic } from "../config";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RestaurantCard(props) {
  const classes = useStyles();
  const { restaurant } = props;
  var title = restaurant.name;
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
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent> */}
    </Card>
  );
}
