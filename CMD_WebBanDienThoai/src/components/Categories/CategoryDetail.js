import React, { Component } from 'react';
import {get} from 'lodash'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CDataTable, CSwitch } from '@coreui/react';
import { connect } from "react-redux";
import "../Products/product.css";
// @Actions
import CategoryActions from "../../redux/actions/categories";
import SpecificationActions from "../../redux/actions/specification";
// @Functions
import { toastError } from "../../utils/toastHelper";
import {INITIAL_IMAGE} from '../../constants';
const fields = ['name' ,{ key: 'actions', _style: { width: '10%'} }]
const filterField = ['name' , 'query',{ key: 'actions', _style: { width: '35%'}}]
const priceField = ['name' , 'min', 'max', { key: 'actions', _style: { width: '35%'}}]

class CategoryDetail extends Component {
  constructor(props){
    super(props);
    const {category} = props;
    this.state = {
      id: category ? category._id : '',
      name: category ? category.name : '',
      name_en: category ? category.name_en : '',
      image: category ? category.image : '',
      pathseo: category ? category.pathseo :'',
      specifications: category ? category.specifications : [],
      filter: category ? category.filter : [],
      price: category ? category.price : [],
      accessories: category ? category.accessories :'',
      keyword: "",
      // @Product Image
      previewSource: "",
      selectedFile: "",
      // @Filter - bộ lọc
      filterEditing: "none",
      btnStatus: "Thêm bộ lọc",
      onEditing: false,
      indexFilter: -1,
      idFilter: "",
      query: "",
      // @Price - khoảng giá
      priceEditing: "none",
      _btnStatus: "Thêm khoảng giá",
      _onEditing: false,
      indexPrice: -1,
      name_price: "",
      min: "",
      max: ""
    }
  }

  componentDidMount(){
    const {onGetListSpecification} = this.props;
    onGetListSpecification();
  }

  handleFilter = (event) => {
		var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
    const { keyword } = this.state;
    const { onFilter } = this.props;
    onFilter(keyword);
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  onSubmit = async () =>{
    const {id, image} = this.state;
    /* Xử lý ảnh */
    const {selectedFile} = this.state;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      await this.setState({
        image: formData,
      });
    }
    else{
      await this.setState({
        image: image._id,
      });
    }
    /* Xử lý ảnh */
    this.onCallback(id)
  }

