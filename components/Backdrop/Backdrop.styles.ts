
import * as RX from 'reactxp'

import { button, buttonText } from 'commonStyles'

export default {
  container: RX.Styles.createViewStyle({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
  image: RX.Styles.createImageStyle({
    width: '100%' as any,
    height: '100%' as any,
  }),
}
