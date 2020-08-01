import React from 'react'

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

import prettier from 'prettier/standalone'
import {prettierOptions} from '../shared/constants'

const CodeView = ({jsve}) => {
  const {schemaCode, uiSchemaCode} = jsve
  const schema = prettier.format(schemaCode, prettierOptions)
  const uiSchema = prettier.format(uiSchemaCode, prettierOptions)

  return (
    <>
      <AceEditor
        mode="json"
        theme="github"
        name="schemaEditor"
        editorProps={{$blockScrolling: true}}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        fontSize={12}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={schema}
        height="350px"
      />
      <AceEditor
        mode="json"
        theme="github"
        name="schemaEditor"
        editorProps={{$blockScrolling: true}}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        fontSize={12}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={uiSchema}
        height="350px"
      />
    </>
  )
}

export default CodeView
