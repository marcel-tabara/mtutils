import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { TreeListItemType } from '..'
import { useGetItemById } from '../utils/useGetItemById'
import { useUniqueId } from '../utils/useUniqueId'
import { useUpdateItemById } from '../utils/useUpdateItemById'

export const useTreeList = ({ initialData, onChange }) => {
  const [triggerOnChange, setTriggerOnChange] = useState<boolean>(false)
  const [type, setType] = useState('')
  const [dataVisible, setDataVisible] = useState<string[]>([])
  const { generate: generateUniqueId } = useUniqueId()
  const lastOpenState = useRef(false)

  const getItemById = useGetItemById<TreeListItemType>(initialData)
  const updateItemById = useUpdateItemById<TreeListItemType>(
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
  ): TreeListItemType | undefined => {
    let returnItem: TreeListItemType | undefined = undefined

    const recursiveRemoveId = (
      item: TreeListItemType,
      index: number,
      array: TreeListItemType[],
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
      item: TreeListItemType,
      index: number,
      array: TreeListItemType[],
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
      item: TreeListItemType,
      index: number,
      array: TreeListItemType[],
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

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value)

  return {
    handleTypeChange,
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
