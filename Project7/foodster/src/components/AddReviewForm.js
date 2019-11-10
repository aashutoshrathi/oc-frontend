import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddReviewForm = props => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getRating = () => {
    for (let i = 5; i > 0; i--) {
      const elId = `star-${i}`;
      if (document.getElementById(elId).checked) {
        return i;
      }
    }
    return 0;
  };

  const submitReview = () => {
    const author_name = document.getElementById(`name-${props.id}`).value;
    const text = document.getElementById(`comment-${props.id}`).value;
    const rating = getRating();
    const time = new Date();
    const review = { author_name, text, rating, restaurantId: props.id, time };

    props.addReview(review);

    setOpen(false);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Add Review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add Review for {props.restaurant}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            That's great that you have been to this restaurant and want to help
            others by lettting them know your experience, go ahead. <br />
            {props.stars
              ? `The restaurant is currently rated ${props.stars} stars`
              : " "}
            .
          </DialogContentText>

          <div className="stars">
            <form action="">
              <input
                className="star star-5"
                id="star-5"
                type="radio"
                name="star"
              />
              <label className="star star-5" htmlFor="star-5"></label>
              <input
                className="star star-4"
                id="star-4"
                type="radio"
                name="star"
              />
              <label className="star star-4" htmlFor="star-4"></label>
              <input
                className="star star-3"
                id="star-3"
                type="radio"
                name="star"
              />
              <label className="star star-3" htmlFor="star-3"></label>
              <input
                className="star star-2"
                id="star-2"
                type="radio"
                name="star"
              />
              <label className="star star-2" htmlFor="star-2"></label>
              <input
                className="star star-1"
                id="star-1"
                type="radio"
                name="star"
              />
              <label className="star star-1" htmlFor="star-1"></label>
            </form>
          </div>

          <TextField
            autoFocus
            margin="dense"
            id={`name-${props.id}`}
            label="Your Name"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id={`comment-${props.id}`}
            multiline
            rows="2"
            label="Comment"
            type="text"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitReview} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddReviewForm;
