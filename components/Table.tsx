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
import { FunctionComponent, ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    heigth: 60,
    background: "none",
    position: "static",
  },
}));

interface TableComponentProps {
  ariaTable?: string;
  head: ReactNode[];
  content?: ReactNode;
  loading?: boolean;
}

const TableComponent: FunctionComponent<TableComponentProps> = ({
  ariaTable = "patients table",
  head,
  loading,
  content,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label={ariaTable}>
        <TableHead>
          <TableRow>
            {head.map((h, k) => (
              <TableCell key={k}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content || (
            <TableRow>
              <TableCell colSpan={head.length}>
                <Backdrop open={loading} className={classes.backdrop}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
