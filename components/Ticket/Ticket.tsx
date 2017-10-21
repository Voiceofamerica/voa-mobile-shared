
import * as React from 'react'
import * as RX from 'reactxp'

import styles from './Ticket.styles'

export interface ArticleBlurb {
  image: string
  title: string
  minor: string
}

interface Props {
  onPress: () => void
  blurb: ArticleBlurb
  factor?: number
}

export default ({ onPress, blurb: { image, minor, title }, factor = 1 }: Props) => (
  <RX.View
    style={styles.container}
    onPress={onPress}>
    <RX.Image source={image} style={styles.image} resizeMode='cover' resizeMethod='scale' />
    <RX.View style={styles.textContainer}>
      <RX.View style={styles.titleContainer}>
        <RX.Text style={styles.titleText}>
          {title}
        </RX.Text>
      </RX.View>
      <RX.Text style={styles.minorText}>
        {minor}
      </RX.Text>
    </RX.View>
  </RX.View>
)
