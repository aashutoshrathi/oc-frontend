import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";

import ReviewList from "./ReviewList";

const RestaurantDetails = props => {
  const [open, setOpen] = useState(false);
  const { restaurant, loading, details } = props;

  const handleClose = () => {
    setOpen(false);
  };
  const openIt = () => {
    props.getDetails(restaurant.place_id);
    setOpen(true);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={openIt}>
        View More
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{restaurant.name}</DialogTitle>
        {loading ? (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <DialogContent>
            {details.opening_hours && details.opening_hours.open_now ? (
              <Chip label="Open Now" color="primary" />
            ) : (
              <Chip label="Closed for Now" color="secondary" />
            )}
            <div className="parent-row">
              <div className="details-row">
                <h3>Full Address:</h3>
                <span className="details-row-span">
                  {details.formatted_address}
                </span>
              </div>

              <div className="details-row">
                <h3>Phone Number:</h3>
                <span className="details-row-span">
                  {details.international_phone_number}
                </span>
              </div>

              <div className="details-row">
                <h3>Price Level:</h3>
                <span className="details-row-span">
                  {"₹".repeat(restaurant.price_level)}
                </span>
              </div>

              <div className="details-row">
                <h3>Average Rating:</h3>
                <span className="details-row-span">
                  {`${restaurant.rating} (${restaurant.user_ratings_total} users)`}
                </span>
              </div>
              {details.opening_hours ? (
                <div className="details-row">
                  <h3>Opening hours:</h3>
                  <span className="details-row-span">
                    {details.opening_hours.weekday_text.map((day, ind) => {
                      return <li key={ind}>{day}</li>;
                    })}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>

            <h2>More Reviews</h2>
            {details ? <ReviewList reviews={details.reviews} /> : ""}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Thanks!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RestaurantDetails;
