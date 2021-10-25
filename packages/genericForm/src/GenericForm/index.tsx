import Form from '@rjsf/material-ui'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import * as schemas from './schemas'
import { GenericFormProps } from './types'

const GenericForm = <T extends { title: string }>({
  initialData,
  onChange,
  type,
  schema,
}: GenericFormProps<T>): JSX.Element => {
  const genericFormSchema = schema
    ? schema
    : type
    ? schemas[type]
    : schemas.reactHelmet.definitions.ReactHelmet
  const onValueChange = ({ formData }) => onChange && onChange(formData)

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
  )
}

export { GenericForm }
