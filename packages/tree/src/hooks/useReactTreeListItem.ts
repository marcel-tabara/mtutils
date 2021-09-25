import { useEffect, useRef, useState } from 'react'

export const useReactTreeListItem = () => {
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

  return {
    RootRef,
    DropAreaRef,
    BeforeDropAreaRef,
    AfterDropAreaRef,
    dragging,
    setDragging,
    isDragged,
    setIsDragged,
  }
}
