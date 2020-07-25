import React from 'react'
import SortableTree, {changeNodeAtPath} from 'react-sortable-tree'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import StorageIcon from '@material-ui/icons/Storage'

import AlertDialog from '../components/AlertDialog'
import UiInfoForm from '../screens/UiInfoForm'

const externalNodeType = 'uiSchemaNodeType'
const shouldCopyOnOutsideDrop = true
const getNodeKey = ({treeIndex}) => treeIndex

const UiSchema = ({jsve, setJsve}) => {
  const {tree, currentUINode} = jsve

  const handleClickOpen = ({node, path}) => {
    setJsve({
      ...jsve,
      currentUINode: {node, path},
    })
  }

  const getButtons = (node, path) => {
    if (node.title === 'properties' || node.title === 'items' || node.title === get(currentUINode, 'node.title', ''))
      return []
    return [<StorageIcon color="primary" className="generic_link" onClick={() => handleClickOpen({node, path})} />]
  }

  const getClassName = (pathParam) => {
    return isEqual(pathParam, get(currentUINode, 'path', [])) ? 'rst__rowSelected' : ''
  }

  const isDialogOpen = !isEmpty(currentUINode)

  const showAlert = () => (
    <AlertDialog setJsve={setJsve} open={isDialogOpen} jsve={jsve}>
      <UiInfoForm setJsve={setJsve} jsve={jsve} />
    </AlertDialog>
  )

  const onChange = (data) => {
    console.log('JsonFormUISettingsForm changed', data, schema)
  }

  return (
    <div className="flex">
      <div
        style={{
          width: '45%',
          float: 'left',
          height: '500px',
        }}
      >
        <SortableTree
          treeData={tree}
          onChange={onChange}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          getNodeKey={getNodeKey}
          generateNodeProps={({node, path}) => ({
            buttons: getButtons(node, path),
            className: getClassName(path),
          })}
        />
      </div>
      {showAlert()}
    </div>
  )
}

export default UiSchema
