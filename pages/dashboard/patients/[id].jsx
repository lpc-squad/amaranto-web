import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import Table from "../../../components/Table";
import AvatarPlaceholder from "../../../components/AvatarPlaceholder";

import db from "../../../src/api";

function Patient({ patient }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let _records = db
      .get("records")
      .filter(p => p._patientId === patient._id)
      .value();

    if (!Array.isArray(_records) && !!_records) {
      _records = [_records];
    }

    if (_records) {
      setRecords(_records);
    }
  }, [patient]);

  if (patient) {
    return (
      <Grid container direction="column" spacing={6}>
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
        <Grid item style={{ alignSelf: "center" }}>
          <Table
            ariaTable="patients table"
            head={
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell>Prescripción</TableCell>
              </TableRow>
            }
            content={
              (records.length > 0 &&
                records.map((i, k) => <RecordRow key={k} record={i} />)) || (
                <TableRow>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              )
            }
          />
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

Patient.getInitialProps = async ctx => {
  const { differenceInYears } = await import("date-fns");
  const { id } = ctx.query;

  let patient = db
    .get("patients")
    .find({ _id: id })
    .value();

  // Server Side calculation, Is this OK?
  patient.age = differenceInYears(
    new Date(),
    new Date(format(patient.birthDate, "yyyy-MM-dd"))
  );

  return {
    patient
  };
};

export default Patient;
