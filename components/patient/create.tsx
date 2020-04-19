import "date-fns";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function CreatePatientComponent(props: any) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper style={{ width: "100%" }}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <TextField name="first_name" placeholder="Nombre(s)" />
          </Grid>
          <Grid item>
            <TextField name="last_name" placeholder="Apellido(s)" />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="gender">Género</InputLabel>
              <Select id="gender" name="gender">
                <MenuItem>Masculino</MenuItem>
                <MenuItem>Femenino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <KeyboardDatePicker
              onChange={() => console.log("alo")}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              value={new Date()}
              id="date-picker-inline"
              label="Fecha de nacimiento"
              KeyboardButtonProps={{
                "aria-label": "cambiar fecha",
              }}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="coverage-list">Cobertura</InputLabel>
              <Select id="coverage-list" name="coverageId">
                <MenuItem>OSDE</MenuItem>
                <MenuItem>OSBA</MenuItem>
                <MenuItem>IOMA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}

export default CreatePatientComponent;
