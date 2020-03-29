import { differenceInYears, format, parseISO } from "date-fns";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import AvatarPlaceholder from "../../components/AvatarPlaceholder";

import db from "../../src/api";

function Patient({ patient = {}, records = [] }) {
  if (patient) {
    return (
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container justify="space-evenly">
                <Grid item>
                  <AvatarPlaceholder gender={patient.gender} />
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <Typography variant="h6">
                    Nombre: {patient.name} {patient.surname}
                  </Typography>
                  {/* NO ESTA BIEN ESTO, FIXME */}
                  <Typography variant="h6">Edad: {patient.age}</Typography>
                  <Typography variant="h6">
                    DNI: {patient.documentId}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="patients table">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Observaciones</TableCell>
                  <TableCell>Prescripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(records.length > 0 &&
                  records.map((i, k) => <RecordRow key={k} record={i} />)) || (
                  <TableRow>
                    <TableCell>N/A</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  } else {
    return <p>No encontramos a ese paciente</p>;
  }
}

const RecordRow = ({ record }) => {
  let date;
  try {
    date = format(new Date(), "yyyy-mm-dd");
  } catch (error) {
    console.log(error);
  }
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{record.observations}</TableCell>
      <TableCell>{record.indications}</TableCell>
    </TableRow>
  );
};

Patient.getInitialProps = ctx => {
  const { id } = ctx.query;

  let patient = db
    .get("patients")
    .find({ _id: id })
    .value();

  let records = db
    .get("records")
    .find({ _patientId: id })
    .value();

  if (!Array.isArray(records) && !!records) {
    records = [records];
  }

  // Server Side calculation, Is this OK?
  patient.age = differenceInYears(
    new Date(),
    new Date(format(patient.birthDate, "yyyy-MM-dd"))
  );

  return {
    patient,
    records
  };
};

export default Patient;
