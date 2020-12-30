import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
// @Actions
import CategoryActions from "../../redux/actions/categories";

class CategoryDetail extends Component {
  constructor(props){
    super(props);
    const {category} = props;
    this.state = {
      id: category ? category._id : '',
      name: category ? category.name : '',
      name_en: category ? category.name_en : '',
      pathseo: category ? category.pathseo :'',
    }
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
    const {id, name, pathseo, name_en} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {name, pathseo, name_en}
    if (id) {
      onUpdate(id, data);
    }
    else {
      // 4. Create data
      onCreate(data);
    }
  }

	render() {
    const {name, pathseo, name_en} = this.state;
    const { large, onClose, category} = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (params) =>{
      dispatch(CategoryActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(CategoryActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
