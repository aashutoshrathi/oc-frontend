import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const AddReviewForm = ({ show, close }) => {
  const [state, setState] = useState({ openDialog: show });
  const handleOpenDialog = () => {
    setState({
      openDialog: true
    });
  };

  const handleCloseDialog = () => {
    setState({
      openDialog: false
    });
  };
  const showHideClassName = show ? "display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <Button colored onClick={handleOpenDialog} raised ripple>
        Show Dialog
      </Button>
      <Dialog open={state.openDialog} onCancel={handleCloseDialog}>
        <DialogTitle>Allow data collection?</DialogTitle>
        <DialogContent>
          <p>
            Allowing us to collect data will let us get you the information you
            want faster.
          </p>
        </DialogContent>
        <DialogActions>
          <Button type="button">Agree</Button>
          <Button type="button" onClick={handleCloseDialog}>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddReviewForm;
