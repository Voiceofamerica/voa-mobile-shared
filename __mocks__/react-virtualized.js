
const React = require('react')

const renderChildren = (props) => {
  const { rowCount, rowRenderer } = props
  const count = Math.min(5, rowCount)

  return Array.apply(null, Array(count))
    .map((item, index) => rowRenderer({
      index,
      columnIndex: 0,
      isScrolling: false,
      isVisible: true,
      key: String(index),
      parent: {},
      rowIndex: index,
      style: {},
    }))
}

exports.List = class List extends React.Component {
  constructor(props) {
    super(props)
    this.recomputeRowHeights = jest.fn()
  }

  render () {
    return React.createElement(
      'react-virtualized-list',
      this.props,
      renderChildren(this.props)
    )
  }
}
