import React from 'react'
import { RecoilRoot } from 'recoil'
import { JsveComponent } from './screens/JsveComponent'

export type JsveProps = {}

export const Jsve: React.FC<JsveProps> = props => {
  return (
    <RecoilRoot>
      <JsveComponent />
    </RecoilRoot>
  )
}
