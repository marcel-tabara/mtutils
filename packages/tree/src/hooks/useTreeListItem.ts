import { HTMLAttributes, useEffect, useRef, useState } from 'react'

export const useTreeListItem = ({
  item,
  onDragging,
  onArrowClick,
  onDropInside,
  onDropBefore,
  onDropAfter,
}) => {
  const RootRef = useRef<HTMLDivElement>(null)
  const DropAreaRef = useRef<HTMLDivElement>(null)
  const BeforeDropAreaRef = useRef<HTMLDivElement>(null)
  const AfterDropAreaRef = useRef<HTMLDivElement>(null)

  const [dragging, setDragging] = useState(false)
  const [isDragged, setIsDragged] = useState(false)

  useEffect(() => {
    const dragStartHandler = () => setDragging(true)
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
    setIsDragged(true)
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

  return {
    afterDropArea,
    AfterDropAreaRef,
    beforeDropArea,
    BeforeDropAreaRef,
    dragging,
    dropArea,
    DropAreaRef,
    isDragged,
    onDropBefore,
    RootRef,
    onDrag,
    onDragEnd,
    onDragStart,
    onFocusKeyPress,
    setAfterDropAreaDragOver,
    setBeforeDropAreaDragOver,
    setDragging,
    setDragOver,
    setIsDragged,
  }
}
