import React from 'react'

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

const Schema = (props) => {
  const onChange = () => undefined

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
        value={JSON.stringify({}, undefined, 2)}
        height="350px"
      />
    </>
  )
}

export default Schema
