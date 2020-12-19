import React, { Component } from 'react';
import './product.css'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = {
      // @Product Info
      id: product ? product._id : '',
      name: product ? product.name : '',
      price: product ? product.price : null,
      amount: product ? product.amount : null,
      warrently: product ? product.warrently : null,
      category: product ? product.category : null,
      brand: product ? product.brand : null,
      bigimage: product ? product.bigimage : null,
      image: product ? product.image : [],
      // @Product Image
      previewSource: '',
      selectedFile: '',
      fileInputState: '',
      // @Product list images
      previewList: [],
      selectedList: [],
      fileInputList: [],
      // @Product Details
      mobileDes: product ? product.detail_info.mobile : {
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

  deletePhoto = (id) =>{
    const {image} = this.state;
    // Vị trí trong mảng có image cần xóa
    var deleteIndex = image.indexOf(image.find( img => img._id === id ))
    // Tạo mảng mới không có phần tử muốn xóa
    image.splice(deleteIndex, 1);
    this.setState({
      image,
    })
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

  handleListInputChange = (e) =>{
    const file = e.target.files[0];
    const {selectedList, fileInputList} = this.state;
    // 1. Hiển thị ảnh vừa thêm
    this.previewList(file);
    selectedList.push(file);
    fileInputList.push(e.target.value)
    this.setState({
      selectedList,
      fileInputList
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

  // Hàm xử lý file - set hiển thị ảnh mới thêm vào state previewSource
  previewList = (file) => {
    const reader = new FileReader();
    const {previewList} = this.state;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      previewList.push(reader.result)
      this.setState({
        previewList,
      });
    };
  };

  onChangeMobile = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    //1. Tạo 1 copy của state mobile cũ
    this.setState(prevState => ({
      mobileDes: {                   // object that we want to update
        ...prevState.mobile,    // keep all other key-value pairs
        [name]: value       // update the value of specific key
      }
    }))
  }


  onSubmit = (data, _id) => {
    const { onSubmit, product } = this.props;
    const { selectedFile, selectedList, id, name, price, amount, warrently, category, brand, bigimage, image, mobileDes } = this.state;
    console.log("listimage", image)
    // @Xử lý ảnh trước khi lưu
    // phải có đoạn check có tồn tại selectedFile hay không
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    // mã hóa ảnh thành FormData
    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('image',selectedFile);
      // @Xử lý các thông tin khác
      _id = id;
      if (_id) {
        data = { name, price, amount, warrently, category, brand, bigimage: formData ? formData : bigimage, image, detail_info:
          { mobile: {
              _id: product.detail_info.mobile._id,
              ...mobileDes,
            }
          } }
        onSubmit(data, _id);
      }
      else {
        data = { name, price, amount, warrently, category, brand, bigimage, image, detail_info: mobileDes }
        onSubmit(data);
      }
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };

  }

  render() {
    const { name, price, amount, warrently, category, brand, bigimage, image, mobileDes, previewSource, fileInputState, previewList, fileInputList } = this.state;
    const { large, onClose,  listCategories, listBrands, product } = this.props;
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
                {bigimage ? <div className="form-group img-thumbnail3">
                  {
                    previewSource ? (
                      <img src={previewSource} alt=""/>
                    )
                    : <img src={bigimage.public_url} style={{ border: '1px solid', width: '100%' }} alt=""/>
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
                      <img src={previewSource} alt=""/>
                    )
                    : <img src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png" alt="" style={{ border: '1px solid', width: '100%' }}></img>
                  }
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="image" id="fileInput" value={fileInputState}
                      onChange={this.handleFileInputChange} style={{width: '100%'}}/>
                  </div>
                </div>}
                <div className="form-group">
                  <div className="row">
                    {image && image.map((item, index) => {
                      return (
                        <div className="col-3" key={index}>
                          <div className=" img-thumbnail2">
                            <img src={item.public_url} className="w-100" style={{ border: '1px solid' }} alt=""></img>
                            <div className="btn btn-lg btn-primary img-des">
                              Delete Photo
                              <input type="button" name="image" className="w-100 h-100" onClick={() => this.deletePhoto(item._id)}/>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {previewList[0] && <>
                      {previewList.map((item, index)=>{
                        return (
                          <div className="col-3" key={index}>
                            <div className="img-thumbnail2">
                              <img src={item} alt="" className="w-100"/>
                              <div className="btn btn-lg btn-primary img-des">
                                Change Photo
                                <input type="file" name="image" id="fileInput"
                                value="" />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </>}
                    <div className="col-3">
                      <div className=" img-thumbnail2">
                        <img src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png" alt="" className="w-100" style={{ border: '1px solid' }}></img>
                        <div className="btn btn-lg btn-primary img-des">
                          Add Photo
                          <input type="file" onChange={this.handleListInputChange} className="w-100 h-100"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6">
              <div class="card text-white mb-3" >
                <div class="card-header bg-primary">Chi tiết sản phẩm</div>
                <div class="card-body text-dark">
                {mobileDes &&
                <> <div className="form-group">
                    <label>Display:</label>
                    <input type="text" className="form-control" name="display" value={mobileDes.display} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Revolution:</label>
                    <input type="text" className="form-control" name="revolution" value={mobileDes.revolution} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Wide screen:</label>
                    <input type="text" className="form-control" name="widescreen" value={mobileDes.widescreen} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Operation:</label>
                    <input type="text" className="form-control" name="operation" value={mobileDes.operation} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Camera trước:</label>
                    <input type="text" className="form-control" name="camera1" value={mobileDes.camera1} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Camera sau:</label>
                    <input type="text" className="form-control" name="camera2" value={mobileDes.camera2} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>CPU:</label>
                    <input type="text" className="form-control" name="cpu" value={mobileDes.cpu} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>RAM:</label>
                    <input type="text" className="form-control" name="ram" value={mobileDes.ram} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Memory:</label>
                    <input type="text" className="form-control" name="memory" value={mobileDes.memory} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Microcard:</label>
                    <input type="text" className="form-control" name="microcard" value={mobileDes.microcard} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>SIM:</label>
                    <input type="text" className="form-control" name="sim" value={mobileDes.sim} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Network:</label>
                    <input type="text" className="form-control" name="network" value={mobileDes.network} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Battery:</label>
                    <input type="text" className="form-control" name="pin" value={mobileDes.pin} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Quick charging:</label>
                    <input type="text" className="form-control" name="quickcharging" value={mobileDes.quickcharging} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Weight:</label>
                    <input type="text" className="form-control" name="weight" value={mobileDes.weight} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Thick:</label>
                    <input type="text" className="form-control" name="thick" value={mobileDes.thick} onChange={this.onChangeMobile}/>
                  </div>
                  <div className="form-group">
                    <label>Color:</label>
                    <input type="text" className="form-control" name="color" value={mobileDes.color} onChange={this.onChangeMobile}/>
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
