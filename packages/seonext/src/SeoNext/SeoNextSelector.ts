import { selector } from 'recoil'
import { recoilState } from './seoNextAtom'

export const seoNextSelector = selector({
  key: 'seoNextState',
  get: ({ get }) => get(recoilState),
})
