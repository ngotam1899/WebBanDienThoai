import React, { Component } from 'react'
// @Components
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";


export default class Images extends Component {

  render() {
    const {modal, onCloseModal,setImage, image} = this.props;
    return (
      <CModal show={modal} onClose={() => onCloseModal("modal", !modal)} closeOnBackdrop={false}>
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
          <CButton color="secondary" onClick={() => onCloseModal("modal", !modal)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }
}
