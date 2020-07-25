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

export const allTypes = ['String', 'Number', 'Integer', 'Boolean', 'Object', 'Array']
export const booleanWidgetEnum = ['radio', 'select', 'checkbox', 'hidden']
export const stringWidgetEnumDefault = ['color', 'password', 'text', 'textarea', 'hidden']
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
          name: {type: 'string'},
          value: {type: 'string'},
        },
      },
    },
  },
}
