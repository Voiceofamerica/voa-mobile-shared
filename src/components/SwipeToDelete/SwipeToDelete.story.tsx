
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, number, withKnobs } from '@storybook/addon-knobs'
import ArticleBlurb from '../../types/ArticleBlurb'

import SwipeToDelete from './SwipeToDelete'

storiesOf('SwipeToDelete', module)
  .add('display', () => (
    <SwipeToDelete onSwipe={action('swipe')}>
      <div style={{ background: '#888' }}>
        Hello
      </div>
    </SwipeToDelete>
  ))
