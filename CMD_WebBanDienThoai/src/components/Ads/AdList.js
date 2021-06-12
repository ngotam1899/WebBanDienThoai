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
import AdDetail from './AdDetail'
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import AdActions from "../../redux/actions/ad";

const fields = ['image', 'name', 'start', 'end', { key: 'actions', _style: { width: '15%'} }]

class AdList extends Component {
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
      message: 'Bạn có thực sự muốn xóa quảng cáo này?',
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
  handleListProduct = (id) =>{
    const { history } = this.props;
    const pathname = '/products/product-manage';
    history.push(`${pathname}?color=${id}`);
  }

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
    const {listAd, adDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách quảng cáo</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm quảng cáo
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listAd}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'image': (item)=>(
                      <td>
                        <img src={ item.image ? item.image.public_url : INITIAL_IMAGE } style={{width:'10vw'}} alt={item.name} />
                      </td>
                    ),
                    'start': (item)=>(
                      <td>
                        <p>{new Date(item.startedAt).toLocaleDateString("vi-VN")}</p>
                      </td>
                    ),
                    'end': (item)=>(
                      <td>
                        <p>{new Date(item.endedAt).toLocaleDateString("vi-VN")}</p>
                      </td>
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
                {(adDetail && large) && <AdDetail large={large} ad={adDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!adDetail && large) && <AdDetail large={large} onClose={this.onClose}
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
    listAd: state.ad.list,
    adDetail: state.ad.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(AdActions.onGetList())
    },
    onClearState: () =>{
      dispatch(AdActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(AdActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(AdActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(AdActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdList)
