import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

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

export default SnackbarComponent;
