import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { string, bool, any } from "prop-types";

function SnackbarComponent(props) {
  return (
    <Snackbar
      autoHideDuration={6000}
      open={props.open || false}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      {...props}
    >
      <Alert color={props.severity}>
        {props.title && <AlertTitle>{props.title}</AlertTitle>}
        {props.children}
      </Alert>
    </Snackbar>
  );
}

SnackbarComponent.propTypes = {
  open: bool,
  title: any,
  severity: any, // TODO: Must controlate
  children: string.isRequired,
};

export default SnackbarComponent;
