/**
 * This is a FAKE API
 */

import lowdb from "lowdb";
import Memory from "lowdb/adapters/Memory";

import doctors from "./db_files/Doctors.json";
import records from "./db_files/Clinical_Records.json";
import coverageTemplate from "./db_files/Coverage_template.json";
import patients from "./db_files/Patients.json";
import users from "./db_files/Users.json";

const adapter = new Memory();
const db = lowdb(adapter);

db.defaults({
  records,
  coverageTemplate,
  doctors,
  patients,
  users,
}).write();

export default db;
