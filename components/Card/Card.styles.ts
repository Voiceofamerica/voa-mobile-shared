
import * as RN from 'react-native'
import * as RX from 'reactxp'

export default {
  container: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 1,
    backgroundColor: '#DDD',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 10,
    shadowRadius: 10,
    borderRadius: 5,
    elevation: 6,
    overflow: 'hidden',
  }),
  image: RX.Styles.createImageStyle({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
  gradientContainer: RX.Styles.createViewStyle({
    flexDirection: 'row',
  }),
  gradient: RX.Styles.createViewStyle({
    flex: 1,
    padding: 8,
    paddingTop: 30,
  }) as RN.ViewStyle,
  minorText: RX.Styles.createTextStyle({
    color: '#FFF',
    paddingBottom: 5,
    backgroundColor: 'transparent',
  }),
  titleText: RX.Styles.createTextStyle({
    color: '#FFF',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  }),
}
