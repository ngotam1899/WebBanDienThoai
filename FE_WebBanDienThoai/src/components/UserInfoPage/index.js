import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import {INITIAL_IMAGE} from '../../constants';
import './styles.css'
//@Components
import UserDetail from '../../containers/UserDetail';
import ChangePassword from '../../containers/ChangePassword';
//@Actions
import AddressActions from "../../redux/actions/address";

class UserInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewSource: '',
      selectedFile: '',
    }
  }

  componentDidMount(){
    const {onGetListCity} = this.props;
    onGetListCity();
    document.title = "[TellMe] Trang bán hàng";
  }

  componentWillUnmount(){
    const {onClearState} = this.props;
    onClearState();
  }

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    this.previewFile(file);
    this.setState({ 
      selectedFile: file,
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

  render() {
    const {authInfo, t, listCity} = this.props;
    const {previewSource, selectedFile} = this.state;
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile">
          {authInfo && listCity && <>
            <div className="row">
              <div className="col-md-3">
                <form onSubmit={this.handleSubmitFile} className="form">
                  {authInfo.image ? <div className="profile-img">
                    {
                      previewSource ? (
                        <img src={previewSource} alt=""/>
                      ) : <img src={authInfo.image.public_url} alt="" />
                    }
                      <div className="file btn btn-lg btn-primary">
                      {t('user.file.input')}
                        <input type="file" name="image" id="fileInput"
                        onChange={this.handleFileInputChange} />
                      </div>
                    </div>
                    : <div className="profile-img">
                    {
                      previewSource ? (
                        <img src={previewSource} alt=""/>
                      ) : <img src={INITIAL_IMAGE} alt="" />
                    }
                      <div className="file btn btn-lg btn-primary">
                      {t('user.file.input')}
                        <input type="file" name="image" id="fileInput"
                        onChange={this.handleFileInputChange} />
                      </div>
                    </div>
                  }
                  <div className="row justify-content-center">
                  </div>
                </form>
              </div>
              <div className="col-md-7">
                <div className="profile-head">
                  <h5>Hồ sơ của tôi</h5>
                </div>
                <UserDetail userInfo={authInfo} listCity={listCity} selectedFile={selectedFile}/>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#passwdModal">{t('user.change-password.button')}</button>
              </div>
            </div>
            <ChangePassword userInfo={authInfo}/>
          </>}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    listCity: state.address.city,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetListCity: () => {
      dispatch(AddressActions.onGetCity())
    },
    onClearState: () =>{
      dispatch(AddressActions.onClearState())
    }
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(UserInfoPage);