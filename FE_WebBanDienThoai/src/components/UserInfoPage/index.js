import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import './styles.css'
//@Components
import OrderDetail from '../../containers/OrderDetail';
import UserDetail from '../../containers/UserDetail';
import ChangePassword from '../../containers/ChangePassword';
//@Actions
import UsersActions from '../../redux/actions/user'
import OrdersActions from '../../redux/actions/order'


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
      const formData = new FormData();
      formData.append('image',selectedFile);
      onUpdateUserImage(authInfo._id, formData);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        //setErrMsg('something went wrong!');
    };
  };
  getInfoOrder = (id) => {
    const {onGetDetail} = this.props;
    onGetDetail(id);
  }

  render() {
    const {authInfo, avatar, orderList, orderItem, t} = this.props;
    const {previewSource, fileInputState} = this.state;
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile">
          {authInfo && <>
            <div className="row">
              <div className="col-md-4">
                <form onSubmit={this.handleSubmitFile} className="form">
                  {avatar ? <div className="profile-img">
                    {
                      previewSource ? (
                        <img src={previewSource} alt=""/>
                      ) : <img src={avatar} alt="" />
                    }
                      <div className="file btn btn-lg btn-primary">
                      {t('user.file.input')}
                        <input type="file" name="image" id="fileInput"
                        value={fileInputState}
                        onChange={this.handleFileInputChange} />
                      </div>
                    </div>
                    : <div className="profile-img">
                    {
                      previewSource ? (
                        <img src={previewSource} alt=""/>
                      ) : <img src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png" alt="" />
                    }
                      <div className="file btn btn-lg btn-primary">
                      {t('user.file.input')}
                        <input type="file" name="image" id="fileInput"
                        value={fileInputState}
                        onChange={this.handleFileInputChange} />
                      </div>
                    </div>
                  }
                  <div className="row justify-content-center">
                  <button className="btn mt-2" type="submit" onClick={this.handleSubmitFile}>
                  {t('user.file-save.button')}
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{authInfo.firstname} {authInfo.lastname}</h5>
                  <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{t('user.info.menu')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{t('user.history.menu')}</a>
                    </li>
                  </ul>
                </div>
                <div className="col">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-3">
                        <label>{t('checkout.address.input')}</label>
                      </div>
                      <div className="col-md-9">
                        <p>{authInfo.address}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label>{t('checkout.firstname.input')}</label>
                      </div>
                      <div className="col-md-9">
                        <p>{authInfo.firstname}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label>{t('checkout.lastname.input')}</label>
                      </div>
                      <div className="col-md-9">
                        <p>{authInfo.lastname}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label>Email</label>
                      </div>
                      <div className="col-md-9">
                        <p>{authInfo.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label>{t('checkout.phone.input')}</label>
                      </div>
                      <div className="col-md-9">
                        <p>{authInfo.phonenumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">{t('user.date.input')}</th>
                        <th scope="col">{t('user.status.input')}</th>
                        <th scope="col">{t('cart.total.table')}</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    {orderList && <tbody>
                      {orderList.map((item, index) => {
                        return (
                          <>
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{item.createdAt}</td>
                            <td>{item.status !== false ? <span className="badge badge-success">{t('user.status.true')}</span>
                            : <span className="badge badge-danger">{t('user.status.false')}</span>}</td>
                            <td>{item.total_price} VND</td>
                            <td><button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal" onClick={() => {this.getInfoOrder(item._id)}}>Chi tiết</button>
                            </td>
                          </tr>
                          </>
                        )
                      })}
                    </tbody>}
                    </table>

  
                  </div>
                </div>
              </div>
            
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-info mr-1 mr-md-0 mb-0 mb-md-1" data-toggle="modal" data-target="#infoModal">{t('user.edit-profile.button')}</button>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#passwdModal">{t('user.change-password.button')}</button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              </div>
          </>}
        </div>
        {orderItem ? <OrderDetail orderItem={orderItem}/> : <OrderDetail/>}
        {authInfo && <UserDetail userInfo={authInfo}/>}
        <ChangePassword/>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    avatar: state.user.avatar,
    orderList: state.order.list,
    orderItem: state.order.detail,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onUpdateUserImage : (id, data) =>{
			dispatch(UsersActions.onUpdateUserImage({id, data}))
    },
    onGetHistoryOrder : (id) =>{
			dispatch(OrdersActions.onGetHistoryOrder(id))
    },
    onGetDetail : (id) =>{
			dispatch(OrdersActions.onGetDetail(id))
    },
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(UserInfoPage);