import { atom, RecoilState } from 'recoil'

export interface AppState {
  seoNextState: any
}

export const recoilState: RecoilState<AppState> = atom({
  key: 'initialAppState',
  default: {
    seoNextState: {},
  },
})