  onCallback = (id) => {
    const {name, image, pathseo, name_en, specifications, filter, price, accessories} = this.state;
    const {onUpdate, onCreate} = this.props;
    /* eslint-disable */
    filter.map(item =>{
      item._id = item._id._id
    })
    /* eslint-disable */
    var data = {name, image, pathseo, name_en, specifications, filter, price, accessories}
    if (id) {
      onUpdate(id, data);
    }
    else {
      // 4. Create data
      onCreate(data);
    }
  }

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // 1. Hiển thị ảnh vừa thêm
    this.previewFile(file);
    this.setState({
      selectedFile: file,
    })
  }

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result
      })
    };
  };

  setSpecification = (specification) =>{
    const {listSpecification} = this.props;
    const specificationName = listSpecification.find(obj => obj._id === specification);
    return get(specificationName, "name");
  }

  onAddSpecification = (specification) =>{
    const {specifications} = this.state;
    if(specifications.findIndex(i => i.name === specification.name)!== -1){
      toastError("Thuộc tính này đã tồn tại trong danh sách")
    }
    else{
      specifications.push(specification)
    }
    this.setState({specifications})
  }

  onDeleteSpecification = (item) =>{
    const {specifications} = this.state;
    specifications.splice(specifications.indexOf(item), 1);
    this.setState({specifications})
  }

  onAddFilter = (name, value) => {
    if (value === "none") {
      this.setState({
        [name]: "inline-flex"
      })
      if(name ==="filterEditing"){
        this.setState({
          btnStatus: "Hủy",
          onEditing: false,
        });
      }
      else {
        this.setState({
          _btnStatus: "Hủy",
          _onEditing: false,
        });
      }
    } else {  //Click button Hủy
      this.setState({
        // Gán giá trị button
        [name]: "none"
      })
      if(name ==="filterEditing"){
        this.setState({
          btnStatus: "Thêm bộ lọc",
          onEditing: false,
          // Gán giá trị fields
          idFilter: "",
          query: ""
        });
      }
      else{
        this.setState({
          _btnStatus: "Thêm khoảng giá",
          _onEditing: false,
          // Gán giá trị fields
          min: "",
          max: ""
        });
      }
    }
  };

  onSaveFilter() {
    const {
      idFilter,
      query,
      onEditing,
      indexFilter,
      filter,
    } = this.state;
    if(!idFilter){
      toastError("Chọn thuộc tính trước khi lưu");
    }
    else{
      if (onEditing === false) {
        // TH thêm màu
        if (filter.find((obj) => obj._id._id === idFilter)) {
          toastError("Thuộc tính này đã tồn tại");
        } else {
          filter.push({
            _id: {_id: idFilter},
            query
          });
        }
      } else {
        // TH sửa màu
        for (let i = 0; i < filter.length; i++) {
          filter[indexFilter] = {
            _id: {_id: idFilter},
            query
          };
        }
      }
    }
    this.setState({
      filter,
      // Gán giá trị button
      filterEditing: "none",
      btnStatus: "Thêm bộ lọc",
      // Gán giá trị fields
      idFilter: "",
      query: "",
      onEditing: false,
    });
  }

  onSavePrice = () =>{
    const {
      name_price,
      min,
      max,
      _onEditing,
      indexPrice,
      price,
    } = this.state;
    if(!name_price){
      toastError("Đặt tên khoảng giá khi lưu");
    }
    else{
      if (_onEditing === false) {
        price.push({
          name: name_price,
          min,
          max
        });
      } else {
        for (let i = 0; i < price.length; i++) {
          price[indexPrice] = {
            name: name_price,
            min,
            max
          };
        }
      }
    }
    this.setState({
      price,
      // Gán giá trị button
      priceEditing: "none",
      _btnStatus: "Thêm khoảng giá",
      // Gán giá trị fields
      name_price: "",
      min: "",
      max: "",
      _onEditing: false,
    });
  }

  onEditFilter = (name, item) => {
    if(name==="filter"){
      const { filter } = this.state;
      this.setState({
        // Gán giá trị button
        filterEditing: "inline-flex",
        btnStatus: "Hủy",
        // Gán giá trị fields
        idFilter: item._id._id,
        query: item.query,
        onEditing: true,
        indexFilter: filter.indexOf(item),
      });
    }
    else{
      const { price } = this.state;
      this.setState({
        // Gán giá trị button
        priceEditing: "inline-flex",
        _btnStatus: "Hủy",
        // Gán giá trị fields
        name_price: item.name,
        min: item.min,
        max: item.max,
        _onEditing: true,
        indexPrice: price.indexOf(item),
      });
    }
  };

  onDeleteFilter = (name, item) => {
    if(name === "filter"){
      const { filter } = this.state;
      filter.splice(filter.indexOf(item), 1);
      this.setState({
        filter,
      });
    }
    else{
      const { price } = this.state;
      price.splice(price.indexOf(item), 1);
      this.setState({
        price,
      });
    }
  };

	render() {
    const {
      name, pathseo, name_en, specifications, filter, keyword,
      filterEditing, btnStatus, idFilter, query, image, accessories, previewSource,
      priceEditing, _btnStatus, name_price, min, max, price,
    } = this.state;
    const { large, onClose, category, listSpecification, listSearch} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{category ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div className="row">
						<div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label>Tên loại sản phẩm:</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label>Tên tiếng Anh:</label>
                    <input type="text" className="form-control" name="name_en" value={name_en} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label>Slug:</label>
                    <input type="text" className="form-control" name="pathseo" value={pathseo} onChange={this.onChange}/>
                  </div>
                </div>
                <div className="col-6">
                {image ? (
                <div className="form-group img-thumbnail3">
                  {previewSource ? (
                    <img src={previewSource} className="border rounded w-100" alt="" />
                  ) : (
                    <img
                      src={image.public_url}
                      className="border rounded w-100"
                      alt=""
                    />
                  )}
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input
                      type="file"
                      name="previewSource"
                      onChange={this.handleFileInputChange}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
                ) : (
                  <div className="form-group img-thumbnail3">
                    {previewSource ? (
                      <img src={previewSource} className="border rounded w-100" alt="" />
                    ) : (
                      <img
                        src={INITIAL_IMAGE}
                        alt=""
                        className="border rounded w-100"
                      ></img>
                    )}
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input
                        type="file"
                        name="previewSource"
                        onChange={this.handleFileInputChange}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>)}
                  <div className="form-group">
                    <label>Phụ kiện:</label>
                    <CSwitch className='mx-1' shape={'pill'} color={'primary'} name="accessories" defaultChecked={accessories} value={!accessories} onChange={this.onChange}/>
                  </div>
                </div>
              </div>

              <label>Danh mục thuộc tính:</label>
              <div style={{position: "relative"}}>
                <input className="form-control" name="keyword" value={keyword} onChange={this.handleFilter}></input>
                <div className="card mb-0 w-100" style={{ position: "absolute", zIndex: 1}}>
                  {listSearch && keyword && listSearch.map((specification, index) =>{
                    return (
                      <div key={index}>
                      <div className="row p-2" >
                        <div className="col-9 align-self-center">
                          <p className="mb-0">{specification.name}</p>
                        </div>
                        <div className="col-3 text-right my-auto">
                          <button className="btn btn-success" onClick ={ () => this.onAddSpecification(specification)}><i className="fa fa-plus-circle"></i></button>
                        </div>
                      </div>
                      <div className="border-bottom"></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {listSpecification && <CDataTable
                items={specifications}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'name': (item) => (
                    <td>{this.setSpecification(item._id)}</td>
                  ),
                  'actions': (item) => (
                    <td>
                      <CButton
                      onClick={() => this.onDeleteSpecification(item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="danger"
                      >
                        Xoá
                      </CButton>
                    </td>

                  )
                }}
              />}

            </div>
            <div className="col-12 col-lg-6">
              <div className="row mb-2">
                <div className="col-12">
                  <label className="float-left">Danh mục bộ lọc:</label>
                  <div className="float-right">
                    <button
                      className="btn btn-success mr-2"
                      style={{ display: filterEditing }}
                      onClick={() => this.onSaveFilter()}
                      type="button"
                    >
                      Lưu
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => this.onAddFilter("filterEditing", filterEditing)}
                    >
                      {btnStatus}
                    </button>
                  </div>
                </div>
              </div>

              <div className="row w-100 rounded border my-2" style={{ display: filterEditing }}>
                <div className="col-12">
                  <div className="form-group">
                    <label>Tên thuộc tính:</label>
                    <select
                    className="form-control my-1"
                    required="required"
                    name="idFilter"
                    value={idFilter}
                    onChange={this.onChange}
                  >
                    <option value={-1}>Chọn thuộc tính</option>
                    {specifications && specifications.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  </div>
                  <div className="form-group">
                    <label>Query string:</label>
                    <input type="text" className="form-control" name="query" value={query} onChange={this.onChange}/>
                  </div>
                </div>
              </div>
              {listSpecification && filter.length > 0 && <CDataTable
                items={filter}
                fields={filterField}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'name': (item) => (
                    <td>{this.setSpecification(item._id._id)}</td>
                  ),
                  'actions': (item) => (
                    <td>
                      <CButton
                      onClick={() => this.onEditFilter("filter", item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="warning"
                      >
                        <i className="fa fa-highlighter"></i>
                      </CButton>
                      <CButton
                      onClick={() => this.onDeleteFilter("filter", item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="danger"
                      >
                        <i className="fa fa-trash-alt"></i>
                      </CButton>
                    </td>

                  )
                }}
              />}

              <label className="float-left">Danh mục khoảng giá:</label>
              <div className="float-right">
                <button
                  className="btn btn-success mr-2"
                  style={{ display: priceEditing }}
                  onClick={() => this.onSavePrice()}
                  type="button"
                >
                  Lưu
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.onAddFilter("priceEditing", priceEditing)}
                >
                  {_btnStatus}
                </button>
              </div>
              <div className="row w-100 rounded border my-2" style={{ display: priceEditing }}>
                <div className="col-12">
                  <div className="form-group">
                    <label>Tên khoảng giá:</label>
                    <input type="text" className="form-control" name="name_price" value={name_price} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label>Từ (min):</label>
                    <input type="number" className="form-control" name="min" value={min} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label>Đến (max):</label>
                    <input type="number" className="form-control" name="max" value={max} onChange={this.onChange}/>
                  </div>
                </div>
              </div>
              {price.length > 0 && <CDataTable
                items={price}
                fields={priceField}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'actions': (item) => (
                    <td>
                      <CButton
                      onClick={() => this.onEditFilter("price", item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="warning"
                      >
                        <i className="fa fa-highlighter"></i>
                      </CButton>
                      <CButton
                      onClick={() => this.onDeleteFilter("price", item)}
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
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton color="primary" onClick={() => this.onSubmit(!large)}>
						Save
					</CButton>{' '}
					<CButton color="secondary" onClick={() => onClose(!large)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    listSpecification: state.specification.list,
    listSearch: state.specification.listSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (params) =>{
      dispatch(CategoryActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(CategoryActions.onUpdate({id, params}))
    },
    onGetListSpecification : (params) => {
      dispatch(SpecificationActions.onGetList(params))
    },
    onFilter : (keyword) =>{
      dispatch(SpecificationActions.onFilter(keyword))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
