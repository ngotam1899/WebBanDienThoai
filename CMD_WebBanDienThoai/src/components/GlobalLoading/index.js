import React, { Component } from 'react';
import './loading.css'
import { assets } from '../../constants/assetsImage';
import { connect } from "react-redux";
import UIActions from '../../redux/actions/ui'

class GlobalLoading extends Component {
  render() {
    const {loading} = this.props;
    let html = null;
    if(loading === true) {
      html =
      <div className="loading">
        <img src={assets('loading.gif')} alt="Loading..."></img>
      </div>
    }
    return html;
  }
}

const mapStateToProps = (state) => {
  return {
		loading: state.ui.showLoading
  };
};

const mapDispatchToProps =(dispatch)=> {
	return {
		showLoading : () =>{
			dispatch(UIActions.showLoading())
    },
    hideLoading : () =>{
			dispatch(UIActions.hideLoading())
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalLoading);
