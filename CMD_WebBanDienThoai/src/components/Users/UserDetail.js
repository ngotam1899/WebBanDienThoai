import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

class UserDetail extends Component {
  constructor(props){
    super(props);
    const {user} = props;
    this.state = {
      id: user ? user._id : '',
      firstname: user ? user.firstname : '',
      lastname: user ? user.lastname : '',
      phonenumber: user ? user.phonenumber : '',
      address: user ? user.address : '',
      email: user ? user.email : '',
      image: user ? user.image : '',
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

	render() {
    const {name, price, amount, warrently, category, brand, bigimage, image} = this.state;
    const { large, onClose, setImage, listCategories, listBrands, product} = this.props;
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
									<label>Tên sản phẩm:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
								</div>
								<div className="form-group">
									<label>Giá bán lẻ (VND):</label>
                  <input type="number" className="form-control" name="price" value={price} onChange={this.onChange}/>
								</div>
                <div className="form-group">
									<label>Số lượng (chiếc):</label>
                  <input type="number" className="form-control" name="amount" value={amount} onChange={this.onChange}/>
								</div>
                <div className="form-group">
									<label>Thời hạn bảo hành:</label>
                  <input type="number" className="form-control" name="warrently" value={warrently} onChange={this.onChange}/>
								</div>
                <div className="form-group">
									<label>Loại sản phẩm:</label>
                  <select className="form-control" required="required" name="category"
                        value={category}
                        onChange={this.onChange}>
                    {listCategories.map((category, index) =>{
                      return(
                        <option key={index} value={category._id}>{category.name}</option>
                      )
                    })}
                  </select>
								</div>
                <div className="form-group">
									<label>Tên thương hiệu:</label>
                  <select className="form-control" required="required" name="brand"
                        value={brand}
                        onChange={this.onChange}>
                    {listBrands.map((brand, index) =>{
                      return(
                        <option key={index} value={brand._id}>{brand.name}</option>
                      )
                    })}
                  </select>
								</div>
							</form>
						</div>
            <div className="col-12 col-lg-6">
							<form>
								<div className="form-group">
                  <img src={setImage(bigimage)} style={{border: '1px solid'}} alt=""></img>
                  <input type="file" className="form-control" name="image"/>
								</div>
                <div className="form-group">
                  <div className="row">
                  {image && image.map((item, index) => {
                    return (
                      <div className="col-4" key={index}>
                      <img src={setImage(item)} className="w-100" style={{border: '1px solid'}} alt=""></img>
                      </div>
                    )
                  })}
                  </div>
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

export default UserDetail;
