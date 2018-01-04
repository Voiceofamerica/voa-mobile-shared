
import * as React from 'react'

import { inputsPill, dropdownPill, dropdown, dropdownArrow, searchInputContainer, searchInput, emptyText } from './SearchInputs.scss'

export interface Props {
  zoneId: number
  query: string
  empty: string
  onZoneIdChange: (newZoneId: number) => void
  onQueryChange: (newQuery: string) => void
  categories: { id: string, name: string }[]
}

export default class SearchInputs extends React.Component<Props> {
  render () {
    const { zoneId, query, onZoneIdChange, onQueryChange, categories, empty } = this.props

    return (
      <div className={inputsPill}>
        <div className={dropdownPill}>
          <select value={zoneId} className={dropdown} onChange={ev => onZoneIdChange(parseInt(ev.currentTarget.value, 10))}>
            {
              categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))
            }
          </select>
          <span className={dropdownArrow}><i className='mdi mdi-chevron-down' /></span>
        </div>
        <div className={searchInputContainer}>
          <input autoFocus className={searchInput} value={query} onChange={ev => onQueryChange(ev.currentTarget.value)} />
          { query.length === 0 ? <div className={emptyText}>{empty}</div> : null }
        </div>
      </div>
    )
  }
}
