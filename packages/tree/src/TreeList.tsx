import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { GenericFormSchemas } from '@mtutils/jsonschema-collection'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useTreeList } from './hooks/useTreeList'
import { TreeListItem } from './TreeListItem'
import { TreeListItemType, TreeListProps } from './types'

export const TreeList = ({
  initialData = [],
  onChange,
  itemDefaults,
}: TreeListProps) => {
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

  const genericLabel = (label: string) => (
    <span style={{ fontFamily: 'Arial', fontSize: 12 }}>{label}</span>
  )

  const addNew = () => {
    onChange([
      {
        label: genericLabel(type),
        open: true,
        data: { title: type },
        type,
        schema:
          GenericFormSchemas[`rjsf_${type}`].definitions[
            type.replace(/^\w/, (c) => c.toUpperCase())
          ],
      },
      ...initialData,
    ])
    setDataVisible([])
  }
  const dataTypes = ['string', 'number', 'array', 'object']

  const renderAdd = () => {
    return (
      <>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={type}
            onChange={handleTypeChange}
            label="Type"
            style={{ width: '10rem' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataTypes.map((e) => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          aria-label="close"
          onClick={addNew}
          disabled={!Boolean(type)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </>
    )
  }

  const renderContent = () => {
    const children: ReactNode[] = []
    let indent = 0

    const renderItem = (
      listItem: TreeListItemType,
      index: number,
      array: TreeListItemType[],
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
          <TreeListItem
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

        item.children.forEach((nestedListItem, nestedIndex, nestedArray) =>
          renderItem(
            nestedListItem,
            nestedIndex,
            nestedArray,
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
      {renderAdd()}
      {renderContent()}
    </Root>
  )
}

const Root = styled.div``
