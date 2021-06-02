/* eslint-disable */
import React, { lazy, Component } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
/* eslint-disable */
import { connect } from "react-redux";
import {compose} from 'redux';
import { withRouter } from "react-router";
import MainChartExample from '../charts/MainChartExample.js'
// @Actions
import OrderActions from "../../redux/actions/order";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

class Dashboard extends Component {
  constructor(props){
    super(props);
    var today = new Date();
    const thisMonth = today.getMonth()+1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    this.state = {
      browse_from: `${today.getFullYear()}-01-01` ,
      browse_to: `${today.getFullYear()}-${thisMonth}-${today.getDate()}`,
      year: today.getFullYear()
    }
  }


  componentDidMount(){
    const {onGetRevenueList} = this.props;
    const {browse_from, browse_to} = this.state;
    const params  = {browse_from, browse_to}
    onGetRevenueList(params);
  }


  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  onBrowse = () =>{
    const {browse_from, browse_to} = this.state;
    const {onGetRevenueList} = this.props;
    const params  = {browse_from, browse_to}
    onGetRevenueList(params);
  }

  onBrowseYear = () => {
    const {year} = this.state;
    const {onGetRevenueList} = this.props;
    var today = new Date();
    var params;

    if(today.getFullYear() === year){
      params  = {
        'browse_from' : `${year}-01-01`,
        'browse_to' : today
      }
    }
    else{
      params = {
        'browse_from' : `${year}-01-01`,
        'browse_to' : `${year}-12-31`
      }
    }
    onGetRevenueList(params);
  }

  render(){
    const {location, history, data}= this.props;
    const {browse_from, browse_to, year} = this.state;
    return (
      <>
        <WidgetsDropdown location={location} history={history}/>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <div className="form-inline">
                <h4 id="traffic" className="card-title mb-0">Doanh thu</h4>
                <div className="row input-group mx-auto mt-2">
                <input type="number" value={year} name="year" onChange={this.onChange} className="form-control w-40"></input>
                <div className="input-group-append">
                  <button onClick={() => this.onBrowseYear()} className="btn btn-primary"><i className="fa fa-layer-group"></i></button>
                </div>
                </div>
              </div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
              <div className="row input-group mx-auto mt-2">
                <input type="date" value={browse_from} name="browse_from" onChange={this.onChange} placeholder="Từ" className="form-control w-40"></input>
                <input type="date" value={browse_to} name="browse_to" onChange={this.onChange} placeholder="đến" className="form-control w-40"></input>
                <div className="input-group-append">
                  <button onClick={() => this.onBrowse()} className="btn btn-primary"><i className="fa fa-search"></i></button>
                </div>
              </div>
              </CCol>
            </CRow>
            {data && <MainChartExample data={data} year={year} style={{height: '300px', marginTop: '40px'}}/>}
          </CCardBody>
        </CCard>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.order.listRevenue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRevenueList: (params) => {
      dispatch(OrderActions.onGetRevenueList(params))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withRouter
)(Dashboard)
