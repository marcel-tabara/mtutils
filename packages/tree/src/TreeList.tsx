import { js2jsonSchema } from '@mtutils/js2jsonschema'
import React from 'react'
import { useTreeList } from './hooks/useTreeList'
import { TreeListItemWrapper } from './TreeListItemWrapper'
import { BaseTreeElement, TreeListProps } from './types'
import { TypeSelector } from './TypeSelector'

export const TreeList = <T extends BaseTreeElement>({
  data = [],
  onChange,
  defaults,
}: TreeListProps<T>) => {
  const { type, handleTypeChange, setDataVisible } = useTreeList({
    data,
    onChange,
  })

  const xxx = [
    {
      a: 1,
      b: [{ k: 'k' }],
      c: {
        d: 1,
        e: [
          {
            f: 'fff',
          },
        ],
      },
    },
  ]

  const yyy = js2jsonSchema(xxx)
  console.log('########## yyy', yyy)

  return (
    <>
      <TypeSelector
        data={data}
        onChange={onChange}
        handleTypeChange={handleTypeChange}
        setDataVisible={setDataVisible}
        type={type}
      />
      <TreeListItemWrapper<T>
        data={data}
        onChange={onChange}
        defaults={defaults}
      />
    </>
  )
}
