import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MapContainer from "../src/components/MapContainer";
import RestaurantsList from "../src/components/RestaurantsList.js";

const drawerWidth = 360;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    toolbar: {
      textAlign: "center"
      // back
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0)
    }
  })
);

const App = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    location: {}
  });
  
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(function getCoords(loc) {
      setState({ location: loc.coords });
    });  
  }, [])
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" noWrap>
            Foodster
          </Typography>
        </Toolbar>
      </AppBar>

      <RestaurantsList location={state.location} />

      <main className={classes.content}>
        <MapContainer location={state.location} />
      </main>
    </div>
  );
};

export default connect(
  null,
  {}
)(App);
