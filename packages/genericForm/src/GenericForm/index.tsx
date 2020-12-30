import Form from '@rjsf/material-ui'
import React, { useEffect } from 'react'
import * as schemas from './constants'
import { GenericFormProps } from './types'

let genericFormData = {}

export const GenericForm = ({
  initialData,
  cb,
  type,
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
    <Form
      schema={genericFormSchema as any}
      onSubmit={onSubmit}
      formData={genericFormData}
    />
  )
}

export { genericFormData }
