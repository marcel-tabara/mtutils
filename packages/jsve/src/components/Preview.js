import React from 'react'
import prettier from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import Form from '@rjsf/material-ui'
import {prettierOptions} from '../shared/constants'

const Preview = ({jsve}) => {
  const {schemaCode, uiSchemaCode} = jsve
  const schema = JSON.parse(prettier.format(schemaCode, prettierOptions))
  const uiSchema = JSON.parse(prettier.format(uiSchemaCode, prettierOptions))

  const showFormPreview = () => {
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
