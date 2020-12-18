import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Color } from "@material-ui/lab";
import Link from "next/link";
import { FormEvent, FunctionComponent, useRef, useState } from "react";
import shortId from "shortid";
import AvatarPlaceholder from "../../../components/AvatarPlaceholder";
import Snackbar from "../../../components/Snackbar";
import db from "../../../lib/api";
import { ISnackbar } from "../../../lib/types";

function CreateRegister() {
  // @ts-ignore
  let timeout; // Debounce
  const inputContainer = useRef(""); // Debounce

  const [modal, setModal] = useState(false);
  const [patient, setPatient] = useState(null);
  const [indications, setIndications] = useState("");
  const [observations, setObservations] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    title: "",
    open: false,
    message: "",
    severity: "success",
  });

  function toggleModal() {
    setModal((m) => !m);
  }

  const toggleSnackbar = (message = "", severity: Color = "info") => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: !prevState.open,
      severity: severity || prevState.severity,
      message,
    }));
  };

  const searchPatient = (text: string) => {
    if (!text) {
      setSearchResult([]);
      return;
    }
    const txt: string = text.toLowerCase();
    const result = db
      .get("patients")
      .filter(
        (o: any) =>
          o.name.toLowerCase().includes(txt) ||
          o.surname.toLowerCase().includes(txt) ||
          o.documentId.toString().includes(txt)
      )
      .value();

    setSearchResult(result);
  };

  /**
   * Debounce search
   */
  const handleChange = () => {
    // @ts-ignore
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // TODO: No será demasiado?
      // @ts-ignore
      const { value } = inputContainer.current.children[1].children[0];
      searchPatient(value);
    }, 400);
  };

  const handleSelect = (selectedPatient: any) => {
    setPatient(selectedPatient);
    toggleModal();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const collection = db.get("records");

      if (!patient) {
        setSnackbar((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
          message: "Seleccioná al paciente",
        }));
      }

      if (!patient || !indications || !observations) {
        toggleSnackbar("Por favor, llená los campos necesarios", "error");
        return;
      }

      collection
        .push({
          _id: shortId.generate(),
          _doctorId: 1, // FIXME: hardCoded
          // @ts-ignore
          _patientId: patient?._id,
          indications,
          observations,
          date: new Date(),
        })
        .write();

      toggleSnackbar("El registro fue guardado exitosamente", "success");
    } catch (error) {
      toggleSnackbar("No se pudo guardar el registro", "error");
    }
  };

  return (
    <Paper style={{ padding: 48 }}>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h2">Crear registro</Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={4} alignItems="center">
                  <Grid item sm={6} xs={12}>
                    <Grid container direction="column" spacing={4}>
                      <Grid item>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          id="observations"
                          variant="outlined"
                          label="🩺Motivo de consulta, observaciones"
                          onChange={(e) => setObservations(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          id="diagnosis"
                          variant="outlined"
                          label="Diagnóstico"
                          onChange={(e) => setObservations(e.target.value)}
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
                          onChange={(e) => setIndications(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Patient data={patient} toggleModal={toggleModal} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container style={{ justifyContent: "center" }}>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Crear registro
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={snackbar.open}>{snackbar.message}</Snackbar>
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

const Patient: FunctionComponent<{ data: any; toggleModal: () => void }> = ({
  data,
  toggleModal,
}) => {
  if (data) {
    return (
      <Card>
        <CardContent>
          <Grid container alignItems="center" justify="center" spacing={4}>
            <Grid item>
              {/* TODO: Put custom width */}
              <AvatarPlaceholder dimension="" gender={data.gender} />
            </Grid>
            <Grid item>
              <Typography>Nombre: {data.name}</Typography>
              <Typography>Documento: {data.documentId}</Typography>
              <Link
                href="/dashboard/patients/[id]"
                as={`/dashboard/patients/${data._id}`}
              >
                <Button variant="outlined" component="a">
                  Ver ficha completa
                </Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent style={{ textAlign: "center" }}>
        <Button onClick={toggleModal}>Buscar paciente</Button>
      </CardContent>
    </Card>
  );
};

interface SearchPatientProps {
  open: boolean;
  input: any;
  onClose?: () => void;
  handleChange?: () => void;
  selectPatient?: (i: any) => void;
  searchResult?: any[];
}

const SearchPatient: FunctionComponent<SearchPatientProps> = ({
  open,
  input,
  onClose,
  handleChange,
  selectPatient,
  searchResult = [],
}) => (
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
                  <Button onClick={() => selectPatient && selectPatient(i)}>
                    Seleccionar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DialogContentText align="center">
        {searchResult.length === 0 &&
          ((input.current !== "" && "No hay resultados") ||
            "Escribí algún filtro")}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

export default CreateRegister;
