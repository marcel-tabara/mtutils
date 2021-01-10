import Form from '@rjsf/material-ui'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import * as schemas from './constants'
import { GenericFormProps } from './types'

const GenericForm = ({
  initialData,
  onChange,
  type='gatsbyNextSeo',
  schema,
}: GenericFormProps) => {
  const genericFormSchema = type ? schemas[type] : schema ? schema : {}

  const onValueChange = ({ formData }) => {
    onChange && onChange(formData)
  }

  return (
    <div style={{padding: 50}}>
      <Form
        schema={genericFormSchema as JSONSchema7}
        onChange={onValueChange}
        formData={initialData}
      >
        <button type="submit" style={{visibility: 'hidden'}}>
            Submit
          </button>
      </Form>
    </div>
  )
}


export { GenericForm }

