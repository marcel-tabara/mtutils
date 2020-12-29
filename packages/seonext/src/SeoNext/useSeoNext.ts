import { useRecoilState } from 'recoil'
import { AppState, recoilState } from './seoNextAtom'

export const useSeoNext = () => {
  const [seoNext, setSeoNext] = useRecoilState<AppState>(recoilState)

  return {
    seoNext,
    setSeoNext,
  }
}
