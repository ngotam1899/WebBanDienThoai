import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = {
      id: product ? product._id : '',
      name: product ? product.name : '',
      price: product ? product.price : null,
      amount: product ? product.amount : null,
      warrently: product ? product.warrently : null,
      category: product ? product.category : null,
      brand: product ? product.brand : null,
      bigimage: product ? product.bigimage : null,
      image: product ? product.image : [],
      mobile: product ? product.detail_info.mobile : {
        display: "",
        revolution: "",
        widescreen: "",
        operation: "",
        camera1: "",
        camera2: "",
        cpu: "",
        ram: "",
        memory:  "",
        microcard: "",
        sim: "",
        network: "",
        pin: "",
        quickcharging: "",
        weight: "",
        thick: "",
        color: ""
      }
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
  }
  onChangeMobile = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      mobile: {
        [name]: value
      }
    })
  }

  onSubmit = (data, _id) => {
    const { onSubmit, product } = this.props;
    const { id, name, price, amount, warrently, category, brand, bigimage, image, mobile } = this.state;
    console.log("description", mobile);
    _id = id;
    if (_id) {
      data = { name, price, amount, warrently, category, brand, bigimage, image, detail_info: { mobile: product.detail_info.mobile._id } }
      onSubmit(data, _id);
    }
    else {
      data = { name, price, amount, warrently, category, brand, bigimage, image, detail_info: { mobile: null } }
      onSubmit(data);
    }
  }

  render() {
    const { name, price, amount, warrently, category, brand, bigimage, image, mobile } = this.state;
    const { large, onClose, setImage, listCategories, listBrands, product } = this.props;
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
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label>Giá bán lẻ (VND):</label>
                  <input type="number" className="form-control" name="price" value={price} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label>Số lượng (chiếc):</label>
                  <input type="number" className="form-control" name="amount" value={amount} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label>Thời hạn bảo hành:</label>
                  <input type="number" className="form-control" name="warrently" value={warrently} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label>Loại sản phẩm:</label>
                  <select className="form-control" required="required" name="category"
                    value={category}
                    onChange={this.onChange}>
                    {listCategories.map((category, index) => {
                      return (
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
                    {listBrands.map((brand, index) => {
                      return (
                        <option key={index} value={brand._id}>{brand.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <img src={setImage(bigimage)} style={{ border: '1px solid', width: '100%' }}></img>
                  <input type="file" className="form-control" name="image" />
                </div>
                <div className="form-group">
                  <div className="row">
                    {image && image.map((item, index) => {
                      return (
                        <div className="col-4" key={index}>
                          <img src={setImage(item)} className="w-100" style={{ border: '1px solid' }}></img>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6">
              <div class="card text-white mb-3" >
                <div class="card-header bg-primary">Chi tiết sản phẩm</div>
                <div class="card-body text-dark">
                {mobile &&
                <> <div className="form-group">
                    <label>Display:</label>
                    <input type="text" className="form-control" name="display" value={mobile.display} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Revolution:</label>
                    <input type="text" className="form-control" name="revolution" value={mobile.revolution} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Wide screen:</label>
                    <input type="text" className="form-control" name="widescreen" value={mobile.widescreen} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Operation:</label>
                    <input type="text" className="form-control" name="operation" value={mobile.operation} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Camera trước:</label>
                    <input type="text" className="form-control" name="camera1" value={mobile.camera1} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Camera sau:</label>
                    <input type="text" className="form-control" name="camera2" value={mobile.camera2} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>CPU:</label>
                    <input type="text" className="form-control" name="cpu" value={mobile.cpu} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>RAM:</label>
                    <input type="text" className="form-control" name="ram" value={mobile.ram} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Memory:</label>
                    <input type="text" className="form-control" name="memory" value={mobile.memory} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Microcard:</label>
                    <input type="text" className="form-control" name="microcard" value={mobile.microcard} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>SIM:</label>
                    <input type="text" className="form-control" name="sim" value={mobile.sim} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Network:</label>
                    <input type="text" className="form-control" name="network" value={mobile.network} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Battery:</label>
                    <input type="text" className="form-control" name="pin" value={mobile.pin} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Quick charging:</label>
                    <input type="text" className="form-control" name="quickcharging" value={mobile.quickcharging} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Weight:</label>
                    <input type="text" className="form-control" name="weight" value={mobile.weight} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Thick:</label>
                    <input type="text" className="form-control" name="thick" value={mobile.thick} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Color:</label>
                    <input type="text" className="form-control" name="color" value={mobile.color} onChange={this.onChangeMobile}/>
                  </div> </>}
                </div>
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
			</CModal >
		);
  }
}

export default ProductDetail;
