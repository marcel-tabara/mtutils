import {atom} from 'recoil'

export const jsveAtom = atom({
  key: 'jsve',
  default: {
    tree: [],
    currentNode: {},
    currentUINode: {},
    schemaCode: '',
    uiSchemaCode: '',
    error: '',
  },
})
