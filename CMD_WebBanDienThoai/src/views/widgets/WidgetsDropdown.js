import React, {Component} from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import { connect } from "react-redux";
import qs from "query-string";
// @Actions
import UsersActions from "../../redux/actions/user"
import InstallmentActions from "../../redux/actions/installment";
import OrderActions from "../../redux/actions/order";
// @Functions
import getFilterParams from "../../utils/getFilterParams";

class WidgetsDropdown extends Component {
  constructor(props){
    super(props);
    const {location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      browse: filter.browse ===null ? "" : filter.browse,
      filter: {
        browse: 'year',
      }
    }
  }

  componentDidMount(){
    const {onGetRevenue, onGetSessionOrder, onGetSessionInstallment, onGetSessionUser, location} = this.props;
    const { filter } = this.state;
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onGetRevenue(params);
    onGetSessionOrder(params);
    onGetSessionInstallment(params);
    onGetSessionUser(params);
  }

  componentDidUpdate(prevProps) {
    const {onGetRevenue, onGetSessionOrder, onGetSessionUser, onGetSessionInstallment} = this.props;
    if (prevProps.location.search !== this.props.location.search) {
      const filters = getFilterParams(this.props.location.search);
      const { filter } = this.state;
      var params = {
        ...filter,
        ...filters
      };
      onGetRevenue(params);
      onGetSessionOrder(params);
      onGetSessionInstallment(params);
      onGetSessionUser(params);
    }
  }

  handleChangeFilter = (value) => {
    this.handleUpdateFilter({ browse: value});
  }

  // Chuyển router (thêm vào params)
  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = {
      ...queryParams,
      ...data,
    };
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
  };

  render(){
    const {revenue, sessionInstallment, sessionOrder, sessionUser, location} = this.props;
    const filter = getFilterParams(location.search);
    return (
      <CRow>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-primary"
            header={`${revenue ? revenue : 0} VND`}
            text="Tổng doanh thu"
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{height: '70px'}}
                dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="primary"
                label="VND"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name="cil-money"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem active = {filter.browse==='day' ? true : false}  onClick={()=>this.handleChangeFilter("day")}>Ngày</CDropdownItem>
                <CDropdownItem active = {filter.browse==='month' ? true : false} onClick={()=>this.handleChangeFilter("month")}>Tháng</CDropdownItem>
                <CDropdownItem active = {filter.browse==='year' || filter.browse===undefined ? true : false}  onClick={()=>this.handleChangeFilter("year")}>Năm</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-info"
            header={`${sessionOrder ? sessionOrder : 0}`}
            text="Đơn hàng thành công"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{height: '70px'}}
                dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                pointHoverBackgroundColor="info"
                options={{ elements: { line: { tension: 0.00001 }}}}
                label="Số đơn"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle caret={false} color="transparent">
                <CIcon name="cil-basket"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem active = {filter.browse==='day' ? true : false}  onClick={()=>this.handleChangeFilter("day")}>Ngày</CDropdownItem>
                <CDropdownItem active = {filter.browse==='month' ? true : false} onClick={()=>this.handleChangeFilter("month")}>Tháng</CDropdownItem>
                <CDropdownItem active = {filter.browse==='year' || filter.browse===undefined ? true : false}  onClick={()=>this.handleChangeFilter("year")}>Năm</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            header={`${sessionInstallment ? sessionInstallment : 0}`}
            text="Phiếu trả góp thành công"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{height: '70px'}}
                backgroundColor="rgba(255,255,255,.2)"
                dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 }}}}
                pointHoverBackgroundColor="warning"
                label="Khách"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle caret={false} color="transparent">
                <CIcon name="cil-institution"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem active = {filter.browse==='day' ? true : false}  onClick={()=>this.handleChangeFilter("day")}>Ngày</CDropdownItem>
                <CDropdownItem active = {filter.browse==='month' ? true : false} onClick={()=>this.handleChangeFilter("month")}>Tháng</CDropdownItem>
                <CDropdownItem active = {filter.browse==='year' || filter.browse===undefined ? true : false}  onClick={()=>this.handleChangeFilter("year")}>Năm</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-danger"
            header={sessionUser ? sessionUser : "0"}
            text="Lượt truy cập"
            footerSlot={
              <ChartBarSimple
                className="mt-3 mx-3"
                style={{height: '70px'}}
                backgroundColor="rgb(250, 152, 152)"
                label="Members"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle caret className="text-white" color="transparent">
                <CIcon name="cil-hand-point-down"/>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem active = {filter.browse==='day' ? true : false}  onClick={()=>this.handleChangeFilter("day")}>Ngày</CDropdownItem>
                <CDropdownItem active = {filter.browse==='month' ? true : false} onClick={()=>this.handleChangeFilter("month")}>Tháng</CDropdownItem>
                <CDropdownItem active = {filter.browse==='year' || filter.browse===undefined ? true : false}  onClick={()=>this.handleChangeFilter("year")}>Năm</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>
      </CRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    revenue: state.order.revenue,
    sessionOrder: state.order.session,
    sessionInstallment: state.installment.session,
    sessionUser: state.user.session,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRevenue: (params) => {
      dispatch(OrderActions.onGetRevenue(params))
    },
    onGetSessionOrder: (params) => {
      dispatch(OrderActions.onGetSession(params))
    },
    onGetSessionInstallment: (params) => {
      dispatch(InstallmentActions.onGetSession(params))
    },
    onGetSessionUser: (params) => {
      dispatch(UsersActions.onGetSession(params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsDropdown)
