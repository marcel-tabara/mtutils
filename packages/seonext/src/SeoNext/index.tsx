import Form from '@rjsf/material-ui'
import React, { useEffect } from 'react'
import { defaultSchema } from './constants'

export type SeoNextProps = {
  initialData?: {}
  cb?: () => void
}

let seoNextData = {}
export const SeoNext = ({ initialData, cb }: SeoNextProps) => {
  useEffect(() => {
    if (initialData) {
      seoNextData = initialData
    }
  }, [initialData])

  const onSubmit = ({ formData }) => {
    seoNextData = formData
    cb && cb()
  }

  return (
    <Form
      schema={defaultSchema as any}
      onSubmit={onSubmit}
      formData={seoNextData}
    />
  )
}

export { seoNextData }
