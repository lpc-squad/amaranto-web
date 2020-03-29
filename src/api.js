/**
 * This is a FAKE API
 */

import lowdb from "lowdb";
import Memory from "lowdb/adapters/Memory";
const adapter = new Memory();
const db = lowdb(adapter);

db.defaults({
  doctors: [
    {
      _id: 1,
      name: "Juan",
      surname: "Caillava"
    }
  ],
  patients: [
    {
      _id: 1,
      gender: "5e7fe87cc36d7ddcec7a8fa7",
      name: "Facundo",
      surname: "Gordillo",
      documentId: 12345678,
      birthDate: new Date("1995-09-09")
    },
    {
      _id: "5e7fe87cc36d7ddcec7a8fa1",
      name: "Kimberly",
      surname: "Aguirre",
      documentId: 30663157
    },
    {
      _id: "5e7fe87cca1939f4a63cd1fa",
      name: "Taylor",
      surname: "Franklin",
      documentId: 51953680
    },
    {
      _id: "5e7fe87c7164460c85a0043d",
      name: "Ada",
      surname: "Estes",
      documentId: 56146047
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      name: "Bennett",
      surname: "Lamb",
      documentId: 55012726
    },
    {
      _id: "5e7fe87c4ac41ded83c3f70e",
      name: "Gilmore",
      surname: "Sanders",
      documentId: 39362371
    }
  ],
  records: [
    {
      _id: 1,
      _patientId: 1,
      _doctorId: 1,
      observations: "Dolor de panza, vómitos, un poco de diarrea",
      indications: "Clorazepam y a la cama. Tiene que volver en 15 días",
      date: new Date()
    }
  ]
}).write();

export default db;
