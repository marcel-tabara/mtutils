import Form from '@rjsf/material-ui'
import { JSONSchema7 } from 'json-schema'
import React, { useEffect } from 'react'
import * as schemas from './constants'
import { GenericFormProps } from './types'

let genericFormData = {}

export const GenericForm = ({
  initialData,
  cb,
  type='nextSeo',
  schema,
}: GenericFormProps) => {
  useEffect(() => {
    genericFormData = initialData || {}
  }, [initialData])

  const genericFormSchema = type ? schemas[type] : schema ? schema : {}

  const onSubmit = ({ formData }) => {
    genericFormData = formData
    cb && cb()
  }

  return (
    <div style={{padding: 50}}>
      <Form
        schema={genericFormSchema as JSONSchema7}
        onSubmit={onSubmit}
        formData={genericFormData}
      />
    </div>
  )
}

export { genericFormData }

