import querystring from "querystring";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(true); // Catch de useAuth() con demoras

  function getReturnTo() {
    if (window && window.location) {
      console.log(window);
      return {
        returnTo: {
          pathname: window.location.pathname,
          query: querystring.decode(window.location.search),
        },
      };
    }

    return {};
  }

  useEffect(() => {
    if (!isAuthenticated && user === undefined) {
      login({ appState: getReturnTo() });
    } else if (!isLoading || isAuthenticated) setLoading(false);
    // fetch("http://localhost:8080",  {
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));
  }, [isLoading, isAuthenticated, user]);

  return (
    <>
      <Grid
        container
        className="loading-screen"
        style={{
          display: (loading && "flex") || "none",
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
              disabled={loading}
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
            <button disabled={loading} onClick={() => logout()}>
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
              <Link href="/dashboard/patients/new">
                <Button
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
    <TableCell>{patient.first_name}</TableCell>
    <TableCell>{patient.last_name}</TableCell>
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
  const users = db
    .get("users")
    .reduce((acc, user) => {
      const patient = patients.find((p) => p.user_id === user._id);
      if (!patient) {
        return acc;
      } else {
        return [...acc, { ...user, ...patient }];
      }
    }, [])
    .value();

  return {
    patients: users,
  };
};

// export default withLoginRequired(Index);
export default Index;
