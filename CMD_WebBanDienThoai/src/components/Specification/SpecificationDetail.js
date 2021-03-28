import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
// @Actions
import SpecificationActions from "../../redux/actions/specification";

class SpecificationDetail extends Component {
  constructor(props){
    super(props);
    const {specification} = props;
    this.state = {
      id: specification ? specification._id : '',
      name: specification ? specification.name : ''
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

  onSubmit = () =>{
    const {id, name} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {name}
    console.log("data: ",data)
    if (id) {
      onUpdate(id, data);
    }
    else {
      onCreate(data);
    }
  }

  onAddSpecification = (name) =>{
    const {onUpdate} = this.props;
    const {specifications} = this.state;
    specifications.push(name)
    onUpdate({specifications});
  }


	render() {
    const { name } = this.state;
    const { large, onClose, specification} = this.props;
    console.log("abc: ", specification);
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{specification ? "Sửa thông tin thuộc tính" : "Thêm thuộc tính mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div className="row">
						<div className="col-12 col-lg-6">
							<form>
								<div className="form-group">
									<label>Tên hệ thuộc tính:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (params) =>{
      dispatch(SpecificationActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(SpecificationActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificationDetail);
