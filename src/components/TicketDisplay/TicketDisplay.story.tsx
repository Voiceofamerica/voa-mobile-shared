
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
  introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis, turpis at blandit consectetur, tellus nibh dictum nulla, in porttitor neque purus in massa. Quisque auctor dictum maximus. In neque augue, semper non suscipit ut, dictum at ligula. Praesent venenatis ipsum orci, sodales venenatis arcu ornare in. Quisque ac eros at velit egestas varius. Donec ultrices aliquet risus vitae commodo. Sed tempor est dui, ut tristique libero feugiat quis. In pharetra, lorem at commodo pretium, sem est fermentum dolor, eget porttitor enim lectus eu lacus. Vestibulum vestibulum ante turpis, vitae vehicula lorem rutrum sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
