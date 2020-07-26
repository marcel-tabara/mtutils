import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import get from 'lodash/get'
import {getFlatDataFromTree} from 'react-sortable-tree'

export const generateJsonUISchemaCode = (props) => {
  const {tree} = props
  let code = ''

  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({treeIndex}) => treeIndex,
    ignoreCollapsed: false,
  })

  if (!isEmpty(tree) && tree[0].title) code += `{`

  const prepareJsonFormUICode = (jsonForm) => {
    jsonForm.map((el) => {
      if (el.title) {
        let isFirstChild = false
        let isChild = false
        let isLastChild = false
        const isArray = el.subtitle === 'Array'
        const uiSchema = get(el, 'uiSchema', null)
        console.log('########## uiSchema', uiSchema)
        const flatElement = flatData.find((element) => element.node.title === el.title)

        const parent = !isEmpty(flatElement) ? flatElement.parentNode : null
        const hasParentObject = !isEmpty(parent) && parent.type === 'object'
        const hasTitle = !isEmpty(el.title)

        const hasUiOptions =
          (has(uiSchema, 'uiOptions.addable') && uiSchema.uiOptions.addable) ||
          (has(uiSchema, 'uiOptions.orderable') && uiSchema.uiOptions.orderable) ||
          (has(uiSchema, 'uiOptions.removable') && uiSchema.uiOptions.removable) ||
          (has(uiSchema, 'uiOptions.expandable') && uiSchema.uiOptions.expandable)

        let coma = ''

        if (!isEmpty(parent)) {
          isChild = !isEmpty(parent.children)
          isLastChild = isChild ? parent.children[parent.children.length - 1].title === el.title : false
          isFirstChild = isChild ? parent.children[0].title === el.title : false
        }

        if (!isEmpty(uiSchema)) {
          if (!isFirstChild) code += `,`
          if (isChild && hasParentObject && hasTitle) {
            code += `"${el.title}": {`
          }

          if (isArray && hasTitle) {
            code += `"items":`
            code += !isEmpty(el.children) && el.children.length > 1 ? `[{` : '{'
          }
        }

        if (!isEmpty(el.children)) prepareJsonFormUICode(el.children)

        if (!isEmpty(uiSchema)) {
          // uiMore start -----------------------------
          if (has(uiSchema, 'uiMore.uiDisabled') && uiSchema.uiMore.uiDisabled) {
            code += `"ui:disabled": true`
            coma = ','
          }
          if (has(uiSchema, ', uiMore.uiEnumDisabled') && uiSchema.uiMore.uiEnumDisabled) {
            code += `${coma} "ui:enumDisabled": true`
            coma = ','
          }
          if (has(uiSchema, 'uiMore.uiReadonly') && uiSchema.uiMore.uiReadonly) {
            code += `${coma} "ui:readonly": true`
            coma = ','
          }
          // uiMore end -----------------------------

          // uiOptions
          //if (hasUiOptions) code += `"ui:options": {`

          // if (has(uiSchema, "uiOptions.uiInline"))
          //   code += `"inline": ${uiSchema.uiOptions.uiInline},`;
          if (has(uiSchema, 'uiOptions.backgroundColor') && uiSchema.uiOptions.backgroundColor) {
            code += `${coma} "ui:backgroundColor": "${uiSchema.uiOptions.backgroundColor}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.classNames') && uiSchema.uiOptions.classNames) {
            code += `${coma} "ui:classNames": "${uiSchema.uiOptions.classNames}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.inputType') && uiSchema.uiOptions.inputType) {
            code += `${coma} "ui:inputType": "${uiSchema.uiOptions.inputType}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.label')) {
            code += `${coma} "ui:label": "${uiSchema.uiOptions.label}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.rows') && uiSchema.uiOptions.rows) {
            code += `${coma} "ui:rows": ${uiSchema.uiOptions.rows}`
            coma = ','
          }

          //if (hasUiOptions) code += `}`

          // uiOthers start -------------------------------------
          if (has(uiSchema, 'uiOthers.uiAutofocus') && uiSchema.uiOthers.uiAutofocus) {
            code += `${coma} "ui:autofocus": ${uiSchema.uiOthers.uiAutofocus}`
            coma = ','
          }
          if (has(uiSchema, 'uiOthers.uiDescription') && uiSchema.uiOthers.uiDescription) {
            code += `${coma} "ui:description": "${uiSchema.uiOthers.uiDescription}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOthers.uiTitle') && uiSchema.uiOthers.uiTitle) {
            code += `${coma} "ui:title": "${uiSchema.uiOthers.uiTitle}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOthers.uiHelp') && uiSchema.uiOthers.uiHelp) {
            code += `${coma} "ui:help": "${uiSchema.uiOthers.uiHelp}"`
            coma = ','
          }
          if (has(uiSchema, 'uiOthers.uiPlaceholder') && uiSchema.uiOthers.uiPlaceholder.length > 0) {
            code += `${coma} "ui:placeholder": "${uiSchema.uiOthers.uiPlaceholder}"`
            coma = ','
          }
          // uiOthers end -------------------------------------

          // uiWidget
          if (has(uiSchema, 'uiWidget.widget') && uiSchema.uiWidget.widget)
            code += `${coma} "ui:widget": "${uiSchema.uiWidget.widget}"`

          if (isChild && hasParentObject && hasTitle) {
            code += `}`
          }

          // uiOptions start -----------------------
          //if (hasUiOptions) code += `"ui:options": {`

          if (has(uiSchema, 'uiOptions.addable') && uiSchema.uiOptions.addable) {
            code += `"ui:addable": ${uiSchema.uiOptions.addable}`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.orderable') && uiSchema.uiOptions.orderable) {
            code += `${coma} "ui:orderable": ${uiSchema.uiOptions.orderable}`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.removable') && uiSchema.uiOptions.removable) {
            code += `${coma} "ui:removable": ${uiSchema.uiOptions.removable}`
            coma = ','
          }
          if (has(uiSchema, 'uiOptions.expandable') && uiSchema.uiOptions.expandable) {
            code += `${coma} "ui:expandable": ${uiSchema.uiOptions.expandable}`
            coma = ''
          }

          //if (hasUiOptions) code += `}`
          // uiOptions end -----------------------

          if (isArray && hasTitle) {
            code += !isEmpty(el.children) && el.children.length > 1 ? `}]` : '}'
          }
          //if (!isLastChild) code += ', '
          if (!isEmpty(parent) && parent.type === 'array' && !isLastChild) code += '}, {'
        }
        if (isEmpty(parent)) code += `}`
      }
    })

    return code
  }

  return prepareJsonFormUICode(tree)
}
