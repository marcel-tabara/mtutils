export const defaultTree = [
  {
    title: '',
    subtitle: 'String',
  },
  {
    title: '',
    subtitle: 'Number',
  },
  {
    title: '',
    subtitle: 'Integer',
  },
  {
    title: '',
    subtitle: 'Boolean',
  },
  {
    title: '',
    subtitle: 'Object',
    expanded: true,
  },
  {
    title: '',
    subtitle: 'Array',
    expanded: true,
  },
]

export const allTypes = [
  'String',
  'Number',
  'Integer',
  'Boolean',
  'Object',
  'Array',
]
export const booleanWidgetEnum = ['radio', 'select', 'checkbox', 'hidden']
export const stringWidgetEnumDefault = [
  'color',
  'password',
  'text',
  'textarea',
  'hidden',
]
export const integerWidgetEnum = ['updown', 'range', 'radio', 'hidden']
export const html5InputTypesEnum = [
  'text',
  'password',
  'submit',
  'reset',
  'radio',
  'checkbox',
  'button',
  'color',
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'range',
  'search',
  'tel',
  'time',
  'url',
  'week',
  'hidden',
]

export const defaultForm = {
  type: 'object',
  properties: {
    props: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          value: { type: 'string' },
        },
      },
    },
  },
}

export const prettierOptions = {
  useTabs: false,
  printWidth: 60,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: false,
  jsxBracketSameLine: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  parser: 'json',
}

export const fieldsTypeEnum = [
  'boolean',
  'string',
  'integer',
  'number',
  'object',
  'array',
]
export const stringFormatWidgetEnum = [
  'default',
  'email',
  'uri',
  'data-url',
  'date',
  'date-time',
]

export const infoFormSchema = {
  type: 'object',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
      title: 'title',
      default: '',
      pattern: '^[a-zA-Z0-9-_]+$',
    },
    description: {
      type: 'string',
      title: 'description',
      default: '',
    },
  },
}

export const uiInfoFormUiSchema = {
  uiWidget: {
    widget: {
      'ui:placeholder': 'Choose a type',
    },
  },
  uiOptions: {
    'ui:placeholder': 'Choose a type',
  },
  uiOthers: {
    'ui:options': { backgroundColor: 'gray' },
    uiPlaceholder: { 'ui:placeholder': 'Choose' },
    uiAutofocus: { 'ui:placeholder': 'Choose' },
  },
}
