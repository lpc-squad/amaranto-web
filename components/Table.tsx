import {
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    heigth: 60,
    background: "none",
    position: "static",
  },
}));

function TableComponent(props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label={props.ariaTable || "patients table"}>
        <TableHead>
          <TableRow>
            {props.head.map((h, k) => (
              <TableCell key={k}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.content || (
            <TableRow>
              <TableCell colSpan={props.head.length}>
                <Backdrop open={props.loading} className={classes.backdrop}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
