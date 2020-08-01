import React from 'react'
import Form from '@rjsf/material-ui'
import {changeNodeAtPath} from 'react-sortable-tree'
import get from 'lodash/get'
import {generateJsonUISchemaCode} from '../shared/helpers/jsonUISchema'
import {getNodeKey} from '../shared/helper'
import {booleanWidgetEnum, stringWidgetEnumDefault, integerWidgetEnum, html5InputTypesEnum} from '../shared/constants'

const UiInfoForm = ({jsve, setJsve}) => {
  const {tree, currentUINode, uiSchemaCode} = jsve

  let stringWidgetEnum = stringWidgetEnumDefault
  const {node, path} = currentUINode
  const currentType = get(currentUINode, 'node.type', '')
  //const hasInline = !isEmpty(node) && (node.type === 'string' || node.type === 'integer' || node.type === 'number') && !isEmpty(node.enumVal)

  if (currentType === 'string') {
    stringWidgetEnum = stringWidgetEnum.filter((e) => e !== 'file')
    stringWidgetEnum.push('file')
  }

  const getWidgetEnum = () => {
    switch (currentType) {
      case 'string':
        return stringWidgetEnum
      case 'boolean':
        return booleanWidgetEnum
      case 'integer':
      case 'number':
        return integerWidgetEnum
      default:
        return ''
    }
  }

  const currentUiSchema = get(node, 'uiSchema', {})
  const schema = {
    type: 'object',
    properties: {
      uiWidget: {
        type: 'object',
        title: 'ui:widget',
        properties: {
          widget: {
            type: 'string',
            title: 'ui:widget',
            enum: getWidgetEnum(),
            parentType: currentType,
          },
        },
      },
      uiOptions: {
        type: 'object',
        title: 'ui:options',
        properties: {},
      },
      uiMore: {
        type: 'object',
        title: 'ui:more',
        properties: {
          uiDisabled: {
            type: 'boolean',
            title: 'ui:disabled',
            default: get(currentUiSchema, 'uiMore.uiDisabled', false),
          },
          uiReadonly: {
            type: 'boolean',
            title: 'ui:readonly',
            default: get(currentUiSchema, 'uiMore.uiReadonly', false),
          },

          uiEnumDisabled: {
            type: 'boolean',
            title: 'ui:enumDisabled',
            default: get(currentUiSchema, 'uiMore.uiEnumDisabled', false),
          },
        },
      },
      uiOthers: {
        type: 'object',
        title: 'ui:others',
        properties: {
          uiHelp: {
            type: 'string',
            title: 'ui:help',
            default: get(currentUiSchema, 'uiOthers.uiHelp', ''),
          },
          uiTitle: {
            type: 'string',
            title: 'ui:title',
            default: get(currentUiSchema, 'uiOthers.uiTitle', ''),
          },
          uiDescription: {
            type: 'string',
            title: 'ui:description',
            default: get(currentUiSchema, 'uiOthers.uiDescription', ''),
          },
          uiAutofocus: {
            type: 'string',
            title: 'ui:autofocus',
            enum: ['true', 'false'],
            //default: get(currentUiSchema, "uiOthers.uiAutofocus", "")
          },
        },
      },
    },
    dependencies: {
      uiWidget: {
        oneOf: [
          {
            properties: {
              uiWidget: {
                properties: {
                  widget: {enum: ['color']},
                },
              },
            },
          },
          {
            properties: {
              uiWidget: {
                properties: {
                  widget: {enum: ['textarea']},
                },
              },
              uiOptions: {
                properties: {
                  rows: {
                    type: 'integer',
                    title: 'rows',
                    default: get(currentUiSchema, 'uiOptions.rows', 10),
                  },
                },
              },
            },
          },
        ],
      },
    },
  }

  const uiSchema = {
    uiWidget: {
      widget: {
        'ui:placeholder': 'Choose a type',
      },
    },
    uiOptions: {
      'ui:placeholder': 'Choose a type',
    },
    uiOthers: {
      'ui:options': {backgroundColor: 'gray'},
      uiPlaceholder: {'ui:placeholder': 'Choose'},
      uiAutofocus: {'ui:placeholder': 'Choose'},
    },
  }

  if (currentType !== 'boolean' && currentType !== 'object' && currentType !== 'array') {
    schema.properties.uiOthers.properties = {
      ...schema.properties.uiOthers.properties,
      uiPlaceholder: {
        type: 'string',
        title: 'ui:placeholder',
        default: get(currentUiSchema, 'uiOthers.uiPlaceholder', ''),
      },
    }
  }

  // if (hasInline) {
  //   schema.properties.uiOptions.properties = {
  //     ...schema.properties.uiOptions.properties,
  //     uiInline: {
  //       type: "boolean",
  //       title: "inline",
  //       default: get(currentUiSchema, "uiMore.uiInline", false)
  //     }
  //   };
  // }

  if (currentType === 'object') {
    schema.properties.uiOptions.properties = {
      ...schema.properties.uiOptions.properties,
      expandable: {type: 'boolean', title: 'expandable'},
    }

    schema.properties = {
      ...schema.properties,
      uiWidget: {},
      uiOthers: {},
      uiMore: {},
    }
  }
  if (currentType === 'array') {
    schema.properties.uiOptions.properties = {
      ...schema.properties.uiOptions.properties,
      orderable: {type: 'boolean', title: 'orderable'},
      addable: {type: 'boolean', title: 'addable'},
      removable: {type: 'boolean', title: 'removable'},
    }
    schema.properties = {
      ...schema.properties,
      uiWidget: {},
      uiOthers: {},
      uiMore: {},
    }
  }

  if (currentType !== 'array' && currentType !== 'object') {
    schema.properties.uiOptions.properties = {
      ...schema.properties.uiOptions.properties,
      label: {
        type: 'boolean',
        title: 'hasLabel',
        default: get(currentUiSchema, 'uiOptions.label', true),
      },
      classNames: {
        type: 'string',
        title: 'classNames',
        default: get(currentUiSchema, 'uiOptions.classNames', ''),
      },
      inputType: {
        type: 'string',
        title: 'inputType',
        enum: html5InputTypesEnum,
        //default: get(currentUiSchema, "uiOptions.inputType", "text")
      },
      backgroundColor: {
        type: 'string',
        title: 'backgroundColor',
        default: get(currentUiSchema, 'uiOptions.backgroundColor', ''),
      },
    }
  }

  const onChange = (data) => {
    console.log('JsonFormUISettingsForm changed', data, schema)
  }

  const onSubmit = (data) => {
    const {formData} = data
    const newNode = {...node}
    newNode.uiSchema = formData

    const newTree = changeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey,
      newNode,
    })

    setJsve({
      ...jsve,
      tree: newTree,
      currentUINode: {},
      uiSchemaCode: generateJsonUISchemaCode({tree: newTree}),
    })
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onChange={onChange}
      onSubmit={onSubmit}
      formData={currentUiSchema}
      showErrorList={true}
    />
  )
}

export default UiInfoForm
