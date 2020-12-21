import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  withStyles,
  TextField,
} from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Cookies from "universal-cookie";

import { EnhancedDialog } from "../../shared/index";

const DialogActions = withStyles(() => ({
  root: {
    marginRight: 16,
  },
}))(MuiDialogActions);

export const CandidateEvaluationModal = ({ open, closeModal }) => {
  const initialState = {
    id: "",
    name: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    githubUser: "",
  };
  /**
   * State
   */
  const [userInfo, setUserInfo] = useState({ ...initialState });

  const onCleanModal = () => {
    setUserInfo({ ...initialState });
  };

  useEffect(() => {
    onCleanModal(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onHandleChange = (event) => {
    const value = event.target.value;
    setUserInfo({ ...userInfo, [event.target.name]: value });
  };

  const onHandleSave = () => {
    const cookies = new Cookies();
    cookies.set("id", userInfo.id);
    cookies.set("name", userInfo.name);
    cookies.set("lastname", userInfo.lastname);
    cookies.set("dateOfBirth", userInfo.dateOfBirth);
    cookies.set("githubUser", userInfo.githubUser);
    closeModal();
  };

  return (
    <EnhancedDialog
      open={open}
      onClose={closeModal}
      title={"Candidate Information"}
    >
      <DialogContent>
        <TextField
          className="mt-16"
          fullWidth
          label="Name"
          name="name"
          onChange={onHandleChange}
          value={userInfo.name}
          variant="outlined"
        />
        <TextField
          className="mt-16"
          fullWidth
          label="Lastname"
          name="lastname"
          onChange={onHandleChange}
          value={userInfo.lastname}
          variant="outlined"
        />
        <TextField
          className="mt-16"
          fullWidth
          label="Id number"
          name="id"
          onChange={onHandleChange}
          value={userInfo.id}
          variant="outlined"
        />
        <TextField
          className="mt-16"
          fullWidth
          label="Date of birth"
          name="dateOfBirth"
          onChange={onHandleChange}
          value={userInfo.dateOfBirth}
          variant="outlined"
        />
        <TextField
          className="mt-16"
          fullWidth
          label="Email address"
          name="email"
          onChange={onHandleChange}
          value={userInfo.email}
          variant="outlined"
        />
        <TextField
          className="mt-16"
          fullWidth
          label="Github user"
          name="githubUser"
          onChange={onHandleChange}
          value={userInfo.githubUser}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions className="mb-16">
        <Button color="primary" variant="outlined" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onHandleSave}>
          Add
        </Button>
      </DialogActions>
    </EnhancedDialog>
  );
};
