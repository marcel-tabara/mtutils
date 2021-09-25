import { useEffect, useRef, useState } from 'react'
import { ReactTreeListItemType } from '..'
import { useGetItemById } from '../utils/useGetItemById'
import { useUpdateItemById } from '../utils/useUpdateItemById'
import { useUniqueId } from './useUniqueId'

export const useReactTreeList = ({ initialData, onChange }) => {
  const [triggerOnChange, setTriggerOnChange] = useState<boolean>(false)
  const [type, setType] = useState('')
  const [dataVisible, setDataVisible] = useState<string[]>([])
  const { generate: generateUniqueId } = useUniqueId()
  const lastOpenState = useRef(false)

  const getItemById = useGetItemById<ReactTreeListItemType>(initialData)
  const updateItemById = useUpdateItemById<ReactTreeListItemType>(
    initialData,
    onChange,
  )

  useEffect(() => {
    if (triggerOnChange) {
      onChange([...initialData])
    }
  }, [triggerOnChange])

  const removeByIdWithoutOnChange = (
    id: string,
  ): ReactTreeListItemType | undefined => {
    let returnItem: ReactTreeListItemType | undefined = undefined

    const recursiveRemoveId = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[],
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

    initialData.forEach(recursiveRemoveId)

    onChange(initialData)
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
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[],
    ) => {
      if (breakRecursion) return

      if (item.id === beforeId) {
        array.splice(index, 0, copyOfItem)
        breakRecursion = true
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter)
      }
    }

    initialData.forEach(recursiveMoveIdAfter)
    setTriggerOnChange(true)
  }

  const moveIdAfter = (id: string, afterId: string) => {
    const copyOfItem = removeByIdWithoutOnChange(id)
    let breakRecursion = false

    if (!copyOfItem) return

    const recursiveMoveIdAfter = (
      item: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[],
    ) => {
      if (breakRecursion) return

      if (item.id === afterId) {
        array.splice(index + 1, 0, copyOfItem)
        breakRecursion = true
      } else if (item.children) {
        item.children.forEach(recursiveMoveIdAfter)
      }
    }

    initialData.forEach(recursiveMoveIdAfter)
    setTriggerOnChange(true)
  }

  return {
    triggerOnChange,
    setTriggerOnChange,
    type,
    setType,
    dataVisible,
    setDataVisible,
    generateUniqueId,
    lastOpenState,
    getItemById,
    updateItemById,
    removeByIdWithoutOnChange,
    moveIdTo,
    moveIdAfter,
    moveIdBefore,
  }
}
