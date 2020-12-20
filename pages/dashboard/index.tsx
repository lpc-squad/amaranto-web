import {
  Badge,
  Button,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { request } from "graphql-request";
import Link from "next/link";
import querystring from "querystring";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "use-auth0-hooks";
import Layout from "../../components/Layout";
import Table from "../../components/Table";

function Index() {
  const { data: patients, isValidating } = useSWR(
    `{
    patients {
      _id
      user {
        first_name
        last_name
      }
    }
  }`,
    (query) => request(`${process.env.BACKEND_URL}/graphql`, query),
    {
      initialData: [],
    }
  );
  const {
    isLoading,
    login,
    logout,
    isAuthenticated,
    // accessToken,
    // error,
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
    console.log(process.env.BACKEND_URL);
    if (!isAuthenticated && user === undefined) {
      login({ appState: getReturnTo() });
    } else if (!isLoading || isAuthenticated) setLoading(false);
    // fetch("http://localhost:8080",  {
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));
  }, [isLoading, isAuthenticated, user, login]);

  return (
    <Layout>
      <Grid container direction="column" spacing={6}>
        <Alert severity="info">
          <AlertTitle>
            ¿Qué pensás de la aplicación? Dejanos tus comentarios por{" "}
            <a
              href="mailto:facundomgordillo@gmail.com?Subject=Clinical%20Record"
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>{" "}
            o{" "}
            <a
              href="https://twitter.com/FMGordillo"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </AlertTitle>
          Estamos en etapa de desarrollo de Clínica Digital. ¡Contamos con
          ustedes para formar la mejor solución!
        </Alert>
        <Grid item>
          <Badge
            badgeContent="BETA"
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
              type="button"
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
            <button type="button" disabled={loading} onClick={() => logout({})}>
              Andate
            </button>
          )}
          <Grid container spacing={4} style={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="/dashboard/registers/new">
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
            loading={isValidating}
            head={["Nombre", "Apellido", "Acciones"]}
            content={
              patients &&
              patients.length > 0 &&
              patients.map((i) => <PatientRow key={i} patient={i} />)
            }
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

const PatientRow = ({ patient }: { patient: any }) => (
  <TableRow>
    <TableCell>{patient.user.first_name}</TableCell>
    <TableCell>{patient.user.last_name}</TableCell>
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

export default Index;
