import React from 'react'
import { RecoilRoot } from 'recoil'
import { SeoNextComponent } from './SeoNext'

export type SeoNextProps = {}

export const SeoNext: React.FC<SeoNextProps> = () => {
  return (
    <RecoilRoot>
      <SeoNextComponent />
    </RecoilRoot>
  )
}
