"use client"

import * as React from "react"
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number
  size: number
  transition: Transition
  starColor: string
  offsetX: ReturnType<typeof useMotionValue<number>>
  offsetY: ReturnType<typeof useMotionValue<number>>
}

function generateStars(count: number, starColor: string) {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000
    const y = Math.floor(Math.random() * 4000) - 2000
    shadows.push(`${x}px ${y}px ${starColor}`)
  }
  return shadows.join(", ")
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "#fff",
  offsetX,
  offsetY,
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState("")

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor))
  }, [count, starColor])

  return (
    <motion.div
      className={cn("absolute rounded-full bg-transparent", className)}
      style={{
        width: size,
        height: size,
        boxShadow,
        x: offsetX,
        y: offsetY,
      }}
      animate={{ y: [0, -2000] }}
      transition={transition}
      {...props}
    />
  )
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number
  speed?: number
  transition?: SpringOptions
  starColor?: string
  pointerEvents?: boolean
}

export function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = "#fff",
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1)
  const offsetY = useMotionValue(1)

  const springX = useSpring(offsetX, transition)
  const springY = useSpring(offsetY, transition)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const newOffsetX = -(e.clientX - centerX) * factor
      const newOffsetY = -(e.clientY - centerY) * factor
      offsetX.set(newOffsetX)
      offsetY.set(newOffsetY)
    },
    [offsetX, offsetY, factor]
  )

  return (
    <div
      className={cn("fixed inset-0 overflow-hidden z-0", className)}
      onMouseMove={pointerEvents ? handleMouseMove : undefined}
      {...props}
    >
      {/* Deep space gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, oklch(0.12 0.04 260 / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, oklch(0.1 0.03 200 / 0.4) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, oklch(0.06 0.02 280 / 0.6) 0%, transparent 70%),
            linear-gradient(180deg, oklch(0.04 0.015 260) 0%, oklch(0.02 0.01 240) 100%)
          `,
        }}
      />

      {/* Star layers with different sizes and speeds */}
      <StarLayer
        count={700}
        size={1}
        starColor={starColor}
        offsetX={springX}
        offsetY={springY}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      />
      <StarLayer
        count={200}
        size={2}
        starColor={starColor}
        offsetX={springX}
        offsetY={springY}
        transition={{ repeat: Infinity, duration: speed * 1.5, ease: "linear" }}
      />
      <StarLayer
        count={100}
        size={3}
        starColor={starColor}
        offsetX={springX}
        offsetY={springY}
        transition={{ repeat: Infinity, duration: speed * 2, ease: "linear" }}
      />

      {/* Subtle nebula glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 25% 75%, oklch(0.25 0.08 220 / 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 75% 25%, oklch(0.2 0.06 200 / 0.15) 0%, transparent 35%)
          `,
        }}
      />

      {children}
    </div>
  )
}
