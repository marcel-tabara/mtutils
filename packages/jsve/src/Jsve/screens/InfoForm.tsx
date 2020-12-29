import React from 'react'
import Form from '@rjsf/material-ui'
import isEmpty from 'lodash/isEmpty'

import {generateJsonSchemaCode} from '../shared/helpers/jsonSchema'
import {getNodeKey, getUIOrder, prepareFirst} from '../shared/helper'

import {fieldsTypeEnum, stringFormatWidgetEnum, infoFormSchema} from '../shared/constants'

const InfoForm = ({jsve, setJsve}) => {
  const {tree, currentNode} = jsve

  if (isEmpty(currentNode)) return null

  const {node, path} = currentNode
  let schema = infoFormSchema

  const transformErrors = (errors) => {
    return errors.map((error) => {
      if (error.name === 'pattern') {
        error.message = 'Only alphanumeric characters, dash and underscore are allowed'
      }
      return error
    })
  }

  if (node.subtitle !== 'Object' && node.subtitle !== 'Array') {
    schema.properties = {
      ...schema.properties,
      isRequired: {
        type: 'boolean',
        title: 'isRequired',
        default: false,
      },
      defaultValue: {
        type: 'string',
        title: 'default',
        default: '',
      },
    }
  }

  if (node.subtitle === 'String') {
    schema.properties = {
      ...schema.properties,
      format: {
        type: 'string',
        title: 'Format',
        enum: stringFormatWidgetEnum,
        default: 'default',
      },
      minLength: {
        type: 'string',
        title: 'minLength',
        default: '',
      },
      maxLength: {
        type: 'string',
        title: 'maxLength',
        default: '',
      },
      pattern: {
        type: 'string',
        title: 'pattern',
        default: '',
      },
    }
  }

  if (node.subtitle === 'Number' || node.subtitle === 'Integer') {
    schema.properties = {
      ...schema.properties,
      minimum: {
        type: 'string',
        title: 'Minimum',
        default: '',
      },
      maximum: {
        type: 'string',
        title: 'Maximum',
        default: '',
      },
      multipleOf: {
        type: 'string',
        title: 'multipleOf',
        default: '',
      },
      excludeMinimum: {
        type: 'boolean',
        title: 'excludeMinimum',
        default: false,
      },
      excludeMaximum: {
        type: 'boolean',
        title: 'excludeMaximum',
        default: false,
      },
    }
  }

  if (node.subtitle === 'Array') {
    schema.properties = {
      ...schema.properties,
      minItems: {
        type: 'string',
        title: 'minItems',
        default: '',
      },
      maxItems: {
        type: 'string',
        title: 'maxItems',
        default: '',
      },
      uniqueItems: {
        type: 'boolean',
        title: 'uniqueItems',
        default: false,
      },
    }
  }

  if (node.subtitle !== 'Object' && node.subtitle !== 'Array') {
    schema.properties = {
      ...schema.properties,
      enumVal: {
        type: 'string',
        title: 'Enum',
        default: '',
      },
      enumNames: {
        type: 'string',
        title: 'EnumNames',
        default: '',
      },
    }
  }

  const onSubmit = ({formData}) => {
    const newTree = prepareFirst(path, formData, tree)

    setJsve({
      ...jsve,
      tree: newTree,
      schemaCode: generateJsonSchemaCode({tree: newTree}),
      currentNode: [],
    })
  }

  const infoFormUiSchema = {
    format: {
      'ui:widget': 'select',
      'ui:placeholder': 'Choose a format',
    },
    'ui:order': getUIOrder(node),
  }

  return (
    <Form
      schema={schema}
      noHtml5Validate={true}
      uiSchema={infoFormUiSchema}
      onSubmit={onSubmit}
      formData={node}
      transformErrors={transformErrors}
    />
  )
}

export default InfoForm
