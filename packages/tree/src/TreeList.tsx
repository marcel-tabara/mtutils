import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useTreeList } from './hooks/useTreeList'
import { TreeListItem } from './TreeListItem'
import { TreeListItemType, TreeListProps } from './types'
import { TypeSelector } from './TypeSelector'

export const TreeList = <T extends { title: string }>({
  initialData = [],
  onChange,
  itemDefaults,
}: TreeListProps<T>) => {
  const {
    setTriggerOnChange,
    type,
    handleTypeChange,
    dataVisible,
    setDataVisible,
    generateUniqueId,
    lastOpenState,
    updateItemById,
    removeByIdWithoutOnChange,
    moveIdTo,
    moveIdAfter,
    moveIdBefore,
  } = useTreeList({
    initialData,
    onChange,
  })

  const renderContent = () => {
    const children: ReactNode[] = []
    let indent = 0

    const renderItem = (
      listItem: TreeListItemType<T>,
      index: number,
      array: TreeListItemType<T>[],
      parentOpen?: boolean,
      isFirstLoop?: boolean,
    ) => {
      const isFirstItemInFirstLoop = isFirstLoop && index === 0

      if (!listItem.id) {
        setTriggerOnChange(true)
        array[index].id = generateUniqueId()
      }

      const item = array[index]

      if (parentOpen) {
        children.push(
          <TreeListItem<T>
            remove={removeByIdWithoutOnChange}
            datavisibility={{ dataVisible, setDataVisible }}
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
        indent += 1

        item.children.forEach((childListItem, childIndex, childArray) =>
          renderItem(
            childListItem,
            childIndex,
            childArray,
            parentOpen ? item.open : false,
          ),
        )

        indent -= 1
      }
    }

    initialData.forEach((listItem, index, array) =>
      renderItem(listItem, index, array, true, true),
    )

    return children
  }

  return (
    <Root>
      <TypeSelector
        initialData={initialData}
        onChange={onChange}
        handleTypeChange={handleTypeChange}
        setDataVisible={setDataVisible}
        type={type}
      />
      {renderContent()}
    </Root>
  )
}

const Root = styled.div``
