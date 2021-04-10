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
    }
  }

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
