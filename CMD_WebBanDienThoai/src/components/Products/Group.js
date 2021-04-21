import React, { Component } from 'react'
import { connect } from "react-redux";
// @Components
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CDataTable
} from "@coreui/react";
// @Actions
import ProductsActions from "../../redux/actions/products";
import GroupActions from "../../redux/actions/group";
// @Functions
import {INITIAL_IMAGE} from '../../constants';

const fields = ['ảnh', 'tên hiển thị', 'tên thật', { key: 'actions', _style: { width: '15%'} }]

class Group extends Component {
  constructor(props){
    super(props);
    const {group} = props
    this.state = {
      keyword: "",
      nameGroup : group ? group.name: "",
      name: "",
      product: null,
      index: null,
      show: false,
      listProduct: group ? group.products : []
    }
  }

  handleFilter = (event) => {
    const { keyword } = this.state;
    const { onFilter } = this.props;
		var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
    onFilter(keyword);
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onDelete = (item) =>{
    const {listProduct} = this.state;
    listProduct.splice(listProduct.indexOf(item), 1);
    this.setState({
      listProduct
    })
  }

  onSaveChange = () =>{
    const {name, product, index, listProduct} = this.state;
    if(index){
      listProduct[listProduct.indexOf(index)] = {name, product};
      this.setState({listProduct});
    }
    else{
      listProduct.push({name, product});
      this.setState({listProduct});
    }
  }

  onSave = () =>{
    const {onUpdate, onCreate, group} = this.props;
    const {listProduct, nameGroup} = this.state;
    onUpdate(group._id, {
      name: nameGroup,
      products: listProduct
    });
  }

  onClose = () => {
    const {onCloseModal, onClearDetail, modal} = this.props;
    onCloseModal("_modal",!modal);
    onClearDetail();
  }

  render() {
    const {modal, onCloseModal, group, listSearch} = this.props;
    const {keyword, listProduct, name, product, show, nameGroup} = this.state;
    return (
      <CModal show={modal} onClose={() => onCloseModal("_modal",!modal)} closeOnBackdrop={false} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>
            {group ? `Nhóm sản phẩm ${group._id}` : "Thêm nhóm mới"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>Tên nhóm:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameGroup"
                  value={nameGroup}
                  onChange={this.onChange}
                />
              </div>
              <label className="float-left">Danh sách sản phẩm:</label>
              <div className="float-right">
                <CButton color="success" onClick={()=>this.setState({
                index: null,
                name: "",
                product: null,
                show: true})}>Thêm sản phẩm</CButton>
              </div>
              {listProduct && <CDataTable
                items={listProduct}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'ảnh':
                    (item) => (
                      <td>
                        <img src={ item.product.bigimage ? item.product.bigimage.public_url : INITIAL_IMAGE } style={{height:'10vh'}} alt={item.product.name} />
                      </td>
                    ),
                  'tên hiển thị': (item) => (
                    <td>{item.name}</td>
                  ),
                  'tên thật': (item) => (
                    <td>{item.product.name}</td>
                  ),
                  'actions': (item) => (
                    <td>
                    <CButton
                      onClick={() => this.setState({
                        index: item,
                        name: item.name,
                        product: item.product,
                        show: true
                      })}
                      className="mr-1 mb-1 mb-xl-0"
                      color="warning"
                    >
                      <i className="fa fa-highlighter"></i>
                    </CButton>
                    <CButton
                      onClick={() => this.onDelete(item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="danger"
                    >
                      <i className="fa fa-trash-alt"></i>
                    </CButton>
                    </td>
                  )
                }}
              />}
            </div>
            <div className="col-12 col-md-6">
              {show && <div className="card">
                <div className="card-header bg-primary">
                  <p className="text-white mb-0">Chi tiết</p>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Tên hiển thị:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sản phẩm:</label>
                    <input className="form-control" name="keyword" value={keyword} onChange={this.handleFilter}></input>
                    <div className="card mb-0">
                      {listSearch && keyword && listSearch.map((product, index) =>{
                        return (
                          <div key={index}>
                            <div className="row text-dark text-decoration-none" style={{height: "80px"}} key={index}>
                              <div className="col-3 my-auto">
                                <><img style={{height: "80px"}} src={product.bigimage.public_url}></img></>
                              </div>
                              <div className="col-6 text-left my-auto">
                                <p className="mb-0">{product.name}</p>
                              </div>
                              <div className="col-3 align-self-center">
                                <button type="button" className="btn btn-success" onClick={() => this.setState({product, keyword: ""})}><i className="fa fa-folder-plus"></i></button>
                              </div>
                            </div>
                            <div className="border-bottom"></div>
                          </div>
                        )
                      })}
                      {product &&
                      <div className="card mb-0">
                        <div className="row text-dark text-decoration-none" style={{height: "80px"}}>
                          <div className="col-3 my-auto">
                            <><img style={{height: "80px"}} src={product.bigimage.public_url}></img></>
                          </div>
                          <div className="col-9 text-left my-auto">
                            <p className="mb-0">{product.name}</p>
                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <CButton color="success" onClick={this.onSaveChange}>Lưu</CButton>{" "}
                  <CButton color="secondary" onClick={()=>this.setState({
                    index: null,
                    name: "",
                    product: null,
                    show: false
                  })}>Hủy</CButton>
                </div>
              </div>}
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={this.onSave}>
            Save group
          </CButton>{" "}
          <CButton color="secondary" onClick={this.onClose}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listSearch: state.products.listSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilter : (keyword) =>{
      dispatch(ProductsActions.onFilter(keyword))
    },
    onCreate: (params) =>{
      dispatch(GroupActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(GroupActions.onUpdate({id, params}))
    },
    onClearDetail: () =>{
      dispatch(GroupActions.onClearDetail())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
