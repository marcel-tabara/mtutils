import {useRecoilState} from 'recoil'
import {jsveAtom} from '../shared/jsveAtom'

export const useJsve = () => {
  const [jsve, setJsve] = useRecoilState(jsveAtom)

  return {
    jsve,
    setJsve,
  }
}
