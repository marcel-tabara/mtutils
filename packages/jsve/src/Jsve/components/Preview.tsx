import Form from '@rjsf/material-ui';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

const Preview = ({ jsve }) => {
  const { schemaCode, uiSchemaCode } = jsve;
  if (isEmpty(schemaCode)) return null;

  const getSchema = (code) => {
    try {
      return JSON.parse(code);
    } catch (error) {
      return {};
    }
  };

  const showFormPreview = () => {
    const onChange = () => undefined;
    const onSubmit = () => undefined;
    return (
      <Form
        schema={getSchema(schemaCode)}
        uiSchema={getSchema(uiSchemaCode)}
        onChange={onChange}
        onSubmit={onSubmit}
        showErrorList={true}
      >
        <button type="submit">Submit</button>
      </Form>
    );
  };
  return showFormPreview();
};

export default Preview;
