
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ArticleBlurb from '../../types/ArticleBlurb'

import BottomNav, { IconItem, RoundItem } from './'

const clickAction = action('IconItem.onClick()')
const roundClickAction = action('RoundItem.onClick()')

storiesOf('BottomNav', module)
  .add('with round item', () => (
    <BottomNav>
      <IconItem onClick={clickAction}>AB</IconItem>
      <IconItem onClick={clickAction}>CD</IconItem>
      <RoundItem onClick={roundClickAction}>EF</RoundItem>
      <IconItem onClick={clickAction}>GH</IconItem>
      <IconItem onClick={clickAction}>IJ</IconItem>
    </BottomNav>
  ))
  .add('without round item', () => (
    <BottomNav>
      <IconItem onClick={clickAction}>AB</IconItem>
      <IconItem onClick={clickAction}>CD</IconItem>
      <IconItem onClick={clickAction}>EF</IconItem>
      <IconItem onClick={clickAction}>GH</IconItem>
      <IconItem onClick={clickAction}>IJ</IconItem>
    </BottomNav>
  ))
  .add('with active item', () => (
    <BottomNav>
      <IconItem onClick={clickAction}>AB</IconItem>
      <IconItem onClick={clickAction} active>CD</IconItem>
      <RoundItem onClick={roundClickAction}>EF</RoundItem>
      <IconItem onClick={clickAction}>GH</IconItem>
      <IconItem onClick={clickAction}>IJ</IconItem>
    </BottomNav>
  ))
  .add('with active round item', () => (
    <BottomNav>
      <IconItem onClick={clickAction}>AB</IconItem>
      <IconItem onClick={clickAction}>CD</IconItem>
      <RoundItem onClick={roundClickAction} active>EF</RoundItem>
      <IconItem onClick={clickAction}>GH</IconItem>
      <IconItem onClick={clickAction}>IJ</IconItem>
    </BottomNav>
  ))
