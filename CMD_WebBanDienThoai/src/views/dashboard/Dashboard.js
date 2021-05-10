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
import { connect } from "react-redux";
import {compose} from 'redux';
import { withRouter } from "react-router";
import MainChartExample from '../charts/MainChartExample.js'
// @Actions
import OrderActions from "../../redux/actions/order";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

class Dashboard extends Component {
  componentDidMount(){
    const {onGetRevenueList} = this.props;
    onGetRevenueList();
  }


  render(){
    const {location, history, data}= this.props;
    const thisYear = new Date;
    return (
      <>
        <WidgetsDropdown location={location} history={history}/>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">Doanh thu</h4>
                <div className="small text-muted">{thisYear.getFullYear()}</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton color="primary" className="float-right">
                  <CIcon name="cil-cloud-download"/>
                </CButton>
                <CButtonGroup className="float-right mr-3">
                  {
                    [thisYear.getFullYear()-1, thisYear.getFullYear(), thisYear.getFullYear()+1].map(value => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === thisYear.getFullYear()}
                      >
                        {value}
                      </CButton>
                    ))
                  }
                </CButtonGroup>
              </CCol>
            </CRow>
            {data && <MainChartExample data={data} style={{height: '300px', marginTop: '40px'}}/>}
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
    onGetRevenueList: () => {
      dispatch(OrderActions.onGetRevenueList())
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withRouter
)(Dashboard)
