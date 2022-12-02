import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { TreeListItemType } from '..'
import { useGetItemById } from '../utils/useGetItemById'
import { useUniqueId } from '../utils/useUniqueId'
import { useUpdateItemById } from '../utils/useUpdateItemById'

export const useTreeList = ({ data, onChange }) => {
  const [triggerOnChange, setTriggerOnChange] = useState<boolean>(false)
  const [type, setType] = useState('')
  const [dataVisible, setDataVisible] = useState<string[]>([])
  const { generate: generateUniqueId } = useUniqueId()
  const lastOpenState = useRef(false)

  const getItemById = useGetItemById<TreeListItemType<typeof data>>(data)
  const updateItemById = useUpdateItemById<TreeListItemType<typeof data>>(
    data,
    onChange,
  )

  useEffect(() => {
    if (triggerOnChange) {
      onChange([...data])
    }
  }, [triggerOnChange])

  const removeByIdWithoutOnChange = (
    id: string,
  ): TreeListItemType<typeof data> | undefined => {
    let returnItem: TreeListItemType<typeof data> | undefined = undefined

    const recursiveRemoveId = (
      item: TreeListItemType<typeof data>,
      index: number,
      array: TreeListItemType<typeof data>[],
    ) => {
      if (returnItem) return

      if (item.id === id) {
        returnItem = item
        array.splice(index, 1)
        return
      } else if (item.children) {
        item.children.forEach(recursiveRemoveId)
      }
    }

    data.forEach(recursiveRemoveId)

    onChange(data)
    return returnItem
  }

  const moveIdTo = (id: string, toId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id)

    if (!copyOfItem) return

    const item = getItemById(toId)

    if (item) {
      item.open = true

      if (!item.children) {
        item.children = [copyOfItem]
      } else {
        item.children.unshift(copyOfItem)
      }

      setTriggerOnChange(true)
    }
  }

  const moveIdBefore = (id: string, beforeId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id)
    let breakRecursion = false

    if (!copyOfItem) return

    const recursiveMoveIdAfter = (
      item: TreeListItemType<typeof data>,
      index: number,
      array: TreeListItemType<typeof data>[],
    ) => {
      if (breakRecursion) return

      if (item.id === beforeId) {
        array.splice(index, 0, copyOfItem)
        breakRecursion = true
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter)
      }
    }

    data.forEach(recursiveMoveIdAfter)
    setTriggerOnChange(true)
  }

  const moveIdAfter = (id: string, afterId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id)
    let breakRecursion = false

    if (!copyOfItem) return

    const recursiveMoveIdAfter = (
      item: TreeListItemType<typeof data>,
      index: number,
      array: TreeListItemType<typeof data>[],
    ) => {
      if (breakRecursion) return

      if (item.id === afterId) {
        array.splice(index + 1, 0, copyOfItem)
        breakRecursion = true
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter)
      }
    }

    data.forEach(recursiveMoveIdAfter)
    setTriggerOnChange(true)
  }

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value)

  return {
    generateUniqueId,
    getItemById,
    handleTypeChange,
    moveIdAfter,
    moveIdBefore,
    moveIdTo,
    removeByIdWithoutOnChange,
    setDataVisible,
    setTriggerOnChange,
    setType,
    updateItemById,
    dataVisible,
    lastOpenState,
    triggerOnChange,
    type,
  }
}
