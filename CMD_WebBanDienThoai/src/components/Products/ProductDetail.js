import React, { Component } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

class ProductDetail extends Component {
	render() {
    const {large, setLarge} = this.props;
		return (
			<CModal show={large} onClose={() => setLarge(!large)} size="lg">
				<CModalHeader closeButton>
					<CModalTitle>Modal title</CModalTitle>
				</CModalHeader>
				<CModalBody>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</CModalBody>
				<CModalFooter>
					<CButton color="primary" onClick={() => setLarge(!large)}>
						Do Something
					</CButton>{' '}
					<CButton color="secondary" onClick={() => setLarge(!large)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		);
	}
}

export default ProductDetail;
