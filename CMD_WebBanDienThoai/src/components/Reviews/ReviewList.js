import React, { Component }  from 'react'
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import qs from "query-string";
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
import Pagination from "react-js-pagination";
// @Actions
import ReviewActions from "../../redux/actions/review";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import { INITIAL_IMAGE } from '../../constants';

const fields = [{ key: 'product', _style: { width: '30%'} }, 'content', 'rating', 'like', { key: 'actions', _style: { width: '10%'} }]

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {},
      filter: {
        limit: 10,
        page: 0,
      },
    }
  }

  componentDidMount() {
    const { onClearState, onGetList, location } = this.props;
    const filters = getFilterParams(location.search);
    const { filter } = this.state;
    var params = {
      ...filter,
      ...filters
    };
    this.setState({queryParams: params})
    onClearState();
    onGetList(params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const filters = getFilterParams(this.props.location.search);
      const { filter } = this.state;
      var params = {
        ...filter,
        ...filters
      };
      this.setState({queryParams: params})
      this.props.onGetList(params);
    }
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
    const {queryParams} = this.state;
    const {onDelete} = this.props;
    onDelete(_id, queryParams);
  }

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
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

  render () {
    const { listReview, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-0">Danh sách đánh giá</h5>
                <p className="float-right my-0" style={{fontStyle: 'italic'}}>Có tất cả {total} kết quả tìm kiếm</p>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listReview}
                  fields={fields}
                  hover
                  striped
                  bordered
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
              <div className="row justify-content-center">
              {total && <Pagination
                  activePage={filter.page ? parseInt(filter.page)+1 : 1}
                  itemsCountPerPage={this.state.filter.limit}
                  totalItemsCount={total}
                  pageRangeDisplayed={2}
                  linkClass="page-link"
                  itemClass="page-item"
                  prevPageText="Previous"
                  nextPageText="Next"
                  hideFirstLastPages={true}
                  onChange={this.handlePageChange.bind(this)}
                />}
              </div>
            </CCard>
          </CCol>
        </CRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listReview: state.review.list,
    total: state.review.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(ReviewActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(ReviewActions.onClearState())
    },
    onDelete: (id, params) =>{
      dispatch(ReviewActions.onDelete(id, params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)
