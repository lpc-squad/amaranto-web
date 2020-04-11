import { useEffect } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  CircularProgress,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useAuth, withAuth, withLoginRequired } from "use-auth0-hooks";
import { Alert, AlertTitle } from "@material-ui/lab";

import Table from "../../components/Table";
import db from "../../src/api";

function Index({ patients = [] }) {
  const {
    isLoading,
    login,
    logout,
    isAuthenticated,
    accessToken,
    error,
    user,
  } = useAuth({
    audience: "http://clinicalrecord.com.ar/api",
    scope: "read:things",
  });

  useEffect(() => {
    console.log(accessToken, error, user);
  }, [accessToken, user, error]);

  useEffect(() => {
    console.log(isLoading);
    if (isLoading) {
      return;
    } else {
      // fetch("http://localhost:8080", {
      //   headers: { Authorization: `Bearer ${accessToken}` }
      // })
      //   .then(res => res.json())
      //   .then(res => console.log(res))
      //   .catch(err => console.error(err));
    }
  }, [isLoading, isAuthenticated]);

  return (
    <>
      <Grid
        container
        className="loading-screen"
        style={{
          display: (isLoading && "flex") || "none",
          zIndex: 9999,
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "black",
          transition: "display 2s",
        }}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={6}>
        <Alert severity="info">
          <AlertTitle>
            ¿Qué pensás de la aplicación? Dejanos tus comentarios por{" "}
            <a
              href="mailto:facundomgordillo@gmail.com?Subject=Clinical%20Record"
              target="_blank"
            >
              Email
            </a>{" "}
            o{" "}
            <a href="https://twitter.com/FMGordillo" target="_blank">
              Twitter
            </a>
          </AlertTitle>
          Estamos en etapa de desarrollo de Clínica Digital. ¡Contamos con
          ustedes para formar la mejor solución!
        </Alert>
        <Grid item>
          <Badge
            badgeContent={"BETA"}
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Typography variant="h2">Clinica Digital</Typography>
          </Badge>
        </Grid>
        <Grid item>
          {(!isAuthenticated && (
            <button
              disabled={isLoading}
              onClick={() =>
                login({
                  appState: { returnTo: { pathname: "/patients" } },
                  // HACK Esto hace que funcione
                  audience: "http://clinicalrecord.com.ar/api",
                })
              }
            >
              Necesitas loguearte para acceder
            </button>
          )) || (
            <button disabled={isLoading} onClick={() => logout()}>
              Andate
            </button>
          )}
          <Grid container spacing={4} style={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="/dashboard/registers">
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
              <Link href="/dashboard/patients">
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
          <Table
            ariaTable="patients table"
            head={
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            }
            content={
              patients.length > 0 &&
              patients.map((i, k) => <PatientRow key={k} patient={i} /> || [])
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

const PatientRow = ({ patient }) => (
  <TableRow>
    <TableCell>{patient.name}</TableCell>
    <TableCell>{patient.surname}</TableCell>
    <TableCell>
      <Link
        href="/dashboard/patients/[id]"
        as={`/dashboard/patients/${patient._id}`}
      >
        <Button variant="outlined" color="primary" component="a">
          Ver
        </Button>
      </Link>
    </TableCell>
  </TableRow>
);

Index.getInitialProps = (ctx) => {
  const patients = db.get("patients").cloneDeep().value();
  return {
    patients,
  };
};

export default withLoginRequired(withAuth(Index));
