import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles.css'
//@Components
import OrderDetail from '../../containers/OrderDetail';

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
    const {authInfo, avatar, orderList, orderItem} = this.props;
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
                  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ngày tạo đơn</th>
      <th scope="col">Tình trạng</th>
      <th scope="col">Thành tiền</th>
      <th scope="col">Chi tiết</th>
    </tr>
  </thead>
  {orderList && <tbody>
    {orderList.map((item, index) => {
      return (
        <>
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.createdAt}</td>
          <td>{item.status !== false ? <span class="badge badge-success">Đã thanh toán</span>
          : <span class="badge badge-danger">Chưa giao hàng</span>}</td>
          <td>{item.total_price} VND</td>
          <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onClick={() => {this.getInfoOrder(item._id)}}>Chi tiết</button>
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
              <div class="col-md-2">
                <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              </div>
          </form>}
        </div>
        {orderItem ? <OrderDetail orderItem={orderItem}/> : <OrderDetail/>}
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


export default connect(mapStateToProps, mapDispatchToProps) (UserInfoPage);