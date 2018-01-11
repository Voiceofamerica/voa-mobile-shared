
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import MediaPlayer from './MediaPlayer'

storiesOf('MediaPlayer', module)
  .addDecorator(withKnobs)
  .add('display video', () => (
    <MediaPlayer src='https://av.voanews.com/Videoroot/Pangeavideo/2017/12/1/14/146a3e25-ebcf-444e-b1dd-133cf64a46e4_mobile.mp4' controls playbackRate={number('playbackRate', 1, { min: 0.5, max: 2, step: 0.05, range: true })} />
  ))
  .add('play audio', () => (
    <MediaPlayer src='https://av.voanews.com/clips/VCH/2017/12/06/39923226-d756-47fd-bdf4-b5b6523d9c1f.mp3' controls playbackRate={number('playbackRate', 1, { min: 0.5, max: 2, step: 0.05, range: true })} />
  ))
