import React, { Component }  from 'react'
import { get } from "lodash";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
} from '@coreui/react'
import UserDetail from './UserDetail'
import UsersActions from "../../redux/actions/user";

const fields = ['first name', 'last name','phone','address','email',{ key: 'actions', _style: { width: '15%'} }]

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    }
  }
  componentDidMount() {
    const { onClearState, onGetList } = this.props;
    onClearState();
    onGetList();
  }

  setLarge = (large) => {
    this.setState({
      large
    })
  }

  handleListOrder = (phone) =>{
    const { history } = this.props;
    const pathname = '/users/order-manage';
    history.push(`${pathname}?user=${phone}`);
  }

  onDetail = (large, item) =>{
    const { onGetDetail } = this.props;
    this.setState({
      large
    })
    if(item){onGetDetail(item)}
    //onGetDetail(item)
  }

  onClose = (large) =>{
    const { onClearDetail } = this.props;
    this.setState({
      large
    })
    onClearDetail();
  }

  render () {
    const {large} = this.state;
    const {listUser, userDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách người dùng</h5>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listUser}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'first name': (item) => (
                      <td>{item.firstname}</td>
                    ),
                    'last name': (item) => (
                      <td>{item.lastname}</td>
                    ),
                    'phone': (item) => (
                      <td>{item.phonenumber}</td>
                    ),
                    'address': (item) => (
                      <td>{item.address}</td>
                    ),
                    'email': (item) => (
                      <td>{item.email}</td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.handleListOrder(item.phonenumber)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="success"
                        >
                          Danh sách
                        </CButton>
                      </td>)
                  }}
                />
                {(userDetail && large) && <UserDetail large={large} user={userDetail} onClose={this.onClose} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>}

                {(!userDetail && large) && <UserDetail large={large} user={userDetail} onClose={this.onClose} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.user.list,
    userDetail: state.user.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(UsersActions.onGetList())
    },
    onClearState: () =>{
      dispatch(UsersActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(UsersActions.onClearDetail())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
