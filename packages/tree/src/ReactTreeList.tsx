import React, { FC, ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useUniqueId } from './hooks/useUniqueId'
import { ReactTreeListItem } from './ReactTreeListItem'
import { ReactTreeListItemType } from './types/ItemTypes'
import { useGetItemById } from './utils/useGetItemById'
import { useUpdateItemById } from './utils/useUpdateItemById'

export interface ReactTreeListProps {
  /**
   * TODO: Make a good documentation for this
   */
  data: ReactTreeListItemType[]

  /**
   * TODO: Make a good documentation for this
   */
  onChange(data: ReactTreeListItemType[]): void

  /**
   * Defines the default values for item object
   *
   * Eg. `itemDefaults={{ open: true }}` will make all items open by default unless specified otherwise
   * inside each item separately.
   */
  itemDefaults?: Partial<Omit<ReactTreeListItemType, 'id'>>
}

export const ReactTreeList: FC<ReactTreeListProps> = ({
  data,
  onChange,
  itemDefaults,
}) => {
  const { generate: generateUniqueId } = useUniqueId()
  const lastOpenState = useRef(false)

  const getItemById = useGetItemById<ReactTreeListItemType>(data)
  const updateItemById = useUpdateItemById<ReactTreeListItemType>(
    data,
    onChange,
  )

  /**
   * To make sure the event runs only once, we store in this variable
   * whether the event should run.
   */
  let triggerOnChange = false

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
      }

      if (item.children) {
        item.children.forEach(recursiveRemoveId)
      }
    }

    data.forEach(recursiveRemoveId)

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

      triggerOnChange = true
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

    data.forEach(recursiveMoveIdAfter)

    triggerOnChange = true
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

    data.forEach(recursiveMoveIdAfter)

    triggerOnChange = true
  }

  const genericLabel = (label: string) => (
    <span style={{ fontFamily: 'Arial', fontSize: 12 }}>{label}</span>
  )
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $ref: '#/definitions/String',
    definitions: {
      String: {
        type: 'object',
        properties: {
          title: { type: 'string', default: '', description: '' },
          description: { type: 'string', default: '', description: '' },
          default: { type: 'string', default: '', description: '' },
          maxItems: {
            type: 'integer',
            description:
              'The value of this keyword MUST be a non-negative integer. An array instance is valid against `maxItems` if its size is less than, or equal to, the value of this keyword.',
          },
          minItems: {
            type: 'integer',
            description:
              'The value of this keyword MUST be a non-negative integer. An array instance is valid against `minItems` if its size is greater than, or equal to, the value of this keyword. Omitting this keyword has the same behavior as a value of 0.',
          },
          uniqueItems: {
            type: 'boolean',
            description:
              'The value of this keyword MUST be a boolean. If this keyword has boolean value false, the instance validates successfully.  If it has boolean value true, the instance validates successfully if all of its elements are unique. Omitting this keyword has the same behavior as a value of false.',
          },
        },
        additionalProperties: false,
      },
    },
  }
  const addNew = () => {
    onChange([
      {
        label: genericLabel('Array'),
        open: true,
        schema: schema,
        data: { title: 'Array' },
      },
      ...data,
    ])
  }

  const renderAdd = () => <button onClick={addNew}>Add</button>
  const renderContent = () => {
    /**
     * The children will be rendered as flat, contrary to the tree
     * structure of data.
     */
    const children: ReactNode[] = []
    /**
     * A counter for the indentation of items
     */
    let indent = 0

    const renderItem = (
      listItem: ReactTreeListItemType,
      index: number,
      array: ReactTreeListItemType[],
      parentOpen?: boolean,
      isFirstLoop?: boolean,
    ) => {
      const isFirstItemInFirstLoop = isFirstLoop && index === 0

      if (!listItem.id) {
        triggerOnChange = true
        array[index].id = generateUniqueId()
      }

      const item = array[index]

      if (parentOpen) {
        children.push(
          <ReactTreeListItem
            key={item.id}
            item={{ ...itemDefaults, ...item }}
            indent={indent}
            allowDropBefore={isFirstItemInFirstLoop}
            onDataChange={(data: any) =>
              updateItemById(item.id, { ...item, data })
            }
            onArrowClick={() => updateItemById(item.id, { open: !item.open })}
            onDragging={(drag) => {
              if (drag) {
                lastOpenState.current = !!item.open
                updateItemById(item.id, { open: false })
              } else {
                updateItemById(item.id, { open: lastOpenState.current })
              }
            }}
            onDropInside={(id: string, toId: string) => moveIdTo(id, toId)}
            onDropBefore={(id: string, beforeId: string) =>
              moveIdBefore(id, beforeId)
            }
            onDropAfter={(id: string, afterId: string) =>
              moveIdAfter(id, afterId)
            }
          />,
        )
      }

      if (item.children) {
        // Indent up before processing children
        indent += 1

        item.children.forEach((nestedListItem, nestedIndex, nestedArray) =>
          renderItem(
            nestedListItem,
            nestedIndex,
            nestedArray,
            parentOpen ? item.open : false,
          ),
        )

        // Indent down after children processed
        indent -= 1
      }
    }

    data.forEach((listItem, index, array) =>
      renderItem(listItem, index, array, true, true),
    )

    return children
  }

  useEffect(() => {
    if (triggerOnChange) {
      onChange([...data])
    }
  }, [triggerOnChange])

  return (
    <Root>
      {renderAdd()}
      {renderContent()}
    </Root>
  )
}

const Root = styled.div``
