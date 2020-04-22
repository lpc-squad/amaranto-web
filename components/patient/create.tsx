import useSWR from "swr";
import db from "../../src/api";
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
  inputRowOfDate: {
    alignSelf: "end",
  },
}));

/**
 * TODO: Reemplazar esto con GraphQL
 * @param key El nombre de la colección
 */
async function fetchData(key) {
  const data = db.get(key).value();
  return data;
}

function CreatePatientComponent(props: any) {
  const classes = useStyles();
  const { data: coverageTemplate } = useSWR("coverageTemplate", fetchData);
  const [dataForm, setDataForm] = useState({
    birth_date: new Date(),
    gender: "",
  });

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
            {/* PRIMERA FILA */}
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

            {/* SEGUNDA FILA */}
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
            <Grid item md={2} className={classes.inputRowOfDate}>
              <TextField
                id="phone"
                name="phone"
                placeholder="Teléfono"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4} className={classes.inputRowOfDate}>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={4} className={classes.inputRowOfDate}>
              <TextField
                fullWidth
                id="address"
                name="address"
                placeholder="Dirección"
                onChange={handleChange}
              />
            </Grid>

            {/* TERCERA FILA */}
            <Grid item md={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="coverage_name">Cobertura</InputLabel>
                <Select id="coverage_name" name="coverage_name" defaultValue="">
                  {(coverageTemplate || []).length > 0 &&
                    coverageTemplate.map(({ coverage_name }, k) => (
                      <MenuItem key={k} value={coverage_name}>
                        {coverage_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="coverage_plan">Plan </InputLabel>
                <Select id="coverage_plan" name="coverage_plan" defaultValue="">
                  {(coverageTemplate || []).length > 0 &&
                    coverageTemplate.map(({ plan }, k) => (
                      <MenuItem key={k} value={plan}>
                        {plan}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <TextField
                fullWidth
                name="coverage_num"
                placeholder="Sin espacios"
                label="Número de credencial"
              />
            </Grid>
            <Grid item md={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="identification_type">Tipo</InputLabel>
                <Select
                  fullWidth
                  defaultValue=""
                  id="identification_type"
                  name="identification_type"
                >
                  <MenuItem value="DNI">DNI</MenuItem>
                  <MenuItem value="CI">Cédula de identidad</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <TextField
                fullWidth
                label="Número de documento"
                name="identification_number"
                placeholder="Sin puntos ni espacios"
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
