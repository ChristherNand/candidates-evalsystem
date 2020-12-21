import React, { useState } from "react";
import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
  withStyles,
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";

const useStylesForPagination = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStylesForTable = makeStyles({
  table: {
    minWidth: 500,
    marginTop: 32,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TablePaginationActions = (props) => {
  /**
   * Styles
   */
  const classes = useStylesForPagination();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
};

export const CandidateRepositoriesList = ({ candidateData }) => {
  /**
   * State
   */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /**
   * Styles
   */
  const classes = useStylesForTable();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Language</StyledTableCell>
            <StyledTableCell>Default branch</StyledTableCell>
            <StyledTableCell>Url Git</StyledTableCell>
            <StyledTableCell>Repository name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidateData.length ? (
            (rowsPerPage > 0
              ? candidateData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : candidateData
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell className="table-cell-width">
                  {row.language}
                </TableCell>
                <TableCell className="table-cell-width">
                  {row.default_branch}
                </TableCell>
                <TableCell className="table-cell-width">
                  <a href={`${row.html_url}`}>{row.html_url}</a>
                </TableCell>
                <TableCell className="table-cell-width">{row.name}</TableCell>
                <TableCell className="table-cell-width">
                  {row.description}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                No data to show, please enter a valid user name
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              count={candidateData.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
