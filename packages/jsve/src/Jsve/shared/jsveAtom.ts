import { atom, RecoilState } from 'recoil'

export interface AppState {
  tree: any[]
  currentNode: any
  currentUINode: any
  schemaCode: string
  uiSchemaCode: string
  error: string
}

export const recoilState: RecoilState<AppState> = atom({
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
