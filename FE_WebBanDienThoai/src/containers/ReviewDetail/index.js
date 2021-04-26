import React, { Component } from 'react'

import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

class ReviewDetail extends Component {
  render() {
    const {modal, onCloseModal} = this.props
    return (
      <CModal show={modal} onClose={() => onCloseModal("modal", !modal)} closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <CModalTitle>
            Danh sách hình ảnh
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
         a
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => onCloseModal("modal", !modal)}>
            Cancel
          </CButton> */}
        </CModalFooter>
      </CModal>
    )
  }
}
export default ReviewDetail;