import React, { Component } from 'react';
import {
  CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
} from '@coreui/react';
import { connect } from "react-redux";
import '../Products/product.css'
// @Actions
import AdActions from "../../redux/actions/ad";
// @Functions
import {INITIAL_IMAGE} from '../../constants';

class AdDetail extends Component {
  constructor(props){
    super(props);
    const {ad} = props;
    this.state = {
      id: ad ? ad._id : '',
      name: ad && ad.name ? ad.name : '',
      image: ad ? ad.image: '',
      content: ad && ad.content ? ad.content : '',
      link: ad && ad.link ? ad.link: '',
      startedAt: ad && ad.startedAt ? this.toIsoString(new Date(ad.startedAt)) : "",
      endedAt: ad && ad.endedAt ? this.toIsoString(new Date(ad.endedAt)) : "",
      previewSource: '',
      selectedFile: '',
    }
  }

  toIsoString = (date) => {
    var pad = function(num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };

    return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds())
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit = (e) =>{
    const {id, name, content, link, selectedFile, startedAt, endedAt} = this.state;
    const {onUpdate, onCreate} = this.props;
    // e.preventDefault();
    var formData = new FormData();
    formData.append("name",name);
    formData.append("content",content);
    formData.append("link",link);
    formData.append("startedAt",startedAt);
    formData.append("endedAt",endedAt);
    formData.append("image",selectedFile);
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
    const { name, image, previewSource, content, link, startedAt, endedAt } = this.state;
    const { large, onClose, color} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{color ? "Sửa thông tin quảng cáo" : "Thêm quảng cáo mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
                <label>Ảnh quảng cáo:</label>
                {image ? <div className="form-group img-thumbnail3" style={{"height":"300px"}}>
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
              : <div className="form-group img-thumbnail3" style={{"height":"300px"}}>
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
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label>Tên quảng cáo:</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label>Nội dung quảng cáo:</label>
              <input type="text" className="form-control" name="content" value={content} onChange={this.onChange}/>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form-group">
              <label>Link:</label>
              <input type="text" className="form-control" name="link" value={link} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label>Ngày bắt đầu:</label>
              <input type="datetime-local" className="form-control" name="startedAt" value={startedAt} onChange={this.onChange}></input>
            </div>
            <div className="form-group">
              <label>Ngày kết thúc</label>
              <input type="datetime-local" className="form-control" name="endedAt" value={endedAt} onChange={this.onChange}></input>
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
      dispatch(AdActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(AdActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdDetail);
