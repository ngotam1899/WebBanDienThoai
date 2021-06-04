import * as React from 'react';
import {Component} from 'react';
import {
  StyleSheet, Dimensions
} from 'react-native';

import PageView from './PageView'

import {TabView, TabBar} from 'react-native-tab-view';

import ProductsActions from '../../redux/actions/products';
import OrdersActions from '../../redux/actions/order';
import AuthorizationActions from '../../redux/actions/auth';


import {connect} from 'react-redux';
import {compose} from 'redux';
import {AsyncStorage} from 'react-native';

const {width} = Dimensions.get('window');

class FirstRoute extends Component {
  render() {
    const {orderList, authInfoID} = this.props;
    return <PageView orderList={orderList} authInfoID={authInfoID}/>;
  }
}
class SecondRoute extends Component {
  render() {
    const {orderList, authInfoID} = this.props;
    return <PageView orderList={orderList} authInfoID={authInfoID}/>;
  }
}

class ThirdRoute extends Component {
  render() {
    const {orderList, authInfoID} = this.props;
    return <PageView orderList={orderList} authInfoID={authInfoID}/>;
  }
}

class FourRoute extends Component {
  render() {
    const {orderList, authInfoID} = this.props;
    return <PageView orderList={orderList} authInfoID={authInfoID}/>;
  }
}

class FiveRoute extends Component {
  render() {
    const {orderList, authInfoID} = this.props;
    return <PageView orderList={orderList} authInfoID={authInfoID}/>;
  }
}

class SixRoute extends Component {
  render() {
    const {orderList, authInfoID} = this.props;
    return <PageView orderList={orderList} authInfoID={authInfoID}/>;
  }
}

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {key: 'first', title: 'Tất cả'},
        {key: 'second', title: 'Chờ xác nhận'},
        {key: 'third', title: 'Chờ giao hàng'},
        {key: 'four', title: 'Đang giao'},
        {key: 'five', title: 'Đã giao'},
        {key: 'six', title: 'Đã hủy'},
      ],
      index: 0,
      filter: {
        limit: 12,
        page: 0,
      },
    };
  }

  setIndex = val => {
    this.setState({
      index: val,
    });
    const {onGetList} = this.props;
    var filters = '';
    const {filter} = this.state;
    const {authInfo} = this.props;
    if (val === 0) {
      filters = '';
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    } else if (val === 1) {
      filters = {
        confirmed: -1,
        status: 1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    } else if (val === 2) {
      filters = {
        confirmed: 1,
        status: -1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    } else if (val === 3) {
      filters = {
        confirmed: 1,
        status: 0,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    } else if (val === 4) {
      filters = {
        confirmed: 1,
        status: 1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    } else if (val === 5) {
      filters = {
        active: -1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    }
  };

  componentWillMount = async () => {
    const token = await AsyncStorage.getItem('AUTH_USER').then(data => {});
    const {onGetProfile} = this.props;
    onGetProfile(null, token);

    const {authInfo} = this.props;
    if (authInfo) {
      const {onGetList} = this.props;
      const {filter} = this.state;
      const filters = '';
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };

      onGetList(params);
    }
  };

  renderScene = ({route}) => {
    var authInfo = this.props.authInfo;
    if(authInfo){
      var authInfoID = authInfo._id;
    }
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            orderList={this.props.orderList}
            authInfoID = {authInfoID}
          />
        );
      case 'second':
        return (
          <SecondRoute
            orderList={this.props.orderList}
            authInfoID = {authInfoID}
          />
        );
      case 'third':
        return (
          <ThirdRoute
            orderList={this.props.orderList}
            authInfoID = {authInfoID}
          />
        );
      case 'four':
        return (
          <FourRoute
            orderList={this.props.orderList}
            authInfoID = {authInfoID}
            keyword={this.state.keyword}
          />
        );
      case 'five':
        return (
          <FiveRoute
            orderList={this.props.orderList}
            authInfoID = {authInfoID}
          />
        );
      case 'six':
        return (
          <SixRoute
            orderList={this.props.orderList}
            authInfoID = {authInfoID}
          />
        );
      default:
        return null;
    }
  };

  renderTabBar = props => <TabBar {...props} scrollEnabled={true} />;

  render() {
    const {index, routes} = this.state;
    return (
      <>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={index => this.setIndex(index)}
          initialLayout={{width: width}}
          renderTabBar={this.renderTabBar}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    orderList: state.order.list,
    orderItem: state.order.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: payload => {
      dispatch(OrdersActions.onGetList(payload));
    },
    onGetDetail: id => {
      dispatch(OrdersActions.onGetDetail(id));
    },
    onUpdate: (id, params) => {
      dispatch(OrdersActions.onUpdate(id, params));
    },
    onPurchaseAgain: order_list => {
      dispatch(ProductsActions.onPurchaseAgain(order_list));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Orders);
