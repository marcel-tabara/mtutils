import IconButton from '@material-ui/core/IconButton'
import AllOutIcon from '@material-ui/icons/AllOut'
import CloseIcon from '@material-ui/icons/Close'
import Form from '@rjsf/material-ui'
import { JSONSchema7 } from 'json-schema'
import React, {
  forwardRef,
  HTMLAttributes,
  RefObject,
  useCallback,
} from 'react'
import styled from 'styled-components'
import { useTreeListItem } from './hooks/useTreeListItem'
import { BaseTreeElement, TreeListItemProps } from './types'

export const TreeListItem = <T extends BaseTreeElement>({
  onReset,
  onDataChange,
  onDragging,
  onDropInside,
  onDropBefore,
  onDropAfter,
  allowDropBefore,
  datavisibility,
  ...props
}: TreeListItemProps<T>) => {
  const { item } = props
  const { dataVisible, setDataVisible } = datavisibility
  const onArrowClick = () => props.onArrowClick && props.onArrowClick(item)
  const {
    afterDropArea,
    AfterDropAreaRef,
    beforeDropArea,
    BeforeDropAreaRef,
    dragging,
    dropArea,
    DropAreaRef,
    isDragged,
    RootRef,
    onDrag,
    onDragEnd,
    onDragStart,
    onFocusKeyPress,
  } = useTreeListItem({
    item,
    onArrowClick,
    onDragging,
    onDropAfter,
    onDropBefore,
    onDropInside,
  })

  const handleClickVisible = useCallback(() => {
    dataVisible.includes(props.item.id)
      ? setDataVisible(dataVisible.filter((e) => e !== props.item.id))
      : setDataVisible([...dataVisible, props.item.id])
  }, [dataVisible, props.item.id])

  const getVisibility = (indent: number) =>
    dataVisible.includes(props.item.id)
      ? {
          padding: '0 0 0 1rem',
          margin: '0 0 0 1rem',
          border: '1px solid #ededed',
          marginLeft: indent * 24 + 12,
        }
      : { display: 'none' }

  const onDelete = () => {
    onReset(item.id)
    handleClickVisible()
  }
  const onClickArrow = () => {
    handleClickVisible()
    onArrowClick()
  }

  return (
    <>
      <Root
        ref={RootRef}
        {...props}
        dragging={dragging}
        isDragged={isDragged}
        onDrag={onDrag}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onKeyPress={onFocusKeyPress}
        onDataChange={onDataChange}
        datavisibility={datavisibility}
        onReset={() => undefined}
      >
        {item.arrow && <Arrow onClick={onClickArrow}>{item.arrow}</Arrow>}
        {item.icon ? <Icon>{item.icon}</Icon> : <span />}
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
        <div style={getVisibility(props.indent)}>
          <Form
            schema={(item?.schema ?? {}) as JSONSchema7}
            onChange={({ formData }) => onDataChange(formData)}
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
  TreeListItemProps<any> &
    HTMLAttributes<HTMLDivElement> & {
      ref?: RefObject<HTMLDivElement>
      dragging?: boolean
      isDragged?: boolean
    }
>(
  (
    {
      onArrowClick,
      onDataChange,
      onFocusEnter,
      dragging,
      indent,
      isDragged,
      item,
      ...props
    },
    ref,
  ) => {
    return <div ref={ref} draggable={true} tabIndex={0} {...props} />
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
  background-color: 'e0e0e0';
  background: ${({ datavisibility, item }) =>
    datavisibility.dataVisible.includes(item.id) ? 'aliceblue' : 'white'};
  position: relative;
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: 8px;
  padding: 4px;
  padding-left: ${({ indent }) => indent * 24 + 12}px;
  margin-left: ${({ indent }) => indent * 24 + 12}px;
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
    margin-left: ${
      ({ indent, item }) => '0px'
      // (indent + (item.open && item.children && item.children.length ? 1 : 0)) *
      //   24 +
      // 12}px;
    }
  ${BeforeDropAreaHighlight} {
    top: -1px;
  }
  ${AfterDropAreaHighlight} {
    bottom: -1px;
    border: 1px solid yellow;
  }
`
