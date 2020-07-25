import React, {useState} from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import 'react-sortable-tree/style.css'

import FormPage from './FormPage'
import TreePage from './TreePage'

import InfoForm from './InfoForm'

import isEmpty from 'lodash/isEmpty'

import AlertDialog from '../components/AlertDialog'

const Editor = ({jsve, setJsve}) => {
  const [tab, setTab] = useState(0)
  const {tree, currentNode, currentUINode, schemaCode, uiSchemaCode, error} = jsve

  const handleChange = (e, newValue) => setTab(newValue)
  const renderTabs = () => {
    return (
      <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
        <Tab label="JsonSchema" />
        <Tab label="Tree" />
      </Tabs>
    )
  }

  const isDialogOpen = !isEmpty(currentNode) || !isEmpty(currentUINode)

  const showAlert = () => (
    <AlertDialog setJsve={setJsve} open={isDialogOpen} jsve={jsve}>
      <InfoForm setJsve={setJsve} jsve={jsve} />
    </AlertDialog>
  )

  const renderContent = () => {
    if (tab === 0) {
      return <FormPage jsve={jsve} setJsve={setJsve} />
    }
    if (tab === 1) {
      return <TreePage jsve={jsve} setJsve={setJsve} />
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
