
import * as React from 'react'

export interface Props extends React.Props<SVGPathElement> {
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number
  color?: string
  stroke?: string
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}

export default (props: Props) => {
  const {
    ref,
    x,
    y,
    radius,
    startAngle,
    endAngle,
    color,
    stroke,
    strokeWidth,
    className,
    style,
  } = props

  // const wide = endAngle < startAngle ? endAngle - startAngle <= Math.PI : startAngle - endAngle <= Math.PI
// 
  // const actualStart = wide ? endAngle : startAngle
  // const actualEnd = wide ? startAngle : endAngle
// 
  // const startX = x + Math.cos(actualStart) * radius
  // const startY = y - (Math.sin(actualStart) * radius)
// 
  // const endX = x + Math.cos(actualEnd) * radius
  // const endY = y - (Math.sin(actualEnd) * radius)
// 
  // const sweep = wide ? 0 : 1
// 
  // const fixedStart = endAngle < startAngle ? startAngle - Math.PI * 2 : startAngle
// 
  // const wideVal = endAngle - fixedStart <= Math.PI ? 1 : 0
// 
  // const move = `M ${startX} ${startY}`
  // const arc = `A ${radius} ${radius} 0 ${wideVal} ${sweep} ${endX} ${endY}`
  const wide = startAngle < endAngle ? startAngle - endAngle <= Math.PI : endAngle - startAngle <= Math.PI

  const actualStart = wide ? startAngle : endAngle
  const actualEnd = wide ? endAngle : startAngle

  const startX = x + Math.cos(actualStart) * radius
  const startY = y - (Math.sin(actualStart) * radius)

  const endX = x + Math.cos(actualEnd) * radius
  const endY = y - (Math.sin(actualEnd) * radius)

  const sweep = wide ? 0 : 1

  const fixedStart = startAngle < endAngle ? endAngle - Math.PI * 2 : endAngle

  const wideVal = startAngle - fixedStart <= Math.PI ? 1 : 0

  const move = `M ${startX} ${startY}`
  const arc = `A ${radius} ${radius} 0 ${wideVal} ${sweep} ${endX} ${endY}`

  return (
    <path
      ref={ref}
      d={`${move} ${arc}`}
      fill={color}
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
    />
  )
}
