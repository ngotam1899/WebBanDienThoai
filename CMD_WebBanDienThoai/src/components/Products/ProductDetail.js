import React, { Component } from "react";
import "./product.css";
import { connect } from "react-redux";
// @Functions
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
// @Actions
import ProductsActions from "../../redux/actions/products";
import OperationActions from "../../redux/actions/operations";
import ColorActions from "../../redux/actions/color";
import CategoryActions from "../../redux/actions/categories";

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
      image: product ? product.image : [],
      // @Product Color
      colorList: product ? product.colors : [],
      nameColor: "",
      amountColor: 0,
      priceColor: 0,
      colorEditing: "none",
      btnStatus: "Thêm màu",
      onEditing: false,
      indexColor: -1,
      imageColor:
        "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png",
      previewColorImage: "",
      selectedColor: "",
      colorInputState: "",
      // @Product Image
      previewSource: "",
      selectedFile: "",
      fileInputState: "",
      // @Product list images
      previewList: [],
      selectedList: [],
      fileInputList: [],
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
      /*
      specifications = ["gsdvfjhsdsfd","153dsfsdfds","153dsfsdfds"]
      ->
      specifications = [
        {
          _id: "gsdvfjhsdsfd",
          value: ""
        },
        {
          _id: "153dsfsdfds",
          value: ""
        },
        {
          _id: "153dsfsdfds",
          value: ""
        },
      ]
      */
    }
    return specifications;
  };

  componentWillMount() {
    const { onGetListOperation, onGetListColor } = this.props;
    onGetListOperation();
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
    const { previewList } = this.state;
    // Vị trí trong mảng có image cần xóa
    var deleteIndex = previewList.indexOf(
      previewList.find((img) => img === item)
    );
    // Tạo mảng mới không có phần tử muốn xóa
    previewList.splice(deleteIndex, 1);
    this.setState({
      previewList,
    });
  };

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // 1. Hiển thị ảnh vừa thêm
    this.previewFile(file);
    this.setState({
      selectedFile: file,
      fileInputState: e.target.value,
    });
  };
  handleColorInputChange = (e) => {
    const file = e.target.files[0];
    // 1. Hiển thị ảnh vừa thêm
    this.previewColor(file);
    this.setState({
      selectedColor: file,
      colorInputState: e.target.value,
    });
  };
  handleListInputChange = (e) => {
    const file = e.target.files[0];
    const { selectedList, fileInputList } = this.state;
    // 1. Hiển thị ảnh vừa thêm
    this.previewList(file);
    selectedList.push(file);
    fileInputList.push(e.target.value);
    this.setState({
      selectedList,
      fileInputList,
    });
  };

  // Hàm xử lý file - set hiển thị ảnh mới thêm vào state previewSource
  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result,
      });
    };
  };
  //
  previewColor = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewColorImage: reader.result,
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
    const { onGetDetailCategories } = this.props;
    this.setState({
      [name]: id,
    });
    onGetDetailCategories(id);
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
        colorEditing: "inherit",
        btnStatus: "Hủy",
        onEditing: false,
      });
    } else {
      this.setState({
        colorEditing: "none",
        btnStatus: "Thêm màu",
        nameColor: "",
        amountColor: 0,
        priceColor: 0,
        onEditing: false,
        imageColor:
          "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png",
      });
    }
  };

  onEditColor = (item) => {
    const { colorList } = this.state;
    this.setState({
      nameColor: item._id,
      amountColor: item.amount,
      priceColor: item.price,
      colorEditing: "inherit",
      imageColor: item.image,
      btnStatus: "Hủy",
      onEditing: true,
      indexColor: colorList.indexOf(item),
    });
  };

  onDeleteColor = (item) => {
    const { colorList } = this.state;
    colorList.splice(colorList.indexOf(item), 1);
    this.setState({
      colorList,
    });
  };

  onSaveColor() {
    const {nameColor,
      priceColor,
      amountColor,
      onEditing,
      indexColor,
      colorList
    } = this.state;
    const { listColor } = this.props;
    if(!nameColor){
      toastError("Chọn màu trước khi lưu");
    }
    else{
      if (onEditing === false) {
        // TH thêm màu
        if (colorList.find((obj) => obj._id === nameColor)) {
          toastError("Màu này đã tồn tại");
        } else {
          colorList.push({
            _id: nameColor,
            name_vn: listColor.find((obj) => obj._id === nameColor).name_vn,
            amount: amountColor,
            price: priceColor,
          });
        }
      } else {
        // TH sửa màu
        for (let i = 0; i < colorList.length; i++) {
          colorList[indexColor] = {
            _id: nameColor,
            name_vn: listColor.find((obj) => obj._id === nameColor).name_vn,
            amount: amountColor,
            price: priceColor,
          };
        }
      }
    }
    this.setState({
      colorList,
    });
    console.log("colorList", colorList);
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
      // eslint-disable-next-line
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      // 2. Lưu state dạng FormData
      reader.onloadend = () => {
        // eslint-disable-next-line
        var formData1 = new FormData();
        formData1.append("image", selectedFile);
        this.setState({
          bigimage: formData1,
        });
        this.onCallback(id);
      };
      reader.onerror = () => {
        console.error("Lỗi không thêm mới được Thumbnail product");
      };
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
    // @Xử lý các thông tin khác
    // 3. Update data
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
      image,
      pathseo,
      specifications,
      colorList
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
        image,
        pathseo,
        specifications,
        colors: colorList
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
        pathseo,
        image,
        specifications,
        colors: colorList
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

  render() {
    const {
      name,
      pathseo,
      warrently,
      category,
      brand,
      bigimage,
      image,
      previewSource,
      fileInputState,
      previewList,
      specifications,
      colorList,
      nameColor,
      priceColor,
      amountColor,
      colorEditing,
      btnStatus,
      imageColor,
      previewColorImage,
    } = this.state;
    const {
      large,
      onClose,
      listCategories,
      listBrands,
      listColor,
      product,
    } = this.props;
    return (
      <CModal show={large} onClose={() => onClose(!large)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>
            {product ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row">
            <div className="col-12 col-lg-6">
              <form>
                <div className="form-group">
                  <label>Tên sản phẩm:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    disabled={product ? true : false}
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
                      disabled={product ? true : false}
                      value={pathseo ? pathseo : changeToSlug(name)}
                      onChange={this.onChange}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      name="pathseo"
                      value={pathseo}
                      disabled={product ? true : false}
                      onChange={this.onChange}
                    />
                  )}
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
                {bigimage ? (
                  <div className="form-group img-thumbnail3">
                    {previewSource ? (
                      <img src={previewSource} className="w-100" alt="" />
                    ) : (
                      <img
                        src={bigimage.public_url}
                        style={{ border: "1px solid", width: "100%" }}
                        alt=""
                      />
                    )}
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input
                        type="file"
                        name="image"
                        id="fileInput"
                        value={fileInputState}
                        onChange={this.handleFileInputChange}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form-group img-thumbnail3">
                    {previewSource ? (
                      <img src={previewSource} className="w-100" alt="" />
                    ) : (
                      <img
                        src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"
                        alt=""
                        style={{ border: "1px solid", width: "100%" }}
                      ></img>
                    )}
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input
                        type="file"
                        name="image"
                        id="fileInput"
                        value={fileInputState}
                        onChange={this.handleFileInputChange}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <div className="row">
                    {image &&
                      image.map((item, index) => {
                        return (
                          <div className="col-3" key={index}>
                            <div className=" img-thumbnail2">
                              <img
                                src={item.public_url}
                                className="w-100"
                                style={{ border: "1px solid" }}
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
                                <img src={item} alt="" className="w-100" />
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
                          src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"
                          alt=""
                          className="w-100"
                          style={{ border: "1px solid" }}
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
            </div>
            <div className="col-12 col-lg-6">
              <div className="card p-3">
                <div className="mb-3">
                  <h3 className="d-inline-block">Danh sách màu</h3>
                  <button
                    className="btn btn-primary float-right"
                    type="button"
                    onClick={() => this.onAddColor(colorEditing)}
                  >
                    {btnStatus}
                  </button>
                  <button
                    className="btn btn-success float-right mr-2"
                    style={{ display: colorEditing }}
                    onClick={() => this.onSaveColor()}
                    type="button"
                  >
                    Lưu
                  </button>
                </div>
                <div
                  className="row border-bottom"
                  style={{ display: colorEditing }}
                >
                  <div className="col-5">
                    <div className=" img-thumbnail2">
                      {previewColorImage
                        ? <img src={previewColorImage}
                          className="w-100"
                          style={{ border: "1px solid" }}
                          alt=""></img>
                        : <img
                          src={imageColor}
                          className="w-100"
                          style={{ border: "1px solid" }}
                          alt=""
                        ></img>
                      }
                      <div className="btn btn-lg btn-primary img-des">
                        Choose Photo
                        <input
                          type="file"
                          name="image"
                          className="w-100 h-100"
                          value={fileInputState}
                          onChange={this.handleColorInputChange}
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
                      {listColor.map((color, index) => {
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
                {colorList.map((item, index) => {
                  return (
                    <div className="row my-2" key={index}>
                      <div className="col-4">
                        <img
                          src={item.image ? item.image: "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"}
                          alt=""
                          className="w-100"
                          style={{ border: "1px solid" }}
                        />
                      </div>
                      <div className="col-4">
                        <label className="d-block font-weight-bold">
                          {item.name_vn}
                        </label>
                        <label className="d-block font-italic">
                          {item.price}
                        </label>
                        <label className="d-block">{item.amount}</label>
                      </div>
                      <div className="col-4">
                        <button
                          className="btn btn-warning d-inline-block float-right m-1"
                          type="button"
                          onClick={() => this.onEditColor(item)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-danger d-inline-block float-right m-1"
                          type="button"
                          onClick={() => this.onDeleteColor(item)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="card text-white mb-3">
                  <div className="card-header bg-primary">
                    Chi tiết sản phẩm
                  </div>
                  <div className="card-body text-dark">
                    {specifications.map((item, index) => {
                      return (
                        <div className="form-group" key={index}>
                          <label key={index + 1}>
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
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => this.onSubmitImage(!large)}>
            Lưu ảnh
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
    listBrands: state.brands.list,
    listCategories: state.categories.list,
    listOperations: state.operations.list,
    listColor: state.color.list,
    categoryDetail: state.categories.detail,
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
    onGetListOperation: () => {
      dispatch(OperationActions.onGetList());
    },
    onGetDetailCategories: (id) => {
      dispatch(CategoryActions.onGetDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
