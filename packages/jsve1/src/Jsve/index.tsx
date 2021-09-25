import { ReactTreeList } from '@mtutils/tree'
import React from 'react'

interface JsveProps {
  data: any
  onChange(data: any): void
}

const baseOnChange = () => undefined

const Jsve = ({ data, onChange = baseOnChange }: JsveProps) => {
  return (
    <div style={{ padding: 10 }}>
      <ReactTreeList data={data} onChange={onChange} />
    </div>
  )
}

export { Jsve }
