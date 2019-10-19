import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { getRestaurants } from "../store/actions/actions.js";

import hotels from "../data/hotels.js";
import RestaurantCard from "./RestaurantCard";

const drawerWidth = 360;

const useStyles = makeStyles(theme =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: {
      textAlign: "center"
    }
  })
);

const RestaurantsList = props => {
  const classes = useStyles();
  const { latitude, longitude } = props.location;
  props.getRestaurants(latitude, longitude);
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <h2>Restaurants List</h2>
        </div>

        <Divider />

        <List>
          {hotels.map((hotel, index) => (
            <ListItem button key={index}>
              <RestaurantCard hotel={hotel}></RestaurantCard>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

const mapStateToProps = state => ({
  state: state
});

export default connect(
  mapStateToProps,
  { getRestaurants }
)(RestaurantsList);
