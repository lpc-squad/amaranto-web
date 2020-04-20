import { useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";

import { ISnackbar } from "../../../src/types";
import Snackbar from "../../../components/Snackbar";
import CreatePatientComponent from "../../../components/patient/create";

function CreatePatient() {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    title: "",
    open: false,
    message: "",
    severity: "info",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("DONE, GOING BACK");
    setSnackbar((prevState) => ({
      ...prevState,
      open: true,
    }));
    setTimeout(() => {
      router.back();
    }, 2000);
  }

  return (
    <Grid container>
      <CreatePatientComponent handleSubmit={handleSubmit} />
      <Snackbar open={snackbar.open} severity={snackbar.severity}>
        {snackbar.message}
      </Snackbar>
    </Grid>
  );
}

export default CreatePatient;
