import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import BrandActions from "../../redux/actions/brands";
import '../Products/product.css'

class BrandDetail extends Component {
  constructor(props){
    super(props);
    const {brand} = props;
    this.state = {
      id: brand ? brand._id : '',
      name: brand ? brand.name : '',
      image: brand ? brand.image: '',
      previewSource: '',
      selectedFile: '',
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

  onSubmit = (e) =>{
    const {id, name} = this.state;
    const {onUpdate, onCreate} = this.props;
    /* Xử lý ảnh */
    // e.preventDefault();
    const {selectedFile} = this.state;
    var formData = new FormData();
    formData.append("name",name);
    formData.append("image",selectedFile);
    /* Xử lý ảnh */
    if (id) {
      onUpdate(id, formData);
    }
    else {
      // 4. Create data
      onCreate(formData);
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

	render() {
    const {name, image, previewSource} = this.state;
    const { large, onClose, brand} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{brand ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div className="row">
						<div className="col-12 col-lg-6">
							<form>
								<div className="form-group">
									<label>Tên thương hiệu:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
								</div>

              </form>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group">
									<label>Ảnh thương hiệu:</label>
                  {image ? <div className="form-group img-thumbnail3" style={{"height":"100%"}}>
                  {
                    previewSource ? (
                      <img src={previewSource} className="w-100" alt=""/>
                    )
                    : <img src={image.public_url || INITIAL_IMAGE} style={{ border: '1px solid', width: '100%' }} alt=""/>
                  }
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="image" id="fileInput"
                    onChange={this.handleFileInputChange} style={{width: '100%'}}/>
                  </div>
                </div>
                : <div className="form-group img-thumbnail3" style={{"height":"100%"}}>
                  {
                    previewSource ? (
                      <img src={previewSource} className="w-100" alt=""/>
                    )
                    : <img src={INITIAL_IMAGE} alt="" style={{ border: '1px solid', width: '100%' }}></img>
                  }
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="image" id="fileInput"
                      onChange={this.handleFileInputChange} style={{width: '100%'}}/>
                  </div>
                </div>}
							</div>
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
      dispatch(BrandActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(BrandActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
