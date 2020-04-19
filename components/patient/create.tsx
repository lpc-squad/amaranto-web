import { useState } from "react";
import PropTypes from "prop-types";
import "date-fns";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function CreatePatientComponent(props: any) {
  const [dataForm, setDataForm] = useState({
    birth_date: new Date(),
    gender: "",
  });
  const classes = useStyles();

  function handleChange(e: React.ChangeEvent<{ value: any; name: string }>) {
    const { name, value } = e.target;
    setDataForm((dataForm) => ({
      ...dataForm,
      [name]: value,
    }));
  }

  function handleDateChange(date: Date | null) {
    setDataForm((dataForm) => ({ ...dataForm, birth_date: date }));
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Typography className={classes.title} variant="h3" component="h2">
        Crear paciente
      </Typography>
      <Paper className={classes.paper}>
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={5}>
              <TextField
                required
                fullWidth
                label="Nombre(s)"
                name="first_name"
                onChange={handleChange}
                placeholder="Maria Luciana"
              />
            </Grid>
            <Grid item sm={5}>
              <TextField
                required
                fullWidth
                id="last_name"
                name="last_name"
                label="Apellido(s)"
                onChange={handleChange}
                placeholder="Lopez Ortega"
              />
            </Grid>
            <Grid item sm={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="gender">Género</InputLabel>
                <Select id="gender" name="gender" defaultValue="">
                  <MenuItem value="" disabled>
                    Género
                  </MenuItem>
                  <MenuItem value="M">Masculino</MenuItem>
                  <MenuItem value="F">Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                value={dataForm.birth_date}
                format="dd/MM/yyyy"
                onChange={handleDateChange}
                id="date-picker-inline"
                label="Fecha de nacimiento"
                KeyboardButtonProps={{
                  "aria-label": "cambiar fecha",
                }}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                id="phone"
                name="phone"
                placeholder="Teléfono"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                id="address"
                name="address"
                placeholder="Dirección"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4}>
              <FormControl className={classes.formControl}>
                <InputLabel id="coverage-list">Cobertura</InputLabel>
                <Select
                  id="coverage-list"
                  name="coverage_name"
                  onChange={handleChange}
                >
                  <MenuItem>OSDE</MenuItem>
                  <MenuItem>OSBA</MenuItem>
                  <MenuItem>IOMA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={8}>
              <TextField
                name="coverage_num"
                placeholder="Número de credencial"
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={props.handleSubmit}
              >
                Crear paciente
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}

CreatePatientComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default CreatePatientComponent;
