import React, { Component } from "react";
import "./product.css";
import { connect } from "react-redux";
// @Functions
import {INITIAL_IMAGE} from '../../constants';
import changeToSlug from "../../utils/ChangeToSlug";
import { toastError } from "../../utils/toastHelper";
// @ComponentS
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Images from "./Images";
import Group from "./Group";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// @Actions
import ProductsActions from "../../redux/actions/products";
import ColorActions from "../../redux/actions/color";
import CategoryActions from "../../redux/actions/categories";
import GroupActions from "../../redux/actions/group";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    const { product, listCategories, listBrands } = props;
    this.state = {
      // @Product Info
      id: product ? product._id : "",
      name: product ? product.name : "",
      pathseo: product ? product.pathseo : "",
      warrently: product ? product.warrently : "",
      category: product ? product.category._id : listCategories[0]._id,
      brand: product ? product.brand._id : listBrands[0]._id,
      bigimage: product ? product.bigimage : "",
      weight: product ? product.weight : 0,
      height: product ? product.height : 0,
      width: product ? product.width : 0,
      length: product ? product.length : 0,
      image: product ? (product.image ? product.image : []) : [],
      modal: false,
      // @Product Color
      colors: product ? product.colors : [],
      nameColor: "",
      amountColor: 0,
      priceColor: 0,
      colorEditing: "none",
      btnStatus: "Thêm màu",
      onEditing: false,
      indexColor: -1,
      imageID: 0,
      imageColor: INITIAL_IMAGE,
      previewColorImage: "",
      selectedColorImage: "",
      // @Product Group
      group: product ? product.group : null,
      keyword: "",
      _modal: false,
      // @Product Description
      description: product && product.description ? EditorState.createWithContent(convertFromRaw(JSON.parse(product.description))) : EditorState.createEmpty(),
      // @Product Image
      previewSource: "",
      selectedFile: "",
      // @Product list images
      previewList: [],
      selectedList: [],
      // @Product Specifition
      specifications: product
        ? this.setValue(
            product,
            listCategories[
              listCategories.findIndex((i) => i._id === product.category._id)
            ]
          )
        : this.setValue(product, listCategories[0]),
    };
  }

  setValue = (product, categoryDetail) => {
    var specifications = [];
    if (product) {
      //Trường hợp sửa
      if (product.specifications.length !== 0) {
        categoryDetail.specifications.map((item) => {
          specifications.push({
            _id: item,
            value: "",
          });
          product.specifications.map((i) => {
            specifications.map((obj) =>
              obj._id === i._id ? Object.assign(obj, { value: i.value }) : obj
            );
          });
        });
      } else {
        //mảng specification=[]
        categoryDetail.specifications.map((item) => {
          specifications.push({
            _id: item,
            value: "",
          });
        });
      }
    } else {
      //Trường hợp thêm
      categoryDetail.specifications.map((item) => {
        specifications.push({
          _id: item,
          value: "",
        });
      });
    }
    return specifications;
  };

  componentDidMount() {
    const { onGetListColor } = this.props;
    onGetListColor();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  deletePhoto = (id) => {
    const { image } = this.state;
    // Vị trí trong mảng có image cần xóa
    var deleteIndex = image.indexOf(image.find((img) => img._id === id));
    // Tạo mảng mới không có phần tử muốn xóa
    image.splice(deleteIndex, 1);
    this.setState({
      image,
    });
  };

  deletePreview = (item) => {
    const { previewList, selectedList } = this.state;
    // Vị trí trong mảng có image cần xóa
    var deleteIndex = previewList.indexOf(
      previewList.find((img) => img === item)
    );
    // Tạo mảng mới không có phần tử muốn xóa
    previewList.splice(deleteIndex, 1);
    selectedList.splice(deleteIndex, 1);
    this.setState({
      previewList, selectedList
    });
  };

  handleFileInputChange = (e) => {
    var {name} = e.target;
    const file = e.target.files[0];
    // 1. Hiển thị ảnh vừa thêm
    this.previewFile(file, name);
    if(name === "previewSource"){
      this.setState({
        selectedFile: file,
      });
    }
  };
  handleListInputChange = (e) => {
    const file = e.target.files[0];
    const { selectedList } = this.state;
    // 1. Hiển thị ảnh vừa thêm
    this.previewList(file);
    selectedList.push(file);
    this.setState({
      selectedList,
    });
  };

  // Hàm xử lý file - set hiển thị ảnh mới thêm vào state previewSource
  previewFile = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        [name]: reader.result,
      });
    };
  };
  // Hàm xử lý file - set hiển thị ảnh mới thêm vào state previewSource
  previewList = (file) => {
    const reader = new FileReader();
    const { previewList } = this.state;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      previewList.push(reader.result);
      this.setState({
        previewList,
      });
    };
  };

  onSelect = (event) => {
    var target = event.target;
    var name = target.name;
    var id = target.value;
    const { onGetDetailCategory } = this.props;
    this.setState({
      [name]: id,
    });
    onGetDetailCategory(id);
  };

  onChangeDetail = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState((prevState) => ({
      specifications: prevState.specifications.map((obj) =>
        obj._id === name ? Object.assign(obj, { value }) : obj
      ),
    }));
  };

  onAddColor = (value) => {
    if (value === "none") {
      this.setState({
        colorEditing: "inline-flex",
        btnStatus: "Hủy",
        onEditing: false,
      });
    } else {  //Click button Hủy
      this.setState({
        // Gán giá trị button
        colorEditing: "none",
        btnStatus: "Thêm màu",
        // Gán giá trị fields
        nameColor: "",
        amountColor: 0,
        priceColor: 0,
        onEditing: false,
        imageColor: INITIAL_IMAGE,
        // Trả preview về mặc định
        previewColorImage: "",
        selectedColor: "",
      });
    }
  };

  onEditColor = (item) => {
    const { colors } = this.state;
    this.setState({
      // Gán giá trị button
      colorEditing: "inline-flex",
      btnStatus: "Hủy",
      // Gán giá trị fields
      nameColor: item._id,
      amountColor: item.amount,
      priceColor: item.price,
      onEditing: true,
      imageID: item.image,
      imageColor: item.image_link ? item.image_link :  INITIAL_IMAGE,
      indexColor: colors.indexOf(item),
      // Trả preview về mặc định
      previewColorImage: "",
      selectedColor: "",
    });
  };

  onDeleteColor = (item) => {
    const { colors } = this.state;
    colors.splice(colors.indexOf(item), 1);
    this.setState({
      colors,
    });
  };

  onSaveColor() {
    const {nameColor,
      priceColor,
      amountColor,
      onEditing,
      indexColor,
      colors,
      imageID,
      imageColor,
      selectedColorImage,
      previewColorImage
    } = this.state;
    const { listColor } = this.props;
    if(!nameColor){
      toastError("Chọn màu trước khi lưu");
    }
    else{
      if (onEditing === false) {
        // TH thêm màu
        if (colors.find((obj) => obj._id === nameColor)) {
          toastError("Màu này đã tồn tại");
        } else {
          colors.push({
            _id: nameColor,
            name_vn: listColor.find((obj) => obj._id === nameColor).name_vn,
            amount: amountColor,
            price: priceColor,
            image: selectedColorImage,
            image_link: previewColorImage
          });
        }
      } else {
        // TH sửa màu
        for (let i = 0; i < colors.length; i++) {
          colors[indexColor] = {
            _id: nameColor,
            name_vn: listColor.find((obj) => obj._id === nameColor).name_vn,
            amount: amountColor,
            price: priceColor,
            image: selectedColorImage ? selectedColorImage : imageID,
            image_link: previewColorImage ? previewColorImage : imageColor
          };
        }
      }
    }
    this.setState({
      colors,
      // Gán giá trị button
      colorEditing: "none",
      btnStatus: "Thêm màu",
      // Gán giá trị fields
      nameColor: "",
      amountColor: 0,
      priceColor: 0,
      onEditing: false,
      imageColor: INITIAL_IMAGE,
    });
  }

  componentDidUpdate(props) {
    const { product, categoryDetail, listCategories } = this.props;
    if (categoryDetail !== props.categoryDetail && categoryDetail) {
      // categoryDetail thay doi
      if (product && categoryDetail._id === product.category._id) {
        // truong hop sua
        if (product.specifications.length > 0) {
          this.setState({
            specifications: this.setValue(
              product,
              listCategories[
                listCategories.findIndex((i) => i._id === product.category._id)
              ]
            ),
          });
        } else {
          this.setState({
            specifications: this.setValue(product, categoryDetail),
          });
        }
      } else {
        // truong hop them moi
        this.setState({
          specifications: this.setValue(product, categoryDetail),
        });
      }
    }
  }

  onSubmitImage = async () => {
    const { selectedFile, selectedList, id } = this.state;
    // @Condition cloudinary là FormData()
    // @Xử lý ảnh trước khi lưu
    // Nếu có import thumbnail mới thì
    if (selectedFile && selectedList.length !== 0) {
      var formData1 = new FormData();
      formData1.append("image", selectedFile);
      await this.setState({
        bigimage: formData1,
      });
      var formData2 = new FormData();
      for (var i = 0; i < selectedList.length; i++) {
        formData2.append("image", selectedList[i]);
      }
      this.onCallback(id, formData2);
    } else if (selectedFile) {
      // 1. Lưu cloudinary
      var formData1 = new FormData();
      formData1.append("image", selectedFile);
      await this.setState({
        bigimage: formData1,
      });
      this.onCallback(id);
    } else if (selectedList.length !== 0) {
      // 1. Lưu cloudinary
      // eslint-disable-next-line
      var formData2 = new FormData();
      for (i = 0; i < selectedList.length; i++) {
        formData2.append("image", selectedList[i]);
      }
      this.onCallback(id, formData2);
    } else {
      this.onCallback(id, null);
    }
  };

  onCallback = (id, formData) => {
    const { onCreate, onUpdateImage } = this.props;
    const {
      name,
      price,
      amount,
      warrently,
      category,
      brand,
      bigimage,
      weight,
      height,
      width,
      length,
      image,
      pathseo,
      specifications,
      colors,
      description,
      group
    } = this.state;
    if (id) {
      // eslint-disable-next-line
      var data = {
        name,
        price,
        amount,
        warrently,
        category,
        brand,
        bigimage,
        weight,
        height,
        width,
        length,
        image,
        pathseo,
        specifications,
        colors,
        group: group && group._id ? group._id : group,
        description: JSON.stringify(
          convertToRaw(description.getCurrentContent())
        )
      };
      onUpdateImage(id, data, formData);
    } else {
      // 4. Create data
      // eslint-disable-next-line
      var data = {
        name,
        price,
        amount,
        warrently,
        category,
        brand,
        bigimage,
        weight,
        height,
        width,
        length,
        pathseo,
        image,
        specifications,
        colors,
        group: group && group._id ? group._id : group,
        description: JSON.stringify(
          convertToRaw(description.getCurrentContent())
        )
      };
      onCreate(data, formData);
    }
  };

  setSpecification = (specification) => {
    const { listSpecification } = this.props;
    const specificationName = listSpecification.find(
      (obj) => obj._id === specification
    );
    return specificationName.name;
  };

  onCloseModal = (name, value) =>{
    this.setState({
      [name] : value
    })
  }

  onEditGroup = () =>{
    const {onGetDetailGroup} = this.props;
    const {group} = this.state;
    onGetDetailGroup(group._id)
    this.onCloseModal("_modal", true)
  }

  setImage = (item) =>{
    this.setState({
      previewColorImage: item.public_url,
      selectedColorImage: item._id,
      modal: false
    })
  }

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 034eb58605b7a76');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  handleFilter = (event) => {
    const { keyword } = this.state;
    const { onFilter } = this.props;
		var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
    onFilter(keyword);
	}

  render() {
    const {
      name,
      pathseo,
      warrently,
      category,
      brand,
      bigimage,
      weight,
      height,
      width,
      length,
      image,
      modal,
      previewSource,
      previewList,
      specifications,
      colors,
      nameColor,
      priceColor,
      amountColor,
      colorEditing,
      btnStatus,
      imageColor,
      previewColorImage,
      group,
      _modal,
      keyword,
      description
    } = this.state;
    const {
      large,
      onClose,
      listCategories,
      listBrands,
      listColor,
      product,
      listSearch,
      groupDetail
    } = this.props;
    return (
      <CModal show={large} onClose={() => onClose(!large)} size="lg" closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <CModalTitle>
            {product ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-12 col-lg-6">
              <form>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Tên sản phẩm:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Slug:</label>
                      {name ? (
                        <input
                          type="text"
                          className="form-control"
                          name="pathseo"
                          value={pathseo ? pathseo : changeToSlug(name)}
                          onChange={this.onChange}
                        />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          name="pathseo"
                          value={pathseo}
                          onChange={this.onChange}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                  {bigimage ? (
                  <div className="form-group img-thumbnail3">
                    {previewSource ? (
                      <img src={previewSource} className="border rounded w-100" alt="" />
                    ) : (
                      <img
                        src={bigimage.public_url}
                        className="border rounded w-100"
                        alt=""
                      />
                    )}
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input
                        type="file"
                        name="previewSource"
                        onChange={this.handleFileInputChange}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form-group img-thumbnail3">
                    {previewSource ? (
                      <img src={previewSource} className="border rounded w-100" alt="" />
                    ) : (
                      <img
                        src={INITIAL_IMAGE}
                        alt=""
                        className="border rounded w-100"
                      ></img>
                    )}
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input
                        type="file"
                        name="previewSource"
                        onChange={this.handleFileInputChange}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                )}
                </div>
                </div>
                <div className="form-group">
                  <label>Thời hạn bảo hành:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="warrently"
                    value={warrently}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Loại sản phẩm:</label>
                  <select
                    className="form-control"
                    required="required"
                    name="category"
                    value={category}
                    onChange={this.onSelect}
                  >
                    {listCategories.map((category, index) => {
                      return (
                        <option key={index} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Tên thương hiệu:</label>
                  <select
                    className="form-control"
                    required="required"
                    name="brand"
                    value={brand}
                    onChange={this.onChange}
                  >
                    {listBrands.map((brand, index) => {
                      return (
                        <option key={index} value={brand._id}>
                          {brand.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="row">
                <div className="col-12">
                <label className="float-left">Danh sách màu:</label>
                <div className="float-right">
                <button
                  className="btn btn-success mr-2"
                  style={{ display: colorEditing }}
                  onClick={() => this.onSaveColor()}
                  type="button"
                >
                  Lưu
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.onAddColor(colorEditing)}
                >
                  {btnStatus}
                </button>
                </div>
                </div>
              </div>

              <div
                className="row"
                style={{ display: colorEditing }}
              >
                <div className="col-5">
                  <div className="img-thumbnail2">
                    {previewColorImage
                      ? <img src={previewColorImage}
                        className="border rounded w-100"
                        alt=""></img>
                      : <img
                        src={imageColor}
                        className="border rounded w-100"
                        alt=""
                      ></img>
                    }
                    <div className="btn btn-lg btn-primary img-des">
                      Choose Photo
                      <input
                        type="button"
                        name="previewColorImage"
                        className="w-100 h-100"
                        onClick={() => this.onCloseModal("modal", true)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-7">
                  <select
                    className="form-control my-1"
                    required="required"
                    name="nameColor"
                    value={nameColor}
                    onChange={this.onChange}
                  >
                    <option value={-1}>Chọn màu</option>
                    {listColor && listColor.map((color, index) => {
                      return (
                        <option key={index} value={color._id}>
                          {color.name_vn}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="form-control my-1"
                    placeholder="Nhập giá sản phẩm"
                    type="number"
                    name="priceColor"
                    value={priceColor}
                    onChange={this.onChange}
                    min="0"
                  ></input>
                  <input
                    className="form-control my-1"
                    placeholder="Nhập số lượng"
                    type="number"
                    name="amountColor"
                    value={amountColor}
                    onChange={this.onChange}
                    min="0"
                  ></input>
                </div>
              </div>

              {colors.map((item, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-3">
                      <img
                        src={item.image_link ? item.image_link: INITIAL_IMAGE}
                        alt={item.name_vn}
                        className="border rounded w-100"
                      />
                    </div>
                    <div className="col-5">
                      <p className="font-weight-bold my-0">
                        {item.name_vn}
                      </p>
                      <p className="font-italic my-0">
                        {item.price} VND
                      </p>
                      <p className="my-0">
                        Số lượng {item.amount}
                      </p>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-warning d-inline-block float-right m-1"
                        type="button"
                        onClick={() => this.onEditColor(item)}
                      >
                        <i className="fa fa-highlighter"></i>
                      </button>
                      <button
                        className="btn btn-danger d-inline-block float-right m-1"
                        type="button"
                        onClick={() => this.onDeleteColor(item)}
                      >
                        <i className="fa fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
                <div className="form-group mt-1">
                  <div className="row">
                    {image &&
                      image.map((item, index) => {
                        return (
                          <div className="col-3" key={index}>
                            <div className=" img-thumbnail2">
                              <img
                                src={item.public_url}
                                className="border rounded w-100"
                                alt=""
                              ></img>
                              <div className="btn btn-lg btn-primary img-des">
                                Delete Photo
                                <input
                                  type="button"
                                  name="image"
                                  className="w-100 h-100"
                                  onClick={() => this.deletePhoto(item._id)}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {previewList[0] && (
                      <>
                        {previewList.map((item, index) => {
                          return (
                            <div className="col-3" key={index}>
                              <div className="img-thumbnail2">
                                <img src={item} alt="" className="border rounded w-100" />
                                <div className="btn btn-lg btn-primary img-des">
                                  Delete Photo
                                  <input
                                    type="button"
                                    name="image"
                                    className="w-100 h-100"
                                    onClick={() => this.deletePreview(item)}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                    <div className="col-3">
                      <div className=" img-thumbnail2">
                        <img
                          src={INITIAL_IMAGE}
                          alt=""
                          className="border rounded w-100"
                        ></img>
                        <div className="btn btn-lg btn-primary img-des">
                          Add Photo
                          <input
                            type="file"
                            onChange={this.handleListInputChange}
                            className="w-100 h-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="form-group">
                <label className="float-left">Nhóm sản phẩm liên quan:</label>
                <div className="float-right">
                  <button type="button" className="btn btn-primary" onClick={()=> this.onCloseModal("_modal", true)}>Thêm nhóm</button>
                </div>
                <input className="form-control" name="keyword" value={keyword} onChange={this.handleFilter} placeholder="Tìm nhóm có sẵn"></input>
                  <div className="card mb-0">
                    {listSearch && keyword && listSearch.map((group, index) =>{
                      return (
                        <div key={index}>
                          <div className="row">
                            <div className="col-12" onClick={()=>this.setState({group})}>
                              <p className="my-1 mx-2">{group.name}</p>
                            </div>
                          </div>
                          <div className="border-bottom"></div>
                        </div>
                      )
                    })}
                  </div>
                {group && <div className="input-group">
                  <input
                    disabled
                    type="string"
                    className="form-control"
                    name="group"
                    value={group.name}
                    onChange={this.onChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-warning" type="button" onClick={this.onEditGroup}>Sửa</button>
                  </div>
                </div>}
              </div>
              <div className="card text-white mb-3">
                <div className="card-header bg-primary">
                  Thông tin vận chuyển
                </div>
                <div className="card-body text-dark">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label>Khối lượng: (gram)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="weight"
                          value={weight}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Chiều cao: (cm)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="height"
                          value={height}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Chiều rộng: (cm)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="width"
                          value={width}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>Chiều dài: (cm)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="length"
                          value={length}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">

              <div className="card text-white mb-3">
                <div className="card-header bg-primary">
                  Chi tiết sản phẩm
                </div>
                <div className="card-body text-dark">
                  {specifications.map((item, index) => {
                    return (
                      <div className="form-group" key={index} className="my-1">
                        <label key={index + 1} className="my-0">
                          {this.setSpecification(item._id)}
                        </label>
                        <input
                          key={item._id}
                          type="text"
                          className="form-control"
                          name={item._id}
                          defaultValue={item.value}
                          onChange={this.onChangeDetail}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-12">
              <Editor
                editorState={description}
                wrapperClassName="desc-wrapper"
                editorClassName="desc-editor"
                onEditorStateChange={(description) => this.setState({description})}
                toolbar={{
                  image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
              />
            </div>
          </div>
          {modal && image && <Images modal={modal} onCloseModal={this.onCloseModal} image={image} setImage={this.setImage}/>}
          {_modal && groupDetail && <Group modal={_modal} onCloseModal={this.onCloseModal} group={groupDetail}/>}
          {_modal && !groupDetail && <Group modal={_modal} onCloseModal={this.onCloseModal}/>}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => this.onSubmitImage(!large)}>
            Lưu
          </CButton>{" "}
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
    productDetail: state.products.detail,
    listColor: state.color.list,
    categoryDetail: state.categories.detail,
    listSearch: state.group.listSearch,
    groupDetail: state.group.detail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (params, formData) => {
      dispatch(ProductsActions.onCreate({ params, formData }));
    },
    onUpdateImage: (id, params, formData) => {
      dispatch(ProductsActions.onUpdateImage({ id, params, formData }));
    },
    onGetListColor: () => {
      dispatch(ColorActions.onGetList());
    },
    onGetDetailCategory: (id) => {
      dispatch(CategoryActions.onGetDetail(id))
    },
    onFilter : (keyword) =>{
      dispatch(GroupActions.onFilter(keyword))
    },
    onGetDetailGroup: (id) => {
      dispatch(GroupActions.onGetDetail(id))
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
