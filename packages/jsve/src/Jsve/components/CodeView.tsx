import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import React from 'react';
import AceEditor from 'react-ace';

const CodeView = ({ jsve }) => {
  const { schemaCode, uiSchemaCode } = jsve;

  const getSchema = (code) => {
    try {
      return JSON.stringify(JSON.parse(code), null, 2);
    } catch (error) {
      return '';
    }
  };

  return (
    <>
      <AceEditor
        mode="json"
        theme="github"
        name="schemaEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        fontSize={12}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={getSchema(schemaCode)}
        height="350px"
      />
      <AceEditor
        mode="json"
        theme="github"
        name="schemaEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
        fontSize={12}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={getSchema(uiSchemaCode)}
        height="350px"
      />
    </>
  );
};

export default CodeView;
