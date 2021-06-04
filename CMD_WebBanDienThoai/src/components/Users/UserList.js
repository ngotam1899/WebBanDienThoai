import React, { Component }  from 'react'
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
import UsersActions from "../../redux/actions/user";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const fields = ['first name', 'last name','phone','email', 'role',{ key: 'actions', _style: { width: '20%'} }]

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

  onSubmit = (id, role) => {
    confirmAlert({
      title: 'Thông báo',
      message: `Bạn có thực sự muốn thay đổi vai trò người dùng này?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onChangeRole(id, role)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  onChangeRole = (id, role)=>{
    const {onUpdate} = this.props;
    if(role === "1"){
      onUpdate(id, { role : 0 });
    }
    else{
      onUpdate(id, { role : 1 });
    }
  }

  handleListOrder = (id) =>{
    const { history } = this.props;
    const pathname = '/users/order-manage';
    history.push(`${pathname}?user=${id}`);
  }

  onDetail = (large, item) =>{
    const { onGetDetail } = this.props;
    this.setState({
      large
    })
    if(item){onGetDetail(item)}
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
    const {listUser, onClearDetail} = this.props;
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
                    'email': (item) => (
                      <td>{item.email}</td>
                    ),
                    'role': (item) => (
                      <td>{item.role ==="0" ? "User, Admin" : "User"}</td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.handleListOrder(item._id)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="success"
                        >
                          Đơn mua
                        </CButton>
                        <CButton
                          onClick={() => this.onSubmit(item._id, item.role)}
                          className={item.role === "1" ? "mr-1 mb-1 mb-xl-0 bg-orange" : "mr-1 mb-1 mb-xl-0 bg-purple"}
                        >
                          {item.role === "1" ? "Nâng cấp" : "Hạ cấp"}
                        </CButton>
                      </td>)
                  }}
                />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(UsersActions.onGetList())
    },
    onUpdate: (id, params) => {
      dispatch(UsersActions.onUpdate(id, params))
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
