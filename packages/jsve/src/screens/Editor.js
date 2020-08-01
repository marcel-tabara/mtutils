import React, {useState} from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import 'react-sortable-tree/style.css'
import isEmpty from 'lodash/isEmpty'

import UiSchemaPage from './UiSchemaPage'
import SchemaPage from './SchemaPage'

import InfoForm from './InfoForm'
import UiInfoForm from './UiInfoForm'

import AlertDialog from '../components/AlertDialog'

const Editor = ({jsve, setJsve}) => {
  const [tab, setTab] = useState(0)
  const {tree, currentNode, currentUINode, schemaCode, uiSchemaCode, error} = jsve

  const handleChange = (e, newValue) => setTab(newValue)
  const renderTabs = () => {
    return (
      <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Schema" />
        <Tab label="uiSchema" />
      </Tabs>
    )
  }

  const isDialogOpen = !isEmpty(currentNode) || !isEmpty(currentUINode)

  const showAlert = () => (
    <AlertDialog setJsve={setJsve} open={isDialogOpen} jsve={jsve}>
      {!isEmpty(currentNode) && <InfoForm setJsve={setJsve} jsve={jsve} />}
      {!isEmpty(currentUINode) && <UiInfoForm setJsve={setJsve} jsve={jsve} />}
    </AlertDialog>
  )

  const renderContent = () => {
    if (tab === 0) {
      return <SchemaPage jsve={jsve} setJsve={setJsve} />
    }
    if (tab === 1) {
      return <UiSchemaPage jsve={jsve} setJsve={setJsve} />
    }
    return null
  }

  return (
    <>
      {renderTabs()}
      {renderContent()}
      {showAlert()}
    </>
  )
}

export default Editor
