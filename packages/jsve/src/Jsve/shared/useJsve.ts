import { useRecoilState } from 'recoil'
import { AppState, recoilState } from '../shared/jsveAtom'

export const useJsve = () => {
  const [jsve, setJsve] = useRecoilState<AppState>(recoilState)

  return {
    jsve,
    setJsve,
  }
}
