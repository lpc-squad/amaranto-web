import {
  Card,
  CardContent,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import { FunctionComponent, useEffect, useState } from "react";
import AvatarPlaceholder from "../../../components/AvatarPlaceholder";
import Table from "../../../components/Table";
import db from "../../../lib/api";

interface PatientProps {
  patient: any;
}

const Patient: FunctionComponent<PatientProps> = ({ patient }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let _records = db
      .get("records")
      .filter((r: any) => r.patient_id === patient._id)
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
            head={["Fecha", "Observaciones", "Prescripción"]}
            content={
              (records.length > 0 &&
                records.map((i) => <RecordRow key={i} record={i} />)) || (
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
  }

  return <p>No encontramos a ese paciente</p>;
};

interface RecordRowProps {
  record: any;
}

const RecordRow: FunctionComponent<RecordRowProps> = ({ record }) => {
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

// @ts-ignore
Patient.getInitialProps = async (ctx) => {
  const { differenceInYears } = await import("date-fns");
  const { id } = ctx.query;

  const patient = db.get("patients").find({ _id: id }).value();
  const user = db.get("users").find({ _id: patient.user_id }).value();
  const ourPatient = { ...user, ...patient };

  // Server Side calculation, Is this OK?
  ourPatient.age = differenceInYears(
    new Date(),
    new Date(format(new Date(ourPatient.birth_date), "yyyy-MM-dd"))
  );

  return {
    patient: ourPatient,
  };
};

export default Patient;
