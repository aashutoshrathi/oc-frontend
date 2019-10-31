import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import RateReviewIcon from "@material-ui/icons/RateReview";

export default function AddReviewForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    const name = document.getElementById(`name-${props.id}`).value;
    const comment = document.getElementById(`comment-${props.id}`).value;
    const title = document.getElementById(`title-${props.id}`).value;
    const rating = getRating();

    const review = { name, comment, title, rating };

    var oldReviews = JSON.parse(localStorage.getItem(props.id) || "[]");
    oldReviews.push(review);

    window.localStorage.setItem(props.id, JSON.stringify(oldReviews));

    setOpen(false);
    props.refresh();
  };

  return (
    <div>
      <IconButton aria-label="Add Review" onClick={handleClickOpen}>
        <RateReviewIcon />
      </IconButton>
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
            id={`title-${props.id}`}
            label="Title"
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
}
