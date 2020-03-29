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
      _id: "5e7fe87cc36d7ddcec7a8fa7",
      gender: "M",
      name: "Facundo",
      surname: "Gordillo",
      documentId: 12345678,
      birthDate: new Date("1995-09-09")
    },
    {
      _id: "5e7fe87cc36d7ddcec7a8fa1",
      gender: "F",
      name: "Kimberly",
      surname: "Aguirre",
      documentId: 30663157,
      birthDate: new Date("1995-09-09")
    },
    {
      _id: "5e7fe87cca1939f4a63cd1fa",
      gender: "F",
      name: "Taylor",
      surname: "Franklin",
      documentId: 51953680,
      birthDate: new Date("1995-09-09")
    },
    {
      _id: "5e7fe87c7164460c85a0043d",
      gender: "F",
      name: "Ada",
      surname: "Estes",
      documentId: 56146047,
      birthDate: new Date("1995-09-09")
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      gender: "F",
      name: "Bennett",
      surname: "Lamb",
      documentId: 55012726,
      birthDate: new Date("1995-09-09")
    },
    {
      _id: "5e7fe87c4ac41ded83c3f70e",
      gender: "M",
      name: "Gilmore",
      surname: "Sanders",
      documentId: 39362371,
      birthDate: new Date("1995-09-09")
    }
  ],
  records: [
    {
      _id: 1,
      _patientId: "5e7fe87cc36d7ddcec7a8fa7",
      _doctorId: 1,
      observations: "Dolor de panza, vómitos, un poco de diarrea",
      indications: "Clorazepam y a la cama. Tiene que volver en 15 días",
      date: new Date()
    },
    {
      _id: "5e8009703b0bf1e4622409fb",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e7fe87cc36d7ddcec7a8fa1",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e8009703b0bf1e4622409fb",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    },
    {
      _id: "5e7fe87ca4d5e50b1098695c",
      _patientId: "5e7fe87c4ac41ded83c3f70e",
      _doctorId: 1,
      observations: "lorem",
      indications: "lorem",
      date: "Tue Jan 25 2011 04:35:50 GMT+0000 (UTC)"
    }
  ]
}).write();

export default db;
