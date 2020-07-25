import React from 'react'

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

const Schema = ({jsve}) => {
  const onChange = () => undefined
  let code = ''
  try {
    code = JSON.parse(jsve.schemaCode, undefined, 2)
  } catch (error) {
    console.log('########## error', error)
    code = jsve.schemaCode
  }

  return (
    <>
      <AceEditor
        mode="json"
        theme="github"
        onChange={onChange}
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
        value={JSON.stringify(code, undefined, 2)}
        height="350px"
      />
    </>
  )
}

export default Schema
