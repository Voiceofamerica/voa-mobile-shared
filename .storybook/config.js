import { configure } from '@storybook/react'

function loadStories() {
  const req = require.context('../components', true, /\.story.[jt]sx?$/)
  req.keys().forEach(key => {
    req(key)
  })
}

configure(loadStories, module)
