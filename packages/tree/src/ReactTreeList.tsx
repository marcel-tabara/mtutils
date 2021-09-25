import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { GenericFormSchemas } from '@mtutils/jsonschema-collection'
import React, {
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { useUniqueId } from './hooks/useUniqueId'
import { ReactTreeListItem } from './ReactTreeListItem'
import { ReactTreeListItemType } from './types/ItemTypes'
import { useGetItemById } from './utils/useGetItemById'
import { useUpdateItemById } from './utils/useUpdateItemById'

export interface ReactTreeListProps {
  data: ReactTreeListItemType[]
  onChange(data: ReactTreeListItemType[]): void
  itemDefaults?: Partial<Omit<ReactTreeListItemType, 'id'>>
}

export const ReactTreeList: FC<ReactTreeListProps> = ({
  data = [],
  onChange,
  itemDefaults,
}) => {
  const [type, setType] = useState('')
  const [dataVisible, setDataVisible] = useState<string[]>([])
  const { generate: generateUniqueId } = useUniqueId()
  const lastOpenState = useRef(false)

  const getItemById = useGetItemById<ReactTreeListItemType>(data)
  const updateItemById = useUpdateItemById<ReactTreeListItemType>(
    data,
    onChange,
  )

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
      ...data,
    ])
    setDataVisible([])
  }

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value)

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
            <MenuItem value={'string'}>string</MenuItem>
            <MenuItem value={'number'}>number</MenuItem>
            <MenuItem value={'integer'}>integer</MenuItem>
            <MenuItem value={'array'}>array</MenuItem>
            <MenuItem value={'object'}>object</MenuItem>
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
