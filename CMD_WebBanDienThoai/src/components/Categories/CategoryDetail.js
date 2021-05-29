import React, { Component } from 'react';
import {get} from 'lodash'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CDataTable } from '@coreui/react';
import { connect } from "react-redux";
// @Actions
import CategoryActions from "../../redux/actions/categories";
import SpecificationActions from "../../redux/actions/specification";
// @Functions
import { toastError } from "../../utils/toastHelper";

const fields = ['name' ,{ key: 'actions', _style: { width: '10%'} }]
const _fields = ['name' , 'query',{ key: 'actions', _style: { width: '35%'}}]

class CategoryDetail extends Component {
  constructor(props){
    super(props);
    const {category} = props;
    this.state = {
      id: category ? category._id : '',
      name: category ? category.name : '',
      name_en: category ? category.name_en : '',
      pathseo: category ? category.pathseo :'',
      specifications: category ? category.specifications : [],
      filter: category ? category.filter : [],
      keyword: "",
      //Filter - bộ lọc
      filterEditing: "none",
      btnStatus: "Thêm bộ lọc",
      onEditing: false,
      indexFilter: -1,
      idFilter: "",
      query: ""
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

  onSubmit = () =>{
    const {id, name, pathseo, name_en, specifications, filter} = this.state;
    const {onUpdate, onCreate} = this.props;
    /* eslint-disable */
    filter.map(item =>{
      item._id = item._id._id
    })
    /* eslint-disable */
    var data = {name, pathseo, name_en, specifications, filter}
    if (id) {
      onUpdate(id, data);
    }
    else {
      // 4. Create data
      onCreate(data);
    }
  }

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
  onDeleteFilter = (item) => {

  }

  onAddFilter = (value) => {
    if (value === "none") {
      this.setState({
        filterEditing: "inline-flex",
        btnStatus: "Hủy",
        onEditing: false,
      });
    } else {  //Click button Hủy
      this.setState({
        // Gán giá trị button
        filterEditing: "none",
        btnStatus: "Thêm bộ lọc",
        onEditing: false,
        // Gán giá trị fields
        idFilter: "",
        query: ""
      });
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

  onEditFilter = (item) => {
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
  };

  onDeleteFilter = (item) => {
    const { filter } = this.state;
    filter.splice(filter.indexOf(item), 1);
    this.setState({
      filter,
    });
  };

	render() {
    const {name, pathseo, name_en, specifications, filter, keyword, filterEditing, btnStatus, idFilter, query} = this.state;
    const { large, onClose, category, listSpecification, listSearch} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{category ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div className="row">
						<div className="col-12 col-lg-6">
							<form>
								<div className="form-group">
									<label>Tên loại sản phẩm:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
								</div>
								<div className="form-group">
									<label>Slug:</label>
                  <input type="text" className="form-control" name="pathseo" value={pathseo} onChange={this.onChange}/>
								</div>
                <div className="form-group">
									<label>Tên loại sản phẩm (English):</label>
                  <input type="text" className="form-control" name="name_en" value={name_en} onChange={this.onChange}/>
								</div>
              </form>
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
                  onClick={() => this.onAddFilter(filterEditing)}
                >
                  {btnStatus}
                </button>
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
                fields={_fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'name': (item) => (
                    <td>{this.setSpecification(item._id._id)}</td>
                  ),
                  'os': (item) => {

                  },
                  'actions': (item) => (
                    <td>
                      <CButton
                      onClick={() => this.onEditFilter(item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="warning"
                      >
                        <i className="fa fa-highlighter"></i>
                      </CButton>
                      <CButton
                      onClick={() => this.onDeleteFilter(item)}
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
