import Form from '@rjsf/material-ui';
import { JSONSchema7 } from 'json-schema';
import React from 'react';
import * as schemas from './schemas';
import { GenericFormProps } from './types';

console.log(schemas)
const GenericForm = ({
  initialData,
  onChange,
  type = 'reactHelmet',
  schema,
}: GenericFormProps) => {
  const genericFormSchema = type ? schemas[type].default : schema ? schema : {};
  const onValueChange = ({ formData }) => onChange && onChange(formData);

  return (
    <div style={{ padding: 10 }}>
      <Form
        schema={genericFormSchema as JSONSchema7}
        onChange={onValueChange}
        formData={initialData}
      >
        <button type="submit" style={{ visibility: 'hidden' }}>
          Submit
        </button>
      </Form>
    </div>
  );
};

export { GenericForm };
