import React from 'react'
import JsveComponent from './screens/JsveComponent'
import {RecoilRoot} from 'recoil'

const Jsve = (props) => (
  <RecoilRoot>
    <JsveComponent {...props} />
  </RecoilRoot>
)

export default Jsve
