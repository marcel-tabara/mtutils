import React, { ReactNode } from 'react'
import { useTreeList } from './hooks/useTreeList'
import { TreeListItem } from './TreeListItem'
import { BaseTreeElement, TreeListItemType } from './types'

export const TreeListItemWrapper = <T extends BaseTreeElement>({
  data = [],
  onChange,
  defaults,
}) => {
  const {
    generateUniqueId,
    moveIdAfter,
    moveIdBefore,
    moveIdTo,
    removeByIdWithoutOnChange,
    setDataVisible,
    setTriggerOnChange,
    updateItemById,
    dataVisible,
    lastOpenState,
  } = useTreeList({
    data,
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
            onReset={removeByIdWithoutOnChange}
            datavisibility={{ dataVisible, setDataVisible }}
            key={item.id}
            item={{ ...defaults, ...item }}
            indent={indent}
            allowDropBefore={isFirstItemInFirstLoop}
            onDataChange={(data: any) =>
              updateItemById(item.id, { ...item, data })
            }
            onArrowClick={() => updateItemById(item.id, { open: !item.open })}
            onDragging={(drag) => {
              if (drag) {
                lastOpenState.current = !Boolean(item.open)
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

        item.children.map((childListItem, childIndex, childArray) =>
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

    data.map((listItem, index, array) =>
      renderItem(listItem, index, array, true, true),
    )

    return children
  }

  return <>{renderContent()}</>
}
