import React, { Component }  from 'react'
import { get } from "lodash";
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
import SpecificationDetail from '../Specification/SpecificationDetail';
import Pagination from "react-js-pagination";
// @Actions
import SpecificationActions from "../../redux/actions/specification";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
const fields = ['name', { key: 'actions', _style: { width: '15%'} }]

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      large: false,
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
      this.props.onGetList(params);
    }
  }

  setLarge = (large) => {
    this.setState({
      large
    })
  }

  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa Specification này?',
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

  setSpecification = (specification) =>{
    const {listSpecification} = this.props;
    const specificationName = listSpecification.find(obj => obj._id === specification);
    return get(specificationName, "name");
  }

  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa thuộc tính này?',
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

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  // Button search
  searchKeyWorld = () => {
    const {keyword} = this.state;
    this.handleUpdateFilter({ keyword, page: 0});
  }

  pressKeyWord = (event) => {
    if(event.key === 'Enter') this.searchKeyWorld();
  }

  destroyFilter = () => {
    const {location, history} = this.props;
    const {pathname} = location;
    var queryParams = {
      keyword: "",
      page: 0,
    }
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
    this.setState({
      keyword: "",
    })
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

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  render () {
    const { large, keyword } = this.state;
    const { listSpecification, specificationDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách thuộc tính</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={keyword} name="keyword" placeholder="Nhập tên thuộc tính"
                  onKeyPress={this.pressKeyWord} onChange={this.onChange}/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" onClick={() => this.searchKeyWorld()} type="submit">Tìm kiếm</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="float-left font-italic py-2">Có tất cả {total} kết quả tìm kiếm</p>
                    <CButton
                      className="ml-2 float-left"
                      onClick={()=> this.destroyFilter()}
                      color="info"
                    > <i className="fa fa-eraser mr-1"></i>
                      Xóa tất cả bộ lọc
                    </CButton>
                    <CButton
                      onClick={() => this.setLarge(!large)}
                      className="mb-1 float-right"
                      color="success"
                    > Thêm thuộc tính
                    </CButton>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listSpecification}
                  fields={fields}
                  hover
                  striped
                  bordered
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
                {(specificationDetail && large) && <SpecificationDetail large={large} specification={specificationDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!specificationDetail && large) && <SpecificationDetail large={large} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
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
    listSpecification: state.specification.list,
    specificationDetail: state.specification.detail,
    total: state.specification.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList : (params) => {
      dispatch(SpecificationActions.onGetList(params))
    },
    onGetDetail: (id) => {
      dispatch(SpecificationActions.onGetDetail(id))
    },
    onClearState: () =>{
      dispatch(SpecificationActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(SpecificationActions.onClearDetail())
    },
    onUpdate: (id, params) =>{
      dispatch(SpecificationActions.onUpdate({id, params}))
    },
    onDelete: (id) =>{
      dispatch(SpecificationActions.onDelete({id}))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
