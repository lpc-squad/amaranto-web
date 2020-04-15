import { arrayOf, oneOfType, string, object } from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";

function TableComponent(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label={props.ariaTable || "patients table"}>
        <TableHead>{props.head}</TableHead>
        <TableBody>{props.content}</TableBody>
      </Table>
    </TableContainer>
  );
}

TableComponent.propTypes = {
  ariaTable: string,
  head: object.isRequired,
  content: oneOfType([arrayOf(object), object]).isRequired,
};

export default TableComponent;
