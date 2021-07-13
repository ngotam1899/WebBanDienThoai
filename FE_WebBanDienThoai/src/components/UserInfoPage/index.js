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
              <div className="col-md-4 text-center">
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
                <button type="button" className="btn mx-5 my-2 shadow-sm" style={{width: "-webkit-fill-available", backgroundColor: "#E9F3FF"}} data-bs-toggle="modal" data-bs-target="#passwdModal">
                  <div className="row">
                    <div className="col-3">
                      <i className="fa fa-unlock-alt rounded-circle bg-primary p-2 text-white h-36-px w-auto"></i>
                    </div>
                    <div className="col-9 align-self-center h-100 text-left" style={{fontWeight: 500}}>
                      {t('user.change-password.button')}
                    </div>
                  </div>
                </button>
             
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-12 my-2">
                    <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
                    <i className="fa fa-chevron-right px-2 w-25-px"></i>
                  </div>
                  <div className="col-12">
                    <h1 className="font-weight-bold">{t('user.page.title')}</h1>
                  </div>
                </div>
                <UserDetail userInfo={authInfo} listCity={listCity} selectedFile={selectedFile}/>
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