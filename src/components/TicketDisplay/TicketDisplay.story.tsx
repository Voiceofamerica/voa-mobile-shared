
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TicketDisplay, { Article } from './TicketDisplay'

const testArticle: Article = {
  id: 1,
  image: {
    url: 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png',
  },
  pubDate: '15:08',
  title: 'President Trump: From North Korea to Iran, we confront dangerous governments',
}

storiesOf('Ticket Display', module)
  .add('display', () => (
    <TicketDisplay
    articles={[
      { ...testArticle, id: 0 },
      { ...testArticle, id: 1 },
      { ...testArticle, id: 2 },
      { ...testArticle, id: 3 },
    ]}
      onTicketClick={action('onTicketClick')}
    />
  ))
  .add('rtl display', () => (
    <div dir='rtl'>
      <TicketDisplay
        articles={[
          { ...testArticle, id: 0 },
          { ...testArticle, id: 1 },
          { ...testArticle, id: 2 },
          { ...testArticle, id: 3 },
        ]}
        onTicketClick={action('onTicketClick')}
      />
    </div>
  ))
