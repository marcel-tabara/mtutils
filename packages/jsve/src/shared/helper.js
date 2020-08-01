import {changeNodeAtPath} from 'react-sortable-tree'

export const isPrimitive = (subtitle) =>
  subtitle === 'String' || subtitle === 'Integer' || subtitle === 'Boolean' || subtitle === 'Number'

const getTitleFromPath = (path) => path.toString().split(',').join('-')

export const externalNodeType = 'yourNodeType'
export const shouldCopyOnOutsideDrop = true
export const getNodeKey = ({treeIndex}) => treeIndex

export const prepareFirst = (path, node, tree) => {
  const {
    title,
    description,
    defaultValue,
    enumVal,
    enumNames,
    isRequired,
    format,
    uniqueItems,
    minItems,
    maxItems,
    multipleOf,
    minimum,
    maximum,
    minLength,
    maxLength,
    pattern,
    excludeMinimum,
    excludeMaximum,
    uiSchema,
  } = node

  const newNode = {...node}

  newNode.title = title.length > 0 && title.substring(0, 1) !== '0' ? title : getTitleFromPath(path)
  newNode.uiSchema = uiSchema || {}
  newNode.description = description
  newNode.defaultValue = defaultValue
  newNode.enumVal = enumVal
  newNode.enumNames = enumNames
  newNode.isRequired = isRequired
  newNode.format = format
  newNode.type = node.subtitle.toLowerCase()
  newNode.uniqueItems = uniqueItems

  newNode.minItems = minItems
  newNode.maxItems = maxItems
  newNode.multipleOf = multipleOf
  newNode.minimum = minimum
  newNode.maximum = maximum
  newNode.minLength = minLength
  newNode.maxLength = maxLength

  newNode.excludeMinimum = excludeMinimum
  newNode.excludeMaximum = excludeMaximum
  newNode.pattern = pattern

  const newTree = changeNodeAtPath({
    treeData: tree,
    path: path,
    getNodeKey,
    newNode,
  })

  return newTree
}

export const getUIOrder = (node) => {
  if (node.subtitle === 'String') {
    return [
      'title',
      'description',
      'defaultValue',
      'format',
      'pattern',
      'minLength',
      'maxLength',
      'enumVal',
      'enumNames',
      'isRequired',
    ]
  }
  if (node.subtitle === 'Number') {
    return [
      'title',
      'description',
      'defaultValue',
      'minimum',
      'excludeMinimum',
      'maximum',
      'excludeMaximum',
      'multipleOf',
      'enumVal',
      'enumNames',
      'isRequired',
    ]
  }
  if (node.subtitle === 'Integer') {
    return [
      'title',
      'description',
      'defaultValue',
      'minimum',
      'excludeMinimum',
      'maximum',
      'excludeMaximum',
      'multipleOf',
      'enumVal',
      'enumNames',
      'isRequired',
    ]
  }
  if (node.subtitle === 'Array') {
    return ['title', 'description', 'minItems', 'maxItems', 'uniqueItems']
  }
  if (node.subtitle === 'Object') {
    return ['title', 'description']
  }
  return ['title', 'description', 'defaultValue', 'enumVal', 'enumNames', 'isRequired']
}
