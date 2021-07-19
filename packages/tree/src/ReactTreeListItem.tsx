import IconButton from '@material-ui/core/IconButton'
import AllOutIcon from '@material-ui/icons/AllOut'
import CloseIcon from '@material-ui/icons/Close'
import Form from '@rjsf/material-ui'
import { JSONSchema7 } from 'json-schema'
import React, {
  FC,
  forwardRef,
  HTMLAttributes,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { ReactTreeListItemType } from './types/ItemTypes'

export interface ReactTreeListItemProps {
  item: ReactTreeListItemType
  indent: number
  allowDropBefore?: boolean
  datavisibility: {
    dataVisible: string[]
    setDataVisible(value: string[]): void
  }
  onRemove(id: string): void
  onDataChange(data: any): void
  onFocusEnter?(item: ReactTreeListItemType): void
  onArrowClick?(item: ReactTreeListItemType): void
  onDragging?(dragging: boolean): void
  onDropInside?(id: string, toId: string): void
  onDropBefore?(id: string, toId: string): void
  onDropAfter?(id: string, toId: string): void
}

export const ReactTreeListItem: FC<ReactTreeListItemProps> = ({
  onRemove,
  datavisibility,
  onDataChange,
  onDragging,
  onDropInside,
  onDropBefore,
  onDropAfter,
  allowDropBefore,
  ...props
}: ReactTreeListItemProps) => {
  const { item } = props
  const { dataVisible, setDataVisible } = datavisibility

  const RootRef = useRef<HTMLDivElement>(null)
  const DropAreaRef = useRef<HTMLDivElement>(null)
  const BeforeDropAreaRef = useRef<HTMLDivElement>(null)
  const AfterDropAreaRef = useRef<HTMLDivElement>(null)

  const [dragging, setDragging] = useState(false)
  const [isDragged, setIsDragged] = useState(false)

  const setDragOver = (dragOver: boolean) => {
    if (dragOver) {
      RootRef.current?.classList.add('dragOver')
    } else if (RootRef.current?.classList.contains('dragOver')) {
      RootRef.current?.classList.remove('dragOver')
    }
  }

  const setBeforeDropAreaDragOver = (dragOver: boolean) => {
    if (dragOver) {
      BeforeDropAreaRef.current?.classList.add('dragOver')
    } else if (BeforeDropAreaRef.current?.classList.contains('dragOver')) {
      BeforeDropAreaRef.current?.classList.remove('dragOver')
    }
  }

  const setAfterDropAreaDragOver = (dragOver: boolean) => {
    if (dragOver) {
      AfterDropAreaRef.current?.classList.add('dragOver')
    } else if (AfterDropAreaRef.current?.classList.contains('dragOver')) {
      AfterDropAreaRef.current?.classList.remove('dragOver')
    }
  }

  const onDrag: HTMLAttributes<HTMLDivElement>['onDrag'] = () => {
    // setIsDragged(true);
  }

  const onDragStart: HTMLAttributes<HTMLDivElement>['onDragStart'] = (
    event,
  ) => {
    onDragging && onDragging(true)

    if (item.id) {
      event.dataTransfer.setData('itemId', item.id)
    }
  }

  const onDragEnd: HTMLAttributes<HTMLDivElement>['onDragEnd'] = () => {
    onDragging && onDragging(false)
  }

  const onFocusKeyPress: HTMLAttributes<HTMLDivElement>['onKeyPress'] = (
    event,
  ) => {
    if (event.which === 13) {
      onArrowClick()
    }
  }

  const onArrowClick = () => props.onArrowClick && props.onArrowClick(item)

  useEffect(() => {
    const dragStartHandler = () => {
      setDragging(true)
    }
    const dragEndHandler = () => {
      setDragging(false)
      setIsDragged(false)
    }

    document.addEventListener('dragstart', dragStartHandler)
    document.addEventListener('dragend', dragEndHandler)
    return () => {
      document.removeEventListener('dragstart', dragStartHandler)
      document.removeEventListener('dragend', dragEndHandler)
    }
  }, [])

  const dropArea: HTMLAttributes<HTMLDivElement> = {
    onDrop: (event) => {
      if (
        event.dataTransfer.getData('itemId') !== item.id &&
        onDropInside &&
        item.id
      ) {
        onDropInside(event.dataTransfer.getData('itemId'), item.id)
      }

      setDragOver(false)
    },
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  }

  const beforeDropArea: HTMLAttributes<HTMLDivElement> = {
    onDrop: (event) => {
      if (
        event.dataTransfer.getData('itemId') !== item.id &&
        onDropBefore &&
        item.id
      ) {
        onDropBefore(event.dataTransfer.getData('itemId'), item.id)
      }

      setBeforeDropAreaDragOver(false)
    },
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: () => setBeforeDropAreaDragOver(true),
    onDragLeave: () => setBeforeDropAreaDragOver(false),
  }

  const afterDropArea: HTMLAttributes<HTMLDivElement> = {
    onDrop: (event) => {
      if (
        item.children &&
        item.children.length &&
        item.open &&
        onDropInside &&
        item.id
      ) {
        onDropInside(event.dataTransfer.getData('itemId'), item.id)
      } else if (
        event.dataTransfer.getData('itemId') !== item.id &&
        onDropAfter &&
        item.id
      ) {
        onDropAfter(event.dataTransfer.getData('itemId'), item.id)
      }

      setAfterDropAreaDragOver(false)
    },
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: () => setAfterDropAreaDragOver(true),
    onDragLeave: () => setAfterDropAreaDragOver(false),
  }

  const handleClickVisible = useCallback(() => {
    dataVisible.includes(props.item.id)
      ? setDataVisible(dataVisible.filter((e) => e !== props.item.id))
      : setDataVisible([...dataVisible, props.item.id])
  }, [dataVisible, props.item.id])

  const getVisibility = () =>
    dataVisible.includes(props.item.id)
      ? { padding: '2rem' }
      : { display: 'none' }
  const onData_Change = ({ formData }: any) => onDataChange(formData)
  const onDelete = () => {
    onRemove(item.id)
    handleClickVisible()
  }

  return (
    <>
      <Root
        ref={RootRef}
        {...props}
        // Custom properties
        dragging={dragging}
        isDragged={isDragged}
        onDrag={onDrag}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onKeyPress={onFocusKeyPress}
        onDataChange={onDataChange}
        datavisibility={datavisibility}
        onRemove={onRemove}
      >
        {item.arrow && <Arrow onClick={onArrowClick}>{item.arrow}</Arrow>}
        {item.icon && <Icon>{item.icon}</Icon>}
        <Row>
          <Label>{item.data.title}</Label>
          {Boolean(item?.schema) && (
            <IconButton aria-label="close" onClick={handleClickVisible}>
              <AllOutIcon />
            </IconButton>
          )}
          <IconButton aria-label="close" onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        </Row>

        {allowDropBefore && (
          <div>
            <BeforeDropArea ref={BeforeDropAreaRef} {...beforeDropArea} />
            <BeforeDropAreaHighlight />
          </div>
        )}

        <DropArea ref={DropAreaRef} {...dropArea} />
        <AfterDropArea ref={AfterDropAreaRef} {...afterDropArea} />
        <AfterDropAreaHighlight />
      </Root>
      {Boolean(item?.schema) && (
        <div style={getVisibility()}>
          <Form
            schema={(item?.schema ?? {}) as JSONSchema7}
            onChange={onData_Change}
            formData={item?.data ?? {}}
          >
            <button type="submit" style={{ visibility: 'hidden' }}>
              Submit
            </button>
          </Form>
        </div>
      )}
    </>
  )
}

const RootComponent = forwardRef<
  HTMLDivElement,
  ReactTreeListItemProps &
    HTMLAttributes<HTMLDivElement> & {
      ref?: RefObject<HTMLDivElement>
      dragging?: boolean
      isDragged?: boolean
    }
>(
  (
    {
      indent,
      item,
      onDataChange,
      onFocusEnter,
      onArrowClick,
      dragging,
      isDragged,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <div ref={ref} draggable={true} tabIndex={0} {...props} />
      </>
    )
  },
)

const Arrow = styled.div``
const Icon = styled.div``
const Row = styled.div``
const Label = styled.div``
const DropArea = styled.div``
const BeforeDropArea = styled.div``
const BeforeDropAreaHighlight = styled.div``
const AfterDropArea = styled.div``
const AfterDropAreaHighlight = styled.div``
const Root = styled(RootComponent)`
  position: relative;
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 8px;
  padding: 4px;
  padding-left: ${({ indent }) => indent * 24 + 12}px;
  align-items: center;
  border-radius: 4px;
  transition: background 100ms;
  border: 1px solid #ededed;
  opacity: ${({ isDragged }) => (isDragged ? 0.5 : 1)};

  &.dragOver {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 255, 1);
  }

  ${Arrow}, ${Arrow} *,
  ${Icon}, ${Icon} *,
  ${Label}, ${Label} * {
    display: flex;
    pointer-events: ${({ dragging }) => (dragging ? 'none' : '')};
    width: 95%;
    align-items: center;
  }

  &:focus {
    outline: none;
    background: rgba(0, 0, 255, 0.075);
  }

  ${Arrow} {
    display: flex;
    transition: 100ms;
    visibility: ${({ item }) =>
      item.children && item.children.length ? 'visible' : 'hidden'};
    transform: rotate(${({ item }) => (item.open ? 90 : 0)}deg);
  }

  ${Icon} {
    display: flex;
    transition: 100ms;
  }

  ${Row} {
    display: flex;
    justify-content: 'flex-end';
  }

  ${DropArea} {
    display: ${({ dragging }) => (dragging ? 'block' : 'none')};
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 70%;
    z-index: 10;
  }

  ${BeforeDropArea}, ${AfterDropArea} {
    display: ${({ dragging }) => (dragging ? 'block' : 'none')};
    position: absolute;
    height: 30%;
    width: 100%;
    z-index: 11;
  }
  ${BeforeDropArea} {
    top: 0;
    transform: translateY(-50%);

    &.dragOver + ${BeforeDropAreaHighlight} {
      display: block;
    }
  }
  ${AfterDropArea} {
    bottom: 0;
    transform: translateY(50%);

    &.dragOver + ${AfterDropAreaHighlight} {
      display: block;
    }
  }

  ${BeforeDropAreaHighlight} ,${AfterDropAreaHighlight} {
    display: none;
    position: absolute;
    z-index: 9;
    height: 2px;
    background: rgba(0, 0, 255, 1);
    width: calc(
      100% -
        ${({ indent, item }) =>
          (indent +
            (item.open && item.children && item.children.length ? 1 : 0)) *
            24 +
          12}px
    );
    margin-left: ${({ indent, item }) =>
      (indent + (item.open && item.children && item.children.length ? 1 : 0)) *
        24 +
      12}px;
  }
  ${BeforeDropAreaHighlight} {
    top: -1px;
  }
  ${AfterDropAreaHighlight} {
    bottom: -1px;
  }
`
