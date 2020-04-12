import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";

const data = {
  _id: "5e8d057b741d61234f21dd2c",
  profession: "Atiendo boludos",
  family_nucleus: "Soltero",
  background: "Amet ex nulla laboris nulla.",
  important_info: "sida risa",
  user_id: "5e8d015f8558e67cf069d90a",
  registered_date: { $date: { $numberLong: "1546311600000" } },
  institute_details: {
    _last_revision: { $date: { $numberLong: "1582707091000" } },
    institute_id: "5e8cf03ed841d352cdc1e08f",
  },
  coverage: {
    _id: "5e8d04a088671b24c19bd7fc",
    coverage_name: "Cain Obra Social",
    plan: "Premium",
    coverage_num: { $numberInt: "747904" },
  },
};

function CreatePatient() {
  return (
    <Grid container>
      <Paper style={{ width: "100%" }}>
        <FormControl>
          <TextField />
          <InputLabel id="coverage-list">Age</InputLabel>
          <Select id="coverage-list" name="coverageId">
            <MenuItem>OSDE</MenuItem>
            <MenuItem>OSBA</MenuItem>
            <MenuItem>IOMA</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Grid>
  );
}

export default CreatePatient;
