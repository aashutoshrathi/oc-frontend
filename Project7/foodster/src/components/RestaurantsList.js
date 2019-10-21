import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { fetchRestaurants } from "../store/actions/actions.js";
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
  let hotels = [];
  const classes = useStyles();
  const { latitude, longitude } = props.location;

  useEffect(() => {
    props.dispatch(fetchRestaurants(latitude, longitude));
  }, [latitude, longitude, props]);

  const { error, loading, restaurants } = props;

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
  restaurants: state.data,
  error: state.error,
  loading: state.loading
});

export default connect(mapStateToProps)(RestaurantsList);
