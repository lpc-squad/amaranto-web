import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Paper, Typography } from "@material-ui/core";
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
    <>
      <Typography variant="h2">Clinica Digital</Typography>
      <Typography variant="subtitle1">v0.1 - Alpha - Presentación</Typography>

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
    </>
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
