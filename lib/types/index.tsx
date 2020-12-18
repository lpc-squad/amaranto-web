import { Color } from "@material-ui/lab";

export interface ISnackbar {
  open: boolean;
  title: string;
  severity: Color;
  message: string;
}
