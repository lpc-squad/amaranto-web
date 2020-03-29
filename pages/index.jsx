import Link from "next/link";
import { Badge, Button, Grid, Paper, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import db from "../src/api";

function Index({ patients = [] }) {
  return (
    <Grid container direction="column" spacing={6}>
      <Alert severity="info">
        <AlertTitle>
          ¿Qué pensás de la aplicación? Dejanos tus comentarios por{" "}
          <a href="mailto:facundomgordillo@gmail.com?Subject=Clinical%20Record">
            Email
          </a>{" "}
          o <a href="">Twitter</a>
        </AlertTitle>
        Estamos en etapa de desarrollo de Clínica Digital. ¡Contamos con ustedes
        para formar la mejor solución!
      </Alert>
      <Grid item>
        <Badge
          badgeContent={"BETA"}
          color="secondary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <Typography variant="h2">Clinica Digital</Typography>
        </Badge>
      </Grid>
      <Grid item>
        <Grid container spacing={4} style={{ justifyContent: "center" }}>
          <Grid item>
            <Link href="/registers">
              <Button
                component="a"
                size="large"
                variant="contained"
                color="primary"
              >
                Crear registro
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/patients">
              <Button
                disabled
                component="a"
                size="large"
                variant="contained"
                color="secondary"
              >
                Crear nuevo paciente
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/">
              <Button component="a" size="large" variant="contained" disabled>
                Editar configuración
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table aria-label="patients table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.length > 0 &&
                patients.map((i, k) => <PatientRow key={k} patient={i} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

const PatientRow = ({ patient }) => (
  <TableRow>
    <TableCell>{patient.name}</TableCell>
    <TableCell>{patient.surname}</TableCell>
    <TableCell>
      <Link href="/patients/[id]" as={`/patients/${patient._id}`}>
        <Button variant="outlined" color="primary" component="a">
          Ver
        </Button>
      </Link>
    </TableCell>
  </TableRow>
);

Index.getInitialProps = ctx => {
  const patients = db
    .get("patients")
    .cloneDeep()
    .value();
  return {
    patients
  };
};

export default Index;
