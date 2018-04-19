
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ThemeProvider, { BaseTheme, TopNavTheme } from '../ThemeProvider'

import TopNav from './TopNav'
import CenterText from './CenterText'
import StaticItem from './StaticItem'
import TopNavItem from './TopNavItem'

const itemNames = [
  'Headlines',
  'US Politics',
  'USA',
  'Sports',
  'Cars',
  'Technology',
  'Foreign Policy',
  'Foreign Politics',
  'Weather',
  'Food',
  'The Economy',
  'China Relations',
  'Russia Relations',
]

interface SelectableTopNavProps {
  prefix?: string
  suffix?: string
  rtl?: boolean
}

interface SelectableTopNavItemsState {
  selectedIndex: number
}

const testBaseTheme: BaseTheme = {
  primaryColor: '#35A527',
  grey: '#666666',
  lightGrey: '#AAAAAA',
  white: '#CCFFCC',
  darkGrey: '#333366',
}

const testLocalTheme: TopNavTheme = {
  topNavBackground: '#ffaabb',
  topNavStaticColor: '#993246',
  topNavColor: '#333333',
  topNavSelectedBackground: '#3527A5',
  topNavSelectedColor: '#EEEEEE',
}

class SelectableTopNavItems extends React.Component<SelectableTopNavProps, SelectableTopNavItemsState> {
  state: SelectableTopNavItemsState = {
    selectedIndex: 0,
  }

  render () {
    const { prefix, suffix, rtl } = this.props
    const { selectedIndex } = this.state

    return (
      <TopNav rtl={rtl}>
        { prefix && <StaticItem onClick={action('prefix clicked')}>{prefix}</StaticItem> }
        {
          itemNames.map((name, idx) => (
              <TopNavItem key={idx} selected={idx === selectedIndex} onClick={this.onClick(idx)}>
                {name}
              </TopNavItem>
          ))
        }
        { suffix && <StaticItem onClick={action('suffix clicked')}>{suffix}</StaticItem> }
      </TopNav>
    )
  }

  private onClick = (selectedIndex: number) => () => {
    this.setState({ selectedIndex })
  }
}

storiesOf(TopNav.name, module)
  .add('display', () => (
    <SelectableTopNavItems />
  ))
  .add('display with static prefix', () => (
    <SelectableTopNavItems prefix='A' />
  ))
  .add('display with static suffix', () => (
    <SelectableTopNavItems suffix='Z' />
  ))
  .add('display with both static elements', () => (
    <SelectableTopNavItems prefix='A' suffix='Z' />
  ))
  .add('base themed display', () => (
    <ThemeProvider value={testBaseTheme}>
      <SelectableTopNavItems prefix='A' suffix='Z' />
    </ThemeProvider>
  ))
  .add('local themed display', () => (
    <ThemeProvider value={testLocalTheme}>
      <SelectableTopNavItems prefix='A' suffix='Z' />
    </ThemeProvider>
  ))
  .add('rtl display', () => (
    <div dir='rtl'>
      <SelectableTopNavItems rtl />
    </div>
  ))
  .add('rtl display with both static elements', () => (
    <div dir='rtl'>
      <SelectableTopNavItems prefix='A' suffix='Z' rtl />
    </div>
  ))
