enum EObjType {
  'array' = 'array',
  'object' = 'object',
  'string' = 'string',
  'integer' = 'integer',
  'number' = 'number',
  'null' = 'null',
  'undefined' = 'undefined',
  'boolean' = 'boolean',
}

type AllTypes = Object[] | Object | string | number | null | undefined

const getType = <T>(item: T[] | T) => {
  if (Array.isArray(item)) {
    return EObjType.array
  } else if (item === Object(item)) {
    return EObjType.object
  } else if (item === null) {
    return EObjType.null
  } else if (item === undefined) {
    return EObjType.undefined
  } else if (typeof item === 'string') {
    return EObjType.string
  } else if (typeof item === 'number') {
    return EObjType.number
  } else if (Number.isInteger(item)) {
    return EObjType.integer
  } else if (typeof item === 'boolean') {
    return EObjType.boolean
  } else {
    return EObjType.undefined
  }
}

const traverse = (obj, node) => {
  for (let key in node) {
    if (getType(node[key]) === 'object') {
      obj[key] = { type: 'object', properties: {} }
      traverse(obj[key].properties, node[key])
    } else if (getType(node[key]) === 'array') {
      obj[key] = { type: 'array', items: {} }
      traverse(obj[key].items, node[key])
    } else {
      obj[key] = { type: getType(node[key]) }
    }
  }
  return obj
}

export const js2jsonSchema = (items: AllTypes) => {
  return traverse({}, items)
}
