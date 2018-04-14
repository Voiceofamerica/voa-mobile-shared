
import { ListItem } from '../../helpers/itemList'

export { ListItem }

export interface BaseProps {
  items: ListItem[]
  onItemClick: (id: number) => void
  className?: string
  style?: React.CSSProperties
}
