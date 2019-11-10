import React, { useEffect } from "react";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import {
  fetchRestaurants,
  addRestaurant,
  filterRestaurants
} from "../store/actions/actions.js";
import RestaurantCard from "./RestaurantCard";
import Filter from "./Filter.js";

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
  const { fetchRestaurants } = props;

  useEffect(() => {
    fetchRestaurants(latitude, longitude);
  }, [fetchRestaurants, latitude, longitude]);

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
          <Filter filter={props.filterRestaurants} />
        </div>

        <Divider />
        {loading ? (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          ""
        )}
        {error ? "Error" : ""}
        {restaurants ? (
          <List>
            {restaurants.map(restaurant => (
              <ListItem button key={restaurant.place_id} disableRipple>
                <RestaurantCard restaurant={restaurant}></RestaurantCard>
              </ListItem>
            ))}
          </List>
        ) : (
          ""
        )}
      </Drawer>
    </>
  );
};

const mapStateToProps = state => ({
  restaurants: state.reducer.filteredData,
  error: state.reducer.error,
  loading: state.reducer.loading
});

export default connect(
  mapStateToProps,
  { fetchRestaurants, addRestaurant, filterRestaurants }
)(RestaurantsList);
