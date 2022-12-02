import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import StorageIcon from '@material-ui/icons/Storage'
import isEmpty from 'lodash/isEmpty'
import React from 'react'
import SortableTree, {
  getFlatDataFromTree,
  removeNodeAtPath,
} from 'react-sortable-tree'
import 'react-sortable-tree/style.css'
import { defaultTree } from '../shared/constants'
import {
  externalNodeType,
  getNodeKey,
  isPrimitive,
  prepareFirst,
  shouldCopyOnOutsideDrop,
} from '../shared/helper'
import { generateJsonSchemaCode } from '../shared/helpers/jsonSchema'
import { generateJsonUISchemaCode } from '../shared/helpers/jsonUISchema'

const SchemaPage = ({ jsve, setJsve }) => {
  const { tree, currentNode, currentUINode, schemaCode, uiSchemaCode, error } =
    jsve

  const remove = (path) => {
    const newTree = removeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey,
    })
    setJsve({ ...jsve, tree: newTree })
  }

  const validateJsonForm = (jsonForm) => {
    if (jsonForm.length > 1) return jsonForm
    const flatData = getFlatDataFromTree({
      treeData: jsonForm,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: false,
    })

    return flatData.find(
      (el) =>
        isPrimitive(el.node.subtitle.toString()) && !isEmpty(el.node.children),
    )
  }

  const onChange = (treeData) => {
    if (isEmpty(validateJsonForm(treeData))) {
      const flatData = getFlatDataFromTree({
        treeData,
        getNodeKey: ({ treeIndex }) => treeIndex,
        ignoreCollapsed: false,
      })
      let newTree = treeData

      flatData.map((el) => {
        newTree = prepareFirst(el.path, el.node, newTree)
      })

      setJsve({
        ...jsve,
        tree: newTree,
        schemaCode: generateJsonSchemaCode({ tree: newTree }),
        uiSchemaCode: generateJsonUISchemaCode({ tree: newTree }),
      })
    } else {
      setJsve({ ...jsve, error: 'Not allowed.' })
    }
  }

  const setCurrentForm = (node, path) =>
    setJsve({ ...jsve, currentNode: { node, path } })

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
          treeData={defaultTree}
          onChange={() => console.log('changed')}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
        />
      </div>

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
          onChange={onChange}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          getNodeKey={getNodeKey}
          generateNodeProps={({ node, path }) => ({
            buttons: [
              <RemoveCircleOutlineIcon
                color="primary"
                className="generic_link"
                onClick={() => remove(path)}
              />,
              <StorageIcon
                color="primary"
                className="generic_link"
                onClick={() => setCurrentForm(node, path)}
              />,
            ],
          })}
        />
      </div>
    </div>
  )
}

export default SchemaPage
