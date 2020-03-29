import { useRouter } from "next/router";
import db from "../../src/api";

function Patient(props) {
  const router = useRouter();
  if (props.patient) {
    return <p>Alo {props.patient.name}</p>;
  } else {
    return <p>No encontramos a ese paciente</p>;
  }
  return <p>Alo</p>;
}

Patient.getInitialProps = ctx => {
  const { id } = ctx.query;

  const patient = db
    .get("patients")
    .find({ _id: id })
    .value();
  console.log(patient);
  return {
    patient
  };
};

export default Patient;
