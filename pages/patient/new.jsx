import { useState } from "react";
import { Formik, Form, useField } from "formik";
import { Button, Dropdown } from "react-bulma-components";

import Help from "react-bulma-components/lib/components/form/components/help";
import Field from "react-bulma-components/lib/components/form/components/field";
import Label from "react-bulma-components/lib/components/form/components/label";
import Input from "react-bulma-components/lib/components/form/components/input";
import Control from "react-bulma-components/lib/components/form/components/control";
import TextArea from "react-bulma-components/lib/components/form/components/textarea";

function CustomField({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <Field>
      <Label>{label}</Label>
      <Control>
        {(props.type == "textarea" && <TextArea {...field} {...props} />) || (
          <Input {...field} {...props} />
        )}
        {meta.touched && meta.error ? (
          <Help color="danger">{meta.error}</Help>
        ) : null}
      </Control>
    </Field>
  );
}

function CustomDropdown({ label, options, ...props }) {
  const [selected, setSelected] = useState(new Set(""));
  const [refresh, setRefresh] = useState(false);
  const [field, meta, helpers] = useField(props);

  function SelectedOptions({ set }) {
    let result = [];
    for (const i of set) {
      result.push(i);
    }
    return <span>Seleccionado: {result.join(", ")}</span>;
  }

  function onChange(current) {
    (selected.has(current) && selected.delete(current)) ||
      setSelected(selected.add(current));
    setRefresh(!refresh);
    helpers.setValue(Array.from(selected));
  }

  return (
    <Field>
      <Label>{label}</Label>
      <Control>
        <Dropdown value={selected} {...field} onChange={onChange} {...props}>
          {options.map((i, k) => (
            <Dropdown.Item key={k} value={i}>
              {i}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <SelectedOptions set={selected} />
      </Control>
    </Field>
  );
}

/**
 *  1. Ficha del 1er paciente / Historia Clinica
 * - NOMBRE COMPLETO
 * - DNI/ Documento de Identidad
 * - Fecha de nacimiento
 * - OBRA SOCIAL (incluye Particular) --> Validar
 * - Contacto (telefono)
 * - Email (por ahora para contacto "ocasional") OPCIONAL
 * - Direccion (Opcional???)
 */
function NewPatient() {
  function handleSubmit(values, actions) {
    actions.setSubmitting(true);

    console.log(values);

    actions.setSubmitting(false);
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          birthDate: "",
          documentId: "",
          coverage: []
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomField label="Nombre completo" name="name" required />
            <CustomField
              label="Fecha de nacimiento"
              name="birthDate"
              type="date"
              required
            />
            <CustomField
              label="Documento de identidad"
              name="documentId"
              required
            />
            <CustomDropdown
              label="Obra social"
              name="coverage"
              required
              options={["IOMA", "OSDE", "PAMI", "OSPECOM"]}
            />
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Crear paciente
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewPatient;
