import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  itemContainer: {
    width: 120,
    marginRight: 8,
    marginTop: 10,
  },
  itemImage: {
    width: 120,
    height: 140,
  },
  itemName: {
    fontSize: 13,
    color: '#222',
    fontWeight:'bold',
    marginVertical: 4,
  },
  itemPriceReal:{
    fontSize: 12,
    color: '#444',
    textDecorationLine:'line-through',
    marginRight: 0
  },
  reducePrice:{
    fontSize: 12,
    color: '#444',
    fontWeight:'bold'
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d70018',
  },
  rating:{
    marginTop: 5,
    flexDirection: 'row',
    alignItems:'center',
    marginRight: 0,
  },
  countRating:{
    fontSize: 11
  },
});

export default styles;