import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  productImg: {
    width: 200,
    height: 300,
  },
  flatListItemName: {
    color: 'black',
    padding: 5,
    fontSize: 13,
    marginLeft: 20,
  },
  flatListItemValue: {
    color: 'black',
    padding: 5,
    marginRight: 50,
    fontSize: 12,
  },
  name: {
    fontSize: 20,
    color: '#696969',
    fontWeight: 'bold',
    marginLeft: 0,
  },
  titleName: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDescription: {
    marginLeft: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  contentColors: {
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 5,
  },
  btnColor: {
    height: 40,
    width: 60,
    borderRadius: 10,
    borderColor: '#778899',
    borderWidth: 2,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorActive: {
    backgroundColor: '#9DDCF1',
  },
  textColor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentGroup: {
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  btnGroup: {
    height: 30,
    width: 100,
    borderRadius: 10,
    borderColor: '#778899',
    borderWidth: 2,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  btnGroupActive: {
    backgroundColor: '#9DDCF1',
  },
  textGroup: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginVertical: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'red',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
export default styles;