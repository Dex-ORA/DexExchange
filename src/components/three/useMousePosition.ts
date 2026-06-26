import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let frameId: number
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const update = () => {
      setMouse((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.05,
        y: prev.y + (targetY - prev.y) * 0.05,
      }))
      frameId = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    frameId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return mouse
}
