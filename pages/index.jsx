import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import db from "../src/api";

const useStyles = makeStyles(theme => ({
  list: {
    maxWidth: 360
  }
}));

function Index() {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setPatients(db.get("patients").value());
  }, []);

  function toggleDrawer() {
    setDrawerOpen(d => !d);
  }

  return (
    <Container>
      <Typography>Hola mundo</Typography>
      <Button onClick={toggleDrawer}>Click me</Button>

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

      <Drawer
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List className={classes.list}>
          <Link href="/">
            <ListItem button component="a">
              Inicio
            </ListItem>
          </Link>
          <Link href="/">
            <ListItem button component="a">
              Pacientes
            </ListItem>
          </Link>
        </List>
        <Avatar>JC</Avatar>
      </Drawer>
    </Container>
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
