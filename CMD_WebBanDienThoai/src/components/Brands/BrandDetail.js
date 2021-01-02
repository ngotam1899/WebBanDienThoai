import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
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
      fileInputState: '',
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
    if(selectedFile){
      var formData1 = new FormData();
      formData1.append('image',selectedFile);
      /* Xử lý ảnh */
      var data = {name, image: formData1}
    }
    else{
      var data = {name}
    }
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
      fileInputState: e.target.value
    })
  }
  // Khi nhấn nút submit ảnh
  handleSubmitFile = (e) => {

  };

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
    const {name, image, previewSource, fileInputState} = this.state;
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
                <div className="form-group">
									<label>Ảnh thương hiệu:</label>
                  {image ? <div className="form-group img-thumbnail3">
                  {
                    previewSource ? (
                      <img src={previewSource} className="w-100" alt=""/>
                    )
                    : <img src={image.public_url} style={{ border: '1px solid', width: '100%' }} alt=""/>
                  }
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="image" id="fileInput"
                    value={fileInputState}
                    onChange={this.handleFileInputChange} style={{width: '100%'}}/>
                  </div>
                </div>
                : <div className="form-group img-thumbnail3">
                  {
                    previewSource ? (
                      <img src={previewSource} className="w-100" alt=""/>
                    )
                    : <img src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png" alt="" style={{ border: '1px solid', width: '100%' }}></img>
                  }
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="image" id="fileInput" value={fileInputState}
                      onChange={this.handleFileInputChange} style={{width: '100%'}}/>
                  </div>
                </div>}
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
      dispatch(BrandActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(BrandActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
