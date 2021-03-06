
import { ListItem } from '../../helpers/itemListHelper'

export { ListItem }

export interface BaseProps {
  items: ListItem[] | undefined
  onItemClick: (id: number) => void
  className?: string
  style?: React.CSSProperties
}
