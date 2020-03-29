import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import db from "../src/api";

function Index() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(db.get("patients").value());
  }, []);

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h2">Clinica Digital</Typography>
        <Typography variant="subtitle1">v0.1 - Alpha - Presentación</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={4} style={{ justifyContent: "center" }}>
          <Grid item>
            <Link href="/registers" prefetch>
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

export default Index;
