import React from 'react'
import SortableTree, {changeNodeAtPath} from 'react-sortable-tree'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import StorageIcon from '@material-ui/icons/Storage'

import AlertDialog from '../components/AlertDialog'
import UiInfoForm from './UiInfoForm'

const externalNodeType = 'uiSchemaNodeType'
const shouldCopyOnOutsideDrop = true
const getNodeKey = ({treeIndex}) => treeIndex

const UiSchemaPage = ({jsve, setJsve}) => {
  const {tree, currentUINode} = jsve
  const handleClickOpen = ({node, path}) =>
    setJsve({
      ...jsve,
      currentUINode: {node, path},
    })

  const getButtons = (node, path) => {
    if (node.title === 'properties' || node.title === 'items' || node.title === get(currentUINode, 'node.title', ''))
      return []
    return [<StorageIcon color="primary" className="generic_link" onClick={() => handleClickOpen({node, path})} />]
  }

  const getClassName = (pathParam) => (isEqual(pathParam, get(currentUINode, 'path', [])) ? 'rst__rowSelected' : '')

  return (
    <div className="flex">
      <div
        style={{
          height: window.innerHeight - 100,
          float: 'left',
          minHeight: window.innerHeight - 100,
          minWidth: window.innerWidth / 2.5,
        }}
      >
        <SortableTree
          treeData={tree}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          getNodeKey={getNodeKey}
          generateNodeProps={({node, path}) => ({
            buttons: getButtons(node, path),
            className: getClassName(path),
          })}
        />
      </div>
    </div>
  )
}

export default UiSchemaPage
