import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

class CategoryDetail extends Component {
  constructor(props){
    super(props);
    const {product} = props;
    this.state = {
      id: product ? product.id : '',
      name: product ? product.name : '',
      pathseo: product ? product.pathseo :'',
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

  onSubmit = (data, _id) =>{
    const {onSubmit} = this.props;
    const {id, name, pathseo} = this.state;
    data = {name, pathseo}
    _id = id;
    onSubmit(data, _id);
  }

	render() {
    const {name, pathseo} = this.state;
    const { large, onClose, product} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{product ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</CModalTitle>
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

export default CategoryDetail;
