import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  productImg: {
    flex: 1,
    width: width - 66,
    height: 340,
  },
  flatListItemName: {
    color: 'black',
    padding: 5,
    fontSize: 13,
  },
  flatListItemValue: {
    color: 'black',
    padding: 5,
    marginRight: 50,
    fontSize: 12,
  },
  name: {
    fontSize: 22,
    color: '#101010',
    fontWeight: 'bold',
    marginLeft: 0,
    marginBottom: 3,
  },
  titleName: {
    marginBottom: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleDescription: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textDescription: {
    marginBottom: 10,
  },
  price: {
    marginTop: 3,
    fontSize: 25,
    color: '#e82323',
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
    marginHorizontal: 0,
    flexDirection: 'row',
    marginBottom: 5,
  },
  btnColor: {
    height: 50,
    width: 100,
    borderRadius: 10,
    borderColor: '#778899',
    borderWidth: 2,
    marginHorizontal: 3,
    backgroundColor: 'white',
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
    marginHorizontal: 0,
    flexDirection: 'row',
  },
  btnGroup: {
    height: 36,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 0.6,
    backgroundColor: 'red',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 0,
    marginVertical: 5,
    flexDirection: 'row',
  },
  viewMore: {
    height: 130,
  },
  lessMore: {
    flex: 1,
  },
  btnViewMore: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnViewMoreReview: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundOpacity: {
    height: 40,
    paddingVertical: 10,
  },
  textViewMore: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerReviews: {
    marginVertical: 10,
  },
  containerOverallReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overallReview: {
    flex: 4,
    backgroundColor: '#f1f6f7',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  baseOnReview: {
    flex: 6,
    paddingLeft: 20,
  },
  titleOverall: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textOverall: {
    fontSize: 14,
    textAlign: 'center',
  },
  numberOverall: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  lineBaseReview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleBaseOn: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  containerDetailReview: {
    marginTop: 20,
    height: 310,
    overflow: 'hidden',
  },
  containerDetailReviewMore: {
    marginTop: 20,
  },
  containerBoxReview: {
    marginBottom: 20,
  },
  containerItemReview: {
    flexDirection: 'row',
  },
  boxImage: {
    flex: 3,
  },
  boxContentReview: {
    flex: 7,
    padding: 5,
  },
  imgUser: {
    flex: 1,
    borderRadius: 50,
    margin: 5,
  },
  nameUser: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorReview: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  contentReview: {
    fontSize: 18,
  },
  likeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 5,
  },
  likeItem: {
    marginLeft: 10,
    fontSize: 16,
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  containerGroupNameButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f6f7',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  groupButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  groupButtonActive: {
    backgroundColor: '#9DDCF1',
  },
  textGroupButton: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  realPrice: {
    textDecorationLine: 'line-through',
    fontSize: 18,
  },
});
export default styles;
