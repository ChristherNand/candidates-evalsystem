import React, { useState, useEffect } from "react";
import {
  Button,
  OutlinedInput as Input,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import debounce from "lodash/debounce";

import {
  CandidateEvaluationModal,
  CandidateInformation,
  CandidateRepositoriesList,
} from "./components/index";

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    width: "50%",
  },
});

const App = () => {
  /**
   * State
   */
  const [searchText, setSearchText] = useState("");
  const [candidateData, setCandidateData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Styles
   */
  const classes = useStyles();

  useEffect(() => {
    fetch(`https://api.github.com/users/${searchText}/repos`)
      .then((response) => response.json())
      .then((data) => setCandidateData(data));
  }, [searchText]);

  const setSearchCriteria = debounce((criteria) => {
    setSearchText(criteria);
  }, 400);

  const handleSearch = (event) => {
    const searchedValue = event.target.value;
    if (searchedValue.length >= 3) {
      setSearchCriteria(searchedValue);
    } else {
      setSearchText("");
    }
  };

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <div className="flex align-items-center">
        <CandidateEvaluationModal open={modalOpen} closeModal={closeModal} />
        <Button color="primary" onClick={openModal} variant="contained">
          Evaluate candidate
        </Button>
        <Input
          classes={{
            root: classes.root,
          }}
          defaultValue={searchText}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          onChange={handleSearch}
          placeholder="Search"
          variant="outlined"
        />
      </div>
      <CandidateInformation />
      <CandidateRepositoriesList
        candidateData={candidateData}
        searchedText={searchText}
      />
    </div>
  );
};

export default App;
