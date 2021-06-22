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
import Rating from 'react-rating'
// @Actions
import ReviewActions from "../../redux/actions/review";
import { INITIAL_IMAGE } from '../../constants';

const fields = [{ key: 'product', _style: { width: '30%'} }, 'content', 'rating', 'like', { key: 'actions', _style: { width: '10%'} }]

class ReviewList extends Component {
  componentDidMount() {
    const { onClearState, onGetList } = this.props;
    onClearState();
    onGetList();
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

  render () {
    const { listReview } = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách đánh giá</h5>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listReview}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'product': (item) => (
                      <td className="row">
                        {item.product && <>
                          <div className="col-3">
                            <img style={{width:'10vh'}} className="w-100" src={item.product.bigimage ? item.product.bigimage.public_url : INITIAL_IMAGE} alt={item.product.name}></img>
                          </div>
                          <div className="col-9 align-self-center">
                            <p className="font-weight-bold mb-0">{item.product.name}</p>
                            <p className="font-italic mb-0">Màu: {item.color.name_vn}</p>
                            <Rating
                              initialRating={item.product.stars}
                              emptySymbol="fa fa-star text-secondary"
                              fullSymbol="fa fa-star text-warning"
                              readonly
                            /><span className="ml-2">{item.product.reviewCount ? item.product.reviewCount : 0} đánh giá</span>
                          </div>
                        </>}
                      </td>
                    ),
                    'like': (item) => (
                      <td>
                        {item.like.length}
                      </td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
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
    listReview: state.review.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(ReviewActions.onGetList())
    },
    onClearState: () =>{
      dispatch(ReviewActions.onClearState())
    },
    onDelete: (id) =>{
      dispatch(ReviewActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)
