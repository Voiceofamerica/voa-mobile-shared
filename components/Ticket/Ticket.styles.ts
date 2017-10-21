
import * as RN from 'react-native'
import * as RX from 'reactxp'

const minHeight = 100

export default {
  container: RX.Styles.createViewStyle({
    flex: 1,
    minHeight,
    flexDirection: 'row',
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 1,
    backgroundColor: '#DDD',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 5,
    elevation: 10,
  }),
  image: RX.Styles.createImageStyle({
    flexShrink: 1,
    minWidth: minHeight * 4 / 3,
  }),
  textContainer: RX.Styles.createViewStyle({
    flex: 1,
    padding: 5,
    paddingLeft: 8,
    flexDirection: 'column',
  }),
  titleContainer: RX.Styles.createViewStyle({
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }),
  titleText: RX.Styles.createTextStyle({
    flexGrow: 1,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontSize: 16,
  }),
  minorText: RX.Styles.createTextStyle({
    flexShrink: 1,
    paddingTop: 5,
    color: '#444',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignSelf: 'flex-end',
  }),
}
