import React from "react";
import Cookies from "universal-cookie";
import Typography from "@material-ui/core/Typography";

export const CandidateInformation = () => {
  const cookies = new Cookies();
  return (
    <div>
      <Typography variant="subtitle2">
        Candidate Id Number : {cookies.get("id")}
      </Typography>
      <Typography variant="subtitle2">
        Candidate Name : {cookies.get("name")}
      </Typography>
      <Typography variant="subtitle2">
        Candidate lastname : {cookies.get("lastname")}
      </Typography>
      <Typography variant="subtitle2">
        Candidate date of Birth : {cookies.get("dateOfBirth")}
      </Typography>
      <Typography variant="subtitle2">
        Candidate Email : {cookies.get("email")}
      </Typography>
      <Typography variant="subtitle2">
        Candidate Github user : {cookies.get("githubUser")}
      </Typography>
    </div>
  );
};
