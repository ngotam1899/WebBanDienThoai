import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  itemContainer: {
    width: 135,
    marginRight: 16,
    marginTop: 10,
  },
  itemImage: {
    width: 125,
    height: 140,
  },
  itemName: {
    fontSize: 15,
    color: '#222',
    fontWeight:'bold',
    marginVertical: 4,
  },
  itemPriceReal:{
    fontSize: 14,
    color: '#444',
    textDecorationLine:'line-through',
    marginRight: 0
  },
  reducePrice:{
    fontSize: 14,
    color: '#444',
    fontWeight:'bold'
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d70018',
  },
  rating:{
    marginTop: 5,
    flexDirection: 'row',
    alignItems:'center',
    marginRight: 0
  },
  countRating:{
    fontSize: 13
  }
});

export default styles;