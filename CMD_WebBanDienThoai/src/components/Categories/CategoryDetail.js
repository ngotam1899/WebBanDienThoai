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
      keyword: ""
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
    const {id, name, pathseo, name_en, specifications} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {name, pathseo, name_en, specifications}
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

  onAddSpecification = (_id) =>{
    const {specifications} = this.state;
    if(specifications.indexOf(_id)!== -1){
      toastError("Thuộc tính này đã tồn tại trong danh sách")
    }
    else{
      specifications.push(_id)
    }
    this.setState({specifications})
  }

  onDeleteSpecification = (_id) =>{
    const {specifications} = this.state;
    specifications.splice(specifications.indexOf(_id), 1);
    this.setState({specifications})
  }

	render() {
    const {name, pathseo, name_en, specifications, keyword} = this.state;
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
            </div>
            <div className="col-12 col-lg-6">
              <input className="form-control" name="keyword" value={keyword} onChange={this.handleFilter}></input>
              <div className="card">
                {listSearch && keyword && listSearch.map((specification, index) =>{
                  return (
                    <>
                    <div className="row" key={index}>
                      <div className="col-9">
                        <p className="mb-0">{specification.name}</p>
                      </div>
                      <div className="col-3 my-auto">
                        <button className="btn btn-success" onClick ={ () => this.onAddSpecification(specification._id)}><i className="fa fa-plus-circle"></i></button>
                      </div>
                    </div>
                    <div class="border-bottom"></div>
                    </>
                  )
                })}
              </div>
              {listSpecification && <CDataTable
                items={specifications}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'name': (item) => (
                    <td>{this.setSpecification(item)}</td>
                  ),
                  'actions': (item) => (
                    <CButton
                      onClick={() => this.onDeleteSpecification(item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="danger"
                    >
                      Xoá
                    </CButton>
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
