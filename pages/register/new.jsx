import { Formik, Form, useField } from "formik";

import Help from "react-bulma-components/lib/components/form/components/help";
import Field from "react-bulma-components/lib/components/form/components/field";
import Label from "react-bulma-components/lib/components/form/components/label";
import Input from "react-bulma-components/lib/components/form/components/input";
import Control from "react-bulma-components/lib/components/form/components/control";
import TextArea from "react-bulma-components/lib/components/form/components/textarea";

import { Button } from "react-bulma-components";

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

/**
 *
 * 2. Registro de historia clinica
 * - Fecha
 * - Datos del paciente (1)
 */

function CreateRegister() {
  return (
    <Formik>
      {({ isSubmitting }) => (
        <Form>
          <CustomField label="Fecha" name="date" type="date" required />
          <CustomField
            label="Descripción"
            name="details"
            type="textarea"
            required
          />
          <Button color="primary" disabled={isSubmitting}>
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateRegister;
