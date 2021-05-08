import React, { Component }  from 'react'
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// @Components
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
} from '@coreui/react'
import GroupDetail from './GroupDetail'
// @Actions
import GroupActions from "../../redux/actions/group";

const fields = ['name', { key: 'actions', _style: { width: '15%'} }]

class GroupList extends Component {
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
  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa operation này?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  onDelete = (_id)=>{
    const {onDelete} = this.props;
    onDelete(_id);
  }

  onUpdate = (large, item) =>{
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
    const {listGroup, groupDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách hệ điều hành</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm hệ điều hành
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listGroup}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'name': (item) => (
                      <td>{item.name}</td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.onUpdate(!large, item._id)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="warning"
                        >
                          Sửa
                        </CButton>
                        <CButton
                          onClick={() => this.submit(item._id)}
                          className="mr-1"
                          color="danger"
                        >
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
                {(groupDetail && large) && <GroupDetail large={large} group={groupDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!groupDetail && large) && <GroupDetail large={large} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
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
    listGroup: state.group.list,
    groupDetail: state.group.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(GroupActions.onGetList())
    },
    onClearState: () =>{
      dispatch(GroupActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(GroupActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(GroupActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(GroupActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
