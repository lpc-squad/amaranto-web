import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle, Color } from "@material-ui/lab";
import { FunctionComponent } from "react";

interface SnackbarComponentProps {
  open?: boolean;
  title?: string;
  severity?: Color;
}

const SnackbarComponent: FunctionComponent<SnackbarComponentProps> = ({
  open,
  title,
  severity,
  children,
}) => (
  <Snackbar
    autoHideDuration={6000}
    open={open}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert color={severity}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  </Snackbar>
);

export default SnackbarComponent;
