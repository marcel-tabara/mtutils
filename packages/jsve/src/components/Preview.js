import React from 'react'
import has from 'lodash/has'
import Form from '@rjsf/material-ui'

const Preview = ({jsve}) => {
  console.log('########## jsve', jsve)
  const {schemaCode, uiSchemaCode} = jsve
  const schema = JSON.parse(schemaCode)
  const uiSchema = JSON.parse(uiSchemaCode)

  const showFormPreview = () => {
    //if (has(jsve, 'error.message')) return console.log('########## error', jsve.error)
    const onChange = () => undefined
    const onSubmit = () => undefined
    return (
      <Form schema={schema} uiSchema={uiSchema} onChange={onChange} onSubmit={onSubmit} showErrorList={true}>
        <button type="submit">Submit</button>
      </Form>
    )
  }
  return showFormPreview()
}

export default Preview
