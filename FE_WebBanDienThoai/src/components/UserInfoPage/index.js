import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles.css'
//dispatch action
import UsersActions from '../../redux/actions/user'

class UserInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewSource: '',
      selectedFile: '',
      fileInputState: ''
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
  // Hàm xử lý file - set hiển thị ảnh mới thêm vào state previewSource
  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ 
        previewSource: reader.result
      })
    };
  };

  // Khi nhấn nút submit ảnh
  handleSubmitFile = (e) => {
    e.preventDefault();
    const {selectedFile} = this.state;
    const {onUpdateUserImage, authInfo} = this.props;
    // phải có đoạn check có tồn tại selectedFile hay không
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    // mã hóa ảnh thành base64EncodedImage
    reader.onloadend = () => {
      console.log(selectedFile)
      console.log(authInfo._id)
      const formData = new FormData();
      formData.append('image',selectedFile);
      onUpdateUserImage(authInfo._id, formData);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        //setErrMsg('something went wrong!');
    };
  };

  render() {
    const {authInfo, avatar} = this.props;
    const {previewSource, fileInputState} = this.state;
    return (
      <div class="bg-user-info py-4">
        <div class="container emp-profile">
          {authInfo && <form method="post">
            <div class="row">
              <div class="col-md-4">
              <form onSubmit={this.handleSubmitFile} className="form">
                {avatar ? <div class="profile-img">
                  {
                    previewSource ? (
                      <img src={previewSource} alt=""/>
                    ) : <img src={avatar} alt="" />
                  }
                    <div class="file btn btn-lg btn-primary">
                      Change Photo
                      <input type="file" name="image" id="fileInput"
                      value={fileInputState}
                      onChange={this.handleFileInputChange} />
                    </div>
                  </div>
                  : <div class="profile-img">
                  {
                    previewSource ? (
                      <img src={previewSource} alt=""/>
                    ) : <img src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png" alt="" />
                  }
                    <div class="file btn btn-lg btn-primary">
                      Change Photo
                      <input type="file" name="image" id="fileInput"
                      value={fileInputState}
                      onChange={this.handleFileInputChange} />
                    </div>
                  </div>
                }
                <div className="row justify-content-center">
                <button className="btn mt-2" type="submit" onClick={this.handleSubmitFile}>
                    Lưu ảnh
                  </button>
                </div>
              </form>
              </div>

              <div class="col-md-6">
                <div class="profile-head">
                  <h5>{authInfo.firstname} {authInfo.lastname}</h5>
                  <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                    </li>
                  </ul>
                </div>
                <div class="col">
                <div class="tab-content profile-tab" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="row">
                      <div class="col-md-3">
                        <label>Address</label>
                      </div>
                      <div class="col-md-9">
                        <p>{authInfo.address}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>First name</label>
                      </div>
                      <div class="col-md-9">
                        <p>{authInfo.firstname}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>Last name</label>
                      </div>
                      <div class="col-md-9">
                        <p>{authInfo.lastname}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>Email</label>
                      </div>
                      <div class="col-md-9">
                        <p>{authInfo.email}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>Phone</label>
                      </div>
                      <div class="col-md-9">
                        <p>{authInfo.phonenumber}</p>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="row">
                      <div class="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div class="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div class="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div class="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div class="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div class="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <label>Your Bio</label><br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              </div>
              <div class="col-md-2">
                <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              </div>
          </form>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    avatar: state.user.avatar
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onUpdateUserImage : (id, data) =>{
			dispatch(UsersActions.onUpdateUserImage({id, data}))
    },
	}
};


export default connect(mapStateToProps, mapDispatchToProps) (UserInfoPage);