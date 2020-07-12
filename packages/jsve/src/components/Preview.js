import React from 'react'
import has from 'lodash/has'
import Form from '@rjsf/material-ui'

const Preview = ({jsve}) => {
  const {schemaCode, uiSchemaCode} = jsve
  const showFormPreview = () => {
    //if (has(jsve, 'error.message')) return console.log('########## error', jsve.error)
    const onChange = () => undefined
    const onSubmit = () => undefined
    return (
      <Form
        schema={JSON.parse(schemaCode)}
        uiSchema={JSON.parse(uiSchemaCode)}
        onChange={onChange}
        onSubmit={onSubmit}
        showErrorList={true}
      >
        <button type="submit" className={getButtonClass()}>
          Submit
        </button>
      </Form>
    )
  }
  return showFormPreview()
}

export default Preview
