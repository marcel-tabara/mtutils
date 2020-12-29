import Form from '@rjsf/material-ui'
import React, { useEffect } from 'react'
import { defaultSchema } from './constants1'
import { useSeoNext } from './useSeoNext'

export type SeoNextProps = {
  initialData?: {}
  cb?: () => void
}

let seoNextData = {}
export const SeoNextComponent: React.FC<SeoNextProps> = ({
  initialData,
  cb,
}) => {
  const { seoNext, setSeoNext } = useSeoNext()
  useEffect(() => {
    initialData && setSeoNext({ seoNextState: initialData })
  }, [initialData])

  const onSubmit = ({ formData }) => {
    seoNextData = formData
    setSeoNext({
      seoNextState: formData,
    })
    cb && cb()
  }

  return <Form schema={defaultSchema as any} onSubmit={onSubmit} />
}

export { seoNextData }
