import { Grid } from "@material-ui/core";
import CreatePatientComponent from "../../../components/patient/create";

function CreatePatient() {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("DONE   ");
  }

  return (
    <Grid container>
      <CreatePatientComponent handleSubmit={handleSubmit} />
    </Grid>
  );
}

export default CreatePatient;
