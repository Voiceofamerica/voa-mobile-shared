
import * as React from 'react'

import { ListItem } from '../../helpers/itemListHelper'

export { ListItem }

export interface IconDefinition {
  icon: string | JSX.Element
  getClass?: (id: number) => string
  getStyle?: (id: number) => React.CSSProperties
  onPress: (id: number) => void
}

export interface BaseProps {
  items: ListItem[] | undefined
  onItemClick: (id: number) => void
  className?: string
  style?: React.CSSProperties
  iconButtons?: IconDefinition[]
}
