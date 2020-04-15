import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ArrowDownIcon from "@material-ui/icons/ExpandMore";

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "use-auth0-hooks";

function Index(props) {
  // TODO: Para hacer el efecto Slack https://slack.com/intl/en-ar/
  // Fuente: https://material-ui.com/components/app-bar/#scrolling
  // const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <>
      <header
        style={{
          display: "flex",
          width: "100vw",
          justifyContent: "space-around",
          position: "fixed",
          zIndex: 9,
        }}
      >
        <a href="#intro">Inicio</a>
        <a href="#quienes-somos">Inicio</a>
        <a href="#producto">Inicio</a>
        <a href="#planes">Inicio</a>
        <a href="#contacto">Inicio</a>
        <Link href="/dashboard">
          <Button variant="contained" component="a">
            Entrar
          </Button>
        </Link>
      </header>
      <main>
        <section id="#intro" style={{ height: "100vh" }}>
          <video
            autoPlay
            muted
            loop
            style={{
              right: "0",
              bottom: "0",
              objectFit: "cover",
              minWidth: "100vw",
              maxHeight: "100vh",
            }}
          >
            <source src="/index_video.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "black",
              opacity: 0.35,
            }}
          />
          <div
            style={{
              display: "flex",
              width: "950px",
              height: "50%",
              position: "absolute",
              alignItems: "center",
              top: "calc(100% / 4)",
              backgroundColor: "white",
              clipPath: "polygon(0% 0%, 60% 0%, 100% 50%, 60% 100%, 0% 100%)",
            }}
          >
            <Container>
              <Typography variant="h1">Clinical Record</Typography>
              <Typography variant="subtitle1">
                Gestioná tu clínica, de la mejor forma
              </Typography>
            </Container>
          </div>
          <ArrowDownIcon
            style={{
              marginBottom: "2rem",
              width: "3em",
              height: "3em",
              bottom: 0,
              position: "absolute",
              left: "calc(100vw / 2)",
              animation: "arrow 2s ease-in-out infinite",
            }}
          />
        </section>
        <Container>
          <section
            id="quienes-somos"
            style={{
              display: "flex",
              height: "75vh",
              justifyContent: "space-around",
            }}
          >
            <img
              width="700px"
              height="400px"
              src="/video_placeholder.png"
              alt=""
            />
            <Box>
              <Typography variant="h2">Quienes somos</Typography>
              <Typography variant="body1">
                Buscamos mejorar la calidad del médico. Que se enfoquen en su
                trabajo, nosotros nos encargamos de la seguridad y calidad de la
                plataforma.
              </Typography>
              <Button>Conoce más de nosotros</Button>
            </Box>
          </section>
          <section id="producto" style={{ display: "flex", height: "75vh" }}>
            <Box>
              <Typography variant="h2">Producto</Typography>
              <Typography>
                Es un producto que te va a cambiar la vida.
              </Typography>
              <Button>Conoce más de la plataforma</Button>
            </Box>
            <img
              width="700px"
              height="400px"
              src="/video_placeholder.png"
              alt=""
            />
          </section>
          <section id="planes" style={{ height: "100vh" }}>
            <Typography variant="h2">Nuestros planes</Typography>
            <Grid container justify="space-around">
              <Plan>
                <Typography variant="h4" component="h3">
                  Beta
                </Typography>
                <Button>¡Sé un usuario beta!</Button>
              </Plan>
              <Plan>
                <Typography variant="h4" component="h3">
                  Consultorio
                </Typography>
                <Button disabled>No disponible</Button>
              </Plan>
              <Plan>
                <Typography variant="h4" component="h3">
                  Gran Consultorio
                </Typography>
                <Button disabled>No disponible</Button>
              </Plan>
            </Grid>
          </section>
          <section id="contacto" style={{ height: "100vh" }}>
            <Typography variant="h2">Contacto</Typography>
            <Paper>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h4" component="h3">
                    En qué podemos ayudarte
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container component="form">
                    <Grid item>
                      <TextField multiline rows="4" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </section>
        </Container>
      </main>
      <style jsx global>{`
        @keyframes arrow {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

function Plan(props) {
  return (
    <Grid item style={{ border: "0 solid black" }}>
      <Card>
        <CardContent>{props.children}</CardContent>
      </Card>
    </Grid>
  );
}

export default Index;
