import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import CreatePatientComponent from "../../../components/patient/create";
import Snackbar from "../../../components/Snackbar";
import { ISnackbar } from "../../../lib/types";

const CreatePatient: FunctionComponent = () => {
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
};

export default CreatePatient;
