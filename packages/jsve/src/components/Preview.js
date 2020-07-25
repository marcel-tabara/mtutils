import React from 'react'
import has from 'lodash/has'
import Form from '@rjsf/material-ui'

const Preview = ({jsve}) => {
  console.log('########## jsve', jsve)
  const {schemaCode, uiSchemaCode} = jsve
  const showFormPreview = () => {
    //if (has(jsve, 'error.message')) return console.log('########## error', jsve.error)
    const onChange = () => undefined
    const onSubmit = () => undefined
    return (
      <Form schema={schemaCode} uiSchema={uiSchemaCode} onChange={onChange} onSubmit={onSubmit} showErrorList={true}>
        <button type="submit">Submit</button>
      </Form>
    )
  }
  return showFormPreview()
}

export default Preview
