
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Spinner from './Spinner'

storiesOf('Spinner', module)
  .add('display', () => (
    <Spinner />
  ))
