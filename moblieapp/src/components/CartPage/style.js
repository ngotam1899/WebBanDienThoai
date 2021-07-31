import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  boxContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: 24,
    color: '#277cdb',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  itemContainer: { flex: 1 },
  boxItemContainer: {
    width: width - 12,
    margin: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#cccccc',
    paddingBottom: 5,
  },
  imgItem: { width: width / 3.9, height: width / 3.2 },
  titleContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  name: { fontWeight: 'bold', fontSize: 18 },
  color: { fontSize: 16, fontStyle: 'italic' },
  boxPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  price: {
    fontWeight: 'bold',
    color: '#9fd236',
    fontSize: 18,
  },
  boxCountNumber: { flexDirection: 'row', alignItems: 'center' },
  number: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 22,
  },
  totalPriceContainer: { width: width, marginLeft: 20, marginVertical: 10 },
  totalPrice: { fontWeight: 'bold', fontSize: 20 },
  btnContainer: {
    backgroundColor: '#1e88e5',
    width: width - 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 20
  },
  btn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }

})
export default styles;