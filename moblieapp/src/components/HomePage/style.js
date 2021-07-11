import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  number: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 2,
    marginTop: -13,
    borderRadius: 50,
    backgroundColor: 'red',
    color: '#fff',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#2f2f2f',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionImage: {
    width: width - 24,
    height: 180,
    borderRadius: 4,
    marginBottom: 0,
    marginTop: 10,
  },
  //
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#242424',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#5a5a5a',
  },
  //
  listItemContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    flex: 0.33,
    marginRight: 15,
    marginTop: 10,
  },
  itemImage: {
    width: 120,
    height: 140,
  },
  itemName: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  itemPriceReal: {
    fontSize: 12,
    color: '#444',
    textDecorationLine: 'line-through',
    marginRight: 0,
  },
  reducePrice: {
    fontSize: 12,
    color: '#444',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d70018',
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 0,
  },
  countRating: {
    fontSize: 11,
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
  screenContainer: {
    flex: 1,
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  //
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  //Brand
  btnBrand: {
    backgroundColor: '#f2f2f2',
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  btnBrandActive: {
    backgroundColor: '#4099EA',
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  spanCount: {
    marginTop: -10,
    marginLeft: -3,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  txtCount: {color: '#fff', fontSize: 12},
  textBrandActive: {color: '#fff'},
  textBrand: {color: '#000'},
  pickerLong: {marginLeft: 5, height: 50, width: 235},
  pickerSort: {marginLeft: 5, height: 50, width: 160},
  //Search
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#1e88e5',
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
    flex: 8,
  },
  //
  btnCompare: {
    paddingHorizontal: 20,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCompare: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
