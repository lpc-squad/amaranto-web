import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Paper
} from "@material-ui/core";

import AvatarPlaceholder from "../../components/AvatarPlaceholder";

function NewRegister({ patient = {} }) {
  return (
    <Paper style={{ padding: 48 }}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h2">Crear registro</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                  >
                    <Grid item>
                      <AvatarPlaceholder gender={patient.gender} />
                    </Grid>
                    <Grid item>
                      <Typography>Nombre: John Doe</Typography>
                      <Typography>Edad: 69</Typography>
                      <Button variant="outlined">Ver ficha completa</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NewRegister;
