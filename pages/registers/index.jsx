import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Paper
} from "@material-ui/core";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";

import db from "../../src/api";

import AvatarPlaceholder from "../../components/AvatarPlaceholder";

function NewRegister(props) {
  let timeout = null; // Debounce
  const inputContainer = useRef(""); // Debounce

  const [modal, setModal] = useState(false);
  const [patient, setPatient] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  /**
   * Debounce search
   */
  function handleChange() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // TODO: No será demasiado?
      const { value } = inputContainer.current.children[1].children[0];
      searchPatient(value);
    }, 400);
  }

  function handleSelect(patient) {
    setPatient(patient);
    toggleModal();
  }

  function toggleModal() {
    setModal(m => !m);
  }

  function searchPatient(text) {
    if (!text) {
      setSearchResult([]);
      return;
    }
    const result = db
      .get("patients")
      .filter(
        o =>
          o.name.includes(text) ||
          o.surname.includes(text) ||
          o.documentId.toString().includes(text)
      )
      .value();

    setSearchResult(result);
  }

  return (
    <Paper style={{ padding: 48 }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h2">Crear registro</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={6}>
              <form>
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      id="observations"
                      variant="outlined"
                      label="🩺Motivo de consulta, observaciones"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      id="indications"
                      variant="outlined"
                      label="💊Indicaciones para el paciente"
                      placeholder="Medicamentos, tratamientos..."
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={6}>
              <Patient
                data={patient}
                toggleModal={toggleModal}
                handleClick={() => console.log("ALO")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SearchPatient
        open={modal}
        onClose={toggleModal}
        input={inputContainer}
        handleChange={handleChange}
        searchResult={searchResult}
        selectPatient={handleSelect}
      />
    </Paper>
  );
}

function Patient({ data, toggleModal }) {
  if (data) {
    console.log(data);
    return (
      <Card>
        <CardContent>
          <Grid
            container
            alignItems="center"
            justifycontent="center"
            spacing={4}
          >
            <Grid item>
              <AvatarPlaceholder gender={data.gender} />
            </Grid>
            <Grid item>
              <Typography>Nombre: {data.name}</Typography>
              <Typography>Documento: {data.documentId}</Typography>
              <Button variant="outlined">Ver ficha completa</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardContent style={{ textAlign: "center" }}>
          <Button onClick={toggleModal}>Buscar paciente</Button>
        </CardContent>
      </Card>
    );
  }
}

function SearchPatient({
  open,
  input,
  onClose,
  handleChange,
  selectPatient,
  searchResult = []
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Buscar paciente</DialogTitle>
      <DialogContent style={{ minWidth: 600 }}>
        <TextField
          autoFocus
          fullWidth
          ref={input}
          label="Palabras clave"
          onChange={handleChange}
          placeholder="Nombre, apellido, DNI"
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Documento de identidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult.length > 0 &&
              searchResult.map((i, k) => (
                <TableRow key={k}>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.surname}</TableCell>
                  <TableCell>{i.documentId}</TableCell>
                  <TableCell>
                    <Button onClick={() => selectPatient(i)}>
                      Seleccionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {searchResult.length === 0 && (
          <DialogContentText align="center">
            Escribí algún filtro
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default NewRegister;
