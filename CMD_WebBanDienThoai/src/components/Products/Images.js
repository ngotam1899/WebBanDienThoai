import React, { Component } from 'react'
//Components
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";


export default class Images extends Component {
  constructor(props){
    super(props);
    this.state = {
      // @Product list images
      previewList: [],
      selectedList: [],
    }
  }

/*   handleListInputChange = (e) => {
    const file = e.target.files[0];
    const { selectedList } = this.state;
    // 1. Hiển thị ảnh vừa thêm
    this.previewList(file);
    selectedList.push(file);
    this.setState({
      selectedList,
    });
  };

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
  }; */

  render() {
    const {modal, onCloseModal,setImage,deletePreview, image} = this.props;
    const {previewList} = this.state;
    return (
      <CModal show={modal} onClose={() => onCloseModal(!modal)} closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <CModalTitle>
            Danh sách hình ảnh
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {image.map((item, index)=>{
            return (
              <button key={index} className="btn" onClick={()=> setImage(item)}>
                <img src={item.public_url} style={{"width": 100, "height":100}} className="rounded"></img>
              </button>
            )
          })}
          {/* {previewList[0] && (
            <>
              {previewList.map((item, index) => {
                return (
                  <div key={index}>
                    <div style={{"width": 100, "height":100}}>
                      <img src={item} alt="" className="border rounded w-100" />
                      <div className="btn btn-lg btn-primary img-des">
                        Delete Photo
                        <input
                          type="button"
                          name="image"
                          className="w-100 h-100"
                          onClick={() => deletePreview(item)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <div style={{"width": 100, "height":100}}>
            <div className=" img-thumbnail2">
              <img
                src="https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"
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
          </div> */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => onCloseModal(!modal)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }
}
